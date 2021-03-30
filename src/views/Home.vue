<template>
  <ion-page>
    <ion-button
      expand="expand"
      color="primary"
      class="show-modal-button"
      @click="showModal"
      >Add task</ion-button
    >
    <ion-grid>
      <ion-row class="add-task-button">
        <Modal v-show="isModalVisible" @close="closeModal" />
      </ion-row>
      <ion-row>
        <ion-col size="12" size-md v-for="column in columns" :key="column.key">
          <h1>{{ column.key }}</h1>
          <draggable
            v-model="column.items"
            group="tasks"
            item-key="_id"
            class="column"
            @change="updateStatus($event, column.key)"
          >
            <template #item="{element}">
              <Task :entity="element" />
            </template>
          </draggable>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
// import { columns as defaultColumns } from "@/mock/tasks";
import Task from "@/components/Task.vue";
import { IonCol, IonGrid, IonRow, IonButton, IonPage } from "@ionic/vue";
import Modal from "@/components/AddTaskModal.vue";

export default defineComponent({
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
  setup() {
    const store = useStore();
    const isModalVisible = ref(false);
    onMounted(() => {
      store.dispatch("fetchTasks");
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
</style>
