import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 80 },
  },
};

export default function ProjectsSection() {
  const { t } = useLanguage();
  const projects = t('projects.items');

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t('projects.heading')}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {Array.isArray(projects) && projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="project-card"
            >
              <div
                className="project-card-inner glass rounded-2xl p-7 h-full flex flex-col"
                style={{ perspective: '1000px' }}
              >
                {/* Project Number */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-4xl font-black opacity-10"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--accent)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center glass"
                    style={{ color: 'var(--accent)', cursor: 'pointer' }}
                    whileHover={{ scale: 1.1, rotate: -15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ↗
                  </motion.a>
                </div>

                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech?.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
