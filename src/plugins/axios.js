/**
 * Axios Plugin implementing secured and plain axios requests
 */

import axios from 'axios';
import { processError } from '@/api/errorHandler';
import router from '@/router';
import { Notify } from 'quasar';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_API_URL ?? 'https://ip-management-api.jasper-castillo.com/api',
    withCredentials: true,
    withXSRFToken: true,
});

axiosInstance.interceptors.request.use((config) => {
    // Get local storage token in native javascript
    let token = localStorage.getItem('bearer');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Abort logic setup for axios
    const app = useAppStore();

    // Get router currentRoute path name
    const currentRoute = router.currentRoute.value.path;
    if (app.axiosAbortControllerList[currentRoute]) {
        config.signal = app.axiosAbortControllerList[currentRoute].controller.signal;
    } else {
        // Add to axiosAbortControllerList with key of currentRoute
        app.axiosAbortControllerList[currentRoute] = {
            name: currentRoute,
            controller: new AbortController(),
        };
        config.signal = app.axiosAbortControllerList[currentRoute].controller.signal;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response?.data?.message) {
            Notify.create({
                message: response.data.message,
                group: true,
                icon: 'check_circle',
                color: 'positive',
                position: 'top',
            });
        }
        return Promise.resolve(response);
    },
    (error) => {
        const processedError = processError(error);

        if (error?.response?.status === 401) {
            router.isReady().then(() => {
                if (router.currentRoute.value.meta.requiresAuth) {
                    router.replace({ name: 'Login' });
                }
            });
        }

        return Promise.reject(processedError);
    }
);

/*
 * Install global and Vue alias
 */
window.axios = axiosInstance; // Make instance available globally as axios()

export default {
    install: (app /*options*/) => {
        app.config.globalProperties.$axios = axiosInstance; // Make instance available as instance property this.$axios()
    },
};
