'use client';

import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { MouseFollowerGradient } from './mouse-follower-gradient';
import { useMousePosition } from '@/hooks/use-mouse-position';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const mousePosition = useMousePosition(heroRef);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      <MouseFollowerGradient x={mousePosition.x} y={mousePosition.y} />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground tracking-wide animate-fade-in">
              Yusuf Yesilyurt
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gradient">
              Full-Stack Developer & AI Engineer
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting scalable web experiences with modern technologies
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-8">
            <Button
              size="lg"
              className="glow-hover text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              asChild
            >
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
}