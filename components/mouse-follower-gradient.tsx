'use client';

interface MouseFollowerGradientProps {
  x: number;
  y: number;
}

export function MouseFollowerGradient({ x, y }: MouseFollowerGradientProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute hidden md:block will-change-transform opacity-40 mix-blend-screen"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.4) 30%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(${x - 350}px, ${y - 350}px)`,
          transition: 'transform 0.15s ease-out',
          zIndex: 1,
        }}
      />

      <div
        className="pointer-events-none absolute hidden md:block will-change-transform opacity-30 mix-blend-screen"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(147, 51, 234, 0.3) 40%, transparent 70%)',
          filter: 'blur(50px)',
          transform: `translate(${x - 200 + 150}px, ${y - 200 + 150}px)`,
          transition: 'transform 0.2s ease-out',
          zIndex: 1,
        }}
      />
    </>
  );
}
