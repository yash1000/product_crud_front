import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from "@incuca/vue3-toaster";
import Vue from 'vue/dist/vue.js';
import './axios'
export const bus = new Vue()

createApp(App).use(router).use(Toaster).mount('#app')
