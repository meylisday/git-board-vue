<template>
  <div id="app">
    <button type="button" class="btn" @click="showModal">
      Open Modal!
    </button>

    <Modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import Modal from "../components/AddTaskModal";

export default {
  name: "App",
  components: {
    Modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
