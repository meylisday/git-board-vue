<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <ion-title color="dark" v-if="task">Updating task</ion-title>
            <ion-title color="dark" v-else>Adding task</ion-title>
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            <ion-icon
              name="close"
              class="action-icon"
              size="large"
              color="dark"
            ></ion-icon>
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <ion-item>
              <ion-label position="floating">Title</ion-label>
              <ion-input v-model="title"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Description</ion-label>
              <ion-textarea v-model="description" auto-grow="true" rows="5">
              </ion-textarea>
            </ion-item>
            <ion-list class="list-padding">
              <ion-item>
                <ion-label>Status</ion-label>
                <ion-select
                  :value="selectedOption"
                  @ionChange="selectedOption = $event.target.value"
                  ok-text="Okay"
                  cancel-text="Dismiss"
                >
                  <ion-select-option
                    v-for="(item, index) in listItems"
                    :key="index"
                    :value="selectedOption.value || item"
                    >{{ item }}</ion-select-option
                  >
                </ion-select>
              </ion-item>
            </ion-list>
            <ion-list class="list-padding">
              <ion-item>
                <ion-label>Assignee</ion-label>
                <ion-select v-model="selectedUser">
                  <ion-select-option
                    v-for="user in users"
                    :key="user.user_i"
                    :value="user.user_id"
                  >
                    <ion-label>
                      {{ user?.name }}
                    </ion-label>
                  </ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </slot>
        </section>

        <footer class="modal-footer">
          <ion-button
            type="button"
            color="dark"
            @click="handleClick"
            v-if="task"
            >Save</ion-button
          >
          <ion-button type="button" color="dark" @click="handleClick" v-else>
            Create</ion-button
          >
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { VueAuth } from "@/auth";
import {
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTitle,
  IonIcon
} from "@ionic/vue";
import { defineComponent, computed, inject, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: ["task", "projectId"],
  components: {
    IonInput,
    IonTextarea,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonTitle,
    IonIcon
  },
  setup(props, { emit }) {
    const auth = inject<VueAuth>("auth");
    const store = useStore();
    const listItems: Array<string> = ["backlog", "todo", "review", "done"];
    const selectedOption = ref(props.task?.status || "backlog");
    const title = ref(props.task?.title || "");
    const description = ref(props.task?.description || "");
    const users = computed(() => store.getters.getAssignedUsers);
    const selectedUser = ref(props.task?.assignee || "");
//console.log(props.task?.status);
    const close = () => {
      emit("close");
    };

    const addTask = async () => {
      if (selectedOption.value && title.value) {
        await store.dispatch("createTaskAction", {
          projectId: props.projectId,
          task: {
            title: title.value,
            description: description.value,
            status: selectedOption.value,
            assignee: selectedUser.value,
            createdBy: auth?.user?.sub
          }
        });
        await store.dispatch("fetchTasks", { projectId: props.projectId });
        emit("close");
      }
    };

    const updateTask = async () => {
      if (selectedOption.value && title.value) {
        await store.dispatch("updateTaskAction", {
          projectId: props.projectId,
          taskId: props.task._id,
          task: {
            ...props.task,
            title: title.value,
            description: description?.value,
            status: selectedOption.value,
            assignee: selectedUser.value
          }
        });
        await store.dispatch("fetchTasks", { projectId: props.projectId });
        emit("close");
      }
    };
    const handleClick = async () => {
      props.task ? updateTask() : addTask();
    };
    return {
      close,
      listItems,
      selectedOption,
      title,
      description,
      handleClick,
      users,
      selectedUser
    };
  }
});
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  color: #3880ff;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 2rem;
  width: 350px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #3880ff;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
