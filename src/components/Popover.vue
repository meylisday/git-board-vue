<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item button><ion-label>Go to Board</ion-label></ion-item>
      <ion-item button><ion-label>Edit project</ion-label></ion-item>
      <ion-item button
        ><ion-label color="danger">Delete project</ion-label></ion-item
      >
    </ion-list>
  </ion-content>
</template>
<script>
import { IonContent } from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Popover",
  components: { IonContent }
});
</script>
