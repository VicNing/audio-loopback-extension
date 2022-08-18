## API Report File for "audio-loopback-extension"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AudioExtension } from 'agora-rte-extension';
import { AudioProcessor } from 'agora-rte-extension';
import { IAudioProcessorContext } from 'agora-rte-extension';

// @public (undocumented)
export class AudioLoopbackExtension extends AudioExtension<AudioLoopbackProcessor> {
    // (undocumented)
    protected _createProcessor(): AudioLoopbackProcessor;
}

// @public (undocumented)
export class AudioLoopbackProcessor extends AudioProcessor {
    // (undocumented)
    name: string;
    // (undocumented)
    protected onEnableChange(enabled: boolean): void | Promise<void>;
    // (undocumented)
    protected onNode(audioNode: AudioNode, context: IAudioProcessorContext): Promise<void>;
    // (undocumented)
    protected onTrack(track: MediaStreamTrack, context: IAudioProcessorContext): Promise<void>;
    // (undocumented)
    protected onUnpiped(): void;
}

// (No @packageDocumentation comment for this package)

```