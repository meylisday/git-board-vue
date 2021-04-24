<template>
  <ion-content class="ion-padding">
    <ion-list lines="none">
      <ion-item button @click="logout"><ion-label>Log Out</ion-label></ion-item>
    </ion-list>
  </ion-content>
</template>
<script lang="ts">
import { VueAuth } from "@/auth";
import { IonContent, IonItem, IonList, IonLabel } from "@ionic/vue";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "UserPopover",
  components: { IonContent, IonLabel, IonItem, IonList },
  setup(props, { emit }) {
    const auth = inject<VueAuth>("auth");

    const logout = () => {
      auth?.logout({
        returnTo: `${window.location.origin}/signin`
      });
    };
    return {
      logout
    };
  }
});
</script>
