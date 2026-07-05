"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Theme } from "@/types";

export function AudioPlayer({ src, theme }: { src: string; theme: Theme }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    audioRef.current?.play().catch(() => {
      // Autoplay with sound blocked by browser — expected, user must unmute manually.
    });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
    }
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop muted={muted} />
      <button
        onClick={toggle}
        aria-label={muted ? "Unmute audio" : "Mute audio"}
        className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-transform hover:scale-105"
        style={{
          backgroundColor: theme.buttonBg,
          borderColor: theme.buttonBorder,
          color: theme.buttonText,
        }}
      >
        <Icon name={muted ? "volumeOff" : "volumeOn"} className="h-5 w-5" />
      </button>
    </>
  );
}
