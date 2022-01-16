<template>

  <ion-app class="app">

    <div class="router-wrapper">
      <ion-router-outlet />
      <div id="teleport-target"></div>
    </div>
    
  </ion-app>

</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
<style>
:root {
  --ion-color-main-theme: #62487b;
}
.ion-color-main-theme {
  --ion-color-base: var(--ion-color-main-theme);
}
.router-wrapper {
  position: relative;
  height: 100%;
}
.app {
  padding: 1rem;
}
#teleport-target {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  box-sizing: border-box;
  pointer-events: none;
  height: 100%;
}
</style>
