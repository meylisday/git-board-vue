<template>
  <ion-card>
    <ion-card-header class="flex">
      <ion-card-title>{{ room.title }}</ion-card-title>
    </ion-card-header>

    <ion-card-content class="content">
      <ion-icon
        :icon="peopleOutline"
        size="large"
        class="camera-icon"
        color="dark"
      ></ion-icon>
      <div>
        <ion-button expand="expand" color="dark" @click="joinRoom(room._id)">
          Join
        </ion-button>
        <ion-button
          expand="expand"
          color="danger"
          @click="deleteRoom(room._id)"
        >
          Delete
        </ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonIcon,
  IonButton,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCard
} from "@ionic/vue";
import router from "@/router";
import { peopleOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  props: ["room"],
  components: {
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const { projectId } = route.params;
    const deleteRoom = async (id: string) => {
      await store.dispatch("deleteRoomAction", {
        projectId: projectId,
        roomId: id
      });
      await store.dispatch("fetchRooms", { projectId: projectId });
    };
    const joinRoom = async (id: string) => {
      router.push(`/project/${projectId}/rooms/${id}/call`);
    };
    return {
      joinRoom,
      deleteRoom,
      peopleOutline
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
.camera-icon {
  height: 10rem;
  width: 10rem;
}
.my-custom-class {
  position: absolute;
  right: 0;
  top: 0;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
