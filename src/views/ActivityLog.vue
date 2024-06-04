<template>
    <div class="p-4">
        <q-table
            row-key="id"
            flat
            :rows="rows"
            :columns="tableColumns"
            :filter="search"
            :loading="loading"
            v-model:pagination="pagination"
            @request="onRequest"
            color="primary"
            no-data-label="No data available"
            no-results-label="No results found"
            no-data-icon="sentiment_very_dissatisfied"
            :rows-per-page-options="[0]"
            table-header-class="bg-gray-200"
            class="class-list-table"
            :sort-method="($event) => handleSort($event)"
            binary-state-sort
        >
            <template v-for="(slotFn, slotName) in $slots" v-slot:[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps"></slot>
            </template>

            <template v-slot:top-left>
                <div class="flex gap-4">
                    <q-input
                        dense
                        debounce="500"
                        v-model="search"
                        placeholder="Search"
                        :class="{ 'w-full': app.isMobile }"
                    >
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
            </template>

            <template v-slot:no-data="{ icon, message, filter }">
                <div class="full-width row flex-center text-warning q-gutter-sm">
                    <q-icon size="2em" name="sentiment_dissatisfied" />
                    <span> {{ message }} </span>
                    <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                </div>
            </template>
        </q-table>
    </div>
</template>

<script setup>
import moment from 'moment';

const app = useAppStore();
const search = ref('');
const loading = ref(false);

const pagination = ref({
    sortBy: 'id',
    descending: true,
    page: 1,
    rowsPerPage: 15,
    rowsNumber: 0,
});

const tableColumns = ref([
    {
        name: 'user',
        label: 'User',
        align: 'left',
        field: (row) => row.user?.name ?? 'N/A',
    },
    {
        name: 'action',
        label: 'Log',
        align: 'left',
        field: 'action',
    },
    {
        name: 'created_at',
        label: 'Date/Time',
        align: 'center',
        field: (row) => moment(row.created_at).format('MMM DD, YYYY hh:mm A'),
        sortable: true,
    },
]);

const rows = ref([]);
async function onRequest(event) {
    loading.value = true;
    pagination.value = event.pagination;

    const urlQuery = {
        ...event.pagination,
        search: search.value,
    };

    var queryString = Object.keys(urlQuery)
        .map((key) => key + '=' + urlQuery[key])
        .join('&');

    await window.axios
        .get('activity-logs' + '?' + queryString)
        .then((response) => {
            const { meta, data } = response.data;
            rows.value = data;
            pagination.value.rowsNumber = meta.total;
            pagination.value.page = meta.current_page;
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
        });
}

onMounted(() => {
    onRequest({ pagination: pagination.value });
});
</script>

<style lang="sass" scoped>
.class-list-table
  /* height or max-height is important */
  height: calc(100vh - 100px)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #eee

  thead tr th
    position: sticky
    z-index: 1
    font-size: 14px
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
