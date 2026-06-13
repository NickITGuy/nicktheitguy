export const profile = {
  name: 'Nicholas Davis',
  role: 'Full Stack Dev, AI Enthusiast',
  tagline: 'Making technology work for people.',
  heroSummary:
    "Hi, I'm Nick. I am passionate about technology, software development, and understanding how the systems that shape our world work, whether that is code, networks, business, or public policy.",
  about:
    'I have been fascinated by technology for as long as I can remember. What began as curiosity about computers, networks, and the internet grew into a hands-on path through IT and infrastructure, then into software development. Today, I focus on solving practical problems, learning relentlessly, and turning ambitious ideas into tools people can actually use.',
  githubUrl: 'https://github.com/NickITGuy',
  email: 'contact@nicktheitguy.com',
} as const

export const skills = [
  'TypeScript',
  'React',
  'Node.js',
  'Next.js',
  'Full-Stack Development',
  'AI Exploration',
  'Administration',
  'Networking',
  'Hosting',
  'Technical Research & Problem Solving',
] as const

export const projects = [
  {
    name: 'pokedex',
    summary:
      'A modern TypeScript-driven Pokedex app focused on clean architecture, smooth navigation, and rich Pokemon detail presentation.',
    stack: ['TypeScript', 'React Ecosystem', 'CSS'],
    url: 'https://github.com/NickITGuy/pokedex',
  },
  {
    name: 'CookTime',
    summary:
      'A cooking planner built to improve kitchen workflow, including UX updates and a chronological cooking timeline to make execution easier.',
    stack: ['TypeScript', 'Next.js', 'CSS'],
    url: 'https://github.com/NickITGuy/CookTime',
  },
] as const
