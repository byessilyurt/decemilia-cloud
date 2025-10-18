/*
  # Portfolio Database Schema
  
  1. New Tables
    - `projects` - Portfolio projects with title, description, tech stack, links, and content
    - `blogs` - Blog posts with title, excerpt, content, cover image, and tags
    - `contact_submissions` - Contact form submissions
  
  2. Security
    - Enable RLS on all tables
    - Public read access for projects and blogs
    - Public insert access for contact_submissions only
  
  3. Performance
    - Indexes on slugs for fast lookups
    - Indexes on timestamps for sorting
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  tech_stack text[] NOT NULL DEFAULT '{}',
  demo_url text,
  github_url text,
  image_url text,
  content text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image text,
  published_at timestamptz DEFAULT now(),
  reading_time integer DEFAULT 5,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blogs policies
CREATE POLICY "Anyone can view blogs"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured) WHERE featured = true;

CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON blogs(published_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);

-- Insert sample projects
INSERT INTO projects (title, slug, description, tech_stack, demo_url, github_url, image_url, content, featured)
VALUES 
  (
    'E-Commerce Platform',
    'ecommerce-platform',
    'Full-stack e-commerce solution with real-time inventory management and payment processing.',
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    'https://demo.example.com',
    'https://github.com/yourusername/ecommerce',
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# E-Commerce Platform

A modern e-commerce platform built with cutting-edge technologies.

## Features
- Real-time inventory tracking
- Secure payment processing with Stripe
- Admin dashboard for order management
- Responsive design for all devices

## Tech Stack
Built with Next.js 14, TypeScript, Supabase for backend, and Tailwind CSS for styling.',
    true
  ),
  (
    'AI Content Generator',
    'ai-content-generator',
    'SaaS application leveraging AI to generate marketing copy and blog content.',
    ARRAY['React', 'Node.js', 'OpenAI API', 'PostgreSQL', 'Redis'],
    'https://ai-demo.example.com',
    'https://github.com/yourusername/ai-content',
    'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# AI Content Generator

Harness the power of AI to create compelling content.

## Overview
This SaaS platform uses cutting-edge AI models to generate high-quality marketing copy, blog posts, and social media content.

## Key Features
- Multiple content types supported
- Tone and style customization
- SEO optimization
- Bulk content generation',
    true
  ),
  (
    'Real-Time Chat Application',
    'realtime-chat',
    'WebSocket-based chat application with typing indicators and read receipts.',
    ARRAY['Next.js', 'Supabase Realtime', 'TypeScript', 'Radix UI'],
    'https://chat.example.com',
    'https://github.com/yourusername/chat-app',
    'https://images.pexels.com/photos/7205815/pexels-photo-7205815.jpeg?auto=compress&cs=tinysrgb&w=800',
    '# Real-Time Chat Application

Instant messaging with modern features and real-time updates.

## Features
- Real-time messaging using Supabase Realtime
- Typing indicators
- Read receipts
- Online/offline status
- File sharing
- Message reactions',
    false
  );

-- Insert sample blogs
INSERT INTO blogs (title, slug, excerpt, content, cover_image, published_at, reading_time, tags)
VALUES
  (
    'Building Scalable Web Applications with Next.js',
    'building-scalable-nextjs-apps',
    'Learn best practices for architecting large-scale applications using Next.js 14 and the App Router.',
    '# Building Scalable Web Applications with Next.js

Next.js has revolutionized how we build React applications. In this post, we will explore strategies for building scalable, maintainable applications.

## App Router Benefits

The new App Router in Next.js 14 provides:
- Server Components by default
- Improved data fetching patterns
- Better code splitting
- Simplified routing

## Best Practices

### 1. Component Organization
Keep components small and focused on a single responsibility.

### 2. Data Fetching
Use Server Components when possible to fetch data on the server.

### 3. Performance
Leverage ISR and SSG appropriately for pages that don''t change frequently.

## Conclusion

By following these patterns, you can build applications that scale effortlessly.',
    'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    now() - interval '7 days',
    8,
    ARRAY['Next.js', 'React', 'Web Development']
  ),
  (
    'TypeScript Tips for React Developers',
    'typescript-tips-react',
    'Essential TypeScript patterns and utilities that will make your React code more robust and maintainable.',
    '# TypeScript Tips for React Developers

TypeScript and React are a powerful combination. Here are some tips to level up your game.

## Generic Components

Learn how to create reusable, type-safe components that work with any data type while maintaining type safety.

## Discriminated Unions

Use discriminated unions for complex state management to ensure exhaustive type checking.

## Utility Types

Leverage TypeScript''s built-in utility types like Pick, Omit, Partial, and Required.

## Conclusion

These patterns will help you write more maintainable and type-safe React applications.',
    'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    now() - interval '14 days',
    6,
    ARRAY['TypeScript', 'React', 'Programming']
  ),
  (
    'Supabase: The Firebase Alternative You Need',
    'supabase-firebase-alternative',
    'Why Supabase is becoming the go-to backend solution for modern web applications.',
    '# Supabase: The Firebase Alternative

Supabase offers everything you need for a modern backend, combining the ease of Firebase with the power of PostgreSQL.

## Why Supabase?

- PostgreSQL database with ACID compliance
- Built-in authentication
- Real-time subscriptions
- Row Level Security
- Edge Functions

## Getting Started

Setting up Supabase is straightforward. Install the client library and start building!

## Conclusion

Supabase combines the best of Firebase''s developer experience with the power and reliability of PostgreSQL.',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    now() - interval '21 days',
    5,
    ARRAY['Supabase', 'Backend', 'Database']
  );