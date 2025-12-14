'use client';

import { useEffect, useRef, useState } from 'react';

// --- Helper: Keep numbers inside boundaries ---
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

// --- Sub-component (Visuals only) ---
function CloudLayer({ 
  scale, 
  opacity, 
  flip = false 
}: { 
  scale: number; 
  opacity: number; 
  flip?: boolean;
}) {
  return (
    <svg
      width="500"
      height="200"
      viewBox="0 0 24 24"
      fill="none"
      className={`absolute will-change-transform mix-blend-screen animate-drift ${flip ? '-scale-x-100' : ''}`}
      style={{
        opacity: opacity,
        transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}`,
      }}
    >
      <defs>
        <linearGradient id="cloud-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ecfeff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
        </linearGradient>
        <filter id="cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
        </filter>
      </defs>

      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="url(#cloud-body)"
        filter="url(#cloud-blur)"
        opacity="0.6"
        transform="scale(1.05) translate(-0.5, -0.5)"
      />
      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="url(#cloud-body)"
      />
    </svg>
  );
}

// --- Main Controller ---
interface MouseFollowerGradientProps {
  mouseX: number;
}

export function MouseFollowerGradient({ mouseX }: MouseFollowerGradientProps) {
  // Refs for physics loop
  const requestRef = useRef<number>();
  const windowWidthRef = useRef(1200); // Default fallback
  const initializedRef = useRef(false);

  // Initialize positions at home (will be set properly on mount)
  const getHomePositions = (width: number) => ({
    left: width * 0.2,
    right: width * 0.8,
  });

  const [positions, setPositions] = useState(() => getHomePositions(1200));
  const currentPosRef = useRef(getHomePositions(1200));

  useEffect(() => {
    // Capture window width and set initial positions immediately
    windowWidthRef.current = window.innerWidth;

    // Set clouds to home positions instantly on first load
    if (!initializedRef.current) {
      const homePos = getHomePositions(window.innerWidth);
      currentPosRef.current = homePos;
      setPositions(homePos);
      initializedRef.current = true;
    }

    const handleResize = () => { windowWidthRef.current = window.innerWidth; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animate = () => {
    const width = windowWidthRef.current;
    
    // --- ZONE CONFIGURATION ---
    // The "Home" X coordinates for the clouds (where they sit naturally)
    const leftHome = width * 0.2;  // 20% from left
    const rightHome = width * 0.8; // 80% from left (20% from right)
    
    // The "Range" (Leash) - How far can they travel from home?
    const maxTravel = 100; // px
    
    // 1. CALCULATE TARGETS (Where they WANT to go)
    // We map mouse position to a small offset from home
    
    // Left Cloud Target: 
    // It only cares about mouse if mouse is on the LEFT half (width / 2)
    // If mouse is on right, target is just 'leftHome' (it returns to rest)
    let targetLeft = leftHome;
    if (mouseX < width / 2) {
        // Calculate offset: map 0 -> width/2 to -100 -> +100
        const ratio = (mouseX / (width / 2)) - 0.5; // -0.5 to 0.5
        targetLeft = leftHome + (ratio * maxTravel * 2);
    }

    // Right Cloud Target:
    // Only cares if mouse is on RIGHT half
    let targetRight = rightHome;
    if (mouseX > width / 2) {
        const ratio = ((mouseX - width/2) / (width / 2)) - 0.5;
        targetRight = rightHome + (ratio * maxTravel * 2);
    }

    // 2. APPLY PHYSICS (The Smoothness)
    // Left cloud is heavier (0.03), Right is lighter (0.04) or vice versa
    const currentLeft = currentPosRef.current.left;
    const currentRight = currentPosRef.current.right;

    // Standard Lerp
    const newLeft = currentLeft + (targetLeft - currentLeft) * 0.03;
    const newRight = currentRight + (targetRight - currentRight) * 0.03;

    currentPosRef.current = { left: newLeft, right: newRight };
    setPositions({ left: newLeft, right: newRight });
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [mouseX]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-[0]">
        
        {/* LEFT CLOUD 
            Centered on its position: translate(X - 250px)
        */}
        <div
          className="absolute top-0 will-change-transform"
          style={{
            transform: `translate3d(${positions.left - 250}px, 10px, 0)`,
            transition: 'none',
          }}
        >
          <CloudLayer scale={1.0} opacity={0.7} />
        </div>

        {/* RIGHT CLOUD 
             Centered on its position
        */}
        <div
          className="absolute top-0 will-change-transform"
          style={{
            transform: `translate3d(${positions.right - 250}px, 20px, 0)`, 
            transition: 'none',
          }}
        >
           {/* Flipped and smaller */}
           <CloudLayer scale={0.8} opacity={0.5} flip={true} />
        </div>

      </div>

      <style jsx global>{`
        @keyframes subtle-drift {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(5px, 10px); }
          100% { transform: translate(0px, 0px); }
        }
        .animate-drift {
          animation: subtle-drift 10s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}