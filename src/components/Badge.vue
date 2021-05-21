<template>
  <ion-badge color="primary">11</ion-badge>
</template>
<script lang="ts">
import { IonBadge } from "@ionic/vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    IonBadge
  },
  setup() {
    const color = ref("teal");
    return {
      color
    };
  }
});
</script>
