import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'MyAccount' },
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
            meta: { hideForAuth: true },
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/Register.vue'),
            meta: { hideForAuth: true },
        },
        {
            path: '/my-account',
            name: 'MyAccount',
            component: () => import('@/views/MyAccount.vue'),
            meta: {
                title: 'MyAccount',
                requiresAuth: true,
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const app = useAppStore();

    // Find abort controller and abort all requests tied to it and then remove it from the store
    const foundAbortController = app.axiosAbortControllerList[from.path];
    if (foundAbortController && from.path != '/' && from.path != to.path) {
        foundAbortController.controller.abort();
        delete app.axiosAbortControllerList[from.path];
    }

    const currentUser = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const hideForAuth = to.matched.some((record) => record.meta.hideForAuth);

    if (requiresAuth && !currentUser.isAuthenticated) {
        next({ name: 'Login' });
    } else if (hideForAuth && currentUser.isAuthenticated) {
        next({ name: 'MyAccount' });
    } else {
        next();
    }
});

export default router;
