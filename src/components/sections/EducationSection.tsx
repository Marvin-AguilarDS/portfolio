import { SectionShell } from '@/components/layout/SectionShell'
import { Card, Eyebrow, HighlightList, Rise } from '@/components/ui'
import type { EducationItem } from '@/types/portfolio'

export function EducationSection({
  education,
  onBack,
}: {
  education: EducationItem[]
  onBack: () => void
}) {
  return (
    <SectionShell
      id="education"
      subtitle="Studies, certifications, and the formal side of the craft."
      onBack={onBack}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item) => (
          <Rise key={item.id}>
            <Card as="article" className="flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl text-lumiere-bone">{item.credential}</h3>
                <Eyebrow as="span" tracking="wider" tone="gilt" className="shrink-0">
                  {item.period}
                </Eyebrow>
              </div>
              <p className="mt-1 font-body text-lumiere-rose">{item.institution}</p>
              <p className="font-body text-sm text-lumiere-ash">
                {item.field} · {item.location}
              </p>
              <HighlightList items={item.notes} className="mt-4" />
            </Card>
          </Rise>
        ))}
      </div>
    </SectionShell>
  )
}
