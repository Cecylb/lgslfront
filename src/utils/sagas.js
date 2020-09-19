import {takeEvery, put, call} from 'redux-saga/effects'
import {
    REQUEST_ELEMENTS,
    FETCH_ELEMENTS,
    REQUEST_TEMPLATE,
    FETCH_TEMPLATE,
    REQUEST_PDF,
    FETCH_PDF,
    REQUEST_USER,
    FETCH_USER,
    hideLoader,
    showLoader,
} from "./actions";
import {fetchElements, fetchTemplate, fetchPdf, fetchUser} from "./fetchFunctions";

export default function* sagaWatcher() {
    yield takeEvery(REQUEST_ELEMENTS, requestElements);
    yield takeEvery(REQUEST_TEMPLATE, requestTemplate);
    yield takeEvery(REQUEST_PDF, requestPdf);
    yield takeEvery(REQUEST_USER, requestUser);
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

function* requestUser(action) {
    console.log("SAGA");
    const payload = yield call(fetchUser, action.userInfo);
    yield put( {type: FETCH_USER, payload});
}
