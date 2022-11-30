import {AudioProcessor, IAudioProcessorContext} from "agora-rte-extension";
import {parse,print} from './sdp-parser.js'

export class AudioLoopbackProcessor extends AudioProcessor {
  public name: string = "AudioLoopbackProcessor";
  private loopbackSendPC?: RTCPeerConnection;
  private loopbackRecvPC?: RTCPeerConnection;
  private loopbackPromise?: Promise<MediaStreamTrack>;

  protected async onTrack(track: MediaStreamTrack, context: IAudioProcessorContext): Promise<void> {
    if (this.enabled) {
      const loobackTrack = await this.loopback(track);
      this.output(loobackTrack, context);
    } else {
      this.output(track, context);
    }
  }

  protected async onNode(audioNode: AudioNode, context: IAudioProcessorContext): Promise<void> {
    if (this.enabled) {
      const destNode = context.getAudioContext().createMediaStreamDestination();
      audioNode.connect(destNode);
      const sourceTrack = destNode.stream.getAudioTracks()[0];

      const loobackTrack = await this.loopback(sourceTrack);
      this.output(loobackTrack, context);
    } else {
      this.output(audioNode, context);
    }
  }

  protected onEnableChange(enabled: boolean): void | Promise<void> {
    if (this.inputNode && this.context) {
      this.onNode(this.inputNode, this.context);
    }

    if (this.inputTrack && this.context) {
      this.onTrack(this.inputTrack, this.context);
    }
  }

  private async loopback(track: MediaStreamTrack): Promise<MediaStreamTrack> {
    if (this.loopbackSendPC) {
      await this.loopbackSendPC.getSenders()[0].replaceTrack(track);
    }

    if (this.loopbackPromise) {
      return this.loopbackPromise;
    } else {
      this.loopbackPromise = new Promise<MediaStreamTrack>(async (resolve, reject) => {
        try {
          this.loopbackSendPC = new RTCPeerConnection();
          this.loopbackRecvPC = new RTCPeerConnection();

          this.loopbackSendPC.onicecandidate = (e) => {
            if (e.candidate && this.loopbackRecvPC) {
              this.loopbackRecvPC.addIceCandidate(e.candidate);
            }
          };
          this.loopbackRecvPC.onicecandidate = (e) => {
            if (e.candidate && this.loopbackSendPC) {
              this.loopbackSendPC.addIceCandidate(e.candidate);
            }
          };

          if (this.loopbackRecvPC) {
            this.loopbackRecvPC.ontrack = (e) => {
              resolve(e.track);
            };
          }

          this.loopbackSendPC.addTrack(track);

          const pcOffer = await this.loopbackSendPC.createOffer();
          const offerSDP = this.applyStereoInSDP(pcOffer.sdp!);

          await this.loopbackSendPC.setLocalDescription({type:'offer',sdp:offerSDP});
          await this.loopbackRecvPC.setRemoteDescription({type:'offer',sdp:offerSDP});

          const loopbackAnswer = await this.loopbackRecvPC.createAnswer();
          const answerSDP = this.applyStereoInSDP(loopbackAnswer.sdp!);

          await this.loopbackRecvPC.setLocalDescription({type:'answer',sdp:answerSDP});
          await this.loopbackSendPC.setRemoteDescription({type:'answer',sdp:answerSDP});
        } catch (e) {
          reject(e);
        }
      });

      return this.loopbackPromise;
    }
  }

  private applyStereoInSDP(sdp:string):string {
    const sessionDesc = parse(sdp);

    sessionDesc.mediaDescriptions.forEach(mediaDesc=>{
      if (mediaDesc.media.mediaType !== "audio") {
        return;
      }

      const opusPayloads = mediaDesc.attributes.payloads.filter(
        (payload) => payload.rtpMap?.encodingName.toLowerCase() === "opus"
      );

      opusPayloads.forEach((payload) => {
        if (!payload.fmtp) {
          payload.fmtp = { parameters: {} };
        }

        payload.fmtp.parameters["stereo"] = "1";
        payload.fmtp.parameters["sprop-stereo"] = "1";
      });

    });

    return print(sessionDesc);
  }

  protected onUnpiped(): void {
    if (this.loopbackRecvPC) {
      this.loopbackRecvPC.ontrack = null;
      this.loopbackRecvPC.onicecandidate = null;
      this.loopbackRecvPC.close();
      this.loopbackRecvPC = undefined;
    }

    if (this.loopbackSendPC) {
      this.loopbackSendPC.onicecandidate = null;
      this.loopbackSendPC.close();
      this.loopbackSendPC = undefined;
    }

    this.loopbackPromise = undefined;
  }
}
