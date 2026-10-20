import { useMemo } from "react";

/**
 * Pure-CSS ambient layer: slow drifting petals and a soft blush glow.
 * No JS animation loop, so it costs nothing on a phone.
 */
export default function Ambient() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i * 7.3 + (i % 3) * 5) % 100,
        delay: -(i * 2.9) % 26,
        duration: 20 + ((i * 3.7) % 14),
        size: 7 + (i % 4) * 3,
        drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 5) * 12),
      })),
    []
  );

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__glow ambient__glow--a" />
      <div className="ambient__glow ambient__glow--b" />
      <div className="ambient__petals">
        {petals.map((p) => (
          <span
            key={p.id}
            className="petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.25}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
