import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The site's background music: a real recording, not a generated melody.
 *
 * "Can't Help Falling in Love" — Elvis Presley, served from /audio/song.m4a.
 *
 * Rules this hook keeps:
 *  - It NEVER autoplays. Browsers only allow audio to start from a real user
 *    gesture, so playback begins on the music button tap and nowhere else.
 *  - It loops, so the song carries the whole story without going quiet.
 *  - It fades in and out, so starting and stopping feel cinematic rather than
 *    like a switch being thrown.
 *  - It sits at a gentle volume, well under the story.
 *
 * The previous generative Web Audio arpeggio has been removed entirely, so the
 * two can never play over each other.
 */

// base: "./" in vite.config.js means BASE_URL is "./", so these resolve
// correctly whether the site is served from a domain root (Vercel) or a
// sub-folder (GitHub Pages).
//
// MP3 first: it is the most universally supported format on mobile browsers
// (iOS Safari, Android Chrome) and is served with a proper `audio/mpeg`
// content type. The m4a is kept as a fallback for anything that cannot play
// MP3 — the browser picks whichever it can actually decode.
const SONG_SOURCES = [
  `${import.meta.env.BASE_URL}audio/song.mp3`,
  `${import.meta.env.BASE_URL}audio/song.m4a`,
];

const TARGET_VOLUME = 0.35; // gentle — sits under the story
const FADE_IN_MS = 2600;
const FADE_OUT_MS = 900;
const FADE_STEP_MS = 40;

export default function useMusic() {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  // Build the audio element once, on mount.
  useEffect(() => {
    const el = new Audio();
    el.loop = true;
    el.preload = "metadata";
    el.volume = 0;
    el.setAttribute("playsinline", "");

    // Offer every source; the browser plays the first one it can decode.
    SONG_SOURCES.forEach((src) => {
      const source = document.createElement("source");
      source.src = src;
      source.type = src.endsWith(".mp3") ? "audio/mpeg" : "audio/mp4";
      el.appendChild(source);
    });
    el.load();

    const onError = () => setSupported(false);
    el.addEventListener("error", onError);

    audioRef.current = el;

    return () => {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
      el.removeEventListener("error", onError);
      el.pause();
      el.innerHTML = "";
      el.load();
      audioRef.current = null;
    };
  }, []);

  // Ramp the element's volume from where it is to `target` over `ms`.
  const fadeTo = useCallback((target, ms, done) => {
    const el = audioRef.current;
    if (!el) return;
    clearInterval(fadeRef.current);

    const from = el.volume;
    const steps = Math.max(1, Math.round(ms / FADE_STEP_MS));
    let i = 0;

    fadeRef.current = setInterval(() => {
      i += 1;
      const t = i / steps;
      const v = from + (target - from) * t;
      el.volume = Math.min(1, Math.max(0, v));
      if (i >= steps) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
        el.volume = Math.min(1, Math.max(0, target));
        if (done) done();
      }
    }, FADE_STEP_MS);
  }, []);

  const start = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    el.volume = 0;
    // Called synchronously inside the click handler, which is what mobile
    // browsers require before they will allow audio to play.
    const attempt = el.play();

    const begin = () => {
      setPlaying(true);
      fadeTo(TARGET_VOLUME, FADE_IN_MS);
    };

    if (attempt && typeof attempt.then === "function") {
      attempt.then(begin).catch(() => {
        // Blocked by the browser, or the file could not be loaded.
        setPlaying(false);
      });
    } else {
      begin();
    }
  }, [fadeTo]);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setPlaying(false);
    fadeTo(0, FADE_OUT_MS, () => el.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  return { playing, supported, toggle };
}
