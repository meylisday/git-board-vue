<template>
  <ion-page>
    {{ auth.loading }}
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!auth.isAuthenticated" @click="login">Log in</button>
    </div>
  </ion-page>
</template>
<script lang="ts">
import { VueAuth } from "@/auth";
import { defineComponent, inject } from "vue";
import { IonPage } from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage
  },
  setup() {
    const auth = inject<VueAuth>("auth");

    console.log(auth);

    const login = () => {
      auth?.loginWithRedirect();
    };

    return {
      login,
      auth
    };
  }
});
</script>
