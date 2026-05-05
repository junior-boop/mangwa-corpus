const cache = new Map<string, Uint32Array>();

export async function decodeWaveform(audioUrl: string, barCount = 80): Promise<Uint32Array> {
  if (cache.has(audioUrl)) return cache.get(audioUrl)!;

  const response = await fetch(audioUrl);
  const arrayBuffer = await response.arrayBuffer();

  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  await audioContext.close();

  const channelData = audioBuffer.getChannelData(0); // Float32Array, valeurs -1..1
  const blockSize = Math.floor(channelData.length / barCount);

  // Calcul RMS par bloc pour une forme d'onde fidèle
  const rmsValues = new Float32Array(barCount);
  for (let i = 0; i < barCount; i++) {
    let sum = 0;
    const offset = i * blockSize;
    for (let j = 0; j < blockSize; j++) {
      const sample = channelData[offset + j];
      sum += sample * sample;
    }
    rmsValues[i] = Math.sqrt(sum / blockSize);
  }

  // Normalisation → Uint32Array (0..100)
  const max = Math.max(...rmsValues);
  const bars = new Uint32Array(barCount);
  for (let i = 0; i < barCount; i++) {
    bars[i] = max > 0 ? Math.round((rmsValues[i] / max) * 100) : 0;
  }

  cache.set(audioUrl, bars);
  return bars;
}

export function getCachedWaveform(audioUrl: string): Uint32Array | null {
  return cache.get(audioUrl) ?? null;
}
