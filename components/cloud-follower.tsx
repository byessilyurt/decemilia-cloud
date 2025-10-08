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
  const lastActivityTime = useRef(Date.now());
  const idleAnimationFrame = useRef<number>();

  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.5 });

  const mouseVelocityX = useVelocity(mouseX);
  const scale = useTransform(mouseVelocityX, [-1000, 0, 1000], [0.9, 1, 1.1]);
  const smoothScale = useSpring(scale, { damping: 40, stiffness: 200 });

  const wisp1X = useTransform(smoothMouseX, (x) => x * 0.5);
  const wisp1Y = useTransform(smoothMouseY, (y) => y * 0.6);

  const wisp2X = useTransform(smoothMouseX, (x) => x * -0.3);
  const wisp2Y = useTransform(smoothMouseY, (y) => y * 0.4);

  const wisp3X = useTransform(smoothMouseX, (x) => x * 0.7);
  const wisp3Y = useTransform(smoothMouseY, (y) => y * -0.3);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const edgePadding = 100;
        const xBoundary = Math.max(edgePadding, Math.min(viewportWidth - edgePadding, e.clientX));
        const yBoundary = Math.max(edgePadding, Math.min(viewportHeight - edgePadding, e.clientY));

        mouseX.set(xBoundary);
        mouseY.set(yBoundary);
      }

      lastActivityTime.current = Date.now();

      if (idleAnimationFrame.current) {
        cancelAnimationFrame(idleAnimationFrame.current);
        idleAnimationFrame.current = undefined;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX.set(touch.clientX);
        mouseY.set(touch.clientY);
        lastActivityTime.current = Date.now();
      }
    };

    const idleAnimation = () => {
      const timeSinceLastActivity = Date.now() - lastActivityTime.current;

      if (timeSinceLastActivity > 2000) {
        const time = Date.now() / 1000;
        const currentX = mouseX.get();
        const currentY = mouseY.get();

        const offsetY = Math.sin(time * 0.5) * 20;
        const offsetX = Math.cos(time * 0.3) * 15;

        mouseX.set(currentX + offsetX);
        mouseY.set(currentY + offsetY);
      }

      idleAnimationFrame.current = requestAnimationFrame(idleAnimation);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    idleAnimationFrame.current = requestAnimationFrame(idleAnimation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (idleAnimationFrame.current) {
        cancelAnimationFrame(idleAnimationFrame.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          scale: smoothScale,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <div className="cloud-main" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          x: wisp1X,
          y: wisp1Y,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <div className="cloud-wisp cloud-wisp-1" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          x: wisp2X,
          y: wisp2Y,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <div className="cloud-wisp cloud-wisp-2" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          x: wisp3X,
          y: wisp3Y,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <div className="cloud-wisp cloud-wisp-3" />
      </motion.div>
    </div>
  );
}
