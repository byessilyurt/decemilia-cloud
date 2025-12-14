'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. RAW MOUSE POSITION (For the center dot - Precision)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. SPRING PHYSICS (For the outer ring - Fluidity)
  // Stiffness 150, Damping 20 = smooth, watery delay
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // 3. SMART HOVER DETECTION
    // Automatically detects links and buttons to change cursor shape
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide system cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* ELEMENT 1: THE OUTER RING (The "Ripple") */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border border-cyan-400 rounded-full mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          // Hovering: scale up to 40px
          // Clicking: scale down to 15px (squish)
          // Normal: 24px
          width: isHovering ? 64 : isClicking ? 24 : 48,
          height: isHovering ? 64 : isClicking ? 24 : 48,
          opacity: isHovering ? 0.5 : 0.3,
          backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.1)' : 'transparent', // Subtle fill on hover
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* ELEMENT 2: THE INNER DOT (The "Pointer") */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          // When hovering, the dot disappears into the ring (optional, or it stays small)
          width: isHovering ? 16 : 12,
          height: isHovering ? 16 : 12,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Global override */}
      <style jsx global>{`
        body, a, button, input, select, textarea {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}