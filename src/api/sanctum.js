import { hasCookie } from './utils';

const routes = {
    csrf: 'auth/csrf-cookie',
    token: 'auth/token',
    login: 'auth/login',
    logout: 'auth/logout',
    me: 'me',
};

async function fetchCSRFToken() {
    await window.axios.get(routes.csrf);
}

async function login(credentials) {
    await fetchCSRFToken();
    await window.axios.post(routes.login, credentials);
}

async function token(credentials) {
    await fetchCSRFToken();
    const response = await window.axios.post(routes.token, credentials);
    return response.data;
}

async function logout() {
    await window.axios.post(routes.logout);
}

function me() {
    return window.axios.get(routes.me);
}

function hasXSRFToken() {
    return hasCookie('XSRF-TOKEN');
}

export default {
    fetchCSRFToken,
    login,
    token,
    logout,
    me,
    hasXSRFToken,
};
