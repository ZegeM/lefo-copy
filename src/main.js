import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(App),
  store,
  router,
  components: { App },
}).$mount("#app");
