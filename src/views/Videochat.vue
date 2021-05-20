<template>
  <ion-page>
    <ion-content>
      <video ref="localStream"></video>
      <video ref="remoteStream"></video>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { WebRTCInterface } from "@/firebase";

export default defineComponent({
  components: {
    IonPage,
    IonContent
  },
  setup(props) {
    const localStream = ref();
    const remoteStream = ref();
    const webRTCInterface = new WebRTCInterface();

    onMounted(() => {
      webRTCInterface.userVideo?.then(stream => {
        console.log(localStream.value);
        if (localStream.value) {
          localStream.value.srcObject = stream;
        }
      });
    });

    return {
      localStream,
      remoteStream
    };
  }
});
</script>
<style scoped>
video {
  margin: 1rem;
  border: 1px black solid;
}
</style>
