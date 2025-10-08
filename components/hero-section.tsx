'use client';

import { motion } from 'framer-motion';
import { CloudFollower } from './cloud-follower';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <CloudFollower />

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.h1
          className="text-7xl md:text-8xl font-light text-white mb-8 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI Automation Solutions
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We build intelligent systems that transform businesses. From custom AI integrations
          to automated workflows and modern web applications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <a
            href="#solutions"
            className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            Explore Solutions
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white/20 text-white hover:border-white/40 transition-colors"
          >
            Schedule Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
