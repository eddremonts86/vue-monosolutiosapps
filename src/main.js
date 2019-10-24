import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vueSweet from 'vue-sweetalert2';
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./assets/styles.scss";
import "./assets/styles.css";

Vue.config.productionTip = false;

Vue.use(vueSweet, {
  confirmButtonColor: '#1f4aff',
  cancelButtonColor: '#C62828',
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
