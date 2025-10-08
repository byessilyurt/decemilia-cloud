'use client';

import { motion } from 'framer-motion';
import { Bot, Code, TrendingUp, Zap, Database, Cloud } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Custom ChatGPT integrations, workflow automation with AI agents, document processing & analysis, and intelligent data extraction.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern SaaS applications, real-time dashboards, API development, and cloud infrastructure built with cutting-edge technologies.',
  },
  {
    icon: TrendingUp,
    title: 'Business Intelligence',
    description: 'Predictive analytics, custom ML models, data pipeline automation, and performance optimization for data-driven decisions.',
  },
  {
    icon: Zap,
    title: 'Process Optimization',
    description: 'Streamline operations with intelligent automation, reducing manual work and increasing efficiency across your organization.',
  },
  {
    icon: Database,
    title: 'Data Solutions',
    description: 'End-to-end data management, from collection and storage to analysis and visualization with scalable infrastructure.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable, secure cloud solutions with automated deployments, monitoring, and maintenance for maximum uptime.',
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="bg-black py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-light text-white mb-4">What We Build</h2>
          <p className="text-gray-400 mb-16">Enterprise-grade solutions powered by AI</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-black p-8 hover:bg-white/[0.02] transition-colors group"
              >
                <Icon className="w-8 h-8 text-blue-500/50 mb-4 group-hover:text-blue-500/70 transition-colors" />
                <h3 className="text-xl text-white mb-3 font-light">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
