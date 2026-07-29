import { motion, AnimatePresence } from 'framer-motion'

function BootLine({ type, message }) {
  const prefix = type === 'error' ? '[ ERROR ]' : '[  OK  ]'
  const color = type === 'error' ? '#ef4444' : '#22C55E'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="font-mono text-xs sm:text-sm leading-relaxed"
    >
      <span style={{ color }} className="mr-2">
        {prefix}
      </span>
      <span className="text-gray-300">{message}</span>
    </motion.div>
  )
}

export default function TerminalBoot({ logs }) {
  return (
    <div
      className="w-full max-w-lg rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(168,85,247,0.2)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 0 40px rgba(168,85,247,0.08)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: 'rgba(168,85,247,0.12)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-[10px] text-gray-500 tracking-wider">
          drake@archlinux — boot.log
        </span>
      </div>

      <div className="px-4 py-3 space-y-1 max-h-44 overflow-y-auto">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <BootLine key={log.id} type={log.type} message={log.message} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
