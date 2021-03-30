<template>
  <ion-app class="app">
    <Header />
    <div class="router-wrapper">
      <ion-router-outlet />
    </div>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Header
  }
});
</script>
<style scoped>
.router-wrapper {
  position: relative;
  height: 100%;
}
.app {
  padding: 1rem;
}
</style>
