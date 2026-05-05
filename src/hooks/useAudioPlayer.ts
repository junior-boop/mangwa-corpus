import { useState, useRef, useEffect, useCallback } from "react";

export interface AudioPlayerState {
  playing: boolean;
  progress: number; // 0..1
  duration: number; // secondes
  currentTime: number;
  toggle: () => void;
  seek: (ratio: number) => void;
}

export function useAudioPlayer(audioUrl: string): AudioPlayerState {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);   // ctx.currentTime au moment du play
  const offsetRef = useRef<number>(0);       // position en secondes dans le buffer

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const rafRef = useRef<number>(0);

  // Décodage unique du buffer
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      if (!cancelled) {
        bufferRef.current = decoded;
        setDuration(decoded.duration);
      }
    })();
    return () => {
      cancelled = true;
      sourceRef.current?.stop();
      ctxRef.current?.close();
    };
  }, [audioUrl]);

  // Boucle RAF pour mettre à jour la progression
  const tick = useCallback(() => {
    const ctx = ctxRef.current;
    const buf = bufferRef.current;
    if (!ctx || !buf) return;
    const elapsed = offsetRef.current + (ctx.currentTime - startTimeRef.current);
    const clamped = Math.min(elapsed, buf.duration);
    setCurrentTime(clamped);
    setProgress(clamped / buf.duration);
    if (clamped < buf.duration) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setPlaying(false);
      setProgress(1);
      offsetRef.current = 0;
    }
  }, []);

  const stopSource = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.onended = null;
      try { sourceRef.current.stop(); } catch (_) {}
      sourceRef.current = null;
    }
    cancelAnimationFrame(rafRef.current);
  }, []);

  const play = useCallback((fromOffset: number) => {
    const ctx = ctxRef.current;
    const buf = bufferRef.current;
    if (!ctx || !buf) return;

    stopSource();

    // Reprendre le contexte si suspendu (politique autoplay)
    if (ctx.state === "suspended") ctx.resume();

    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.connect(ctx.destination);
    source.start(0, fromOffset);
    sourceRef.current = source;
    startTimeRef.current = ctx.currentTime;
    offsetRef.current = fromOffset;

    source.onended = () => {
      // déclenché uniquement si on arrive à la fin naturellement
    };

    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [stopSource, tick]);

  const pause = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    // Sauvegarder la position avant d'arrêter
    offsetRef.current = offsetRef.current + (ctx.currentTime - startTimeRef.current);
    stopSource();
    setPlaying(false);
  }, [stopSource]);

  const toggle = useCallback(() => {
    if (playing) {
      pause();
    } else {
      play(offsetRef.current);
    }
  }, [playing, pause, play]);

  const seek = useCallback((ratio: number) => {
    const buf = bufferRef.current;
    if (!buf) return;
    const newOffset = ratio * buf.duration;
    if (playing) {
      play(newOffset);
    } else {
      offsetRef.current = newOffset;
      setProgress(ratio);
      setCurrentTime(newOffset);
    }
  }, [playing, play]);

  return { playing, progress, duration, currentTime, toggle, seek };
}
