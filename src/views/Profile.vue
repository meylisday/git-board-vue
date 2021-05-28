<template>
  <ion-page class="profile-page">
    <ion-card class="profile-card">
      <ion-card-header>
        <ion-avatar>
          <img :src="$auth.user.picture" />
        </ion-avatar>
      </ion-card-header>

      <ion-card-content>
        <p><b>Email: </b>{{ $auth.user.email }}</p>
        <p><b>Name: </b>{{ $auth.user.name }}</p>
        <p><b>Nickname: </b>{{ $auth.user.nickname }}</p>
      </ion-card-content>
    </ion-card>
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
    return {};
  }
});
</script>
<style scoped>
.profile-card {
  width: 500px;
}
</style>
