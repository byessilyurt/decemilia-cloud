'use client';

import { useEffect, useRef, useState } from 'react';

const keywords = [
  'React',
  'TypeScript',
  'Next.js',
  'RAG',
  'LLM',
  'Automation',
  'n8n',
  'Python'
];

export function KeywordsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-base sm:text-lg font-semibold text-muted-foreground mb-6 sm:mb-8">
          Core Technologies
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
          {keywords.map((keyword, index) => (
            <div key={keyword} className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <span
                className={`
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold
                  bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500
                  bg-clip-text text-transparent
                  transition-all duration-700 ease-out
                  hover:scale-110 cursor-default
                  keyword-pulse
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 0.5}s`,
                  textShadow: '0 0 0px transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = '0 0 20px rgba(6, 182, 212, 0.8)';
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
                    text-xl sm:text-2xl md:text-3xl text-cyan-400/60
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
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
    </section>
  );
}
