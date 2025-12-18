'use client';

import { motion } from 'framer-motion';
import { Laptop, ShoppingCart, Workflow, Cloud, Chrome, Monitor, ArrowRight } from 'lucide-react';

const services = [
  {
    name: 'Web Applications',
    icon: Laptop,
    description: 'Custom web apps that scale with your business. From MVPs to enterprise solutions.',
    examples: 'Dashboards, Portals, SaaS Products',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    name: 'E-commerce Solutions',
    icon: ShoppingCart,
    description: 'Online stores that convert. Shopify customizations or fully custom platforms.',
    examples: 'Stores, Marketplaces, Checkout Flows',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500/50',
  },
  {
    name: 'Automation & Workflows',
    icon: Workflow,
    description: 'Eliminate repetitive tasks. Connect your tools and automate operations.',
    examples: 'API Integrations, n8n, Data Pipelines',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    borderColor: 'hover:border-cyan-500/50',
  },
  {
    name: 'Micro-SaaS Products',
    icon: Cloud,
    description: 'Small software products with big impact. Built fast, designed to generate revenue.',
    examples: 'Tools, Utilities, Niche Solutions',
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500/50',
  },
  {
    name: 'Browser Extensions',
    icon: Chrome,
    description: 'Extend browser capabilities. Chrome and Firefox extensions that enhance productivity.',
    examples: 'Productivity Tools, Scrapers, Enhancers',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'hover:border-yellow-500/50',
  },
  {
    name: 'Desktop Applications',
    icon: Monitor,
    description: 'Native desktop tools using Electron or Tauri. Cross-platform when needed.',
    examples: 'Utilities, Internal Tools, Editors',
    gradient: 'from-gray-500/20 to-slate-500/20',
    borderColor: 'hover:border-gray-500/50',
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

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            From idea to launch, we build digital solutions that solve real business problems
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div
                  className={`relative h-full p-6 sm:p-8 rounded-2xl bg-card border border-border ${service.borderColor} transition-all duration-300 hover:shadow-lg`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-secondary">
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <p className="text-sm text-muted-foreground/70 mb-4">
                      {service.examples}
                    </p>

                    <a
                      href="#case-studies"
                      className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group/link"
                    >
                      See examples
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
