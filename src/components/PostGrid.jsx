import { useEffect, useState } from "react";
import { posts } from "../data/content.js";
import useReveal from "../hooks/useReveal.js";

function PostCard({ post, index }) {
  const [ref, shown] = useReveal({ threshold: 0.12 });
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <article
      ref={ref}
      className={`post${shown ? " post--in" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 3) * 90}ms` }}
    >
      <button
        type="button"
        className="post__media"
        onClick={() => setOpen(true)}
        aria-label={`Open photo: ${post.short}`}
      >
        <img src={post.src} alt={post.alt} loading="lazy" width="700" height="933" />
        <span className="post__mediaTag">{post.short}</span>
      </button>

      <div className="post__bar">
        <button
          type="button"
          className={`heart${liked ? " heart--on" : ""}`}
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
            <path
              d="M12 20.3s-7.6-4.7-7.6-9.9A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.6 3c0 5.2-7.6 9.9-7.6 9.9z"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="post__likes">{(liked ? 1 : 0) + 1} like</span>
      </div>

      <p className="post__caption">{post.caption}</p>
      <p className="post__when">{post.when}</p>

      {open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={post.short}
          onClick={() => setOpen(false)}
        >
          <button type="button" className="lightbox__close" aria-label="Close photo">
            ✕
          </button>
          <figure className="lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img src={post.src} alt={post.alt} />
            <figcaption>{post.caption}</figcaption>
          </figure>
        </div>
      )}
    </article>
  );
}

export default function PostGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="posts" id="posts" aria-label="The four posts">
      {mounted &&
        posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
    </section>
  );
}
