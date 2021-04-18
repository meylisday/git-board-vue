<template>
  <nav class="header">
    <ion-button router-link="/" routerDirection="root">Projects</ion-button>
    <span>{{ $auth.user?.nickname }}</span>
    <ion-button @click="logout">Log Out</ion-button>
  </nav>
</template>

<script lang="ts">
import { VueAuth } from "@/auth";
import { inject, defineComponent } from "vue";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  components: {
    IonButton
  },
  name: "Header",
  setup() {
    const auth = inject<VueAuth>("auth");
    const logout = () => {
      auth?.logout({
        returnTo: `${window.location.origin}/signin`
      });
    };

    return {
      auth,
      logout
    };
  }
});
</script>

<style>
.header-link {
  margin: 0 1rem;
  text-decoration: none;
  color: black;
}
</style>
