'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.div
      className="fixed top-24 right-4 sm:right-8 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        className="rounded-full w-12 h-12 shadow-lg bg-background/80 backdrop-blur-sm hover:scale-110 transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isDark ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>
        <span className="sr-only">Toggle dark mode</span>
      </Button>
    </motion.div>
  );
}
