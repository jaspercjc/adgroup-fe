<template>
    <div class="w-screen h-screen bg-gray-200 flex justify-center">
        <div class="max-w-5xl bg-white h-screen w-full">
            <h1 class="text-lg font-bold text-white bg-gray-500 p-4">IP MANAGEMENT</h1>

            <div class="p-4">
                <div class="flex justify-end">
                    <q-btn
                        icon="add"
                        color="primary"
                        label="New Record"
                        @click="showCreateDialog = true"
                    />
                </div>
            </div>
        </div>
        <CreateRecord v-model="showCreateDialog" />
    </div>
</template>

<script setup>
import CreateRecord from '@/components/CreateRecord.vue';
const showCreateDialog = ref(false);
</script>
