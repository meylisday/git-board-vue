<template>
  <ion-item>
    <ion-label>{{ room.title }}</ion-label>
    <ion-button expand="expand" color="dark" @click="joinRoom(room._id)"
      >Join</ion-button
    >
    <ion-button expand="expand" color="danger" @click="deleteRoom(room._id)">
      Delete
    </ion-button>
  </ion-item>
</template>

<script lang="ts">
import { IonLabel, IonItem, IonButton } from "@ionic/vue";
import router from "@/router";
import { create, menu } from "ionicons/icons";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  props: ["room"],
  components: {
    IonLabel,
    IonItem,
    IonButton,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const { projectId } = route.params;
    const deleteRoom = async (id: string) => {
      await store.dispatch("deleteRoomAction", {
        projectId: projectId,
        roomId: id,
      });
      await store.dispatch("fetchRooms", { projectId: projectId });
    };
    const joinRoom = async (id: string) => {
      router.push(`/project/${projectId}/rooms/${id}/call`);
    };
    return {
      create,
      menu,
      joinRoom,
      deleteRoom,
    };
  },
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
