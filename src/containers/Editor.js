import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup} from 'reactstrap';
import '../styles/DarkTheme.css';
import '../styles/LightTheme.css';
import AppNavbar from './AppNavbar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import {fetchElements} from "../utils/Utils";
import {connect} from "react-redux";

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme ? 'dark' : 'light',
            elements: [],
            data: [],
            input: "",
            cursor: "",
            isLoading: true,
            didSubmit: false};
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const data = await fetchElements();
        this.setState({elements: data, isLoading: false});
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
        //ToDo поверх пдф превью рендерится текст. Этот текст растягивает страницу
        //В идеале это решится при законченном бэкенде, когда пдф будет рендериться по правилам
        const {theme, input, elements, didSubmit, cursor, isLoading, data} = this.state;
        if (isLoading) return (
            <div className={`background ${theme}`}>
            <AppNavbar/>
            <div className={`lds-dual-ring ${theme}`}/>
        </div>
        );
        const list = elements.map(element => {
            return <button className={`button-link ${theme}`} onClick={() => this.handleElement(element, input, cursor)}>{element}</button>
        });
        const pdf = (data.length !== 0
            ? <Document
                file={data}>
                <Page pageNumber={1} wrap={false} object-fit="fill"/>
            </Document>
            : null);
        return (
            <div className={`background ${theme}`}>
            <AppNavbar/>
            <table className="table">
                <tr>
                    <th className="button-group-vertical" width="5%">
                        {list}
                    </th>
                    <th width="50%">
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
                    </th>
                    <th width="45%">
                        {pdf}
                    </th>
                </tr>
            </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        theme: state.themeDark
    };
}

export default connect(mapStateToProps)(withRouter(Editor));