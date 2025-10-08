'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const { error } = await (supabase.from('contact_submissions') as any).insert({
        name: data.name,
        email: data.email,
        message: `Company: ${data.company}\n\n${data.message}`,
      });

      if (error) throw error;

      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-black py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-light text-white mb-4">Schedule a Demo</h2>
          <p className="text-gray-400">Let's discuss how we can transform your business with AI</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...form.register('name')}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-white/20 focus:outline-none transition-colors"
              placeholder="Your name"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register('email')}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-white/20 focus:outline-none transition-colors"
              placeholder="your.email@company.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-gray-400 text-sm mb-2">
              Company
            </label>
            <input
              id="company"
              type="text"
              {...form.register('company')}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-white/20 focus:outline-none transition-colors"
              placeholder="Your company name"
            />
            {form.formState.errors.company && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.company.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
              Message
            </label>
            <textarea
              id="message"
              {...form.register('message')}
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-white/20 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
