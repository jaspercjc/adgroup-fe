<template>
    <div class="flex w-screen h-screen overflow-hidden overscroll-y-none bg-gray-100">
        <div
            class="relative rounded-lg bg-white py-12 mx-auto px-16"
            :class="{
                'shadow-lg shadow-gray-300 m-auto': !app.isMobile,
                'w-full mt-[30%] md:w-auto md:m-auto': app.isMobile,
            }"
        >
            <div class="text-2xl text-gray-800 font-bold text-center">Login</div>
            <q-form ref="loginForm" class="q-px-sm mt-6">
                <q-input
                    ref="email"
                    square
                    dense
                    v-model="form.email"
                    type="email"
                    label="Email"
                    lazy-rules="ondemand"
                    no-error-icon
                    autofocus
                    :disable="loading"
                    @keypress.enter="submit"
                    :rules="[(val) => (val && val.length > 0) || 'Please type your email']"
                >
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input
                    ref="password"
                    dense
                    square
                    v-model="form.password"
                    :type="visibility ? 'text' : 'password'"
                    label="Password"
                    lazy-rules="ondemand"
                    no-error-icon
                    :disable="loading"
                    @keypress.enter="submit"
                    :rules="[(val) => (val && val.length > 0) || 'Please type your password']"
                >
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                        <q-icon
                            :name="visibility ? 'visibility' : 'visibility_off'"
                            @click="visibility = !visibility"
                            class="cursor-pointer"
                        />
                    </template>
                </q-input>
            </q-form>

            <div class="flex flex-col gap-4">
                <div class="text-center text-red-400" v-if="errorObject.message">
                    {{ errorObject.message }}
                </div>

                <q-btn unelevated color="primary" @click="submit" label="Login" :loading="loading">
                    <template v-slot:loading>
                        <q-spinner size="sm" class="on-left" />
                        Login
                    </template>
                </q-btn>
                <q-btn flat color="primary" label="Create an account" :to="{ name: 'Register' }" />
            </div>
        </div>
    </div>
</template>

<script setup>
const app = useAppStore();

const form = ref({
    email: '',
    password: '',
});

let visibility = ref(false);

const router = useRouter();
const loginForm = ref(null);

const userStore = useAuthStore();
const loading = computed(() => userStore.loading);

const errorObject = ref({
    message: null,
    errors: null,
});

async function submit() {
    loginForm.value.validate().then(async (success) => {
        if (success) {
            try {
                await userStore.login(form.value);
                errorObject.value.message = null;
                errorObject.value.errors = null;

                if (userStore.isAuthenticated) {
                    router.replace({ name: 'IpManagement' });
                }
            } catch (error) {
                errorObject.value.message = error.message;
                errorObject.value.errors = error.errors;
            }
        }
    });
}
</script>
