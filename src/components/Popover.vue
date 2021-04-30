<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item button @click="openProject(project._id)">
        <ion-label>Go to Board</ion-label></ion-item
      >
      <ion-item button @click="updateProject">
        <ion-label>Edit project </ion-label>
      </ion-item>
      <ion-item button @click="deleteProject(project._id)"
        ><ion-label color="danger">Delete project</ion-label></ion-item
      >
    </ion-list>
  </ion-content>
</template>
<script lang="ts">
import { IonContent, IonItem, IonList, IonLabel } from "@ionic/vue";
import router from "@/router";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
// import Modal from "@/components/AddProjectModal.vue";

export default defineComponent({
  name: "Popover",
  props: ["project", "onClick", "onEdit"],
  emits: ["onEdit"],
  components: { IonContent, IonLabel, IonItem, IonList },
  setup(props) {
    const store = useStore();
    const isModalVisible = ref(false);
    const deleteProject = async (id: string) => {
      await store.dispatch("deleteProjectAction", id);
      await store.dispatch("fetchProjects");
      await props.onClick();
    };
    // const showModal = () => {
    //   isModalVisible.value = true;
    // };
    const updateProject = () => {
      props.onEdit(props.project);
    };

    // const closeModal = () => {
    //   isModalVisible.value = false;
    // };

    const openProject = (id: string) => {
      props.onClick();
      router.push(`/project/${id}`);
    };

    return {
      deleteProject,
      openProject,
      isModalVisible,
      updateProject
    };
  }
});
</script>
