import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vueSweet from "vue-sweetalert2";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./assets/styles.scss";
import "./assets/styles.css";

import * as VueGoogleMaps from "vue2-google-maps";
import { GmapMarker } from "vue2-google-maps/src/components/marker";
import { GmapCircle } from "vue2-google-maps/src/components/circle";

Vue.component("GmapMarker", GmapMarker);
Vue.component("GmapCircle", GmapCircle);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBp_Fjghb1TrevkvTfg3-IqP_ILIBbNZ0w",
    libraries: "places"
  },
  autobindAllEvents: false,
  installComponents: true
});

Vue.config.productionTip = false;

Vue.use(vueSweet, {
  confirmButtonColor: "#1f4aff",
  cancelButtonColor: "#C62828"
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
