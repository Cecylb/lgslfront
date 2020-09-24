import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/DarkTheme.css';
import '../styles/LightTheme.css';
import {connect} from "react-redux";
import {fetchElements, fetchPdf, fetchTemplate} from "../utils/actions";
import {loading} from "./props/loading";
import {preview} from "./editor/preview";
import {editor} from "./editor/editor";
import {elements} from "./editor/elements";

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme:  localStorage.getItem('theme'),
            elements: [],
            data: [],
            input: "",
            cursor: "",
            panel: false,
            didSubmit: false};
        this.props.fetchElements();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.pdf !== prevProps.pdf) {
            this.setState({data: this.props.pdf});
        }
        if(this.props.template !== prevProps.template) {
            this.setState({panel: true});
        }
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

    render() {
        const {input, cursor, data, theme} = this.state;
        if(this.props.loading) return loading(theme);
        {this.state.panel && this.setTemplate(cursor, input)}
        return (
            <div className={`background ${theme}`}>
                <div className="editor-form">
                    {elements(this)}
                    {editor(this)}
                    {preview(this.props.preview && data.length !== 0, data)}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
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

export default withRouter(connect(mapState, actions)(Editor));