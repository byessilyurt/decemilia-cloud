'use client';

import { motion } from 'framer-motion';

const caseStudies = [
  {
    category: 'AI Automation',
    title: 'Automated Document Processing for Legal Firm',
    description:
      'Implemented custom AI solution to extract and categorize information from thousands of legal documents, reducing processing time from days to hours.',
    efficiency: 85,
    timeframe: '6 weeks',
  },
  {
    category: 'Web Development',
    title: 'Real-Time Analytics Dashboard for E-Commerce',
    description:
      'Built a comprehensive analytics platform with live data visualization, inventory tracking, and predictive sales forecasting.',
    efficiency: 70,
    timeframe: '8 weeks',
  },
  {
    category: 'Business Intelligence',
    title: 'Custom ML Model for Financial Forecasting',
    description:
      'Developed machine learning models to predict market trends and optimize investment strategies with high accuracy.',
    efficiency: 92,
    timeframe: '12 weeks',
  },
  {
    category: 'Process Automation',
    title: 'Workflow Automation for Healthcare Provider',
    description:
      'Streamlined patient intake and scheduling processes with intelligent automation, reducing administrative overhead significantly.',
    efficiency: 78,
    timeframe: '10 weeks',
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="bg-black py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-light text-white mb-4">Case Studies</h2>
          <p className="text-gray-400">Transforming businesses with AI-powered solutions</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="text-blue-500/30 text-sm mb-2">{study.category}</div>
              <h3 className="text-2xl text-white mb-3 group-hover:text-blue-500/70 transition-colors font-light">
                {study.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4 text-sm">{study.description}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>+{study.efficiency}% efficiency</span>
                <span>•</span>
                <span>{study.timeframe}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
