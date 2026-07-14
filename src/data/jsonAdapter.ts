import type { PortfolioAdapter } from './adapter'
import { applyLinks } from './links'
import type {
  Achievement,
  ContactInfo,
  EducationItem,
  ExperienceItem,
  PortfolioData,
  Profile,
  Project,
  SiteLinks,
  SkillGroup,
  Testimonial,
} from '@/types/portfolio'

/**
 * Reads the portfolio from static JSON files served out of `/public/data`.
 * This is the default, zero-infrastructure backend — perfect for a static
 * host (GitHub Pages, Netlify, Vercel, …).
 */
export class JsonAdapter implements PortfolioAdapter {
  readonly source = 'json'

  constructor(private readonly basePath: string) {}

  private async load<T>(file: string): Promise<T> {
    const res = await fetch(`${this.basePath}/${file}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`JsonAdapter: failed to load ${file} (${res.status})`)
    }
    return (await res.json()) as T
  }

  async getAll(): Promise<PortfolioData> {
    const [
      profile,
      experience,
      projects,
      skills,
      education,
      achievements,
      testimonials,
      contact,
      links,
    ] = await Promise.all([
      this.getProfile(),
      this.getExperience(),
      this.getProjects(),
      this.getSkills(),
      this.getEducation(),
      this.getAchievements(),
      this.getTestimonials(),
      this.getContact(),
      this.getLinks(),
    ])
    return applyLinks(
      {
        profile,
        experience,
        projects,
        skills,
        education,
        achievements,
        testimonials,
        contact,
      },
      links,
    )
  }

  getLinks = () => this.load<SiteLinks>('links.json')
  getProfile = () => this.load<Profile>('profile.json')
  getExperience = () => this.load<ExperienceItem[]>('experience.json')
  getProjects = () => this.load<Project[]>('projects.json')
  getSkills = () => this.load<SkillGroup[]>('skills.json')
  getEducation = () => this.load<EducationItem[]>('education.json')
  getAchievements = () => this.load<Achievement[]>('achievements.json')
  getTestimonials = () => this.load<Testimonial[]>('testimonials.json')
  getContact = () => this.load<ContactInfo>('contact.json')
}
