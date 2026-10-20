import { profile, person } from "../data/content.js";

export default function ProfileHeader({ onScrollTo }) {
  return (
    <header className="profile" id="top">
      <div className="profile__topbar">
        <span className="profile__handle">{profile.handle}</span>
        <span className="profile__topright" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 3v13M7 8l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <div className="profile__main">
        <div className="profile__avatarWrap">
          <span className="profile__avatarRing" aria-hidden="true" />
          <img
            className="profile__avatar"
            src={profile.avatar}
            alt={`${person.her}, smiling and looking up at ${person.him}`}
            width="106"
            height="106"
            loading="eager"
          />
        </div>

        <div className="profile__stats">
          {profile.stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong className="stat__value">{s.value}</strong>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="profile__bio">
        <p className="profile__name">{profile.name}</p>
        {profile.bioLines.map((line, i) => (
          <p className={`profile__bioLine${i === 2 ? " profile__bioLine--soft" : ""}`} key={line}>
            {line}
          </p>
        ))}
      </div>

      <button type="button" className="profile__link" onClick={() => onScrollTo("deleted")}>
        <span aria-hidden="true">↳ </span>
        {profile.linkLabel}
      </button>

      <div className="profile__actions">
        <button type="button" className="btn btn--solid" onClick={() => onScrollTo("dm")}>
          message
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => onScrollTo("highlights")}>
          promises
        </button>
      </div>

      <div className="profile__tabs" aria-hidden="true">
        <span className="profile__tab profile__tab--on">posts</span>
        <span className="profile__tab">tagged</span>
      </div>
    </header>
  );
}
