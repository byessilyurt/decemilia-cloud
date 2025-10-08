import { ArrowDown, Cloud } from 'lucide-react';
import { Button } from './ui/button';
import { CloudFollower } from './cloud-follower';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />

      <CloudFollower />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400/80" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-200/90 tracking-wide">
                Decemilia
              </h2>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200">
              Cloud-Native Solutions
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200/70 max-w-2xl mx-auto leading-relaxed">
            Building scalable, modern applications in the cloud. Founded by Yusuf Yesilyurt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-8">
            <Button
              size="lg"
              className="glow-hover text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto border-blue-400/30 hover:border-blue-400/50 hover:bg-blue-950/30"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-300/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-blue-300/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}