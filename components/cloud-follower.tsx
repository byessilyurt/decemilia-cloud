'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

export function CloudFollower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 1 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 1 });

  const mouseVelocityX = useVelocity(mouseX);
  const scale = useTransform(mouseVelocityX, [-500, 0, 500], [0.95, 1, 1.05]);
  const smoothScale = useSpring(scale, { damping: 50, stiffness: 150 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 3);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          scale: smoothScale,
          translateX: '-400px',
          translateY: '-400px',
          willChange: 'transform',
        }}
      >
        <div className="cloud-blob" />
      </motion.div>
    </div>
  );
}
