<template>
  <ion-page>
    <Header />
    <div class="home">
      <Project
        class="width"
        v-for="project in projects"
        :key="project._id"
        :project="project"
      ></Project>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { IonPage } from "@ionic/vue";
import Header from "@/components/Header.vue";

import Project from "@/components/Project.vue";

export default defineComponent({
  components: {
    Project,
    IonPage,
    Header
  },
  setup() {
    const store = useStore();
    const isModalVisible = ref(false);

    onMounted(() => {
      store.dispatch("fetchProjects");
    });

    const projects = computed(() => store.getters.getProjects);

    return {
      projects,
      isModalVisible
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
</style>
