import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: 'spring', stiffness: 80 },
  },
};

export default function EducationSection() {
  const { t } = useLanguage();
  const timeline = t('education.timeline');

  return (
    <section id="education" className="relative">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t('education.heading')}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {Array.isArray(timeline) && timeline.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="glass rounded-2xl p-8 text-center cursor-default group"
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              {/* Graduation Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mb-5 group-hover:scale-110 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: 'white',
                }}
              >
                {i === 0 ? '🎓' : i === 1 ? '📚' : '🏫'}
              </div>

              <h3
                className="text-base font-bold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.college || item.School}
              </h3>

              <p className="text-sm font-medium mb-2 gradient-text">
                {item.degree}
              </p>

              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                {item.period}
              </p>

              {/* Score Badge */}
              <div
                className="inline-block px-6 py-2 rounded-full text-sm font-bold mt-2"
                style={{
                  background: 'var(--accent-glow)',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)',
                }}
              >
                {item.cgpa || item.percentage}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
