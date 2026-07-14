import { motion } from 'framer-motion'
import { Avatar, Eyebrow, Icon, SocialLinks } from '@/components/ui'
import type { Profile } from '@/types/portfolio'

/** The identity / title panel on the left of the main menu. */
export function MenuHero({ profile }: { profile: Profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      <Avatar src={profile.avatarUrl} alt={profile.name} size={168} />
      <Eyebrow tracking="widest" tone="gilt" className="mt-6">
        Expedition · 33
      </Eyebrow>
      <h1 className="mt-3 pb-2 font-display text-6xl font-semibold leading-[1.08] text-gilt-shimmer sm:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-2 font-display text-2xl italic text-lumiere-rose sm:text-3xl">
        {profile.title}
      </p>
      <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-lumiere-ash">
        {profile.tagline}
      </p>
      <p className="mt-6 max-w-md border-l-2 border-gilt/40 pl-4 font-display text-base italic text-lumiere-bone/70">
        {profile.epigraph}
      </p>

      <div className="mt-7 flex items-center gap-3">
        <SocialLinks links={profile.socials} variant="icon" />
        <span className="ml-1 flex items-center gap-1 font-body text-sm text-lumiere-ash/70">
          <Icon name="location" className="h-4 w-4 text-gilt/50" />
          {profile.location}
        </span>
      </div>
    </motion.div>
  )
}
