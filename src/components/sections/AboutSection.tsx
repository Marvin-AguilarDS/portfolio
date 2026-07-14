import { SectionShell } from '@/components/layout/SectionShell'
import { Avatar, Button, Eyebrow, Icon, Rise, SocialLinks } from '@/components/ui'
import type { Profile } from '@/types/portfolio'

export function AboutSection({
  profile,
  onBack,
}: {
  profile: Profile
  onBack: () => void
}) {
  return (
    <SectionShell id="about" subtitle={profile.tagline} onBack={onBack}>
      <div className="grid gap-10 md:grid-cols-[auto,1fr] md:items-start">
        <Rise className="flex flex-col items-center gap-4">
          <Avatar src={profile.avatarUrl} alt={profile.name} size={180} />
          <div className="text-center">
            <p className="font-display text-2xl text-lumiere-bone">{profile.name}</p>
            <Eyebrow tracking="wider" tone="gilt">
              {profile.title}
            </Eyebrow>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-lumiere-ash">
              <Icon name="location" className="h-4 w-4 text-gilt/60" />
              {profile.location}
            </p>
          </div>
          <SocialLinks links={profile.socials} variant="icon" className="justify-center" />
        </Rise>

        <div className="space-y-5">
          <Rise>
            <p className="font-display text-lg italic text-lumiere-rose">“{profile.epigraph}”</p>
          </Rise>
          {profile.summary.map((para, i) => (
            <Rise key={i}>
              <p className="font-body text-lg leading-relaxed text-lumiere-bone/90">{para}</p>
            </Rise>
          ))}
          {profile.resumeUrl && (
            <Rise>
              <Button href={profile.resumeUrl} variant="solid">
                <Icon name="external" className="h-4 w-4" />
                Download résumé
              </Button>
            </Rise>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
