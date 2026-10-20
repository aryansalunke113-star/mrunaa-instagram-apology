# for Mrunaa 🤍

A romantic apology page built as **her own Instagram profile** — the page she should
always have been on.

Built with **React 18 + Vite + plain JavaScript + hand-written CSS**. No backend, no
database, no API keys, no analytics.

---

## Run it

```bash
npm install
npm run dev        # → http://localhost:5173
```

Build for production:

```bash
npm run build      # → dist/
npm run preview    # serve the built output locally
```

---

## How it works

The site is one long, scrolling profile. The entry point is a **phone lock screen**
carrying an Instagram notification — because that's how she found out. Tapping the
notification is the only way in.

| Section | File | What it does |
|---|---|---|
| Lock screen | `src/components/LockScreen.jsx` | Notification + name, body scroll locked until tapped |
| Profile header | `src/components/ProfileHeader.jsx` | Avatar, stats, bio, buttons that scroll to sections |
| The four posts | `src/components/PostGrid.jsx` | Real photos, captions, like button, tap-to-enlarge lightbox |
| The deleted post | `src/components/DeletedPost.jsx` | The confession — what he did and why it hurt |
| The DM thread | `src/components/DMThread.jsx` | Messages type themselves out, then three reply buttons |
| Promises | `src/components/Highlights.jsx` | Story-highlight rings opening a real story viewer |
| Close friends | `src/components/CloseFriends.jsx` | The one-person close-friends list |
| Finale | `src/components/Finale.jsx` | The closing lines, two buttons, heart shower |
| Ambience | `src/components/Ambient.jsx` | Drifting petals + blush glow, pure CSS |
| Music | `src/hooks/useMusic.js` | The real song, looping with fade in/out |

### Everything she reads lives in one file

**`src/data/content.js`** holds every string: her name, the bio, the four captions,
the confession, all eight messages, the five promises, the finale. Use it like this:

```js
// src/data/content.js
export const person = {
  her: "Mrunaa",
  him: "Harsh",
};

export const deletedPost = {
  title: "I removed you from my Instagram.",
  paragraphs: ["...your words here..."],
};
```

Nothing else in the project hard-codes copy, so you never have to hunt through
components to change a sentence.

> Your name and hers appear in several places through `person.her` / `person.him`,
> so changing those two values renames the whole site at once.

---

## Music

The background music is a real recording: **"Can't Help Falling in Love" — Elvis
Presley**, served from `public/audio/song.m4a` (AAC, 44.1 kHz stereo, 2:58).

`src/hooks/useMusic.js` owns it:

- It **never autoplays**. Browsers require a real user gesture, so playback starts
  only on the music button tap — nothing should surprise her.
- It **loops**, so the song carries the whole story without going quiet.
- It **fades in** over ~2.6 s and **fades out** over ~0.9 s, so starting and
  stopping feel cinematic rather than like a switch.
- It plays at a **gentle volume (0.35)**, sitting under the story rather than over it.
- The button label and `aria-pressed` state track play vs pause.

To use a different song, replace `public/audio/song.m4a` and update `music.title` /
`music.artist` in `src/data/content.js`. The path is built from
`import.meta.env.BASE_URL`, so it resolves correctly at a domain root and under a
sub-path alike.

---

## Photos

`public/photos/` contains:

| File | Use |
|---|---|
| `photo1.jpg` … `photo4.jpg` | The four posts (resized to 1400 px wide) |
| `avatar.jpg` | Profile picture and DM header |
| `lock-bg.jpg` | Blurred backdrop behind the lock screen |

To swap a photo, replace the file and keep the name — or change the `src` in
`src/data/content.js` (`posts[].src`) and `profile.avatar`.

All image URLs are **relative** (`photos/photo1.jpg`), which is what lets the same
build work at a domain root and under a sub-path.

---

## Deploy

### Vercel

```bash
npm i -g vercel
vercel
```

Or import the repo at [vercel.com/new](https://vercel.com/new) — Vite is detected
automatically. `vercel.json` sets the build command, output directory, SPA rewrite
and long-cache headers for hashed assets.

### GitHub Pages

The included workflow at `.github/workflows/deploy-pages.yml` builds and deploys on
every push to `main`.

1. Push the project to GitHub.
2. **Settings → Pages → Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually).

`vite.config.js` sets `base: "./"`, so the build works at
`https://<user>.github.io/<repo>/` without any changes.

### Any other static host

Build command `npm run build`, publish directory `dist`. Nothing else needed.

---

## Structure

```
mrunaa-instagram-apology/
├── index.html
├── package.json
├── vite.config.js              base: "./" → works on Vercel and Pages
├── vercel.json
├── .github/workflows/
│   └── deploy-pages.yml
├── public/
│   ├── .nojekyll
│   ├── audio/song.m4a          the background song
│   └── photos/                 6 images
└── src/
    ├── main.jsx
    ├── App.jsx                 the page order + unlock state
    ├── data/content.js         ← ALL THE WORDS
    ├── hooks/
    │   ├── useMusic.js         the real song (loop + fades)
    │   └── useReveal.js        scroll reveal (IntersectionObserver)
    ├── styles/
    │   ├── base.css            tokens, reset, buttons
    │   └── components.css      every section
    └── components/             9 components
```

---

## Notes on how it behaves

- **Mobile-first.** Designed at 360 px and up; capped at 560 px on desktop so it
  still reads like a phone app rather than stretching across a monitor.
- **No horizontal scroll** at any width.
- **Reduced motion.** `prefers-reduced-motion: reduce` stops the petals, the glow
  drift, the heart shower, the ring rotations and all reveal transitions.
- **Keyboard.** The story viewer closes on `Esc` and pages with `←` / `→`. Every
  control is a real `<button>` with a visible focus ring.
- **No pressure anywhere.** There is no countdown, no "answer me", no score, and the
  second finale button ("I need a little time") gets a kind answer rather than a
  guilt trip.
