'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(containerRef: RefObject<HTMLElement | null>) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const now = performance.now();

      if (now - lastUpdateRef.current < 16) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setMousePosition({ x, y });
        lastUpdateRef.current = now;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerRef]);

  return mousePosition;
}
