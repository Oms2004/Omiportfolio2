import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import HeroOrb from './HeroOrb';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <HeroOrb />

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-sm md:text-base font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--accent-2)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.greeting')}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 80 }}
        >
          <span className="gradient-text">{t('hero.name')}</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('hero.title')}
        </motion.p>

        <motion.p
          className="text-base md:text-lg mb-8 max-w-xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#projects"
            className="glow-btn px-8 py-3.5 rounded-full text-white font-semibold text-base"
          >
            {t('hero.cta')}
          </a>
          <a
            href="https://drive.google.com/file/d/17_Uy5Q0ZjUb3JJ-6RlJ7WSwhCMbnKeYh/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-semibold text-base glass resume-btn"
            style={{ color: 'var(--accent)' }}
          >
            📄 {t('hero.resume')}
          </a>
          <a
            href="#contact"
            className="glow-btn px-8 py-3.5 rounded-full text-white font-semibold text-base"
          >
            {t('nav.contact')}
          </a>
        </motion.div>

        {/* Touch Hint */}
        <motion.p
          className="mt-10 text-xs tracking-wider uppercase pulse-hint"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          ✦ {t('hero.touch')} ✦
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2" style={{ border: '2px solid var(--border)' }}>
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
