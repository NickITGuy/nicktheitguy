import { useEffect, useMemo } from 'react'
import { animate, createTimeline, stagger } from 'animejs'
import {
  ArrowUpRight,
  Bot,
  Cpu,
  Mail,
  Network,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const intro = createTimeline({
      defaults: { duration: 900, ease: 'out(4)' },
    })

    if (!reduceMotion) {
      intro
        .add('.js-nav, .js-hero-chip', {
          opacity: [0, 1],
          translateY: [-20, 0],
        })
        .add(
          '.js-hero-title .line',
          {
            opacity: [0, 1],
            translateY: [36, 0],
            delay: stagger(90),
          },
          '<<+=120',
        )
        .add(
          '.js-hero-text, .js-hero-cta',
          {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(80),
          },
          '<<+=140',
        )
    }

    const orbs = animate('.js-orb', {
      x: () => Math.random() * 28 - 14,
      y: () => Math.random() * 26 - 13,
      scale: [1, 1.08],
      rotate: [0, 16],
      duration: 3400,
      loop: true,
      alternate: true,
      delay: stagger(260),
      ease: 'inOut(3)',
      autoplay: !reduceMotion,
    })

    const sections = document.querySelectorAll<HTMLElement>('.js-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const section = entry.target as HTMLElement
          if (section.dataset.revealed === 'true') return

          section.dataset.revealed = 'true'
          animate(section.querySelectorAll('.js-reveal'), {
            opacity: [0, 1],
            y: [32, 0],
            duration: 720,
            delay: stagger(100),
            ease: 'out(3)',
            autoplay: !reduceMotion,
          })
        })
      },
      { threshold: 0.28 },
    )

    sections.forEach((section) => observer.observe(section))

    const projectCards = document.querySelectorAll<HTMLElement>('.js-project-card')
    const hoverCleans = Array.from(projectCards).map((card) => {
      const onEnter = () => {
        animate(card, {
          scale: 1.02,
          y: -6,
          boxShadow: '0 20px 45px rgba(7, 59, 76, 0.16)',
          duration: 220,
          ease: 'out(4)',
        })
      }

      const onLeave = () => {
        animate(card, {
          scale: 1,
          y: 0,
          boxShadow: '0 10px 28px rgba(7, 59, 76, 0.12)',
          duration: 220,
          ease: 'out(3)',
        })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)

      return () => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      }
    })

    const spotlightWrap = document.querySelector<HTMLElement>('.js-spotlight-wrap')
    const spotlight = document.querySelector<HTMLElement>('.js-project-spotlight')

    const pointerCleanup = (() => {
      if (!spotlightWrap || !spotlight) return () => {}

      const onPointerMove = (event: PointerEvent) => {
        const rect = spotlightWrap.getBoundingClientRect()
        spotlightWrap.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        spotlightWrap.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      }

      const onPointerEnter = () => {
        animate(spotlight, {
          opacity: [0, 1],
          scale: [0.94, 1],
          duration: 240,
          ease: 'out(4)',
        })
      }

      const onPointerLeave = () => {
        animate(spotlight, {
          opacity: [1, 0],
          scale: [1, 0.94],
          duration: 220,
          ease: 'out(3)',
        })
      }

      spotlightWrap.addEventListener('pointermove', onPointerMove)
      spotlightWrap.addEventListener('pointerenter', onPointerEnter)
      spotlightWrap.addEventListener('pointerleave', onPointerLeave)

      return () => {
        spotlightWrap.removeEventListener('pointermove', onPointerMove)
        spotlightWrap.removeEventListener('pointerenter', onPointerEnter)
        spotlightWrap.removeEventListener('pointerleave', onPointerLeave)
      }
    })()

    const creatureWrap = document.querySelector<HTMLElement>('.js-creature-wrap')
    const creatureCore = document.querySelector<HTMLElement>('.js-creature-core')
    const creatureNodes = Array.from(
      document.querySelectorAll<HTMLElement>('.js-creature-node'),
    )

    const creatureCleanup = (() => {
      if (!creatureWrap || !creatureCore || creatureNodes.length === 0 || reduceMotion) {
        return () => {}
      }

      let rafId = 0
      const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
      const head = { x: target.x, y: target.y }
      const trail = creatureNodes.map(() => ({ x: target.x, y: target.y }))

      const tick = () => {
        head.x += (target.x - head.x) * 0.24
        head.y += (target.y - head.y) * 0.24

        let leadX = head.x
        let leadY = head.y

        trail.forEach((node, index) => {
          const follow = Math.max(0.22, 0.42 - index * 0.015)
          node.x += (leadX - node.x) * follow
          node.y += (leadY - node.y) * follow
          leadX = node.x
          leadY = node.y

          const scale = 1 - index * 0.05
          const nodeEl = creatureNodes[index]
          nodeEl.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%) scale(${scale})`
        })

        creatureCore.style.transform = `translate3d(${head.x}px, ${head.y}px, 0) translate(-50%, -50%)`
        rafId = window.requestAnimationFrame(tick)
      }

      const onMove = (event: PointerEvent) => {
        target.x = event.clientX
        target.y = event.clientY
      }

      const pulse = animate(creatureCore, {
        scale: [1, 1.28],
        opacity: [0.56, 0.94],
        duration: 820,
        direction: 'alternate',
        loop: true,
        ease: 'inOut(2)',
      })

      window.addEventListener('pointermove', onMove)
      rafId = window.requestAnimationFrame(tick)

      return () => {
        window.removeEventListener('pointermove', onMove)
        window.cancelAnimationFrame(rafId)
        pulse.revert()
      }
    })()

    return () => {
      intro.revert()
      orbs.revert()
      observer.disconnect()
      hoverCleans.forEach((clean) => clean())
      pointerCleanup()
      creatureCleanup()
    }
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <div className="js-creature-wrap pointer-events-none fixed inset-0 z-40" aria-hidden="true">
        <div className="js-creature-core creature-core" />
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={`creature-${index}`} className="js-creature-node creature-node" />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 neon-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-14 top-24 h-48 w-48 rounded-full bg-[rgba(0,252,255,0.2)] blur-3xl js-orb" />
      <div className="pointer-events-none absolute right-4 top-64 h-40 w-40 rounded-full bg-[rgba(255,43,163,0.18)] blur-3xl js-orb" />

      <header className="sticky top-0 z-30 border-b border-[rgba(113,200,255,0.2)] bg-[rgba(6,10,24,0.72)] backdrop-blur-lg js-nav">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a className="font-display text-base tracking-[0.18em] text-[var(--ink-strong)]" href="#top">
            NICKTHETITGUY
          </a>
          <div className="hidden gap-5 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[var(--ink-soft)] transition hover:text-[var(--ink-strong)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-6xl flex-col gap-28 px-5 py-14 lg:px-8 lg:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]" aria-labelledby="hero-title">
          <div className="space-y-7">
            <Badge className="js-hero-chip border border-[rgba(130,218,255,0.3)] bg-[rgba(25,43,88,0.44)] text-[var(--ink-strong)] shadow-sm">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              {profile.role}
            </Badge>
            <h1 id="hero-title" className="js-hero-title text-balance font-display text-5xl leading-[0.98] text-[var(--ink-strong)] md:text-7xl">
              <span className="line block">{profile.name}</span>
              <span className="line block text-[clamp(1.45rem,2.4vw,2.25rem)] text-[var(--ink-soft)]">
                {profile.tagline}
              </span>
            </h1>
            <p className="js-hero-text max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
              {profile.heroSummary}
            </p>
            <div className="js-hero-cta flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-[linear-gradient(135deg,#3f7cff,#00d9ff)] text-[#04122a] hover:brightness-110">
                <a href="#contact">Hire Me</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[rgba(130,218,255,0.45)] bg-[rgba(8,17,43,0.62)] text-[var(--ink-strong)] hover:bg-[rgba(22,36,77,0.74)]">
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                  <Network className="mr-2 h-4 w-4" />
                  View GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="relative rounded-3xl border border-[rgba(113,200,255,0.25)] bg-[var(--panel)] p-6 shadow-[0_16px_35px_rgba(0,0,0,0.34)]">
            <div className="mb-4 flex items-center gap-2 text-sm text-[var(--ink-soft)]">
              <Cpu className="h-4 w-4" />
              Systems + Software + AI
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{profile.about}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-[rgba(35,70,135,0.6)] text-[var(--ink-strong)]">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="js-section space-y-4" aria-labelledby="about-title">
          <p className="js-reveal section-kicker">About</p>
          <h2 id="about-title" className="js-reveal section-title">Curious by Nature, Builder by Trade</h2>
          <p className="js-reveal section-copy max-w-3xl">{profile.about}</p>
        </section>

        <section id="skills" className="js-section space-y-6" aria-labelledby="skills-title">
          <p className="js-reveal section-kicker">Skills</p>
          <h2 id="skills-title" className="js-reveal section-title">A full-stack mindset with systems-level thinking.</h2>
          <div className="js-reveal flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Badge key={skill} className="rounded-full border border-[rgba(123,211,255,0.28)] bg-[rgba(8,24,66,0.78)] px-4 py-1.5 text-sm font-medium text-[var(--ink-strong)]">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects" className="js-section space-y-6" aria-labelledby="projects-title">
          <p className="js-reveal section-kicker">Projects</p>
          <h2 id="projects-title" className="js-reveal section-title">Selected builds from my GitHub.</h2>
          <p className="js-reveal section-copy max-w-3xl">
            Focused on practical outcomes, clear architecture, and better user workflows.
          </p>
          <div className="js-spotlight-wrap relative grid gap-5 md:grid-cols-2">
            <div className="js-project-spotlight pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0" aria-hidden="true" />
            {projects.map((project) => (
              <Card key={project.name} className="js-reveal js-project-card border-[rgba(108,199,255,0.22)] bg-[rgba(8,18,52,0.74)] backdrop-blur-sm shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-[var(--ink-strong)]">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={`${project.name}-${tech}`} variant="secondary" className="bg-[rgba(0,188,255,0.2)] text-[var(--ink-strong)]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="group border-[rgba(130,218,255,0.45)] bg-[rgba(7,19,50,0.7)] text-[var(--ink-strong)] hover:bg-[rgba(22,36,77,0.74)]">
                    <a href={project.url} target="_blank" rel="noreferrer">
                      Open Repository
                      <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="js-section mb-8" aria-labelledby="contact-title">
          <div className="js-reveal rounded-3xl border border-[rgba(113,200,255,0.25)] bg-[rgba(8,18,52,0.8)] p-7 shadow-[0_14px_34px_rgba(0,0,0,0.38)] md:p-10">
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title" className="section-title">Let's Build Something Useful</h2>
            <p className="section-copy max-w-2xl">
              If you are looking for someone who can bridge software, systems, and strategy, I would love to connect.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[linear-gradient(135deg,#3f7cff,#00d9ff)] text-[#04122a] hover:brightness-110">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {profile.email}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[rgba(130,218,255,0.45)] bg-[rgba(8,17,43,0.62)] text-[var(--ink-strong)] hover:bg-[rgba(22,36,77,0.74)]">
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                  <Network className="mr-2 h-4 w-4" />
                  github.com/NickITGuy
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgba(113,200,255,0.2)] bg-[rgba(6,10,24,0.72)] px-5 py-5 text-sm text-[var(--ink-soft)] lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <span>Built with React, TypeScript, shadcn, and anime.js</span>
          <span className="inline-flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Adelaide, Australia
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
