import { AudioExtension } from 'agora-rte-extension'
import { AudioLoopbackProcessor } from './audio-loopback-processor'

export class AudioLoopbackExtension extends AudioExtension<AudioLoopbackProcessor>{
  protected _createProcessor(): AudioLoopbackProcessor {
    return new AudioLoopbackProcessor();
  }
}
