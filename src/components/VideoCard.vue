<template>
  <video autoplay />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  props: ["stream"],
  setup() {
    const color = ref("teal");
    return {
      color
    };
  }
});
</script>
