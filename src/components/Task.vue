<template>
  <div class="width">
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      :task="entity"
      :projectId="projectId"
    />
    <ion-card>
      <ion-card-header class="flex">
        <ion-card-title>
          <span> {{ entity.slug }} </span>: {{ entity.title }}
        </ion-card-title>
        <ion-icon
          @click="updateTask"
          :icon="optionsOutline"
          size="large"
          class="action-icon"
          color="dark"
        />
        <ion-icon
          @click="deleteTask(entity._id)"
          name="close"
          size="large"
          class="action-icon"
          color="danger"
        ></ion-icon>
      </ion-card-header>

      <ion-card-content>
        <p>{{ entity.description }}</p>

        <hr />

        <div v-if="createdBy">
          <span>Created By:</span>
          <ion-chip color="dark" outline>
            <ion-avatar>
              <img :src="createdBy?.picture" />
            </ion-avatar>
            <ion-label>{{ createdBy?.name }}</ion-label>
          </ion-chip>
        </div>

        <div>
          <span>Assignee:</span>
          <ion-chip color="dark" outline v-if="assignee">
            <ion-avatar>
              <img :src="assignee?.picture" />
            </ion-avatar>
            <ion-label>{{ assignee?.name }}</ion-label>
          </ion-chip>
          <span v-else>Not assigned</span>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import {
  IonChip,
  IonAvatar,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonIcon
} from "@ionic/vue";
import { optionsOutline } from "ionicons/icons";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Modal from "@/components/AddTaskModal.vue";
export default defineComponent({
  props: ["entity", "projectId"],
  components: {
    IonChip,
    IonAvatar,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonIcon,
    Modal
  },
  setup(props, { emit }) {
    const store = useStore();
    const isModalVisible = ref(false);
    const assignedUsers = computed(() => store.getters.getAssignedUsers);

    const assignee = computed(() =>
      assignedUsers?.value.find(
        (user: any) => props.entity?.assignee === user.user_id
      )
    );

    const createdBy = computed(() =>
      assignedUsers?.value.find(
        (user: any) => props.entity?.createdBy === user.user_id
      )
    );

    const showModal = () => {
      isModalVisible.value = true;
    };
    const updateTask = () => {
      showModal();
    };
    const closeModal = () => {
      isModalVisible.value = false;
    };
    const deleteTask = async (id: string) => {
      await store.dispatch("deleteTaskAction", {
        projectId: props.projectId,
        taskId: id
      });
      await store.dispatch("fetchTasks", { projectId: props.projectId });
      emit("close");
    };
    return {
      optionsOutline,
      updateTask,
      showModal,
      closeModal,
      isModalVisible,
      deleteTask,
      assignee,
      createdBy
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
  align-items: center;
}
.action-icon {
  cursor: pointer;
}
.modal-backdrop {
  background-color: transparent;
}
</style>
