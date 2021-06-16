<template>
  <div class="preview">
    <video autoplay :srcObject.prop="stream" muted="muted" />
    <span class="info" v-if="metadata">
      <ion-chip color="light" outline>
        <ion-avatar>
          <img :src="metadata?.picture" />
        </ion-avatar>
        <ion-label>
          {{ metadata?.name || metadata?.nickname }}
        </ion-label>
      </ion-chip>
    </span>
  </div>
</template>
<script lang="ts">
import {
  IonAvatar,
  IonChip,
  IonLabel
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: ["stream", "muted", "metadata"],
  setup(props) {
    console.log(props.metadata)

    return {
      ops: 4,
    };
  }
});
</script>
<style>
video {
  height: 300px;
  width: 400px;
  object-fit: cover;
}
.preview {
  position: relative;
  margin: 8px;
  background: #222428;
  display: flex;
}
.info {
  position: absolute;
  margin: 8px;
  left: 0;
  bottom: 0;
}
</style>
