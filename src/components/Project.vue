<template>
  <ion-card>
    <ion-card-header class="flex">
      <ion-card-title>{{ project.title }}</ion-card-title>
      <ion-icon
        :icon="menu"
        class="action-icon"
        @click="openPopover"
        size="small"
      ></ion-icon>
    </ion-card-header>

    <ion-card-content>
      {{ project.description }}
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonButton,
  popoverController,
  IonIcon
} from "@ionic/vue";
import { create, menu } from "ionicons/icons";
import { defineComponent, ref } from "vue";
import Popover from "./Popover.vue";
import { useStore } from "vuex";
export default defineComponent({
  props: ["project"],
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonIcon
    // IonPopover,
    // Popover
  },
  setup(props, { emit }) {
    const store = useStore();
    const openPopover = async (ev: Event) => {
      const popover = await popoverController.create({
        component: Popover,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true
      });
      return popover.present();
    };

    return {
      create,
      openPopover,
      menu
      // updateTask,
      // showModal,
      // closeModal,
      // isModalVisible,
      // deleteTask
    };
  }
});
</script>

<style scoped>
.width {
  width: 20rem;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.action-icon {
  cursor: pointer;
}
.my-custom-class {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
