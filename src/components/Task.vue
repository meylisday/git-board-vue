<template>
  <div class="width">
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ entity.title }}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        Keep close to Nature's heart... and break clear away, once in awhile,
        climb a mountain or spend a week in the woods. Wash your spirit clean.
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader
} from "@ionic/vue";
import { warning } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["entity"],
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader
  },
  setup() {
    return { warning };
  }
});
</script>

<style scoped>
.width {
  width: 20rem;
}
</style>
