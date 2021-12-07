<template>
  <nav class="header">
    <div class="links">
      <div
        class="link"
        v-for="(breadcrumb, idx) in breadcrumbs"
        :key="breadcrumb.name"
      >
        <ion-button
          :router-link="breadcrumb.href"
          :disabled="idx === breadcrumbs.length - 1"
          routerDirection="root"
          fill="clear"
          color="light"
        >
          {{ breadcrumb.label }}
        </ion-button>

        <ion-icon
          v-if="idx !== breadcrumbs.length - 1"
          :icon="chevronForwardOutline"
          class="action-icon"
          color="light"
          size="small"
        ></ion-icon>
      </div>
    </div>
    <ion-chip @click="openPopover" color="light" outline>
      <ion-avatar>
        <img :src="$auth.user.picture" />
      </ion-avatar>
      <ion-label>
        {{ $auth.user?.nickname }}
      </ion-label>
    </ion-chip>
  </nav>
</template>

<script lang="ts">
import { VueAuth } from "@/auth";
import { inject, computed, defineComponent, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  IonButton,
  IonAvatar,
  IonChip,
  IonIcon,
  popoverController,
  IonLabel,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import Popover from "./UserPopover.vue";

export default defineComponent({
  components: {
    IonButton,
    IonAvatar,
    IonChip,
    IonLabel,
    IonIcon,
  },
  name: "Header",
  setup() {
    const auth = inject<VueAuth>("auth");
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      if (route.params.projectId) {
        store.dispatch("fetchProjectById", route.params.projectId);
      }
    });

    const project = computed(() => store.getters.getProject);

    watchEffect(() => {
      if (
        route.params.projectId &&
        (!project?.value || project.value._id !== route.params.projectId)
      ) {
        return store.dispatch("fetchProjectById", route.params.projectId);
      }
    });

    const breadcrumbs = computed(() => {
      const result: any = [
        {
          label: "Home",
          ...router.resolve({
            name: "GeneralGrid"
          })
        }
      ];

      if (project.value) {
        if (route.params.roomId) {
          result.push({
            label: `${project.value.title}'s Rooms`,
            ...router.resolve({
              name: "Rooms",
              params: { projectId: project.value._id }
            })
          });
          result.push({
            label: project.value?.rooms.find(
              (room: any) => room._id === route.params.roomId
            ).title,
            ...router.resolve({
              name: "Call",
              params: {
                projectId: project.value._id,
                roomId: route.params.roomId
              }
            })
          });
        } else {
          result.push({
            label: project.value.title,
            ...router.resolve({
              name: "Projects",
              params: { projectId: project.value._id }
            })
          });
        }
      }

      console.log(result);

      return result;
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
          },
        },
      });
      return popover.present();
    };

    return {
      project,
      breadcrumbs,
      openPopover,
      chevronForwardOutline,
    };
  },
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
}
.link {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
