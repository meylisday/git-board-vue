<template>
  <nav class="header">
    <ion-button router-link="/">Home</ion-button>
    <ion-button router-link="/projects">Go to detail</ion-button>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton } from "@ionic/vue";
export default defineComponent({
  components: {
    IonButton
  },
  name: "Header"
});
</script>

<style>
.header-link {
  margin: 0 1rem;
  text-decoration: none;
  color: black;
}
</style>
