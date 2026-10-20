import { useEffect, useState } from "react";
import { highlights, person } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";

/**
 * The promises, told as Instagram story highlights she can tap through —
 * a genuine story viewer with segments, tap-left / tap-right, and keyboard control.
 */
export default function Highlights() {
  const [ref, shown] = useReveal({ threshold: 0.2 });
  const [openIdx, setOpenIdx] = useState(null);

  const close = () => setOpenIdx(null);
  const next = () => setOpenIdx((i) => (i === null ? null : i + 1 >= highlights.length ? null : i + 1));
  const prev = () => setOpenIdx((i) => (i === null ? null : Math.max(0, i - 1)));

  // Keyboard + scroll lock while the viewer is open.
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx]);

  return (
    <section
      ref={ref}
      id="highlights"
      className={`hi${shown ? " hi--in" : ""}`}
      aria-label="What I am actually going to do"
    >
      <p className="eyebrow eyebrow--center">what actually changes</p>
      <h2 className="hi__heading">Five things, in writing.</h2>
      <p className="hi__sub">Tap one. They're small on purpose — small is what's believable.</p>

      <div className="hi__row">
        {highlights.map((h, i) => (
          <button
            type="button"
            key={h.id}
            className="hi__item"
            onClick={() => setOpenIdx(i)}
            aria-label={`Open promise: ${h.title}`}
          >
            <span className="hi__ring">
              <span className="hi__inner">{h.label}</span>
            </span>
            <span className="hi__label">{h.title.replace(/\.$/, "")}</span>
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div className="viewer" role="dialog" aria-modal="true" aria-label={highlights[openIdx].title}>
          <div className="viewer__bar">
            {highlights.map((h, i) => (
              <span
                key={h.id}
                className={`viewer__seg${i < openIdx ? " viewer__seg--done" : ""}${i === openIdx ? " viewer__seg--on" : ""}`}
              />
            ))}
          </div>

          <div className="viewer__head">
            <img src="photos/avatar.jpg" alt="" width="30" height="30" className="viewer__avatar" />
            <span className="viewer__who">{person.him.toLowerCase()}</span>
            <button type="button" className="viewer__close" onClick={close} aria-label="Close">
              ✕
            </button>
          </div>

          <div className="viewer__card">
            <p className="viewer__count">
              {openIdx + 1} / {highlights.length}
            </p>
            <h3 className="viewer__title">{highlights[openIdx].title}</h3>
            <p className="viewer__body">{highlights[openIdx].body}</p>
            <div className="viewer__heart" aria-hidden="true">♥</div>
          </div>

          <div className="viewer__nav">
            <button type="button" className="viewer__navBtn" onClick={prev} disabled={openIdx === 0} aria-label="Previous">
              ‹
            </button>
            <button type="button" className="viewer__navBtn" onClick={next} aria-label="Next">
              {openIdx === highlights.length - 1 ? "done" : "›"}
            </button>
          </div>

          <button type="button" className="viewer__backdrop" onClick={close} aria-label="Close" tabIndex={-1} />
        </div>
      )}
    </section>
  );
}
