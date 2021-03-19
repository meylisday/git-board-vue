<template>
  <div class="home">
    <ion-grid>
      <ion-row>
        <ion-col size="12" size-md v-for="column in columns" :key="column.key">
          <h1>{{ column.key }}</h1>
          <draggable
            v-model="column.items"
            group="tasks"
            item-key="_id"
            class="column"
            @change="onUnpublishedChange($event, column.key)"
          >
            <template #item="{element}">
              <Task :entity="element" />
            </template>
          </draggable>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
// import { columns as defaultColumns } from "@/mock/tasks";
import Task from "@/components/Task.vue";
import { IonCol, IonGrid, IonRow } from "@ionic/vue";

export default defineComponent({
  components: {
    draggable,
    Task,
    IonCol,
    IonGrid,
    IonRow
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchTasks");
    });

    const columns = computed(() => store.getters.getTasks);

    const onUnpublishedChange = ({ added }: any, status: string) => {
      if (added) {
        store.dispatch("updateTask", { id: added.element._id, status });
      }
    };

    return {
      columns,
      onUnpublishedChange
    };
  }
});
</script>
<style scoped>
.column {
  height: 100%;
}
</style>
