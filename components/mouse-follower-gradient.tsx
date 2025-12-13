'use client';

interface MouseFollowerGradientProps {
  x: number;
  y: number;
}

export function MouseFollowerGradient({ x, y }: MouseFollowerGradientProps) {
  // Cloud positioned directly above cursor (raindrop falls from cloud)
  const cloudCenterX = x;
  const cloudBottomY = y - 80; // Cloud bottom 80px above cursor

  return (
    <>
      {/* Main cloud body - centered above cursor */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-15 mix-blend-screen"
        style={{
          width: '400px',
          height: '250px',
          background: 'radial-gradient(ellipse 100% 100%, rgba(168, 85, 247, 0.5) 0%, rgba(147, 51, 234, 0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
          transform: `translate(${cloudCenterX - 200}px, ${cloudBottomY - 200}px)`,
          transition: 'transform 0.15s ease-out',
          zIndex: 1,
        }}
      />

      {/* Cloud bump - left */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-12 mix-blend-screen"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)',
          filter: 'blur(35px)',
          transform: `translate(${cloudCenterX - 280}px, ${cloudBottomY - 220}px)`,
          transition: 'transform 0.18s ease-out',
          zIndex: 1,
        }}
      />

      {/* Cloud bump - top center */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-18 mix-blend-screen"
        style={{
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)',
          filter: 'blur(40px)',
          transform: `translate(${cloudCenterX - 125}px, ${cloudBottomY - 300}px)`,
          transition: 'transform 0.12s ease-out',
          zIndex: 1,
        }}
      />

      {/* Cloud bump - right */}
      <div
        className="pointer-events-none absolute will-change-transform opacity-12 mix-blend-screen"
        style={{
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)',
          filter: 'blur(35px)',
          transform: `translate(${cloudCenterX + 80}px, ${cloudBottomY - 200}px)`,
          transition: 'transform 0.2s ease-out',
          zIndex: 1,
        }}
      />
    </>
  );
}
