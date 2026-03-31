import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { skills } from '../data/portfolio';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: 'spring', stiffness: 100 },
  },
};

export default function SkillsSection() {
  const { t } = useLanguage();

  const categories = [
    { key: 'languages', data: skills.languages },
    { key: 'frontend', data: skills.frontend },
    { key: 'backend', data: skills.backend },
    { key: 'tools', data: skills.tools },
    { key: 'aiml', data: skills.aiml },
  ];

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t('skills.heading')}
        </motion.h2>

        <div className="space-y-10">
          {categories.map((cat, catIdx) => (
            <div key={cat.key}>
              <motion.h3
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <span className="w-8 h-0.5 rounded" style={{ background: 'var(--accent)' }} />
                {t(`skills.categories.${cat.key}`)}
              </motion.h3>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {cat.data.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={cardVariants}
                    className="glass rounded-xl p-4 text-center cursor-default group"
                    whileHover={{
                      y: -6,
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                      {skill.icon}
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {skill.name}
                    </p>
                    {/* Skill level bar */}
                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'var(--border)' }}
                    >
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
