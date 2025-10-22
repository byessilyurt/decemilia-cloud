'use client';

import { motion } from 'framer-motion';
import { Code, Database, Cloud, Zap, Terminal, Boxes } from 'lucide-react';

const technologies = [
  {
    name: 'React',
    icon: Code,
    description: 'Primary Framework',
    gradient: 'from-blue-500 to-cyan-500',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    name: 'TypeScript',
    icon: Terminal,
    description: 'Type Safety',
    gradient: 'from-blue-600 to-blue-800',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    name: 'Node.js',
    icon: Zap,
    description: 'Backend Runtime',
    gradient: 'from-green-500 to-emerald-600',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    name: 'Python',
    icon: Code,
    description: 'AI & Automation',
    gradient: 'from-yellow-500 to-orange-500',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    name: 'Supabase',
    icon: Database,
    description: 'Database',
    gradient: 'from-emerald-500 to-teal-600',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'Next.js',
    icon: Boxes,
    description: 'Framework',
    gradient: 'from-gray-700 to-gray-900',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'AWS',
    icon: Cloud,
    description: 'Cloud',
    gradient: 'from-orange-500 to-red-600',
    span: 'md:col-span-2 md:row-span-1',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TechnologiesBento() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Technologies
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern tools and frameworks I use to build exceptional products
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative group ${tech.span}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                  style={{
                    background: `linear-gradient(to bottom right, ${tech.gradient.includes('from-') ? 'var(--tw-gradient-from)' : '#000'}, ${tech.gradient.includes('to-') ? 'var(--tw-gradient-to)' : '#fff'})`,
                  }}
                />

                <div className={`relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${tech.gradient} backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center text-center text-white min-h-[160px]`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-12 w-12 sm:h-16 sm:w-16 mb-4 opacity-90" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-white/80">{tech.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
