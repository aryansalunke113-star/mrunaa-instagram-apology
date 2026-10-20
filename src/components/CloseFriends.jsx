import { closeFriends } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";

export default function CloseFriends() {
  const [ref, shown] = useReveal({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`cf${shown ? " cf--in" : ""}`}
      aria-label="Close friends"
    >
      <div className="cf__card">
        <div className="cf__glow" aria-hidden="true" />
        <p className="cf__eyebrow">{closeFriends.eyebrow}</p>

        <div className="cf__avatars" aria-hidden="true">
          <span className="cf__starRing">
            <img src="photos/avatar.jpg" alt="" width="88" height="88" className="cf__avatar" />
          </span>
        </div>

        <h2 className="cf__title">{closeFriends.title}</h2>
        <p className="cf__body">{closeFriends.body}</p>
        <p className="cf__note">
          <span aria-hidden="true">♥ </span>
          {closeFriends.note}
        </p>
      </div>
    </section>
  );
}
