'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.svg
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-20%',
      }}
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
    >
      <defs>
        <linearGradient id="droplet-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
        <filter id="droplet-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Organic water droplet - asymmetric, natural shape */}
      <path
        d="M10 1
           C11 3, 13 6, 15 10
           C17 14, 18 17, 17.5 20
           C17 23, 14 26, 10 27
           C6 26, 3 23, 2.5 20
           C2 17, 3 14, 5 10
           C7 6, 9 3, 10 1Z"
        fill="url(#droplet-gradient)"
        filter="url(#droplet-glow)"
      />

      {/* Inner highlight for depth */}
      <ellipse
        cx="7"
        cy="12"
        rx="2.5"
        ry="4"
        fill="#22d3ee"
        fillOpacity="0.3"
        transform="rotate(-15 7 12)"
      />
    </motion.svg>
  );
}
