<template>
    <ion-page>
        <ion-content>
      <ion-button
        expand="expand"
        color="primary"
        class="show-modal-button"
        @click="showModal"
        >Add task</ion-button
      >
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
            <h1>{{ column.key }}</h1>
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
import { IonCol, IonGrid, IonRow, IonButton, IonPage } from "@ionic/vue";
import Modal from "@/components/AddTaskModal.vue";

export default defineComponent({
  props: ["projectId"], //projectId
  components: {
    draggable,
    Task,
    IonCol,
    IonGrid,
    IonRow,
    Modal,
    IonButton,
    IonPage
  },
  setup(props) {
    const store = useStore();
    const isModalVisible = ref(false);

    onMounted(() => {
      store.dispatch("fetchTasks", props.projectId);
    });

    const columns = computed(() => store.getters.getTasks);

    const updateStatus = ({ added }: any, status: string) => {
      if (added) {
        store.dispatch("updateTaskStatusAction", {
          id: added.element._id,
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
      closeModal
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
.overflow {
  /* overflow: auto; */
}
</style>
