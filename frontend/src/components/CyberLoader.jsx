import { motion } from 'framer-motion'

export default function CyberLoader({ progress, expanded = false, barLength = 20 }) {
  const filled = Math.round((progress / 100) * barLength)
  const empty = barLength - filled

  return (
    <motion.div
      className="flex flex-col items-start gap-1 font-mono"
      animate={{ scale: expanded ? 1.1 : 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-sm sm:text-base tracking-tight"
          style={{ color: '#22C55E', textShadow: '0 0 6px rgba(34,197,94,0.5)' }}
        >
          {'█'.repeat(filled)}
          <span style={{ color: 'rgba(34,197,94,0.2)' }}>{'░'.repeat(empty)}</span>
        </span>
        <span className="text-xs sm:text-sm text-[#22C55E] tabular-nums">
          {progress}%
        </span>
      </div>
    </motion.div>
  )
}