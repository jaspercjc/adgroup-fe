<template>
    <div class="w-screen h-screen bg-gray-200 flex justify-center">
        <div class="max-w-5xl bg-white h-screen w-full">
            <div class="flex bg-gray-500">
                <h1 class="text-lg font-bold text-white p-4">IP MANAGEMENT</h1>
                <q-space />
                <div
                    class="flex items-center px-6 py-6 text-white cursor-pointer hover:bg-gray-700 transition-all duration-1000"
                    :class="{ 'bg-gray-700': route.name === 'IpManagement' }"
                    @click="router.push({ name: 'IpManagement' })"
                >
                    IP Records
                </div>
                <div
                    class="flex items-center px-6 text-white cursor-pointer hover:bg-gray-700 transition-all duration-1000"
                    :class="{ 'bg-gray-700': route.name === 'ActivityLogs' }"
                    @click="router.push({ name: 'ActivityLogs' })"
                >
                    Activity Logs
                </div>
                <div
                    class="flex items-center px-6 text-white cursor-pointer hover:bg-gray-700 transition-all duration-1000"
                    @click="logout()"
                >
                    Logout
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import IpTable from '@/components/IpTable.vue';

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

async function logout() {
    await authStore.logout();
    router.replace({ name: 'Login' });
}
</script>
