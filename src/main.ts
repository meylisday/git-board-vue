import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { IonicVue } from "@ionic/vue";

import { domain, clientId } from "../auth_config.json";

import { Auth0Plugin } from "./plugins/auth0-vue";

import "@/assets/custom.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
// import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import "./styles.css";

const getConfig = () => {
  const config = {
    animated: false
  };
  return config;
};

const app = createApp(App)
  .use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: (appState: any) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    }
  })
  .use(IonicVue)
  .use(store)
  .use(router);

router.isReady().then(() => {
  app.mount("#app");
});
