<template>
  <ion-page>
    <ion-content>
      <div class="text-alignt-end">
        <ion-button
          expand="expand"
          color="primary"
          class="show-modal-button"
          @click="showModal"
          >Add task</ion-button
        >
      </div>
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
              class="column overflow"
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
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import Task from "@/components/Task.vue";
import {
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonPage,
  IonContent
} from "@ionic/vue";
import Modal from "@/components/AddTaskModal.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    draggable,
    Task,
    IonCol,
    IonGrid,
    IonRow,
    Modal,
    IonButton,
    IonPage,
    IonContent
  },
  setup(props) {
    const store = useStore();
    const isModalVisible = ref(false);
    const route = useRoute();
    const { projectId } = route.params;

    onMounted(() => {
      store.dispatch("fetchTasks", projectId);
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

    return {
      columns,
      updateStatus,
      isModalVisible,
      showModal,
      closeModal,
      projectId
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
.text-alignt-end {
  text-align: right;
}
.ion-page {
  justify-content: unset;
}
</style>
