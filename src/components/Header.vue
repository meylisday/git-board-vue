<template>
  <nav class="header">
    <ion-button router-link="/" routerDirection="root">Projects</ion-button>
    <ion-chip @click="openPopover">
      <ion-avatar>
        <img :src="$auth.user.picture" />
      </ion-avatar>
      <ion-label>
        {{ $auth.user?.given_name }} {{ $auth.user?.family_name }}
      </ion-label>
    </ion-chip>
  </nav>
</template>

<script lang="ts">
import { VueAuth } from "@/auth";
import { inject, defineComponent, onMounted } from "vue";
import {
  IonButton,
  IonAvatar,
  IonChip,
  popoverController,
  IonLabel
} from "@ionic/vue";
import Popover from "./UserPopover.vue";

export default defineComponent({
  components: {
    IonButton,
    IonAvatar,
    IonChip,
    IonLabel
  },
  name: "Header",
  setup() {
    const auth = inject<VueAuth>("auth");

    onMounted(async () => {
      const result = await fetch("http://localhost:3000/api/user");
      const data = await result.json();
    });

    const openPopover = async (ev: Event) => {
      const popover = await popoverController.create({
        component: Popover,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true,
        componentProps: {
          onClick: () => {
            popover.dismiss();
          }
        }
      });
      return popover.present();
    };

    return {
      auth,
      openPopover
    };
  }
});
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-link {
  margin: 0 1rem;
  text-decoration: none;
  color: black;
}
</style>
