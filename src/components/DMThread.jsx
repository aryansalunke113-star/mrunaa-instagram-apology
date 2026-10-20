import { useEffect, useRef, useState } from "react";
import { dm, person } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";

/**
 * The apology delivered as a DM that types itself out, message by message,
 * only once she has scrolled to it. Then she can reply with one of three
 * buttons — none of which asks her to forgive him.
 */
export default function DMThread({ onScrollTo }) {
  const [ref, shown] = useReveal({ threshold: 0.25 });
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [chosen, setChosen] = useState(null);
  const scrollerRef = useRef(null);

  // Play the thread out one message at a time.
  useEffect(() => {
    if (!shown) return;
    let cancelled = false;
    let i = 0;

    const tick = () => {
      if (cancelled) return;
      if (i >= dm.messages.length) {
        setTyping(false);
        return;
      }
      setTyping(true);
      const msg = dm.messages[i];
      const delay = typing ? 900 : Math.min(1500, 500 + msg.text.length * 11);
      setTimeout(() => {
        if (cancelled) return;
        setVisibleCount((n) => n + 1);
        i += 1;
        tick();
      }, delay);
    };

    const start = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [shown]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleCount, typing]);

  const choose = (r) => {
    setChosen(r);
    if (r.scrollTo) {
      setTimeout(() => onScrollTo?.(r.scrollTo), 700);
    }
  };

  return (
    <section
      ref={ref}
      id="dm"
      className={`dm${shown ? " dm--in" : ""}`}
      aria-label="Messages"
    >
      <div className="dm__phone">
        <div className="dm__bar">
          <div className="dm__barLeft">
            <img className="dm__avatar" src="photos/avatar.jpg" alt="" width="40" height="40" />
            <div>
              <p className="dm__name">{dm.headerName}</p>
              <p className="dm__note">{dm.headerNote}</p>
            </div>
          </div>
          <span className="dm__barIcon" aria-hidden="true">ⓘ</span>
        </div>

        <div className="dm__scroller" ref={scrollerRef}>
          {dm.messages.slice(0, visibleCount).map((m, i) => (
            <div className="bubble bubble--in" key={i} style={{ animationDelay: "0ms" }}>
              {m.text}
            </div>
          ))}

          {typing && visibleCount < dm.messages.length && (
            <div className="bubble bubble--in bubble--typing" aria-label="typing">
              <span /><span /><span />
            </div>
          )}

          {visibleCount >= dm.messages.length && (
            <p className="dm__seen">seen just now · {person.him.toLowerCase()}</p>
          )}
        </div>

        <div className="dm__replies">
          {dm.replies.map((r) => (
            <button
              type="button"
              key={r.id}
              className={`reply${chosen?.id === r.id ? " reply--on" : ""}`}
              onClick={() => choose(r)}
              disabled={visibleCount < dm.messages.length}
              aria-pressed={chosen?.id === r.id}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {chosen && (
        <div className="dm__after" role="status">
          <p className="dm__afterReply">“{chosen.reply}”</p>
          {chosen.followUp && <p className="dm__afterFollow">{chosen.followUp}</p>}
        </div>
      )}
    </section>
  );
}
