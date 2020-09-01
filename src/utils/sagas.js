import {takeEvery, put, call} from 'redux-saga/effects'
import {FETCH_ELEMENTS, REQUEST_ELEMENTS} from "./actions";

export default function* sagaWatcher() {
    yield takeEvery(REQUEST_ELEMENTS, requestElements)
}

function* requestElements() {
    const payload = yield call(fetchElements)
    yield put({type: FETCH_ELEMENTS, payload})
}

async function fetchElements() {
    return await fetch('api/editor')
        .then(response => response.json())
        .then(data => {return data});
}