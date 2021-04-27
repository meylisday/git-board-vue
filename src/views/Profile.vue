<template>
  <ion-page class="profile-page">
    <Header />
  </ion-page>
</template>
<script lang="ts">
import { VueAuth } from "@/auth";
import { defineComponent, inject } from "vue";
import { IonPage, IonButton } from "@ionic/vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: {
    IonPage,
    Header
  },
  setup() {
    const auth = inject<VueAuth>("auth");
    console.log(auth?.user);
    return {};
  }
});
</script>
<style scoped></style>
