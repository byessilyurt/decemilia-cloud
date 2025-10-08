import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { SolutionsSection } from '@/components/solutions-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main>
        <HeroSection />
        <SolutionsSection />
        <CaseStudiesSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
