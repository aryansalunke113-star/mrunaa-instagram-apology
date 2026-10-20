import { music } from "../data/content.js";

/**
 * Music control. Deliberately a small, obvious pill in the corner rather than
 * anything that could feel like it hijacked the page. Never autoplays — the
 * song starts only on this tap.
 */
export default function MusicButton({ music: state }) {
  const { playing, supported, toggle } = state;

  if (!supported) return null;

  return (
    <div className="music">
      <button
        type="button"
        className={`music__btn${playing ? " music__btn--on" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={
          playing
            ? `Pause ${music.title} by ${music.artist}`
            : `Play ${music.title} by ${music.artist}`
        }
      >
        <span className="music__bars" aria-hidden="true">
          <span /><span /><span /><span />
        </span>
        <span className="music__label">{playing ? music.labelOn : music.labelOff}</span>
      </button>
      {!playing && (
        <span className="music__hint">
          {music.title} · {music.artist}
        </span>
      )}
    </div>
  );
}
