<template>
  <ion-page>
    <ion-content>
      <div class="main">
        <div class="video-grid">
          <VideoCard muted="true" :stream="localVideo" :metadata="{ picture: $auth.user?.picture, name: 'You' }"/>

          <VideoCard
            v-for="[key, value] in connectedUsers"
            :key="key"
            :stream="value.stream"
            :metadata="value.metadata"
          />
        </div>
        <div class="controls">
          <ion-button
            expand="expand"
            @click="handleAudioToggle"
            fill="clear"
            color="light"
          >
            <ion-icon
              :icon="isAudioMuted ? volumeMuteOutline : volumeHighOutline"
              size="small"
              class="action-icon"
            /><span class="margin-text">{{ isAudioMuted ? "Unmute" : "Mute" }}</span>
          </ion-button>

          <ion-button
            expand="expand"
            @click="handleVideoToggle"
            fill="clear"
            color="light"
          >
            <ion-icon
              :icon="isVideoMuted ? videocamOffOutline : videocamOutline"
              size="small"
              class="action-icon"
            /><span class="margin-text">{{ isVideoMuted ? "Off" : "On" }}</span>
          </ion-button>
          <ion-button color="danger" expand="expand" @click="handleLeaveRoom">
            Hang Up
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { inject, defineComponent, ref, reactive, onUnmounted } from "vue";
import {
  volumeMuteOutline,
  volumeHighOutline,
  videocamOutline,
  videocamOffOutline,
} from "ionicons/icons";
import router from "@/router";
import { VueAuth } from "@/auth";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
import {
  RemoteCall,
  PEER_OPENED,
  PEER_STREAM_OPENED,
  PEER_STREAM_CLOSED,
  PeerEvent,
} from "@/models/RemoteCall";
import VideoCard from "@/components/VideoCard.vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    VideoCard,
  },
  setup() {
    const auth = inject<VueAuth>("auth");
    const route = useRoute();
    const { projectId, roomId } = route.params;
    const isAudioMuted = ref(true);
    const isVideoMuted = ref(false);
    const localVideo = ref();
    const connectedUsers = reactive(new Map());

    const call = new RemoteCall(process.env.VUE_APP_BASE_WS_URL, auth?.user);

    call.join(roomId as string);

    call.on(PEER_OPENED, async () => {
      const stream = await call.getUserStream();

      if (!stream) {
        return;
      }

      stream.getAudioTracks()[0].enabled = false

      isAudioMuted.value = !stream.getAudioTracks()[0].enabled;
      isVideoMuted.value = !stream.getVideoTracks()[0].enabled;
    });

    call.on(PEER_STREAM_CLOSED, ({ peerId }: PeerEvent) => {
      if (connectedUsers.has(peerId)) {
        connectedUsers.delete(peerId);
      }
    });

    call.on(PEER_STREAM_OPENED, ({ peerId, stream, metadata }: PeerEvent) => {
      if (peerId) {
        connectedUsers.set(peerId, { stream, metadata });
      } else {
        localVideo.value = stream;
      }
    });

    call.on(PEER_STREAM_CLOSED, ({ peerId }: PeerEvent) => {
      if (connectedUsers.has(peerId)) {
        connectedUsers.delete(peerId);
      }
    });

    onUnmounted(() => {
      call.leave();

      connectedUsers.clear();
    });

    const handleLeaveRoom = async (id: string) => {
      router.replace(`/project/${projectId}/rooms`);
    }

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
      handleLeaveRoom,
      isAudioMuted,
      isVideoMuted,
      connectedUsers,
    };
  },
});
</script>
<style scoped>
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
.controls {
  background: #222428;
  border-radius: 5px;
  padding: 5px;
}
</style>
