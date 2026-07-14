import { useCallback, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AboutSection } from '@/components/sections/AboutSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { usePortfolio } from '@/context/PortfolioContext'
import { SECTIONS, type SectionId } from '@/lib/sections'

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { data } = usePortfolio()
  const navigate = useNavigate()

  const back = useCallback(() => navigate('/'), [navigate])

  const known = SECTIONS.some((s) => s.id === sectionId)

  // Esc / Backspace / ← returns to the menu.
  useEffect(() => {
    if (!known) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return
      }
      if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigate('/')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [known, navigate])

  // Jump to the top whenever the section changes.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [sectionId])

  if (!known) return <Navigate to="/" replace />

  const id = sectionId as SectionId
  switch (id) {
    case 'about':
      return <AboutSection profile={data.profile} onBack={back} />
    case 'experience':
      return <ExperienceSection experience={data.experience} onBack={back} />
    case 'projects':
      return <ProjectsSection projects={data.projects} onBack={back} />
    case 'skills':
      return <SkillsSection skills={data.skills} onBack={back} />
    case 'education':
      return <EducationSection education={data.education} onBack={back} />
    case 'achievements':
      return <AchievementsSection achievements={data.achievements} onBack={back} />
    case 'testimonials':
      return <TestimonialsSection testimonials={data.testimonials} onBack={back} />
    case 'contact':
      return <ContactSection contact={data.contact} onBack={back} />
  }
}
