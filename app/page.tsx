'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { TechnologiesBento } from '@/components/technologies-bento';
import { ProjectsSection } from '@/components/projects-section';
import { BlogSection } from '@/components/blog-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { BackToTop } from '@/components/back-to-top';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: blogsData } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (projectsData) setProjects(projectsData);
      if (blogsData) setBlogs(blogsData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navigation />
      <DarkModeToggle />
      <BackToTop />
      <main>
        <HeroSection />
        <AboutSection />
        <TechnologiesBento />
        <ProjectsSection projects={projects} />
        <BlogSection blogs={blogs} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
