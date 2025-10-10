'use client';

import { useEffect, useRef, useState } from 'react';

const keywords = [
  'React',
  'TypeScript',
  'Next.js',
  'RAG',
  'LLM',
  'Vector DB',
  'FastAPI',
  'Cloud Arch'
];

export function HeroKeywords() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={sectionRef} className="absolute bottom-20 left-0 right-0 z-10 px-4">
      <div className="container mx-auto">
        <h3 className="text-center text-sm sm:text-base font-semibold text-muted-foreground/80 mb-4 sm:mb-6">
          Core Technologies
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {keywords.map((keyword, index) => (
            <div key={keyword} className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <span
                className={`
                  text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold
                  bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500
                  bg-clip-text text-transparent
                  transition-all duration-700 ease-out
                  hover:scale-110 cursor-default
                  keyword-pulse
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 0.5}s`,
                  textShadow: '0 0 0px transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = '0 0 20px rgba(168, 85, 247, 0.8)';
                  e.currentTarget.style.transform = 'scale(1.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = '0 0 0px transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {keyword}
              </span>
              {index < keywords.length - 1 && (
                <span
                  className={`
                    text-base sm:text-lg md:text-xl text-purple-400/60
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{
                    transitionDelay: `${index * 100 + 50}ms`,
                  }}
                >
                  •
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
