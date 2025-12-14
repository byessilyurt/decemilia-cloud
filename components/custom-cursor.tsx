'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // 1. LIQUID PHYSICS
  // Stiffness 150 (Softer) / Damping 15 (Less oscillation)
  // This removes the "jitter" and makes it feel like oil or water.
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 2. VELOCITY STRETCH (Optional Polish)
  // Determine if mouse is moving fast to slightly rotate/stretch the drop?
  // Kept simple for now to preserve performance.

  useEffect(() => {
    // Mobile check
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hides the default cursor globally while this component is active
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          // 3. ALIGNMENT
          // TranslateX -50% centers it horizontally.
          // TranslateY -5px ensures the "Tip" of the drop is exactly on the click target.
          translateX: '-50%',
          translateY: '-2px', 
        }}
      >
        <motion.svg
          width="24"
          height="32"
          viewBox="0 0 24 32"
          fill="none"
          // 4. CLICK SQUISH
          // When clicking, we squash Y and stretch X slightly (The Splat)
          animate={{
            scaleX: isClicking ? 1.3 : 1,
            scaleY: isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <defs>
            <linearGradient id="droplet-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ecfeff" stopOpacity="0.9" /> {/* Brighter tip */}
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
            </linearGradient>
            
            {/* Tighter blur for cleaner edges */}
            <filter id="droplet-glow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Refined Shape: Sharper top, heavier bottom */}
          <path
            d="M12 2
               C12 2, 14.5 7, 16.5 11
               C18.5 15, 20 18, 20 21
               C20 25.4, 16.4 29, 12 29
               C7.6 29, 4 25.4, 4 21
               C4 18, 5.5 15, 7.5 11
               C9.5 7, 12 2, 12 2Z"
            fill="url(#droplet-gradient)"
            filter="url(#droplet-glow)"
            stroke="#ecfeff"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />

          {/* Highlight (Reflection) */}
          <ellipse
            cx="8"
            cy="14"
            rx="1.5"
            ry="3"
            fill="white"
            fillOpacity="0.4"
            transform="rotate(-20 8 14)"
          />
        </motion.svg>
      </motion.div>
      
      {/* Force override any other cursors */}
      <style jsx global>{`
        body, a, button, input {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}