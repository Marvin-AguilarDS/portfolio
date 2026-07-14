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
 * Every data source (JSON files, a MongoDB-backed API, a CMS, …) implements
 * this interface. The UI only ever talks to a `PortfolioAdapter`, so swapping
 * the backing store is a one-line change in `src/data/config.ts`.
 */
export interface PortfolioAdapter {
  /** Human-readable name, handy for debugging / a status badge. */
  readonly source: string

  getAll(): Promise<PortfolioData>
  getLinks(): Promise<SiteLinks>
  getProfile(): Promise<Profile>
  getExperience(): Promise<ExperienceItem[]>
  getProjects(): Promise<Project[]>
  getSkills(): Promise<SkillGroup[]>
  getEducation(): Promise<EducationItem[]>
  getAchievements(): Promise<Achievement[]>
  getTestimonials(): Promise<Testimonial[]>
  getContact(): Promise<ContactInfo>
}
