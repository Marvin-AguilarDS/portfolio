import { motion } from 'framer-motion'

/**
 * A labelled 0–100 progress meter with a gilded fill that animates into view.
 * Used for skill levels, but generic enough for any proportion.
 */
export function Meter({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div>
      <div className="mb-1 flex justify-between font-body text-sm text-lumiere-bone/85">
        <span>{label}</span>
        <span className="font-mono text-xs text-lumiere-ash">{pct}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-obscur-slate">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gilt-deep via-gilt to-gilt-bright"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: '0 0 10px rgba(233,196,106,0.5)' }}
        />
      </div>
    </div>
  )
}
