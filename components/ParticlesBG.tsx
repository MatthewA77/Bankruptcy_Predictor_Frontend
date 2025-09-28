"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBG() {
  const [ready, setReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Initialize engine once (v3)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Simple parallax with scroll (moves the whole canvas)
//   useEffect(() => {
//     const onScroll = () => setScrollY(window.scrollY || 0);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      // We'll manage sizing/position with CSS instead of fullScreen
      fullScreen: { enable: false },
      background: { color: "transparent" },

      particles: {
        number: {
          value: 90,
          density: {
            enable: true,
            height: 1080, // v3: use height/width
            width: 1920,
          },
        },
        color: { value: "#10b981" }, // emerald dots
        links: {
          enable: true,
          color: "#22d3ee",          // cyan lines
          distance: 120,             // a touch tighter so it feels cleaner
          opacity: 0.22,
          width: 1,
        },
        move: {
          enable: true,
          // Gentle random drift when not near the pointer
          speed: 0.7,               // slower base speed
          random: true,              // random walk-ish drift
          straight: false,
          direction: "none",
          outModes: { default: "out" },
          decay: -0.0001,               // slight damping so they settle after pull
        },
        opacity: { value: 0.6 },
        size: { value: { min: 1, max: 3 } },
        shape: { type: "circle" },
      },

      interactivity: {
        // detectsOn default is "window"; explicit form if you want it:
        // detectsOn: "window" as const,
        events: {
          // Softer, smaller-radius pull
          onHover: { enable: true, mode: ["attract", "slow"] },
          onClick: { enable: true, mode: "push" },
          // v3 resize shape
          resize: { enable: true, delay: 0.4 },
        },
        modes: {
          attract: {
            distance: 80,  // smaller pull radius
            duration: 0.18, // brief tug
            factor: 1.1,    // gentler force
            speed: 0.6,     // slower reaction
          },
          slow: { factor: 2.2, radius: 140 },
          push: { quantity: 3 },
        },
      },

      detectRetina: true,
    }),
    []
  );

  if (!ready) return null;

  // Parallax amount — tweak 0.15 for more/less vertical shift
//   const translate = `translateY(${scrollY * 0}px)`;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
    //   style={{ transform: translate }}
      aria-hidden="true"
    >
      <Particles
        id="cobaion-bg"
        options={options}
        // ensure canvas fills the wrapper
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
