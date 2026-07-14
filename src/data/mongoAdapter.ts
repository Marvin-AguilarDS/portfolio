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
 * Reads the portfolio from a MongoDB-backed REST API.
 *
 * NOTE: browsers cannot open a raw MongoDB connection, so this adapter talks to
 * a thin HTTP API that owns the database driver. A reference Express + Mongo
 * server lives in `/server` (see README). The endpoints it expects:
 *
 *   GET {API_BASE_URL}/profile       -> Profile
 *   GET {API_BASE_URL}/experience    -> ExperienceItem[]
 *   GET {API_BASE_URL}/projects      -> Project[]
 *   GET {API_BASE_URL}/skills        -> SkillGroup[]
 *   GET {API_BASE_URL}/achievements  -> Achievement[]
 *   GET {API_BASE_URL}/contact       -> ContactInfo
 *   GET {API_BASE_URL}/all           -> PortfolioData   (optional fast path)
 *
 * Because it implements the exact same `PortfolioAdapter` interface as the JSON
 * adapter, switching between them is a config change only — no UI changes.
 */
export class MongoAdapter implements PortfolioAdapter {
  readonly source = 'mongo'

  constructor(private readonly baseUrl: string) {}

  private async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${path}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`MongoAdapter: GET /${path} failed (${res.status})`)
    }
    return (await res.json()) as T
  }

  async getAll(): Promise<PortfolioData> {
    // The centralized links are always fetched and applied so JSON and Mongo
    // stay identical, regardless of the /all fast path.
    const links = this.getLinks()
    // Prefer a single round-trip if the API exposes /all; otherwise fan out.
    try {
      const all = await this.get<PortfolioData>('all')
      return applyLinks(all, await links)
    } catch {
      const [
        profile,
        experience,
        projects,
        skills,
        education,
        achievements,
        testimonials,
        contact,
      ] = await Promise.all([
        this.getProfile(),
        this.getExperience(),
        this.getProjects(),
        this.getSkills(),
        this.getEducation(),
        this.getAchievements(),
        this.getTestimonials(),
        this.getContact(),
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
        await links,
      )
    }
  }

  getLinks = () => this.get<SiteLinks>('links')
  getProfile = () => this.get<Profile>('profile')
  getExperience = () => this.get<ExperienceItem[]>('experience')
  getProjects = () => this.get<Project[]>('projects')
  getSkills = () => this.get<SkillGroup[]>('skills')
  getEducation = () => this.get<EducationItem[]>('education')
  getAchievements = () => this.get<Achievement[]>('achievements')
  getTestimonials = () => this.get<Testimonial[]>('testimonials')
  getContact = () => this.get<ContactInfo>('contact')
}
