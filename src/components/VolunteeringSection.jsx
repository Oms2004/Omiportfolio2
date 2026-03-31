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

export default function VolunteeringSection() {
  const { t } = useLanguage();
  const timeline = t('volunteering.timeline');

  return (
    <section id="volunteering" className="relative">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t('volunteering.heading')}
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
              className="glass rounded-2xl p-7 h-full flex flex-col cursor-default"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                    color: 'white',
                  }}
                >
                  {i === 0 ? '🤝' : i === 1 ? '🎪' : '🌟'}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-sm font-bold leading-tight"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.organization}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--accent)' }}>
                    {item.period}
                  </p>
                </div>
              </div>

              <p className="text-sm font-medium mb-2 gradient-text">
                {item.role}
              </p>

              <p
                className="text-sm leading-relaxed mb-5 flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
