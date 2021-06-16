<template>
  <nav class="header">
    <div class="links">
      <ion-button
        router-link="/"
        routerDirection="root"
        fill="clear"
        color="light"
      >
        Home
      </ion-button>

      <ion-icon
        v-if="project"
        :icon="chevronForwardOutline"
        class="action-icon"
        color="light"
        size="small"
      ></ion-icon>

      <ion-button fill="clear" color="light" disabled>
        {{ project?.title }}
      </ion-button>
    </div>
    <ion-chip @click="openPopover" color="light" outline>
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
import { inject, computed, defineComponent } from "vue";
import { useStore } from "vuex";
import {
  IonButton,
  IonAvatar,
  IonChip,
  IonIcon,
  popoverController,
  IonLabel
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import Popover from "./UserPopover.vue";

export default defineComponent({
  components: {
    IonButton,
    IonAvatar,
    IonChip,
    IonLabel,
    IonIcon
  },
  name: "Header",
  setup() {
    const auth = inject<VueAuth>("auth");
    const store = useStore();
    const project = computed(() => store.getters.getProject);

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
      project,
      auth,
      openPopover,
      chevronForwardOutline
    };
  }
});
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
.header-link {
  margin: 0 1rem;
  text-decoration: none;
  color: black;
}
.links {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
