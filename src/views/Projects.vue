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
import {
  IonPage,
  IonButton,
  IonRow,
  IonSearchbar,
  IonToolbar
} from "@ionic/vue";

import Project from "@/components/Project.vue";
import Modal from "@/components/AddProjectModal.vue";

export default defineComponent({
  components: {
    Project,
    IonPage,
    Modal,
    IonButton,
    IonRow,
    IonSearchbar,
    IonToolbar
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

    const handleChange = (e:any) => {
      store.dispatch("fetchProjects", e.detail.value);
    };

    return {
      projects,
      isModalVisible,
      showModal,
      closeModal,
      selectedProject,
      handleEdit,
      handleChange
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
.text-align-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.search-width {
  width: 500px;
  --background: transparent;
}
</style>
