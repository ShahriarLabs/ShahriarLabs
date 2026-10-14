import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProjectCounter } from './components/ProjectCounter.tsx';
import { Work } from './components/Work.tsx';
import { About } from './components/About.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { InteractiveCanvas } from './components/InteractiveCanvas.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/20 selection:text-white">
      {/* Refined non-intrusive cursor accent */}
      <CustomCursor />

      {/* Cursor-reactive background canvas (spotlight + interactive dot grid) */}
      <InteractiveCanvas />

      {/* Compact Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Integrated Project Statistics & Counter */}
        <ProjectCounter />

        {/* Selected Work */}
        <Work />

        {/* Engineering Philosophy & Technical Skills */}
        <About />

        {/* Direct Contact & Inquiry */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
