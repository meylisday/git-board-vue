<template>
  <Teleport to="#teleport-target">
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
              <ion-title color="dark">Adding room</ion-title>
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
            </slot>
          </section>

          <footer class="modal-footer">
            <ion-button type="button" color="dark" @click="addRoom"
              >Create</ion-button
            >
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonTitle,
  IonIcon,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: ["projectId"],
  components: {
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonTitle,
    IonIcon,
  },
  setup(props, { emit }) {
    const store = useStore();
    const title = ref("");

    const close = () => {
      emit("close");
    };

    const addRoom = async () => {
      if (title.value) {
        await store.dispatch("createRoomAction", {
          projectId: props.projectId,
          room: {
            title: title.value,
          },
        });
        await store.dispatch("fetchRooms", { projectId: props.projectId });
        emit("close");
      }
    };
    return {
      close,
      title,
      addRoom,
    };
  },
});
</script>

<style>
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
