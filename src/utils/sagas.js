import {takeEvery, put, call} from 'redux-saga/effects'
import {
    FETCH_ELEMENTS,
    FETCH_TEMPLATE,
    REQUEST_ELEMENTS,
    REQUEST_PDF,
    REQUEST_TEMPLATE,
    hideLoader,
    showLoader, FETCH_PDF
} from "./actions";

export default function* sagaWatcher() {
    yield takeEvery(REQUEST_ELEMENTS, requestElements);
    yield takeEvery(REQUEST_TEMPLATE, requestTemplate);
    yield takeEvery(REQUEST_PDF, requestPdf);
}

function* requestElements() {
    yield put(showLoader());
    const payload = yield call(fetchElements);
    yield put({type: FETCH_ELEMENTS, payload});
    yield put(hideLoader());
}

async function fetchElements() {
    return await fetch('api/editor')
        .then(response => response.json())
        .then(data => { return data });
}

function* requestTemplate(action) {
    const payload = yield call(fetchTemplate, action.element);
    yield put({type: FETCH_TEMPLATE, payload});
}

async function fetchTemplate(element) {
    return await fetch(`/api/editor/${element}`)
        .then(response => response.text())
        .then(data => { return data });
}

function* requestPdf(action) {
    const payload = yield call(fetchPdf, action.input);
    yield put({type: FETCH_PDF, payload});
}

async function fetchPdf(input) {
    return await fetch('/api/editor/submit', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
        .then(response => {return response.arrayBuffer() });
}