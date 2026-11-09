import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Education from './components/sections/Education';
import Internships from './components/sections/Internships';
import SkillsCubeSection from './components/sections/SkillsCubeSection';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import BackToTop from './components/common/BackToTop';
import ResumeModal from './components/common/ResumeModal';
import ParticleBackground from './components/3d/ParticleBackground';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-400 selection:text-black">
      {/* Top Scroll Neon Bar */}
      <ScrollProgress />

      {/* Custom Desktop Glowing Cursor */}
      <ErrorBoundary fallback={null}>
        <CustomCursor />
      </ErrorBoundary>

      {/* Site-wide 3D Interactive Particle Constellation */}
      <ErrorBoundary fallback={null}>
        <ParticleBackground />
      </ErrorBoundary>

      {/* Fixed Futuristic Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <ErrorBoundary>
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
        </ErrorBoundary>

        <ErrorBoundary>
          <Education />
        </ErrorBoundary>

        <ErrorBoundary>
          <Internships />
        </ErrorBoundary>

        <ErrorBoundary>
          <SkillsCubeSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>

        <ErrorBoundary>
          <Certifications />
        </ErrorBoundary>

        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>

      {/* Futuristic Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
