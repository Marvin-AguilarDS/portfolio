import { SectionShell } from '@/components/layout/SectionShell'
import { Button, GiltDivider, Icon, Rise, SocialLinks } from '@/components/ui'
import type { ContactInfo } from '@/types/portfolio'

export function ContactSection({
  contact,
  onBack,
}: {
  contact: ContactInfo
  onBack: () => void
}) {
  return (
    <SectionShell id="contact" subtitle={contact.availability} onBack={onBack}>
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <Rise>
          <Button href={`mailto:${contact.email}`} variant="outline" external={false} className="text-lg">
            <Icon name="mail" className="h-5 w-5 text-gilt" />
            {contact.email}
          </Button>
        </Rise>

        <Rise>
          <p className="flex items-center justify-center gap-2 font-body text-lumiere-ash">
            <Icon name="location" className="h-4 w-4 text-gilt/60" />
            {contact.location}
          </p>
        </Rise>

        <Rise>
          <GiltDivider className="my-2" />
        </Rise>

        <Rise>
          <SocialLinks links={contact.socials} variant="labeled" className="justify-center gap-4" />
        </Rise>

        <Rise>
          <p className="pt-4 font-display text-lg italic text-lumiere-rose">
            “When one falls, we continue.”
          </p>
        </Rise>
      </div>
    </SectionShell>
  )
}
