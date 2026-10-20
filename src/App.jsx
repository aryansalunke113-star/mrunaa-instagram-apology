import { useCallback, useEffect, useState } from "react";
import LockScreen from "./components/LockScreen.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import PostGrid from "./components/PostGrid.jsx";
import DeletedPost from "./components/DeletedPost.jsx";
import DMThread from "./components/DMThread.jsx";
import Highlights from "./components/Highlights.jsx";
import CloseFriends from "./components/CloseFriends.jsx";
import Finale from "./components/Finale.jsx";
import MusicButton from "./components/MusicButton.jsx";
import Ambient from "./components/Ambient.jsx";
import useMusic from "./hooks/useMusic.js";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const music = useMusic();

  // Lock the page while the lock screen is up, so the only way in is the tap.
  useEffect(() => {
    document.body.style.overflow = unlocked ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [unlocked]);

  const unlock = useCallback(() => {
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={"app" + (unlocked ? " app--unlocked" : "")}>
      <Ambient />

      <main className="page" aria-hidden={!unlocked}>
        <ProfileHeader onScrollTo={scrollTo} />
        <PostGrid />
        <DeletedPost />
        <DMThread onScrollTo={scrollTo} />
        <Highlights />
        <CloseFriends />
        <Finale />
      </main>

      {unlocked && <MusicButton music={music} />}

      {!unlocked && <LockScreen onUnlock={unlock} />}
    </div>
  );
}
