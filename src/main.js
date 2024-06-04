// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

import './assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
// const authStore = useAuthStore(pinia);

// Allow router to be accessed in all pinia stores under this.router
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

// authStore.fetchUser().then(() => {
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Quasar, quasarUserOptions);

app.mount('#app');
// });
