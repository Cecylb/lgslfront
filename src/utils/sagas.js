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
    showAlert,
    hideAlert,
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
    try {
        const payload = yield call(fetchElements);
        yield put({type: FETCH_ELEMENTS, payload});
        yield put(hideAlert());
        yield put(hideLoader());
    } catch (error) {
        yield put(showAlert());
    }
}

function* requestTemplate(action) {
    try {
        const payload = yield call(fetchTemplate, action.element);
        yield put({type: FETCH_TEMPLATE, payload});
        yield put(hideAlert());
    } catch (error) {
        yield put(showAlert());
    }
}

function* requestPdf(action) {
    yield put(showLoader());
    try {
        const payload = yield call(fetchPdf, action.input);
        yield put({type: FETCH_PDF, payload});
        yield put(hideAlert());
        yield put(hideLoader());
    } catch (error) {
        yield put(showAlert());
    }
}

function* requestUser(action) {
    const payload = yield call(fetchUser, action.userInfo);
    yield put( {type: FETCH_USER, payload});
}
