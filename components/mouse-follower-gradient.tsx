'use client';

interface MouseFollowerGradientProps {
  x: number;
  y: number;
}

export function MouseFollowerGradient({ x, y }: MouseFollowerGradientProps) {
  return (
    <>
      {/* Main cloud body - large center */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-35 mix-blend-screen"
        style={{
          width: '500px',
          height: '350px',
          background: 'radial-gradient(ellipse 100% 100%, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.3) 40%, transparent 70%)',
          filter: 'blur(50px)',
          transform: `translate(${x - 250}px, ${y - 375}px)`,
          transition: 'transform 0.15s ease-out',
          zIndex: 1,
        }}
      />

      {/* Cloud bump - top left */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-40 mix-blend-screen"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)',
          filter: 'blur(45px)',
          transform: `translate(${x - 350}px, ${y - 450}px)`,
          transition: 'transform 0.18s ease-out',
          zIndex: 1,
        }}
      />

      {/* Cloud bump - top center */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-45 mix-blend-screen"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
          filter: 'blur(50px)',
          transform: `translate(${x - 175}px, ${y - 500}px)`,
          transition: 'transform 0.12s ease-out',
          zIndex: 1,
        }}
      />

      {/* Cloud bump - top right */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-35 mix-blend-screen"
        style={{
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)',
          filter: 'blur(45px)',
          transform: `translate(${x + 50}px, ${y - 420}px)`,
          transition: 'transform 0.2s ease-out',
          zIndex: 1,
        }}
      />

      {/* Small accent bump - right side */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-30 mix-blend-screen"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)',
          filter: 'blur(40px)',
          transform: `translate(${x + 150}px, ${y - 300}px)`,
          transition: 'transform 0.22s ease-out',
          zIndex: 1,
        }}
      />
    </>
  );
}
