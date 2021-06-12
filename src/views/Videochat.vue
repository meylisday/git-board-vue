<template>
  <ion-page>
    <ion-content>
      <div class="main-wrapper">
        <div class="user-camera-wrapper">
          <ion-button expand="expand" color="dark">Open Camera</ion-button>
          <ion-button expand="expand" color="dark" @click="handleStartCall"
            >Start call</ion-button
          >
          <ion-button expand="expand" color="dark">Answer call</ion-button>
          <video ref="localStream" autoplay muted></video>
        </div>
        <div class="remote-camera-wrapper">
          <video ref="remoteStream" autoplay></video>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { WebRTCInterface } from "@/firebase";

export default defineComponent({
  components: {
    IonPage,
    IonContent
  },
  setup() {
    const localStream = ref();
    const remoteStream = ref();
    const webRTCInterface = new WebRTCInterface();

    onMounted(() => {
      webRTCInterface.userVideo?.then(stream => {
        if (localStream.value) {
          localStream.value.srcObject = stream;
        }
      });

      const participantsStream = webRTCInterface.participantsVideo;

      if (remoteStream.value) {
        remoteStream.value.srcObject = participantsStream;
      }
    });

    const handleStartCall = async () => {
      console.log(await webRTCInterface.createOffer());
    };

    return {
      localStream,
      remoteStream,
      handleStartCall
    };
  }
});
</script>
<style scoped>
video {
  border: 1px black solid;
}
.user-camera-wrapper {
  width: 300px;
  display: flex;
  flex-direction: column;
}
.main-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.remote-camera-wrapper {
  width: 500px;
}
</style>
