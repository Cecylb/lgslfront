const axios = require('axios');

export function fetchElements() {
    return axios.get('/api/editor').then(function (response) { return response.data })
}

export function fetchTemplate(element) {
    return axios.get(`/api/editor/${element}`).then(function (response) { return response.data })
}

export function fetchPdf(input) {
    return axios({
        method: 'POST',
        url: '/api/editor/submit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(input),
        responseType: "arraybuffer"
    }).then(function (response) { console.log("RESPONSE", response); return response })
}

export function fetchUser(userInfo) {
    console.log(userInfo.login, userInfo.password)
    return axios.post('/login/login', {
        login: userInfo.login,
        password: userInfo.password
    }).then(function (response) {
        return {
            username: userInfo.login,
            loggedIn: response.data
        }
    })
}