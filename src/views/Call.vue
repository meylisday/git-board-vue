<template>
  <ion-page>
    <ion-content>
      <div class="main">
        <div class="controls">
          <ion-button expand="expand" @click="handleAudioToggle">
            <ion-icon
              :icon="isAudioMuted ? volumeMuteOutline : volumeHighOutline"
              size="small"
              class="action-icon"
            /><span class="margin-text">{{ isAudioMuted ? "Unmute" : "Mute" }}</span>
          </ion-button>

          <ion-button expand="expand" @click="handleVideoToggle">
            <ion-icon
              :icon="isVideoMuted ? videocamOffOutline : videocamOutline"
              size="small"
              class="action-icon"
            /><span class="margin-text">{{ isVideoMuted ? "Off" : "On" }}</span>
          </ion-button>
        </div>
        <div class="video-grid">
          <img :src="$auth.user.picture" />
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
import { defineComponent, ref, reactive, onUnmounted } from "vue";
import {
  volumeMuteOutline,
  volumeHighOutline,
  videocamOutline,
  videocamOffOutline,
} from "ionicons/icons";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
import {
  RemoteCall,
  PEER_OPENED,
  PEER_STREAM_OPENED,
  PEER_STREAM_CLOSED,
  PeerEvent,
} from "@/models/RemoteCall";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
  },
  setup() {
    const route = useRoute();
    const { roomId } = route.params;
    const isAudioMuted = ref(true);
    const isVideoMuted = ref(false);
    const localVideo = ref();
    const videos = reactive(new Map());

    const call = new RemoteCall(process.env.VUE_APP_BASE_WS_URL);

    call.join(roomId as string);

    call.on(PEER_OPENED, async () => {
      const stream = await call.getUserStream();

      if (!stream) {
        return;
      }

      isAudioMuted.value = !stream.getAudioTracks()[0].enabled;
      isVideoMuted.value = !stream.getVideoTracks()[0].enabled;
    });

    call.on(PEER_STREAM_OPENED, ({ peerId, stream }: PeerEvent) => {
      if (peerId) {
        videos.set(peerId, stream);
      } else {
        const video = localVideo.value;

        video.srcObject = stream;
      }
    });

    call.on(PEER_STREAM_CLOSED, ({ peerId }: PeerEvent) => {
      if (videos.has(peerId)) {
        videos.delete(peerId);
      }
    });

    onUnmounted(() => {
      call.leave();

      videos.clear();
    });

    const handleAudioToggle = async () => {
      const stream = await call.getUserStream();

      isAudioMuted.value = !isAudioMuted.value;

      if (stream) {
        stream.getAudioTracks()[0].enabled = !isAudioMuted.value;
      }
    };

    const handleVideoToggle = async () => {
      const stream = await call.getUserStream();

      isVideoMuted.value = !isVideoMuted.value;

      if (stream) {
        stream.getVideoTracks()[0].enabled = !isVideoMuted.value;
      }
    };

    return {
      localVideo,
      volumeMuteOutline,
      volumeHighOutline,
      videocamOutline,
      videocamOffOutline,
      handleAudioToggle,
      handleVideoToggle,
      isAudioMuted,
      isVideoMuted,
      videos,
    };
  },
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
