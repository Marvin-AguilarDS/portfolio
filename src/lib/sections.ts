export type SectionId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'achievements'
  | 'testimonials'
  | 'contact'

export interface SectionDef {
  id: SectionId
  /** Menu label. */
  label: string
  /** Small roman-numeral / index flavour shown before the label. */
  numeral: string
  /** One-line subtitle shown when the item is active in the menu. */
  hint: string
}

/** The main-menu entries, in display order. */
export const SECTIONS: SectionDef[] = [
  { id: 'about', label: 'About', numeral: 'I', hint: 'Who I am and how I work' },
  { id: 'experience', label: 'Experience', numeral: 'II', hint: 'The road so far' },
  { id: 'projects', label: 'Projects', numeral: 'III', hint: 'Things I have built' },
  { id: 'skills', label: 'Skills', numeral: 'IV', hint: 'Tools of the trade' },
  { id: 'education', label: 'Education', numeral: 'V', hint: 'Studies & credentials' },
  { id: 'achievements', label: 'Achievements', numeral: 'VI', hint: 'Milestones worth marking' },
  { id: 'testimonials', label: 'Testimonials', numeral: 'VII', hint: 'What others say' },
  { id: 'contact', label: 'Contact', numeral: 'VIII', hint: 'Start a conversation' },
]
