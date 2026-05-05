import { useState, useEffect } from "react";
import { audioEngine } from "../utils/audioEngine";

export function useAudioEngine() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return audioEngine.subscribe(() => forceUpdate((n) => n + 1));
  }, []);

  return audioEngine;
}
