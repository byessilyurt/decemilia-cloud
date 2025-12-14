'use client';

interface MouseFollowerGradientProps {
  x: number;
  y: number;
}

export function MouseFollowerGradient({ x, y }: MouseFollowerGradientProps) {
  // Cloud fixed in sky, only tracks horizontal movement
  const cloudX = x;
  const cloudY = 120; // Fixed height in the "sky"

  return (
    <svg
      className="pointer-events-none absolute will-change-transform"
      style={{
        transform: `translate(${cloudX - 150}px, ${cloudY}px)`,
        transition: 'transform 0.2s ease-out',
        zIndex: 1,
      }}
      width="300"
      height="150"
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Glow filter */}
      <defs>
        <filter id="cloud-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cloud-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Cloud shape from logo */}
      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="url(#cloud-gradient)"
        stroke="#06b6d4"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        filter="url(#cloud-glow)"
      />
    </svg>
  );
}
