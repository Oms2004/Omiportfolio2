import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function ExperienceTimeline() {
  const { t } = useLanguage();
  const timeline = t('experience.timeline');

  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t('experience.heading')}
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="timeline-line hidden md:block" />
          <div className="timeline-line md:hidden" />

          <div className="space-y-14">
            {Array.isArray(timeline) && timeline.map((item, i) => (
              <motion.div
                key={i}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-4`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
              >
                {/* Timeline dot */}
                <div className="timeline-dot" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="glass rounded-2xl p-6 cursor-default"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                        style={{
                          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                          color: 'white',
                        }}
                      >
                        {item.company?.[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                          {item.company}
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--accent)' }}>
                          {item.period}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium mb-2 gradient-text">{item.role}</p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tech?.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            background: 'var(--accent-glow)',
                            color: 'var(--accent)',
                            border: '1px solid var(--accent)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
