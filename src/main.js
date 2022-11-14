import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import BootstrapVue from "bootstrap-vue";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
