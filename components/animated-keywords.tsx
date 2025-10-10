'use client';

import { useEffect, useRef, useState } from 'react';

const keywords = [
  'React',
  'TypeScript',
  'Next.js',
  'AI/ML',
  'Web3',
  'Cloud',
  'Node.js',
  'Supabase'
];

export function AnimatedKeywords() {
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
    <div ref={sectionRef} className="mb-16 sm:mb-20 overflow-hidden">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {keywords.map((keyword, index) => (
          <div key={keyword} className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className={`
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
                bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500
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
                  text-2xl sm:text-3xl md:text-4xl text-purple-400/60
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
  );
}
