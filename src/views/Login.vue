<template>
  <ion-page class="login-page">
    <div v-if="!auth.loading">
      <ion-card class="login-card">
        <ion-img
          class="login-img"
          src="https://cdn.dribbble.com/users/1089308/screenshots/15534103/media/c2e564a95919b41d51ca3d7ec4eb7a86.jpg"
        ></ion-img>
        <ion-card-content>
          <ion-button v-if="!auth.isAuthenticated" @click="login">
            Log with auth0
          </ion-button>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-page>
</template>
<script lang="ts">
import { VueAuth } from "@/auth";
import { defineComponent, inject } from "vue";
import { IonPage, IonButton } from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonButton
  },
  setup() {
    const auth = inject<VueAuth>("auth");

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
<style scoped>
.login-card {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
</style>
