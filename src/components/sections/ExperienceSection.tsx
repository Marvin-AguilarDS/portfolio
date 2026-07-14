import { SectionShell } from '@/components/layout/SectionShell'
import { Card, Eyebrow, HighlightList, Rise, TagList } from '@/components/ui'
import type { ExperienceItem } from '@/types/portfolio'

export function ExperienceSection({
  experience,
  onBack,
}: {
  experience: ExperienceItem[]
  onBack: () => void
}) {
  return (
    <SectionShell
      id="experience"
      subtitle="The road so far — roles, teams, and the work that shaped them."
      onBack={onBack}
    >
      <ol className="relative ml-3 border-l border-gilt/20 pl-8">
        {experience.map((item) => (
          <Rise key={item.id} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="h-3 w-3 rounded-full bg-gilt shadow-[0_0_12px_2px_rgba(233,196,106,0.6)]" />
            </span>
            <Card className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-lumiere-bone">{item.role}</h3>
                <Eyebrow as="span" tracking="wider" tone="gilt">
                  {item.period}
                </Eyebrow>
              </div>
              <p className="font-body text-lumiere-rose">
                {item.company} · <span className="text-lumiere-ash">{item.location}</span>
              </p>
              <p className="mt-3 font-body text-lumiere-bone/85">{item.summary}</p>
              <HighlightList items={item.highlights} className="mt-3" />
              <TagList items={item.stack} className="mt-4" />
            </Card>
          </Rise>
        ))}
      </ol>
    </SectionShell>
  )
}
