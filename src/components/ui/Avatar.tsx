import { motion } from 'framer-motion'

/**
 * Frames the portrait in a gilded, breathing halo — the way an Expedition
 * character card presents its hero. Falls back gracefully if the image is
 * missing.
 */
export function Avatar({
  src,
  alt,
  size = 168,
}: {
  src: string
  alt: string
  size?: number
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* breathing glow */}
      <div
        className="animate-breathe absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            'radial-gradient(circle, rgba(233,196,106,0.55), rgba(201,123,142,0.18) 55%, transparent 72%)',
        }}
        aria-hidden="true"
      />
      {/* rotating gilded ring */}
      <motion.div
        className="absolute inset-[-6px] rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent, #e9c46a, transparent 40%, #c97b8e, transparent 70%, #e9c46a)',
          maskImage: 'radial-gradient(circle, transparent 68%, black 70%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 68%, black 70%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 overflow-hidden rounded-full border border-gilt/40 bg-obscur-ink shadow-[0_0_40px_-8px_rgba(233,196,106,0.5)]">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 20%' }}
          draggable={false}
        />
      </div>
    </div>
  )
}
