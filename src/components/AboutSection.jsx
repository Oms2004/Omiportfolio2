import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t('about.heading')}
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="relative group">
              {/* Glow ring */}
              <div
                className="absolute -inset-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  filter: 'blur(20px)',
                }}
              />
              {/* Hexagonal mask */}
              <div
                className="profile-hex relative w-52 h-52 md:w-64 md:h-64 overflow-hidden"
                style={{
                  border: '3px solid var(--glass-border)',
                  boxShadow: '0 0 40px var(--accent-glow)',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Om Sawarkar"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative dots */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
                style={{ background: 'var(--accent)' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-3 h-3 rounded-full"
                style={{ background: 'var(--accent-2)' }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Bio Text */}
          <div className="flex-1 space-y-6">
            {['p1', 'p2', 'p3'].map((key, i) => (
              <motion.p
                key={key}
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {t(`about.${key}`)}
              </motion.p>
            ))}

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-4 md:gap-6 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { value: '10+', label: 'Projects' },
                { value: '500+', label: 'DSA Problems' },
                { value: '8.76', label: 'CGPA' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl px-6 py-4 text-center">
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
