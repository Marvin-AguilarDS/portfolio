import { SectionShell } from '@/components/layout/SectionShell'
import { Card, Rise } from '@/components/ui'
import type { Testimonial } from '@/types/portfolio'

export function TestimonialsSection({
  testimonials,
  onBack,
}: {
  testimonials: Testimonial[]
  onBack: () => void
}) {
  return (
    <SectionShell
      id="testimonials"
      subtitle="Words from the people I've built and shipped alongside."
      onBack={onBack}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t) => (
          <Rise key={t.id}>
            <Card as="figure" className="flex h-full flex-col p-6">
              <span aria-hidden="true" className="font-display text-5xl leading-none text-gilt/40">
                “
              </span>
              <blockquote className="-mt-2 flex-1 font-body text-lg italic leading-relaxed text-lumiere-bone/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-gilt/15 pt-4">
                <p className="font-display text-lg text-lumiere-bone">{t.author}</p>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-lumiere-rose">
                  {t.role} · {t.company}
                </p>
              </figcaption>
            </Card>
          </Rise>
        ))}
      </div>
    </SectionShell>
  )
}
