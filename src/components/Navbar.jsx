import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'experience', href: '#experience' },
    { key: 'education', href: '#education' },
    { key: 'projects', href: '#projects' },
    { key: 'volunteering', href: '#volunteering' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid var(--glass-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--accent)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {'<Om/Sawarkar>'}
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.key}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                whileHover={{
                  color: 'var(--accent)',
                  backgroundColor: 'var(--glass-bg)',
                }}
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              id="lang-toggle"
              onClick={toggleLang}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider"
              style={{
                background: 'transparent',
                color: 'var(--accent)',
                border: '2px solid var(--accent)',
                cursor: 'pointer',
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 0 15px var(--accent-glow)',
                background: 'var(--accent-glow)',
              }}
              whileTap={{ scale: 0.92 }}
            >
              {lang === 'en' ? '🌍 DE' : '🌍 EN'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              id="theme-toggle"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                cursor: 'pointer',
                fontSize: '1.1rem',
                boxShadow: '0 4px 15px var(--accent-glow)',
              }}
              whileHover={{ scale: 1.15, rotate: 20 }}
              whileTap={{ scale: 0.88 }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center glass"
              style={{ cursor: 'pointer' }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="block w-5 h-0.5 rounded"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                  animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block w-5 h-0.5 rounded"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="block w-5 h-0.5 rounded"
                  style={{ backgroundColor: 'var(--text-primary)' }}
                  animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden glass-strong"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ color: 'var(--accent)', x: 8 }}
                >
                  {t(`nav.${link.key}`)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
