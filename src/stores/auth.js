import { defineStore } from 'pinia';
import sanctum from '@/api/sanctum';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            loading: false,
            data: null,
            authenticated: false,
            bearer: useStorage('bearer', null),
        };
    },
    actions: {
        async register(payload) {
            try {
                this.loading = true;
                await window.axios.post('register', payload);
                this.loading = false;
            } catch (error) {
                this.authenticated = false;
                this.data = null;
                this.loading = false;
                // let the form component display the error
                throw error;
            }
        },

        async login(payload) {
            try {
                this.loading = true;
                const { token } = await sanctum.token(payload);
                this.bearer = token;

                const user = await this.fetchUser();
                this.loading = false;
                return user;
            } catch (error) {
                this.authenticated = false;
                this.data = null;
                this.loading = false;
                throw error;
            }
        },

        async fetchUser() {
            try {
                this.loading = true;
                const { data } = await sanctum.me();

                this.data = data;
                this.authenticated = true;
                this.loading = false;
                return data;
            } catch (error) {
                this.authenticated = false;
                this.data = null;
                this.loading = false;
                if (this.router && this.router.currentRoute.value.name !== 'login') {
                    this.router.push('login');
                }
            }
        },

        async logout() {
            try {
                this.loading = true;
                await sanctum.logout();
                this.data = null;
                this.authenticated = false;
                this.jwt = null;
                this.loading = false;
            } catch (error) {
                this.data = null;
                this.authenticated = false;
                this.loading = false;
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        isAuthenticated: (state) => {
            return state.authenticated;
        },
        getName(state) {
            if (state.data && state.data.name) {
                return state.data.name;
            }
        },
    },
});
