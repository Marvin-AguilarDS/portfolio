import { SectionShell } from '@/components/layout/SectionShell'
import { Card, Meter, Rise } from '@/components/ui'
import type { SkillGroup } from '@/types/portfolio'

export function SkillsSection({
  skills,
  onBack,
}: {
  skills: SkillGroup[]
  onBack: () => void
}) {
  return (
    <SectionShell
      id="skills"
      subtitle="Tools of the trade, weighted by how often I reach for them."
      onBack={onBack}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <Rise key={group.category}>
            <Card hover={false} className="p-5">
              <h3 className="mb-4 font-display text-xl text-gilt">{group.category}</h3>
              <div className="space-y-3.5">
                {group.items.map((skill) => (
                  <Meter key={skill.name} label={skill.name} value={skill.level} />
                ))}
              </div>
            </Card>
          </Rise>
        ))}
      </div>
    </SectionShell>
  )
}
