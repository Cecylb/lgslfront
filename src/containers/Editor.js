import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup} from 'reactstrap';
import '../styles/DarkTheme.css';
import '../styles/LightTheme.css';
import AppNavbar from './AppNavbar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import {connect} from "react-redux";
import {loading} from "../utils/loading";
import {fetchElements, fetchTemplate} from "../utils/actions";

class Editor extends Component {

    constructor(props) {
        super(props);
        const fetchElements = props.fetchElements();
        this.state = {
            theme: props.theme ? 'dark' : 'light',
            elements: [],
            data: [],
            input: "",
            cursor: "",
            isLoading: true,
            didSubmit: false};
        this.props.fetchElements();
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextArea(event) {
        this.setState({
            input: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await fetch('/api/editor/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.input),
        })
            .then(response => response.arrayBuffer())
            .then(data => {
                this.setState({
                    data: data,
                    didSubmit: true});
            });
        this.props.history.push('/editor');
    }

    async handleElement(element, input, cursor) {
        //ToDo значения в стейт приходят к следующему обращению. Видимо мап стейта происходит до изменений
        //this.props.fetchTemplate(element);
        //const data = this.props.template;
        await fetch(`/api/editor/${element}`)
            .then(response => response.text())
            .then(data => {
                if(cursor === undefined) {
                    this.setState({
                        input: input + data,
                        cursor: input.length + data.length});
                } else {
                    this.setState({
                        input: input.slice(0, cursor) + data + input.slice(cursor, input.length),
                        cursor: cursor + data.length});
                }
            });
        this.props.history.push('/editor');
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

        const {theme, input, didSubmit, cursor, isLoading, data} = this.state;
        //ToDo разобраться с отображением загрузки
        //if(this.props.loading) return loading(theme);
        const list = this.props.elements.map(element => {
            return <button className={`button-link ${theme}`} onClick={() => this.handleElement(element, input, cursor)}>{element}</button>
        });
        const pdf = (data.length !== 0
            ? <Document
                file={data}>
                <Page pageNumber={1} scale={0.8}/>
              </Document>
            : null);
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
                        <Form onSumbit={this.handleSubmit}>
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
                                <Button color="success" type="submit">Compile</Button>{' '}
                                <Button color="secondary" onClick={() => this.setState({input: ""})} to="/editor">Clear</Button>{' '}
                                <Button color="primary" onClick={() => this.handleDownload(data)} disabled={!didSubmit}  to="/editor">Download</Button>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="pdf-group">
                        {pdf}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.themeDark,
        loading: state.app.loading,
        elements: state.fetchReducer.elements,
        template: state.fetchReducer.template
    };
}

const mapDispatchToProps = {
    fetchElements: fetchElements,
    fetchTemplate: fetchTemplate
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor));