import { SectionShell } from '@/components/layout/SectionShell'
import { Card, Eyebrow, Icon, Rise } from '@/components/ui'
import type { Achievement } from '@/types/portfolio'

export function AchievementsSection({
  achievements,
  onBack,
}: {
  achievements: Achievement[]
  onBack: () => void
}) {
  return (
    <SectionShell
      id="achievements"
      subtitle="Milestones worth marking along the way."
      onBack={onBack}
    >
      <div className="space-y-4">
        {achievements.map((a) => (
          <Rise key={a.id}>
            <Card as="article" className="flex gap-4 p-5">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gilt/40 bg-gilt/10 text-gilt shadow-[0_0_16px_-4px_rgba(233,196,106,0.6)]">
                <Icon name="spark" className="h-5 w-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-xl text-lumiere-bone">{a.title}</h3>
                  <Eyebrow as="span" tracking="wider" tone="gilt">
                    {a.year}
                  </Eyebrow>
                </div>
                <p className="font-body text-sm text-lumiere-rose">{a.issuer}</p>
                <p className="mt-1.5 font-body text-lumiere-bone/85">{a.description}</p>
              </div>
            </Card>
          </Rise>
        ))}
      </div>
    </SectionShell>
  )
}
