import {takeEvery, put, call} from 'redux-saga/effects'
import {
    REQUEST_ELEMENTS,
    FETCH_ELEMENTS,
    REQUEST_TEMPLATE,
    FETCH_TEMPLATE,
    REQUEST_PDF,
    FETCH_PDF,
    hideLoader,
    showLoader,
} from "./actions";
import {fetchElements, fetchTemplate, fetchPdf} from "./fetchFunctions";

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

function* requestTemplate(action) {
    const payload = yield call(fetchTemplate, action.element);
    yield put({type: FETCH_TEMPLATE, payload});
}

function* requestPdf(action) {
    const payload = yield call(fetchPdf, action.input);
    yield put({type: FETCH_PDF, payload});
}
