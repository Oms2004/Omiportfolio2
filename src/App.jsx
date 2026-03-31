import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import FloatingBackground from './components/FloatingBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import VolunteeringSection from './components/VolunteeringSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FloatingBackground />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceTimeline />
          <EducationSection />
          <ProjectsSection />
          <VolunteeringSection />
          <ContactSection />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
}