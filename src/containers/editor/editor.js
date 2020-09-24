import {Button, Form, FormGroup} from "reactstrap";
import {Controlled as CodeMirror} from 'react-codemirror2'
import React from "react";

export const editor = (editor) => {
    const {input, data, theme, didSubmit} = editor.state;
    //let editor = CodeMirror.fromTextArea(document.getElementById('editor'));
    return (
        <div className="editor-group">
            <Form>
                <FormGroup>
                    <textarea
                        value={input}
                        options={{mode: 'xml', lineNumbers: true}}
                        rows={30}
                        id="editor"
                        className={`textarea ${theme}`}
                        onClick={event => handleCursorMovement(editor, event)}
                        onKeyUp={event => handleCursorMovement(editor, event)}
                        onChange={event => handleTextArea(editor, event)}/>
                </FormGroup>
                <FormGroup>
                    <Button color="success" onClick={event => handleSubmit(editor, event)} type="submit">Compile</Button>{' '}
                    <Button color="secondary" onClick={() => clearInput(editor)} to="/editor">Clear</Button>{' '}
                    <Button color="primary" onClick={() => handleDownload(data)} disabled={!didSubmit}  to="/editor">Download</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

function clearInput(editor) {
    editor.setState({input: ""})
}

async function handleDownload(data) {
    let binaryData = [];
    binaryData.push(data);
    const pdf = new Blob(binaryData, {type: 'application/pdf'});
    const blobUrl = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = 'scheme.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleCursorMovement(editor, event) {
    editor.setState({cursor: event.target.selectionStart});
}

function handleTextArea(editor, event) {
    editor.setState({
        input: event.target.value
    });
}

function handleSubmit(editor, event) {
    event.preventDefault();
    editor.props.fetchPdf(editor.state.input);
    editor.setState({didSubmit: true});
}