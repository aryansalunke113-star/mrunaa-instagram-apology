import { useCallback, useEffect, useMemo, useState } from "react";
import { finale, person } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";

const HEART_GLYPHS = ["🤍", "💗", "❤️", "🌸", "💕", "🌹"];

export default function Finale() {
  const [ref, shown] = useReveal({ threshold: 0.18 });
  const [answered, setAnswered] = useState(null);
  const [showerKey, setShowerKey] = useState(0);

  const shower = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        glyph: HEART_GLYPHS[i % HEART_GLYPHS.length],
        left: (i * 3.37 + (i % 5) * 7.1) % 100,
        delay: (i % 10) * 0.17,
        duration: 3.4 + ((i * 1.7) % 3),
        size: 16 + (i % 6) * 6,
        spin: ((i % 2 ? 1 : -1) * (120 + (i % 7) * 60)),
      })),
    []
  );

  const answer = useCallback((kind) => {
    setAnswered(kind);
    setShowerKey((k) => k + 1);
  }, []);

  // A quiet double-check that we never trap her in a modal or fill the screen.
  useEffect(() => {
    if (!answered) return;
    const t = setTimeout(() => setShowerKey((k) => k), 10);
    return () => clearTimeout(t);
  }, [answered]);

  const a = answered ? finale.answers[answered] : null;

  return (
    <section
      ref={ref}
      id="finale"
      className={`finale${shown ? " finale--in" : ""}${answered ? " finale--answered" : ""}`}
      aria-label="One more chance"
    >
      <div className="finale__inner">
        <p className="eyebrow eyebrow--center">{finale.eyebrow}</p>
        <h2 className="finale__heading">{finale.heading}</h2>

        <div className="finale__lines">
          {finale.lines.map((line) => (
            <p key={line.slice(0, 28)}>{line}</p>
          ))}
        </div>

        <div className="finale__question">
          <span className="finale__qLine" aria-hidden="true" />
          <p className="finale__q">{finale.question}</p>
          <span className="finale__qLine" aria-hidden="true" />
        </div>

        {!answered && (
          <div className="finale__buttons">
            <button type="button" className="btn btn--big btn--solid" onClick={() => answer("yes")}>
              {finale.buttons.yes}
            </button>
            <button type="button" className="btn btn--big btn--ghost" onClick={() => answer("time")}>
              {finale.buttons.time}
            </button>
          </div>
        )}

        {answered && (
          <div className="finale__answer" role="status" key={answered}>
            <h3 className="finale__answerTitle">{a.title}</h3>
            <p className="finale__answerBody">{a.body}</p>
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => setAnswered(null)}
            >
              change my answer
            </button>
          </div>
        )}

        <p className="finale__sign">
          <span className="finale__signLine" aria-hidden="true" />
          {finale.signOff}
          <span className="finale__signLine" aria-hidden="true" />
        </p>

        <p className="finale__foot">
          made for {person.her} · no backend, no database, just a page that should have
          been there all along
        </p>
      </div>

      {answered && (
        <div className="shower" key={showerKey} aria-hidden="true">
          {shower.map((s) => (
            <span
              key={s.id}
              className="shower__item"
              style={{
                left: `${s.left}%`,
                fontSize: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
                "--spin": `${s.spin}deg`,
              }}
            >
              {s.glyph}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
