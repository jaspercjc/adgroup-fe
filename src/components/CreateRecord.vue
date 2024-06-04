<template>
    <q-dialog v-model="open" persistent>
        <q-card style="min-width: 350px">
            <q-card-section class="bg-primary text-primary-text">
                <div class="text-h6">Create Record</div>
            </q-card-section>

            <q-card-section class="class flex flex-col gap-4">
                <q-input
                    v-model="form.ip_address"
                    label="IP Address"
                    dense
                    outlined
                    :error="formErrors['ip_address'] ? true : null"
                    :error-message="formErrors['ip_address']"
                />
                <q-input
                    v-model="form.assignment"
                    label="Assignment"
                    dense
                    outlined
                    :error="formErrors['assignment'] ? true : null"
                    :error-message="formErrors['assignment']"
                />
            </q-card-section>

            <q-card-actions align="right" class="bg-gray-200 p-4">
                <div class="flex gap-4">
                    <q-btn
                        color="primary"
                        flat
                        label="Cancel"
                        @click="$emit('update:model-value', false)"
                    />
                    <q-btn label="Submit" @click="submit()" :loading="loading" color="primary" />
                </div>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
const emit = defineEmits(['update:model-value', 'refetch']);
const props = defineProps({
    modelValue: Boolean,
});

const ipStore = useIpStore();
const open = ref(false);
const loading = ref(false);
const formErrors = ref({});

const form = ref({
    ip_address: '',
    assignment: '',
});

async function submit() {
    loading.value = true;
    try {
        await ipStore.create(form.value);
        formErrors.value = {};
        emit('update:model-value', false);
        emit('refetch');
        loading.value = false;
    } catch (error) {
        formErrors.value = error.errors ?? {};
        loading.value = false;
    }
}

watch(
    () => props.modelValue,
    (value) => {
        open.value = value;
        formErrors.value = {};
    }
);
</script>
