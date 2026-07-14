import type {
  ContactInfo,
  PortfolioData,
  Profile,
  SiteLinks,
  SocialLink,
} from '@/types/portfolio'

/**
 * Derives the ordered list of social links shown in the hero, About and Contact
 * sections from the single `SiteLinks` source. Change a URL once and it updates
 * everywhere.
 */
export function buildSocials(links: SiteLinks): SocialLink[] {
  return [
    { label: 'GitHub', url: links.github, icon: 'github' },
    { label: 'LinkedIn', url: links.linkedin, icon: 'linkedin' },
    { label: 'Email', url: `mailto:${links.email}`, icon: 'mail' },
  ]
}

/**
 * Injects the centralized links into the loaded data so `profile.socials`,
 * `contact.socials` and `contact.email` never need to be maintained by hand.
 * Both adapters call this, so JSON and Mongo stay identical.
 */
export function applyLinks<T extends { profile: Profile; contact: ContactInfo }>(
  data: T,
  links: SiteLinks,
): T {
  const socials = buildSocials(links)
  data.profile.socials = socials
  data.contact.email = links.email
  data.contact.socials = socials
  return data
}

export type { PortfolioData }
