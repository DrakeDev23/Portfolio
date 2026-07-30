import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import CyberLoader from './CyberLoader'
import TerminalBoot from './TerminalBoot'
import { usePortfolioLoader } from '../hooks/usePortfolioLoader'

const SYS_INFO = [
  { label: 'OS', value: 'Arch Linux' },
  { label: 'Kernel', value: 'Linux' },
  { label: 'Shell', value: 'bash' },
  { label: 'Theme', value: 'Cyber Security' },
]

export default function LinuxBootLoader({ onComplete }) {
  const { progress, logs, status, error, data, phase, run } = usePortfolioLoader()
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    run()
  }, [run])

  useEffect(() => {
    if (phase !== 'ready') return

    const timer = setTimeout(() => {
      onComplete(data)
    }, 1800)

    return () => clearTimeout(timer)
  }, [phase, onComplete, data])

  const isReady = phase === 'ready'
  const isError = phase === 'error'

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #030014 0%, #120024 45%, #2D0B59 100%)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.12) 0%, transparent 60%)',
        }}
      />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#A855F7]"
          style={{
            top: `${10 + (i * 7) % 80}%`,
            left: `${5 + (i * 13) % 90}%`,
            opacity: 0.2 + (i % 3) * 0.15,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-xl">
        <CyberLoader progress={progress} expanded={isReady} />

        <div className="text-center space-y-2">
          <motion.h1 className="font-mono font-bold text-xl sm:text-2xl tracking-widest" style={{ color: '#FFFFF' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            DRAKE@ARCHLINUX
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[10px] sm:text-xs text-gray-500">
            {SYS_INFO.map(({ label, value }) => (
              <span key={label}>
                <span className="text-[#A855F7]/70">{label}:</span> {value}
              </span>
            ))}
          </div>
        </div>

        <TerminalBoot logs={logs} />

        <div className="text-center space-y-2 w-full">
          <AnimatePresence mode="wait">
            {isReady ? (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-1 font-mono"
              >
                <p className="text-[#22C55E] text-sm font-semibold tracking-widest">
                  SYSTEM READY
                </p>
                <p className="text-[#C084FC] text-xs tracking-wider">DATABASE ONLINE</p>
                <p className="text-[#A855F7] text-xs tracking-wider">ACCESS GRANTED</p>
              </motion.div>
            ) : isError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <p className="font-mono text-red-400 text-sm font-semibold tracking-widest">
                  SYSTEM ERROR
                </p>
                <p className="font-mono text-gray-400 text-xs">
                  {error?.includes('Database') ? 'Database unavailable' : 'Backend connection failed'}
                </p>
                <button
                  onClick={run}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all"
                  style={{
                    background: 'rgba(168,85,247,0.15)',
                    border: '1px solid rgba(168,85,247,0.4)',
                    color: '#C084FC',
                  }}
                >
                  <RefreshCw size={14} />
                  Retry Connection
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-mono text-gray-400 text-xs sm:text-sm">{status}</p>
                <p className="font-mono text-[#A855F7] text-xs mt-1">
                  Progress: {progress}%
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
