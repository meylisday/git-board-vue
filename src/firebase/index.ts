import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-DnVuNAhA3r-kpN7GHaX0fr4ZtocdR8M",
  authDomain: "git-board.firebaseapp.com",
  projectId: "git-board",
  storageBucket: "git-board.appspot.com",
  messagingSenderId: "473616740248",
  appId: "1:473616740248:web:8a20996dca5c01f083c5ed"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
    }
  ],
  iceCandidatePoolSize: 10
};

// 1. Setup media sources
export class WebRTCInterface {
  private localStream?: Promise<MediaStream>;
  private remoteStream: MediaStream;
  private perConnection: RTCPeerConnection;

  constructor() {
    this.localStream = navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    this.remoteStream = new MediaStream();
    this.perConnection = new RTCPeerConnection(servers);

    this.initMediaSources();
  }

  get userVideo() {
    return this.localStream;
  }

  get participantsVideo() {
    return this.remoteStream;
  }

  private async initMediaSources() {
    // Push tracks from local stream to peer connection
    const localStream = await this.localStream;

    localStream?.getTracks().forEach(track => {
      this.perConnection.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    this.perConnection.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        this.remoteStream.addTrack(track);
      });
    };
  }

  async createOffer() {
    try {
      const callDoc = firestore.collection("calls").doc();
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      console.log(7);

      const callId = callDoc.id;

      // Get candidates for caller, save to db
      this.perConnection.onicecandidate = event => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      // Create offer
      const offerDescription = await this.perConnection.createOffer();
      await this.perConnection.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type
      };

      await callDoc.set({ offer });

      // Listen for remote answer
      callDoc.onSnapshot(snapshot => {
        const data = snapshot.data();
        if (!this.perConnection.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          this.perConnection.setRemoteDescription(answerDescription);
        }
      });

      // When answered, add candidate to peer connection
      answerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            this.perConnection.addIceCandidate(candidate);
          }
        });
      });

      return callId;
    } catch (e) {
      console.log(e);
    }
  }

  async aceptOffer(callId: string) {
    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    this.perConnection.onicecandidate = event => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData?.offer;
    await this.perConnection.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answerDescription = await this.perConnection.createAnswer();
    await this.perConnection.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change);
        if (change.type === "added") {
          const data = change.doc.data();
          this.perConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }
}
