import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import {routes} from "@/routes";

const router = new VueRouter({routes});
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuelidate);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
