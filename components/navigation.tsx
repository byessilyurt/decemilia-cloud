'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Cloud } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = section === 'home'
          ? document.querySelector('section')
          : document.getElementById(section);

        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#blog', label: 'Blog', id: 'blog' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
        }`}
        style={{ marginTop: '3px' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <Cloud className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110" />
              <span className="font-bold text-lg sm:text-xl tracking-tight">decemilia</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 relative">
              {navLinks.map((link) => (
                <motion.div key={link.href} className="relative">
                  <Button
                    variant="ghost"
                    asChild
                    className="text-sm lg:text-base relative z-10 hover:text-primary transition-colors"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = link.id === 'home'
                          ? document.querySelector('section')
                          : document.getElementById(link.id);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {link.label}
                    </a>
                  </Button>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = link.id === 'home'
                          ? document.querySelector('section')
                          : document.getElementById(link.id);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`text-lg font-medium hover:text-primary transition-colors py-2 ${
                        activeSection === link.id ? 'text-primary' : ''
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
