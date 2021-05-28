<template>
  <ion-page>
    <ion-content>
      <div class="main">
        <div class="controls">
          <ion-button expand="expand" @click="handleAudioToggle">
            <ion-icon
              :icon="volumeMuteOutline"
              size="small"
              class="action-icon"
            /><span class="margin-text">Mute</span>
          </ion-button>

          <ion-button expand="expand">
            <ion-icon
              :icon="callOutline"
              size="small"
              class="action-icon"
            /><span class="margin-text">Call</span>
          </ion-button>
          <ion-button expand="expand">
            <ion-icon
              :icon="videocamOutline"
              size="small"
              class="action-icon"
            />
            <span class="margin-text">Video</span>
          </ion-button>
          <ion-button expand="expand">
            <ion-icon
              :icon="videocamOffOutline"
              size="small"
              class="action-icon"
            />
            <span class="margin-text">Video off</span>
          </ion-button>
        </div>
        <div class="video-grid">
          <video ref="localVideo" muted autoplay />
          <video
            v-for="[key, value] in videos"
            :key="key"
            :srcObject.prop="value"
            autoplay
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, ref, reactive } from "vue";
import {
  volumeMuteOutline,
  callOutline,
  videocamOutline,
  videocamOffOutline
} from "ionicons/icons";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
import {
  RemoteCall,
  PEER_STREAM_OPENED,
  PEER_STREAM_CLOSED,
  PeerEvent
} from "@/models/RemoteCall";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonIcon
  },
  setup() {
    const route = useRoute();
    const { roomId } = route.params;
    const localVideo = ref();
    const videos = reactive(new Map());

    const call = new RemoteCall("ws://localhost:3000");

    call.join(roomId as string);

    call.on(PEER_STREAM_OPENED, ({ peerId, stream }: PeerEvent) => {
      if (peerId) {
        videos.set(peerId, stream);
      } else {
        const video = localVideo.value;

        video.srcObject = stream;
      }
    });

    call.on(PEER_STREAM_CLOSED, ({ peerId }: PeerEvent) => {
      console.log(peerId);
      console.log(Array.from(videos));

      if (videos.has(peerId)) {
        videos.get(peerId).remove();
        videos.delete(peerId);
      }
    });

    const handleAudioToggle = async () => {
      const stream = await call.getUserStream();

      if (stream) {
        stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0]
          .enabled;
      }
    };

    const handleVideoToggle = async () => {
      const stream = await call.getUserStream();

      if (stream) {
        stream.getVideoTracks()[0].enabled = !stream?.getVideoTracks()[0]
          .enabled;
      }
    };

    return {
      localVideo,
      volumeMuteOutline,
      callOutline,
      videocamOutline,
      videocamOffOutline,
      handleAudioToggle,
      handleVideoToggle,
      videos
    };
  }
});
</script>
<style scoped>
video {
  height: 300px;
  width: 400px;
  object-fit: cover;
  padding: 8px;
}
.main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.margin-text {
  margin-left: 0.5rem;
}
.video-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  padding: 40px;
}
</style>
