declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

import { VueAuth } from "./auth/VueAuth";
declare module "vue/types/vue" {
  interface Vue {
    $auth: VueAuth;
  }
}
