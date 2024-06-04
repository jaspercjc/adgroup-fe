<template>
    <div class="flex w-screen h-screen overflow-hidden overscroll-y-none bg-gray-100">
        <div
            class="relative rounded-lg bg-white py-12 mx-auto px-16"
            :class="{
                'shadow-lg shadow-gray-300 m-auto': !app.isMobile,
                'w-full mt-[30%] md:w-auto md:m-auto': app.isMobile,
            }"
        >
            <div class="text-2xl text-gray-800 font-bold text-center">Register</div>
            <q-form class="q-px-sm mt-6 flex flex-col gap-4 mb-8">
                <q-input
                    square
                    dense
                    v-model="form.name"
                    label="Name"
                    no-error-icon
                    autofocus
                    :disable="loading"
                    @keypress.enter="submit"
                    :error="formErrors['name'] ? true : null"
                    :error-message="formErrors['name']"
                >
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>

                <q-input
                    square
                    dense
                    v-model="form.email"
                    type="email"
                    label="Email"
                    no-error-icon
                    :disable="loading"
                    @keypress.enter="submit"
                    :error="formErrors['email'] ? true : null"
                    :error-message="formErrors['email']"
                >
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
                <q-input
                    dense
                    square
                    v-model="form.password"
                    type="password"
                    label="Password"
                    no-error-icon
                    :disable="loading"
                    @keypress.enter="submit"
                    :error="formErrors['password'] ? true : null"
                    :error-message="formErrors['password']"
                >
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
                <q-input
                    dense
                    square
                    v-model="form.password_confirmation"
                    type="password"
                    label="Confirm password"
                    no-error-icon
                    :disable="loading"
                    @keypress.enter="submit"
                    :error="formErrors['password_confirmation'] ? true : null"
                    :error-message="formErrors['password_confirmation']"
                >
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </q-form>

            <div class="flex flex-col gap-4">
                <q-btn
                    unelevated
                    color="primary"
                    @click="submit"
                    label="Register"
                    :loading="loading"
                />
                <q-btn
                    flat
                    color="primary"
                    label="back to Login"
                    :to="{ name: 'Login' }"
                    size="sm"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const app = useAppStore();

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const authStore = useAuthStore();
const loading = ref(false);

const formErrors = ref([]);
const router = useRouter();

async function submit() {
    formErrors.value = [];

    try {
        loading.value = true;
        await authStore.register(form.value);
        router.push({ name: 'Login' });
        formErrors.value = [];
        loading.value = false;
    } catch (error) {
        formErrors.value = error.errors;
        loading.value = false;
    }
}
</script>
