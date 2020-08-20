import React, { Component, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import {PDFDownloadLink, View} from "@react-pdf/renderer";

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            input: "",
            isLoading: true,
            didSubmit: false,
            preview: []};
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('api/editor')
            .then(response => response.json())
            .then(data => this.setState({elements: data, isLoading: false}));
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
                this.setState({ preview: new Blob([data], {type: 'application/pdf'}), didSubmit: true});
            });
        this.props.history.push('/editor');
    }

    async handleElement(element, input, cursor) {
        await fetch(`/api/editor/${element}`)
            .then(response => response.text())
            .then(data => {
                this.setState({input: input.slice(0, cursor) + data + input.slice(cursor, input.length)});
            });
        this.props.history.push('/editor');
    }

    async handleDownload(preview) {
        let binaryData = [];
        binaryData.push(preview);
        window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
    }

    render() {
        const {input, elements, didSubmit, isLoading, preview} = this.state;
        let cursor;
        if (isLoading) return <p>Loading...</p>;
            const list = elements.map(element => {
            return <Button color="link" outline={false} onClick={() => this.handleElement(element, input, cursor)}>{element}</Button>
        });
        const document = (
            <Document
                id="doc"
                file={preview}>
                <Page pageNumber={1} width={700}>
                </Page>
            </Document>
        );

        // ToDo загрузка не работает, разобраться с DownloadLink
        return (
            <div>
            <AppNavbar/>
            <Table>
                <tr>
                    <th width="5%">
                        {list}
                    </th>
                    <th width="50%">
                        <Form>
                            <FormGroup>
                                <Input type="textarea"
                                       value={input}
                                       onClick={event => cursor = event.target.selectionStart}
                                       onKeyDown={event => cursor = event.target.selectionStart}
                                       onChange={this.handleTextArea}
                                       autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="success" onClick={this.handleSubmit} type="submit">Compile</Button>{' '}
                                <Button color="secondary" onClick={() => this.setState({input: ""})} to="/editor">Clear</Button>{' '}
                                <Button color="primary" onClick={this.handleDownload(preview)} disabled={!didSubmit}  to="/editor">Download</Button>
                            </FormGroup>
                        </Form>
                    </th>
                    <th width="45%">
                        {document}
                    </th>
                </tr>
            </Table>
            </div>
        )
    }
}

export default withRouter(Editor);