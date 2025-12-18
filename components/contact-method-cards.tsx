'use client';

import { motion } from 'framer-motion';
import { Mail, Calendar, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const contactMethods = [
  {
    id: 'email',
    title: 'Email',
    subtitle: 'yusuf.yesilyurt.tech@gmail.com',
    icon: Mail,
    gradient: 'from-blue-500 to-cyan-500',
    buttonText: 'Send Email',
    action: () => window.location.href = 'mailto:yusuf.yesilyurt.tech@gmail.com',
  },
  {
    id: 'schedule',
    title: 'Schedule Call',
    subtitle: 'Book 30min chat',
    icon: Calendar,
    gradient: 'from-cyan-500 to-teal-500',
    buttonText: 'Pick a Time',
    action: () => window.open('https://calendly.com', '_blank'),
  },
  {
    id: 'whatsapp',
    title: 'Quick Response',
    subtitle: 'Chat on WhatsApp',
    icon: MessageCircle,
    gradient: 'from-green-500 to-emerald-500',
    buttonText: 'Message Now',
    action: () => window.open('https://wa.me/', '_blank'),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContactMethodCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {contactMethods.map((method) => {
        const Icon = method.icon;
        return (
          <motion.div
            key={method.id}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -10,
              transition: { duration: 0.2 },
            }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 from-current to-current"
                 style={{
                   backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                 }}
            />

            <div className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${method.gradient} backdrop-blur-sm transition-all duration-300`}>
              <div className="flex flex-col items-center text-center space-y-4 text-white">
                <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                  <Icon className="h-8 w-8" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-1">{method.title}</h3>
                  <p className="text-sm text-white/90">{method.subtitle}</p>
                </div>

                <Button
                  onClick={method.action}
                  variant="secondary"
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all duration-200"
                >
                  {method.buttonText}
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
