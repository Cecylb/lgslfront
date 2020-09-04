import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup} from 'reactstrap';
import '../styles/DarkTheme.css';
import '../styles/LightTheme.css';
import AppNavbar from './AppNavbar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import {connect} from "react-redux";
import {loading} from "../utils/templates/loading";
import {fetchElements, fetchPdf, fetchTemplate} from "../utils/actions";
import {preview} from "../utils/templates/preview";

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            data: [],
            input: "",
            cursor: "",
            panel: false,
            didSubmit: false};
        this.props.fetchElements();
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.pdf !== prevProps.pdf) {
            this.setState({data: this.props.pdf});
        }
        if(this.props.template !== prevProps.template) {
            this.setState({panel: true});
        }

    }

    handleTextArea(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleElement(element) {
        this.props.fetchTemplate(element);
        }

    handleSubmit(event) {
        event.preventDefault();
        this.props.fetchPdf(this.state.input);
        this.setState({didSubmit: true});
    }

    setTemplate(cursor, input) {
        const template = this.props.template;
        if(cursor === undefined) {
            this.setState({
                input: input + template,
                cursor: input.length + template.length});
        } else {
            this.setState({
                input: input.slice(0, cursor) + template + input.slice(cursor, input.length),
                cursor: cursor + template.length});
        }
        this.setState({panel: false});
    }

    async handleDownload(data) {
        let binaryData = [];
        binaryData.push(data);
        const pdf = new Blob(binaryData, {type: 'application/pdf'});
        const blobUrl = URL.createObjectURL(pdf);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = 'scheme.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    handleCursorMovement(event) {
        this.setState({cursor: event.target.selectionStart});
    }

    render() {
        const {input, didSubmit, template, cursor, isLoading, data} = this.state;
        const theme = this.props.theme ? 'dark' : 'light';
        if(this.props.loading) return loading(theme);
        const list = this.props.elements.map(element => {
            return <button className={`button-link ${theme}`}
                           onClick={() => this.handleElement(element)}>{element}</button>
        });
        {this.state.panel && this.setTemplate(cursor, input)}
        const pdf = preview(this.props.preview && data.length !== 0, data);
        return (
            <div className={`background ${theme}`}>
                <AppNavbar/>
                <div className="editor-form">
                    <div className="tool-group">
                        <div className="button-group-vertical">
                        {list}
                        </div>
                    </div>
                    <div className="editor-group">
                        <Form>
                            <FormGroup>
                                <textarea
                                    value={input}
                                    rows={30}
                                    className={`textarea ${theme}`}
                                    onClick={event => this.handleCursorMovement(event)}
                                    onKeyUp={event => this.handleCursorMovement(event)}
                                    onChange={this.handleTextArea}
                                    autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="success" onClick={this.handleSubmit} type="submit">Compile</Button>{' '}
                                <Button color="secondary" onClick={() => this.setState({input: ""})} to="/editor">Clear</Button>{' '}
                                <Button color="primary" onClick={() => this.handleDownload(data)} disabled={!didSubmit}  to="/editor">Download</Button>
                            </FormGroup>
                        </Form>
                    </div>
                    {pdf}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        theme: state.app.themeDark,
        preview: state.app.preview,
        loading: state.app.loading,
        elements: state.fetchReducer.elements,
        template: state.fetchReducer.template,
        pdf: state.fetchReducer.pdf
    };
}

const actions = {
    fetchElements: fetchElements,
    fetchTemplate: fetchTemplate,
    fetchPdf: fetchPdf
}

export default connect(mapState, actions)(withRouter(Editor));