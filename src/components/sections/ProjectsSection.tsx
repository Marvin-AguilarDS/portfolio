import { SectionShell } from '@/components/layout/SectionShell'
import { Card, HighlightList, Icon, Rise, TagList } from '@/components/ui'
import type { Project } from '@/types/portfolio'

function ProjectLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: 'github' | 'external'
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-gilt inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-lumiere-ash transition hover:text-gilt"
    >
      <Icon name={icon} className="h-4 w-4" /> {label}
    </a>
  )
}

export function ProjectsSection({
  projects,
  onBack,
}: {
  projects: Project[]
  onBack: () => void
}) {
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0),
  )

  return (
    <SectionShell
      id="projects"
      subtitle="Things I have built — for work, for learning, and for the fun of it."
      onBack={onBack}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {ordered.map((p) => (
          <Rise key={p.id}>
            <Card
              as="article"
              className="group relative flex h-full flex-col overflow-hidden p-5 hover:border-gilt/45 hover:shadow-[0_0_30px_-10px_rgba(233,196,106,0.5)]"
            >
              {p.featured && (
                <span className="absolute right-4 top-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gilt/80">
                  <Icon name="spark" className="h-3 w-3" /> Featured
                </span>
              )}
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-2xl text-lumiere-bone">{p.name}</h3>
                <span className="font-mono text-xs text-gilt/70">{p.year}</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-lumiere-rose">
                {p.role}
              </p>
              <p className="mt-3 font-body text-lumiere-bone/85">{p.description}</p>
              <HighlightList items={p.highlights} size="sm" className="mt-3" />
              <TagList items={p.stack} className="mt-4" />
              <div className="mt-auto flex gap-3 pt-5">
                {p.repoUrl && <ProjectLink href={p.repoUrl} icon="github" label="Code" />}
                {p.liveUrl && <ProjectLink href={p.liveUrl} icon="external" label="Live" />}
              </div>
            </Card>
          </Rise>
        ))}
      </div>
    </SectionShell>
  )
}
