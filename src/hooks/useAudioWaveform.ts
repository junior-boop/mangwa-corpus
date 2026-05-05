import { useState, useEffect } from "react";
import { decodeWaveform, getCachedWaveform } from "../utils/audioWaveform";

interface WaveformState {
  bars: Uint32Array | null;
  loading: boolean;
  error: string | null;
}

export function useAudioWaveform(audioUrl: string, barCount = 80): WaveformState {
  const [state, setState] = useState<WaveformState>(() => ({
    bars: getCachedWaveform(audioUrl),
    loading: !getCachedWaveform(audioUrl),
    error: null,
  }));

  useEffect(() => {
    if (getCachedWaveform(audioUrl)) return;

    setState({ bars: null, loading: true, error: null });

    decodeWaveform(audioUrl, barCount)
      .then((bars) => setState({ bars, loading: false, error: null }))
      .catch((err) => setState({ bars: null, loading: false, error: String(err) }));
  }, [audioUrl, barCount]);

  return state;
}
