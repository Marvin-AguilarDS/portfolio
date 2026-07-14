// ---------------------------------------------------------------------------
// Domain types for the portfolio. These are the single source of truth shared
// by every data adapter (JSON, MongoDB, …) and every UI component.
// ---------------------------------------------------------------------------

export interface SocialLink {
  label: string
  url: string
  /** icon key resolved in the UI (github | linkedin | mail | globe | twitter) */
  icon: 'github' | 'linkedin' | 'mail' | 'globe' | 'twitter'
}

/**
 * The single source of truth for contact identity. Edit these in one place
 * (`links.json`) — the adapter derives the email, mailto, and every social
 * link shown across the site from here.
 */
export interface SiteLinks {
  email: string
  github: string
  linkedin: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  /** Short "epigraph" shown under the name — Expedition flavour text. */
  epigraph: string
  /** Path/URL to the avatar image. Empty string => render the SVG avatar. */
  avatarUrl: string
  summary: string[]
  socials: SocialLink[]
  resumeUrl?: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  summary: string
  highlights: string[]
  stack: string[]
}

export interface Project {
  id: string
  name: string
  role: string
  year: string
  description: string
  highlights: string[]
  stack: string[]
  repoUrl?: string
  liveUrl?: string
  /** 1 = flagship, used to sort / feature. */
  featured?: boolean
}

export interface SkillGroup {
  category: string
  items: { name: string; level: number }[] // level 0..100
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  year: string
  description: string
}

export interface EducationItem {
  id: string
  institution: string
  credential: string
  field: string
  period: string
  location: string
  notes: string[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface ContactInfo {
  email: string
  location: string
  availability: string
  socials: SocialLink[]
}

/** The complete payload every adapter must be able to return. */
export interface PortfolioData {
  profile: Profile
  experience: ExperienceItem[]
  projects: Project[]
  skills: SkillGroup[]
  education: EducationItem[]
  achievements: Achievement[]
  testimonials: Testimonial[]
  contact: ContactInfo
}
