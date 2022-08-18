import {AudioLoopbackProcessor} from "../src";
import AgoraRTC, {IRemoteAudioTrack} from 'rtc-sdk'

describe("loopback processor", function () {
  it("should work", async function () {
    const loopbackProcessor = new AudioLoopbackProcessor();


    const client = AgoraRTC.createClient({
      codec: "vp8",
      mode: "rtc"
    });

    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    client.on("user-published", async (user, mediaType) => {
      if (mediaType === "audio") {
        const track = await client.subscribe(user, mediaType) as IRemoteAudioTrack;

        if (mediaType === "audio") {
          (track).pipe(loopbackProcessor).pipe(track.processorDestination);
          track.play();
        }
      }
    })

    await client.join(
      "",
      "audio-loopback-test",
      null
    )

    await client.publish(localAudioTrack);

  })
});
