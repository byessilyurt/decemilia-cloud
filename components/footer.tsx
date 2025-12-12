'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/byessilyurt', label: 'GitHub', gradient: 'from-gray-600 to-gray-800' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yessilyurt', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-800' },
    { icon: Mail, href: 'mailto:y.yesilyurt14@gmail.com', label: 'Email', gradient: 'from-red-600 to-red-800' },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  aria-label={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  <div className={`relative p-3 rounded-full bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p>&copy; {currentYear} Decemilia. All rights reserved.</p>
            <p className="text-xs mt-1 text-muted-foreground/70">Founded by Yusuf Yesilyurt</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
