// store/listings.js
import { defineStore } from 'pinia';

export const useIpStore = defineStore('ip', {
    state: () => {
        return {
            loading: false,
            data: null,
        };
    },
    actions: {
        async create(payload) {
            await window.axios
                .post('ip-assignments', payload)
                .then((response) => {
                    //
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },

        async update(id, payload) {
            await window.axios
                .patch('ip-assignments/' + id, payload)
                .then((response) => {
                    //
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
    },
});
