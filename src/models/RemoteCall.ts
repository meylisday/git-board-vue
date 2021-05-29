import Peer, { MediaConnection } from "peerjs";

export const PEER_STREAM_OPENED = "stream-opened";
export const PEER_STREAM_CLOSED = "stream-closed";
export const PEER_OPENED = "peer-opened";
export const PEER_CLOSED = "peer-closed";

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

function once(callback: Function) {
  let isCalled = false;

  return (...args: any[]) => {
    if (!isCalled) {
      callback(...args);

      isCalled = true;
    }
  };
}

export type PeerEvent = {
  peerId?: string;
  stream?: MediaStream;
};

export class RemoteCall {
  private peers = new Map<string, MediaConnection>();
  private events: Record<string, Function> = {
    [PEER_STREAM_OPENED]: noop,
    [PEER_STREAM_CLOSED]: noop,
    [PEER_OPENED]: noop,
    [PEER_CLOSED]: noop
  };
  private websocket?: WebSocket;
  private stream?: MediaStream;
  private peer?: Peer;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async join(roomId: string) {
    // Try to get access to user's video/audio
    await this.initUserStream();

    // Listen for users to join provided room
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = event => {
      // Init peer-to-peer connection
      this.peer = new Peer();

      this.peer.on("open", (id: string) => {
        this.websocket?.send(
          JSON.stringify({ type: "join", roomId, peerId: id })
        );

        this.events[PEER_OPENED]({ peerId: id });
      });

      this.peer.on("call", (call: MediaConnection) => {
        call.answer(this.stream);
        call.on(
          "stream",
          once((remoteStream: MediaStream) => {
            this.events[PEER_STREAM_OPENED]({
              peerId: call.peer,
              stream: remoteStream
            });
          })
        );
      });

      this.peer.on("close", () => {
        this.stream?.getTracks().forEach(track => track.stop());
        this.websocket?.close();

        this.stream = undefined;
        this.websocket = undefined;

        this.events[PEER_CLOSED]();
      });
    };

    this.websocket.onmessage = async event => {
      const { type, peerId } = JSON.parse(event.data);

      if (type === "disconnected") {
        return this.handlePeerDisconnected(peerId);
      }

      if (type === "connected") {
        return this.handlePeerConnected(peerId);
      }
    };
  }

  leave() {
    this.peer?.destroy();
  }

  on(event: string, callback: Function) {
    if (typeof callback === "function") {
      this.events[event] = callback;
    }
  }

  getUserStream() {
    return this.stream;
  }

  private async initUserStream() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: devices.filter(({ kind }) => kind === "audioinput").length > 0,
        audio: devices.filter(({ kind }) => kind === "videoinput").length > 0
      });
    } catch (e) {
      this.stream = new MediaStream();
    }

    this.events[PEER_STREAM_OPENED]({ stream: this.stream });
  }

  private handlePeerDisconnected(peerId: string) {
    if (this.peers.has(peerId)) {
      this.peers.get(peerId)?.close();
      this.peers.delete(peerId);
    }
  }

  private async handlePeerConnected(peerId: string) {
    if (!this.peer || this.peer?.destroyed || !this.stream) {
      return;
    }

    const call = this.peer.call(peerId, this.stream);

    call.on(
      "stream",
      once((stream: MediaStream) => {
        this.events[PEER_STREAM_OPENED]({ peerId, stream });
      })
    );

    call.on("close", () => {
      this.events[PEER_STREAM_CLOSED]({ peerId });
    });

    this.peers.set(peerId, call);
  }
}
