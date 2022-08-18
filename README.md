# audio-loopback-extension
## Introduction
An agora Web SDK extension which loops back audio through WebRTC PeerConnection to workaround [Chrome echo issues](https://bugs.chromium.org/p/chromium/issues/detail?id=687574).
## Usage
```javascript
import AgoraRTC from 'agora-rtc-sdk-ng'
import {AudioLoopbackExtension} from 'audio-loopback-extension'

async function main(){
  extension = new AudioLoopbackExtension();
  AgoraRTC.registerExtensions([extension]);
  
  //...join logic from Agora Web SDK
  
  client.on('user-published',async (user,mediaType)=>{
    if(mediaType === 'audio'){
      const remoteAudioTrack = await client.subscribe(user,mediaType);
      const loopbackProcessor = extension.createProcessor();
      
      remoteAudioTrack.pipe(loopbackProcessor).pipe(remoteAudioTrack.processorDestination);
    }
  });
}
```
if `audio-loopback-extension` is used along with other audio extensions, make sure `audio-loopback-processor` is last processor inside the processing pipeline.

In another words `audio-loopback-processor` **MUST** pipe to `remoteAudioTrack.processorDestination`.
```javascript
let audioProcessorA;
let audioLoopbackProcessor;

remoteAudioTrack.pipe(audioProcessorA).pipe(audioLoopbackProcessor).pipe(remoteAudioTrack.processorDestination);
```
