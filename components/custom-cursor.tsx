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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-30%',
        width: '16px',
        height: '24px',
        background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.6) 0%, rgba(59, 130, 246, 0.4) 100%)',
        clipPath: 'path("M8 0 C12 6, 16 12, 16 16 C16 20.4, 12.4 24, 8 24 C3.6 24, 0 20.4, 0 16 C0 12, 4 6, 8 0")',
        mixBlendMode: 'screen',
        filter: 'blur(1px)',
      }}
    />
  );
}
