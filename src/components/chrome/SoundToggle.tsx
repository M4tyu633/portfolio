"use client";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/lib/sound";
import { soundtrack } from "@/content/music";

export default function SoundToggle() {
  const music = useSound();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const settingsButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        settingsButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <div className="music-controls" ref={root}>
      <button
        className="music-toggle"
        type="button"
        onClick={music.toggle}
        aria-pressed={music.enabled}
        aria-label={
          music.enabled
            ? "Pause music"
            : music.loading
              ? "Cancel music loading"
              : "Play music"
        }
        title={music.error ?? (music.enabled ? "Pause music" : "Play music")}
      >
        <span
          className="music-bars"
          data-playing={music.enabled}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          {music.loading ? "Loading" : music.enabled ? "Music on" : "Music off"}
        </span>
      </button>
      <button
        ref={settingsButton}
        className="music-settings-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="music-settings"
        aria-label="Music settings"
      >
        <span aria-hidden="true">⌄</span>
      </button>
      <div id="music-settings" className="music-panel" hidden={!open}>
        <div className="music-panel-heading">
          <span>THE SOUNDTRACK</span>
          <span>{music.enabled ? "PLAYING" : "PAUSED"}</span>
        </div>
        <strong>{soundtrack.title}</strong>
        <p>{soundtrack.artist}</p>
        <label htmlFor="music-volume">
          Volume <span>{Math.round(music.volume * 100)}%</span>
        </label>
        <input
          id="music-volume"
          type="range"
          min="0"
          max="100"
          value={Math.round(music.volume * 100)}
          onChange={(event) =>
            music.setVolume(Number(event.target.value) / 100)
          }
          aria-label="Music volume"
        />
        <label className="music-effects">
          <input
            type="checkbox"
            checked={music.effects}
            onChange={(event) => music.setEffects(event.target.checked)}
          />
          Original game interface sounds
        </label>
        <p className="music-panel-note">
          Music stays with you between pages and fades behind project audio.
        </p>
        {music.error ? (
          <p className="music-error" role="status">
            {music.error}
          </p>
        ) : null}
        <a href={soundtrack.source} target="_blank" rel="noopener noreferrer">
          Music by Scott Buckley ↗
        </a>
        <a
          href={soundtrack.license}
          target="_blank"
          rel="noopener noreferrer"
          className="music-license"
        >
          CC BY 4.0 · loudness adjusted
        </a>
      </div>
    </div>
  );
}
