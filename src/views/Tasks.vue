<template>
  <ion-page>
    <div class="text-align-end">
      <ion-toolbar class="search-width">
        <ion-searchbar @ionChange="handleChange"></ion-searchbar>
      </ion-toolbar>
      <ion-button
        expand="expand"
        color="dark"
        class="show-modal-button"
        @click="showModal"
        >Add task</ion-button
      >
    </div>
    <ion-content class="content">
      <ion-toast
        :is-open="isOpenRef"
        color="warning"
        message="To change task's status grag-and-drop card from one column to another"
        :duration="5000"
        @didDismiss="setOpen(false)"
      >
      </ion-toast>
      <Modal v-if="isModalVisible" @close="closeModal" :projectId="projectId" />
      <ion-row>
        <ion-col size="12" size-md v-for="column in columns" :key="column.key">
          <ion-text color="light">
            <h1 class="text-centered">{{ column.key }}</h1>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col
          size="12"
          size-md
          class="column-hover"
          v-for="column in columns"
          :key="column.key"
        >
          <div class="add-column-item" @click="showModal">+</div>
          <draggable
            v-model="column.items"
            group="tasks"
            item-key="_id"
            class="draggable"
            @change="updateStatus($event, column.key)"
          >
            <template #item="{element}">
              <Task :entity="element" :projectId="projectId" />
            </template>
          </draggable>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { informationCircleOutline } from "ionicons/icons";
import { defineComponent, computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import Task from "@/components/Task.vue";
import {
  IonText,
  IonCol,
  IonGrid,
  IonRow,
  IonToast,
  IonButton,
  IonPage,
  IonContent,
  IonSearchbar,
  IonToolbar
} from "@ionic/vue";
import Modal from "@/components/AddTaskModal.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    draggable,
    Task,
    IonCol,
    IonText,
    // IonGrid,
    IonRow,
    Modal,
    IonButton,
    IonPage,
    IonContent,
    IonSearchbar,
    IonToolbar,
    IonToast
  },
  setup(props) {
    const store = useStore();
    const isModalVisible = ref(false);
    const route = useRoute();
    const { projectId } = route.params;
    const isOpenRef = ref(true);

    const setOpen = (state: boolean) => (isOpenRef.value = state);

    onMounted(() => {
      store.dispatch("fetchAssignedUsersAction", projectId);
      store.dispatch("fetchProjectById", projectId);
      store.dispatch("fetchTasks", { projectId: projectId });
    });

    onUnmounted(() => {
      store.dispatch("clearProject");
    });

    const columns = computed(() => store.getters.getTasks);

    const updateStatus = ({ added }: any, status: string) => {
      if (added) {
        store.dispatch("updateTaskStatusAction", {
          projectId: projectId,
          taskId: added.element._id,
          order: added?.newIndex || 0,
          status
        });
      }
    };

    const showModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const handleChange = (e: any) => {
      store.dispatch("fetchTasks", {
        projectId: projectId,
        search: e.detail.value
      });
    };

    return {
      columns,
      updateStatus,
      isModalVisible,
      showModal,
      closeModal,
      projectId,
      handleChange,
      informationCircleOutline,
      setOpen,
      isOpenRef
    };
  }
});
</script>
<style scoped>
.content {
  --background: transparent;
}
.add-task-button {
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
}
.show-modal-button {
  width: 100px;
}
.width {
  width: 100%;
}
.text-centered {
  text-align: center;
  text-transform: capitalize;
}
.text-align-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.ion-page {
  justify-content: unset;
}
.search-width {
  width: 500px;
  --background: transparent;
}
.column-hover {
  width: 20rem;
  background: rgba(0, 0, 0, 0.05);
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.column-hover:hover {
  background: rgba(0, 0, 0, 0.1);
}
.add-column-item {
  font-size: 76px;
  text-align: center;
  opacity: 0.5;
  bottom: 0;
  cursor: pointer;
}
.draggable {
  height: 100%;
  padding-top: 0;
  width: 100%;
}
</style>
