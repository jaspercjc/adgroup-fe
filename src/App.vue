<template>
    <transition name="fade" mode="out-in">
        <component :is="useRoute().meta.requiresAuth ? PageContainer : 'div'">
            <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </component>
    </transition>
</template>

<script setup>
import { useRoute } from 'vue-router';
import PageContainer from '@/components/PageContainer.vue';
</script>
