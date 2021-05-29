<template>
  <ion-page>
    <ion-content>
      <Modal
        v-show="isModalVisible"
        @close="closeModal"
        :projectId="projectId"
      />
      <div class="text-align-end">
        <ion-button
          expand="expand"
          color="primary"
          class="show-modal-button"
          @click="showModal"
          >Add room
        </ion-button>
      </div>
      <ion-list>
        <RoomsList
          class="width"
          v-for="room in rooms"
          :key="room._id"
          :room="room"
        ></RoomsList>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { IonButton, IonPage, IonContent, IonList } from "@ionic/vue";
import RoomsList from "@/components/RoomsList.vue";
import Modal from "@/components/AddRoomModal.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    IonButton,
    IonPage,
    IonContent,
    RoomsList,
    IonList,
    Modal,
  },
  setup(props) {
    const store = useStore();
    const isModalVisible = ref(false);
    const route = useRoute();
    const { projectId } = route.params;

    onMounted(() => {
      store.dispatch("fetchRooms", { projectId: projectId });
    });

    const rooms = computed(() => store.getters.getRooms);

    const showModal = () => {
      isModalVisible.value = true;
    };
    const closeModal = () => {
      isModalVisible.value = false;
    };
    return {
      isModalVisible,
      showModal,
      closeModal,
      projectId,
      rooms,
    };
  },
});
</script>
<style scoped>
.add-task-button {
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
}
.ion-page {
  justify-content: unset;
}
.text-align-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.modal-backdrop {
  background-color: transparent;
}
.search-width {
  width: 500px;
}
</style>
