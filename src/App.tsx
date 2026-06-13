import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Bot, Cpu, Mail, Network, Sparkles } from 'lucide-react'
import { projects, profile, skills } from '@/data/site-content'

function App() {
  const navItems = useMemo(
    () => [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    [],
  )

  const year = new Date().getFullYear()
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const typewriterName = profile.name
  const typewriterText = 'Operations notebook for software and infrastructure.'
  const totalTypeLength = Math.max(typewriterName.length, typewriterText.length)
  const [typedName, setTypedName] = useState(
    prefersReducedMotion ? typewriterName : '',
  )
  const [typedSubline, setTypedSubline] = useState(
    prefersReducedMotion ? typewriterText : '',
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedName(typewriterName)
      setTypedSubline(typewriterText)
      return
    }

    setTypedName('')
    setTypedSubline('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedName(typewriterName.slice(0, index))
      setTypedSubline(typewriterText.slice(0, index))

      if (index >= totalTypeLength) {
        window.clearInterval(timer)
      }
    }, 38)

    return () => {
      window.clearInterval(timer)
    }
  }, [prefersReducedMotion])

  const showNameCaret = !prefersReducedMotion && typedName.length < typewriterName.length
  const showSublineCaret =
    !prefersReducedMotion &&
    typedSubline.length < typewriterText.length

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sections = document.querySelectorAll<HTMLElement>('.js-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const section = entry.target as HTMLElement
          if (section.dataset.revealed === 'true') return

          section.dataset.revealed = 'true'

          const revealNodes = section.querySelectorAll<HTMLElement>('.js-reveal')
          if (reduceMotion) {
            revealNodes.forEach((node) => node.classList.add('is-visible'))
            return
          }

          revealNodes.forEach((node, index) => {
            window.setTimeout(() => {
              node.classList.add('is-visible')
            }, index * 90)
          })
        })
      },
      { threshold: 0.24 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="site-shell">
      <div className="site-grain" aria-hidden="true" />

      <header className="site-header js-nav">
        <nav className="site-nav">
          <a className="brand" href="#top">
            NICKTHETITGUY
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="site-main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-chip">
              <Sparkles size={14} />
              {profile.role}
            </p>
            <h1 id="hero-title">
              <span aria-label={typewriterName}>
                {typedName}
                {showNameCaret && (
                  <motion.span
                    className="type-caret"
                    aria-hidden="true"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    |
                  </motion.span>
                )}
              </span>
              <span className="hero-subline" aria-label={typewriterText}>
                {typedSubline}
                {showSublineCaret && (
                  <motion.span
                    className="type-caret"
                    aria-hidden="true"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    |
                  </motion.span>
                )}
              </span>
            </h1>
            <p className="hero-text">{profile.heroSummary}</p>

            <div className="hero-actions">
              <a className="cta cta-primary" href="#contact">
                Work With Nick
              </a>
              <a className="cta cta-ghost" href={profile.githubUrl} target="_blank" rel="noreferrer">
                <Network size={16} />
                Browse GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="js-section section section-about" aria-labelledby="about-title">
          <p className="kicker js-reveal">Field Brief</p>
          <h2 id="about-title" className="section-title js-reveal">
            Curiosity became craft. Craft became delivery.
          </h2>
          <p className="section-copy js-reveal">{profile.about}</p>
          <div className="about-meta js-reveal">
            <div>
              <Cpu size={16} />
              <span>System-first architecture</span>
            </div>
            <div>
              <Network size={16} />
              <span>Real-world integration mindset</span>
            </div>
          </div>
        </section>

        <section id="skills" className="js-section section" aria-labelledby="skills-title">
          <p className="kicker js-reveal">Toolchain</p>
          <h2 id="skills-title" className="section-title js-reveal">
            Technical range with strong operational instincts.
          </h2>
          <ul className="skill-list js-reveal" aria-label="Skills and capabilities">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section id="projects" className="js-section section" aria-labelledby="projects-title">
          <p className="kicker js-reveal">Build Log</p>
          <h2 id="projects-title" className="section-title js-reveal">
            Selected projects with practical outcomes.
          </h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card js-reveal">
                <div className="project-head">
                  <h3>{project.name}</h3>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Open
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <p>{project.summary}</p>
                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={`${project.name}-${tech}`}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="js-section section section-contact" aria-labelledby="contact-title">
          <p className="kicker js-reveal">Contact</p>
          <h2 id="contact-title" className="section-title js-reveal">
            Let's build tools people can trust.
          </h2>
          <p className="section-copy js-reveal">
            If you need someone who can connect product goals, software execution, and the systems underneath, let's talk.
          </p>
          <div className="contact-actions js-reveal">
            <a href={`mailto:${profile.email}`} className="cta cta-primary">
              <Mail size={16} />
              {profile.email}
            </a>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="cta cta-ghost">
              <Network size={16} />
              github.com/NickITGuy
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <span>Built with React + TypeScript</span>
          <span>{year}</span>
        </div>
        <p>
          <Bot size={14} />
          Adelaide, Australia
        </p>
      </footer>
    </div>
  )
}

export default App
