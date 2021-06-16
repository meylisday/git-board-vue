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
            <ion-title color="dark" v-if="project">Updating project</ion-title>
            <ion-title color="dark" v-else>Adding project</ion-title>
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
              <ion-textarea v-model="description"></ion-textarea>
            </ion-item>
            <ion-item>
              <ion-label>Select</ion-label>
              <ion-select multiple="true" v-model="selectedUsers">
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
          </slot>
        </section>

        <footer class="modal-footer">
          <ion-button
            type="button"
            color="dark"
            @click="handleClick"
            v-if="project"
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
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonTitle,
  IonTextarea,
  IonSelectOption,
  IonSelect
} from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: ["project"],
  components: {
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonTitle,
    IonTextarea,
    IonSelectOption,
    IonSelect
  },
  setup(props, { emit }) {
    const store = useStore();
    const title = ref(props.project?.title || "");
    const description = ref(props.project?.description || "");
    const users = computed(() => store.getters.getUsers);
    const selectedUsers = ref(props.project?.users || []);

    const close = () => {
      emit("close");
    };

    const addProject = async () => {
      if (description.value && title.value) {
        await store.dispatch("createProjectAction", {
          project: {
            title: title.value,
            description: description.value,
            users: selectedUsers.value
          }
        });
        await store.dispatch("fetchProjects");
        emit("close");
      }
    };

    const updateProject = async () => {
      if (description.value && title.value) {
        await store.dispatch("updateProjectAction", {
          project: {
            ...props.project,
            title: title.value,
            description: description.value,
            users: selectedUsers.value
          }
        });
        await store.dispatch("fetchProjects");
        emit("close");
      }
    };
    const handleClick = async () => {
      props.project ? updateProject() : addProject();
    };
    return {
      close,
      title,
      handleClick,
      description,
      users,
      selectedUsers
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
