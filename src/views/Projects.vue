<template>
  <ion-page>
    <div class="text-alignt-end">
      <ion-button
        expand="expand"
        color="primary"
        class="show-modal-button"
        @click="showModal"
        >Add project</ion-button
      >
    </div>
    <ion-row class="add-project-button">
      <Modal
        v-if="isModalVisible"
        @close="closeModal"
        :project="selectedProject"
      />
    </ion-row>
    <div class="home">
      <Project
        class="width"
        v-for="project in projects"
        :key="project._id"
        :project="project"
        @onEdit="handleEdit"
      ></Project>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { IonPage, IonButton, IonRow } from "@ionic/vue";

import Project from "@/components/Project.vue";
import Modal from "@/components/AddProjectModal.vue";

export default defineComponent({
  components: {
    Project,
    IonPage,
    Modal,
    IonButton,
    IonRow
  },
  setup() {
    const store = useStore();
    const isModalVisible = ref(false);
    const selectedProject = ref(null);

    onMounted(() => {
      store.dispatch("fetchProjects");
    });

    const projects = computed(() => store.getters.getProjects);

    const showModal = () => {
      isModalVisible.value = true;
      selectedProject.value = null;
    };
    const handleEdit = (project: any) => {
      isModalVisible.value = true;
      selectedProject.value = project;
    };
    const closeModal = () => {
      isModalVisible.value = false;
      selectedProject.value = null;
    };

    return {
      projects,
      isModalVisible,
      showModal,
      closeModal,
      selectedProject,
      handleEdit
    };
  }
});
</script>
<style scoped>
.home {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.column {
  height: 100%;
}
.add-task-button {
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
}
.ion-page {
  justify-content: unset;
}
.text-alignt-end {
  text-align: right;
}
.modal-backdrop {
  background-color: transparent;
}
</style>
