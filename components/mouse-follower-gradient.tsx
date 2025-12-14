'use client';

import { useEffect, useRef, useState } from 'react';

// --- Sub-component (Unchanged) ---
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
  const [positions, setPositions] = useState({ c1: mouseX, c2: mouseX });
  
  const requestRef = useRef<number>();
  const currentPosRef = useRef({ c1: mouseX, c2: mouseX });

  const animate = () => {
    // c1 = Left Cloud (Main) - slightly faster response
    // c2 = Right Cloud (Background) - lazier response
    const dragFactor1 = 0.05; 
    const dragFactor2 = 0.03;

    const target = mouseX;
    
    // Smooth Lerp
    currentPosRef.current.c1 += (target - currentPosRef.current.c1) * dragFactor1;
    currentPosRef.current.c2 += (target - currentPosRef.current.c2) * dragFactor2;

    setPositions({ ...currentPosRef.current });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [mouseX]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-[0]">
        
        {/* LEFT CLOUD (Main) 
            Position: mouseX - 450px
            Logic: Since width is 500, center is 250. 
            -250 centers it on mouse. -450 shifts it 200px to the LEFT.
        */}
        <div
          className="absolute top-0 will-change-transform"
          style={{
            transform: `translate3d(${positions.c1 - 450}px, 40px, 0)`,
            transition: 'none',
          }}
        >
          <CloudLayer scale={1.0} opacity={0.7} />
        </div>

        {/* RIGHT CLOUD (Background/Smaller)
            Position: mouseX - 50px
            Logic: -250 centers it. -50 shifts it 200px to the RIGHT.
        */}
        <div
          className="absolute top-0 will-change-transform"
          style={{
            transform: `translate3d(${positions.c2 - 50}px, 20px, 0)`,
            transition: 'none',
          }}
        >
           {/* Flipped so it doesn't look like a clone */}
           <CloudLayer scale={0.7} opacity={0.4} flip={true} />
        </div>

      </div>

      <style jsx global>{`
        @keyframes subtle-drift {
          0% { transform: translate(0px, 0px); }
          25% { transform: translate(15px, 5px); }
          50% { transform: translate(5px, 15px); }
          75% { transform: translate(-15px, 5px); }
          100% { transform: translate(0px, 0px); }
        }
        .animate-drift {
          animation: subtle-drift 12s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}