import {takeEvery, put, call} from 'redux-saga/effects'
import {FETCH_ELEMENTS, FETCH_TEMPLATE, hideLoader, REQUEST_ELEMENTS, REQUEST_TEMPLATE, showLoader} from "./actions";

export default function* sagaWatcher() {
    yield takeEvery(REQUEST_ELEMENTS, requestElements);
    yield takeEvery(REQUEST_TEMPLATE, requestTemplate)
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