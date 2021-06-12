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
    <ion-content>
      <ion-text class="instruction">
        <ion-icon :icon="informationCircleOutline" color="primary" />
        <span>To change task's status grag-and-drop card from one column to another</span>
      </ion-text>
      <ion-grid class="width column">
        <ion-row class="add-task-button">
          <Modal
            v-show="isModalVisible"
            @close="closeModal"
            :projectId="projectId"
          />
        </ion-row>
        <ion-row class="column">
          <ion-col
            size="12"
            class="column"
            size-md
            v-for="column in columns"
            :key="column.key"
          >
            <h1 class="text-centered">{{ column.key }}</h1>
            <draggable
              v-model="column.items"
              group="tasks"
              item-key="_id"
              class="column overflow column-hover"
              @change="updateStatus($event, column.key)"
            >
              <template #item="{element}">
                <Task :entity="element" :projectId="projectId" />
              </template>
            </draggable>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { informationCircleOutline } from "ionicons/icons";
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import Task from "@/components/Task.vue";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonText,
  IonRow,
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
    IonGrid,
    IonIcon,
    IonText,
    IonRow,
    Modal,
    IonButton,
    IonPage,
    IonContent,
    IonSearchbar,
    IonToolbar
  },
  setup(props) {
    const store = useStore();
    const isModalVisible = ref(false);
    const route = useRoute();
    const { projectId } = route.params;

    onMounted(() => {
      store.dispatch("fetchTasks", { projectId: projectId });
    });

    const columns = computed(() => store.getters.getTasks);

    const updateStatus = ({ added }: any, status: string) => {
      if (added) {
        store.dispatch("updateTaskStatusAction", {
          projectId: projectId,
          taskId: added.element._id,
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
      informationCircleOutline
    };
  }
});
</script>
<style scoped>
.column {
  height: 100%;
}
.add-task-button {
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
}
.show-modal-button {
  width: 100px;
}
.modal-backdrop {
  background-color: transparent;
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
.instruction {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
}
.column-hover {
  background: rgba(0,0,0, 0.05);
  padding: 5px 0;
}
.column-hover:hover {
  background: rgba(0,0,0, 0.1);
}
</style>
