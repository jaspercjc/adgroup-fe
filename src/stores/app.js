import { defineStore } from 'pinia';

import { UAParser } from 'ua-parser-js';

export const useAppStore = defineStore('app', () => {
    const isMobile = ref(false);
    const axiosAbortControllerList = ref({});

    function setDeviceType() {
        isMobile.value =
            new UAParser().getDevice().type === 'mobile' ? true : false;
    }

    return { isMobile, axiosAbortControllerList, setDeviceType };

});