import { deletedPost } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";

/**
 * The confession, styled as the empty slot where a post used to be.
 * Deliberately the plainest block on the page — no decoration — because this
 * is the part she needs to actually be able to read.
 */
export default function DeletedPost() {
  const [ref, shown] = useReveal({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      id="deleted"
      className={`deleted${shown ? " deleted--in" : ""}`}
      aria-label="What I did"
    >
      <div className="deleted__frame">
        <div className="deleted__badge">
          <span className="deleted__badgeDot" aria-hidden="true" />
          {deletedPost.badge}
        </div>

        <p className="eyebrow">{deletedPost.eyebrow}</p>
        <h2 className="deleted__title">{deletedPost.title}</h2>

        {deletedPost.paragraphs.map((p) => (
          <p className="deleted__p" key={p.slice(0, 30)}>
            {p}
          </p>
        ))}

        <ul className="deleted__list">
          {deletedPost.readAs.map((item, i) => (
            <li key={item} style={{ "--i": i }}>
              <span className="deleted__bullet" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        {deletedPost.after.map((p) => (
          <p className="deleted__p deleted__p--after" key={p.slice(0, 30)}>
            {p}
          </p>
        ))}

        <div className="deleted__seal" aria-hidden="true">
          <span>♥</span>
        </div>
      </div>
    </section>
  );
}
