import { person, lockScreen } from "../data/content.js";

/**
 * The way in. A phone lock screen with a single notification, because that is
 * literally how she found out. Tapping it is the only way into the page.
 */
export default function LockScreen({ onUnlock }) {
  return (
    <div className="lock" role="dialog" aria-modal="true" aria-label="A notification for Mrunaa">
      <div
        className="lock__bg"
        aria-hidden="true"
        style={{ backgroundImage: 'url("photos/lock-bg.jpg")' }}
      />

      <div className="lock__inner">
        <div className="lock__top">
          <p className="lock__date">{lockScreen.dateLabel}</p>
          <p className="lock__clock">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        <div className="lock__spacer" />

        <div className="lock__center">
          <div className="lock__heart" aria-hidden="true">
            ♥
          </div>
          <h1 className="lock__name">{person.her}</h1>
          <p className="lock__sub">someone has something to say to you</p>
        </div>

        <div className="lock__spacer" />

        <button type="button" className="notification" onClick={onUnlock}>
          <span className="notification__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="3.6" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="notification__body">
            <span className="notification__head">
              <span className="notification__app">{lockScreen.notifications[0].app}</span>
              <span className="notification__ago">{lockScreen.notifications[0].ago}</span>
            </span>
            <span className="notification__title">{lockScreen.notifications[0].title}</span>
            <span className="notification__text">{lockScreen.notifications[0].body}</span>
          </span>
        </button>

        <p className="lock__hint">{lockScreen.hint}</p>
      </div>
    </div>
  );
}
