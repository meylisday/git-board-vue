<template>
  <ion-page>
    <Header />
    <div class="router-wrapper">
      <ion-router-outlet />
    </div>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonRouterOutlet } from "@ionic/vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: {
    IonPage,
    Header,
    IonRouterOutlet
  },
  setup() {
    return {};
  }
});
</script>
<style scoped>
.router-wrapper {
  position: relative;
  height: 100%;
}
</style>
