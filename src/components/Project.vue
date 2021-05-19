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
      <p v-if="project.tasks.length === 0">No tasks</p>
      <p v-else-if="project.tasks.length > 1">
        {{ project.tasks.length }} tasks
      </p>
      <p v-else>Have 1 task</p>
    </ion-card-content>
    <div>
      <ion-chip v-for="(user, index) in users" :key="index">
        <ion-avatar>
          <img :src="user.picture" />
        </ion-avatar>
        <ion-label>{{ user.name }}</ion-label>
      </ion-chip>
    </div>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  popoverController,
  IonIcon,
  IonAvatar,
  IonChip,
  IonLabel
} from "@ionic/vue";
import { create, menu } from "ionicons/icons";
import { computed, defineComponent, onMounted, ref } from "vue";
import Popover from "./Popover.vue";
import { useStore } from "vuex";
export default defineComponent({
  props: ["project"],
  emits: ["onEdit"],
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonIcon,
    IonAvatar,
    IonChip,
    IonLabel
  },
  setup(props, { emit }) {
    const store = useStore();
    const allUsers = computed(() => store.getters.getUsers);

    const users = computed(() =>
      allUsers?.value.filter((user: any) =>
        props.project?.users?.includes(user.user_id)
      )
    );

    onMounted(() => {
      store.dispatch("fetchUsers");
    });

    const openPopover = async (ev: Event) => {
      const popover = await popoverController.create({
        component: Popover,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true,
        componentProps: {
          project: props.project,
          onClick: () => {
            popover.dismiss();
          },
          onEdit: (project: any) => {
            emit("onEdit", project);
            popover.dismiss();
          }
        }
      });
      return popover.present();
    };

    return {
      create,
      openPopover,
      menu,
      users
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
