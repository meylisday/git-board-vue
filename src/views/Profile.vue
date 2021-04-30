<template>
  <ion-page class="profile-page">
    <h1>ijhghgjhg</h1>
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
    console.log(auth?.user);
    return {};
  }
});
</script>
<style scoped></style>
