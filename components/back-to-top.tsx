'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-4 sm:right-8 z-40"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
