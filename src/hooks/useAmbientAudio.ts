"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.18;
const FADE_IN_MS = 1200;
const FADE_OUT_MS = 1000;

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number,
  onDone?: () => void,
) {
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    const eased = t * t * (3 - 2 * t);
    audio.volume = from + (to - from) * eased;
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      onDone?.();
    }
  };
  requestAnimationFrame(tick);
}

export function useAmbientAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "metadata";
      audio.volume = 0;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src]);

  const turnOn = useCallback(async () => {
    const audio = getAudio();
    setBlocked(false);
    fadingRef.current = true;
    try {
      if (audio.paused) {
        await audio.play();
      }
      setPlaying(true);
      fadeVolume(audio, audio.volume, TARGET_VOLUME, FADE_IN_MS, () => {
        fadingRef.current = false;
      });
    } catch {
      setBlocked(true);
      setPlaying(false);
      fadingRef.current = false;
      audio.pause();
      audio.volume = 0;
    }
  }, [getAudio]);

  const turnOff = useCallback(() => {
    const audio = getAudio();
    fadingRef.current = true;
    fadeVolume(audio, audio.volume, 0, FADE_OUT_MS, () => {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      fadingRef.current = false;
    });
  }, [getAudio]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  return { playing, blocked, turnOn, turnOff };
}
