import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import Hero from '@/sections/Hero';
import AboutMe from '@/sections/AboutMe';
import ProjectShowcase from '@/sections/ProjectShowcase';
import Testimonials from '@/sections/Testimonials';
import ContactFooter from '@/sections/ContactFooter';

function App() {
  useSmoothScroll();

  return (
    <div className="relative">
      {/* Global persistent navbar */}
      <Navbar />

      {/* Hero - fixed, fades on scroll */}
      <Hero />

      {/* Spacer to allow hero scroll */}
      <div style={{ height: '100vh' }} />

      {/* About Me - Personal info, stats, tech stack, timeline */}
      <AboutMe />

      {/* Project Showcase - Featured works */}
      <ProjectShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact & Footer */}
      <ContactFooter />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
