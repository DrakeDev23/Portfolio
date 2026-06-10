import { useState, useEffect, useRef } from 'react'
import { Download, ArrowRight, Shield, Code2, ChevronDown } from 'lucide-react'
import avatarImg from '../assets/images/avatar.jpg'

const ROLES = [
  'aspiring Cybersecurity Engineer',
  'Programmer',
  'CTF Player',
  'Full-Stack Developer',
]

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const current = ROLES[roleIdx]

    const tick = () => {
      if (!isDeleting) {
        const next = current.slice(0, displayText.length + 1)
        setDisplayText(next)
        if (next === current) {
          timerRef.current = setTimeout(() => setIsDeleting(true), 2000)
          return
        }
        timerRef.current = setTimeout(tick, 80)
      } else {
        const next = current.slice(0, displayText.length - 1)
        setDisplayText(next)
        if (next === '') {
          setIsDeleting(false)
          setRoleIdx((i) => (i + 1) % ROLES.length)
          return
        }
        timerRef.current = setTimeout(tick, 45)
      }
    }

    timerRef.current = setTimeout(tick, 120)
    return () => clearTimeout(timerRef.current)
  }, [displayText, isDeleting, roleIdx])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#090514' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(122,51,255,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: '10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(180,51,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%237A33FF' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(122, 51, 255, 0.1)',
              border: '1px solid rgba(122, 51, 255, 0.25)',
              color: '#9b6dff',
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)' }}
            />
            Open to opportunities
          </div>

          <div>
            <p className="text-gray-400 text-lg mb-2 font-light">Hello, I&apos;m</p>
            <h1
              className="font-black leading-none mb-4"
              style={{
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #7A33FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Drake
            </h1>

            <div className="flex items-center gap-0 h-9">
              <span
                className="text-xl md:text-2xl font-semibold"
                style={{ color: '#9b6dff' }}
              >
                {displayText}
              </span>
              <span
                className="cursor-blink text-xl md:text-2xl font-light ml-0.5"
                style={{ color: '#7A33FF' }}
              >
                |
              </span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed max-w-md text-base">
            BSIT student building secure, performant software. I bridge clean frontend
            experiences with hardened backend systems and break things professionally in CTFs.
          </p>

          <div className="flex flex-wrap gap-4">
            {[
              { icon: <Code2 size={14} />, label: '19+ technologies' },
              { icon: <Shield size={14} />, label: '8 security tools' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(122,51,255,0.15)',
                  color: '#a78bfa',
                }}
              >
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="/cv.pdf" download className="btn-primary">
              <Download size={16} />
              Download CV
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              Get in Touch
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="relative">
            <div
              className="absolute inset-[-2px] rounded-full"
              style={{
                background: 'linear-gradient(135deg, #7A33FF, #c084fc, #7A33FF)',
                backgroundSize: '200%',
                animation: 'gradient-shift 4s ease infinite',
                padding: '2px',
                borderRadius: '50%',
              }}
            />

            <div
              className="absolute rounded-full border border-[rgba(122,51,255,0.2)] animate-spin-slow"
              style={{
                inset: '-20px',
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background: '#7A33FF',
                  boxShadow: '0 0 12px rgba(122,51,255,0.8)',
                }}
              />
            </div>

            <div
              className="absolute rounded-full border border-[rgba(155,109,255,0.1)]"
              style={{
                inset: '-40px',
                animation: 'spin 22s linear infinite reverse',
              }}
            >
              <div
                className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full"
                style={{
                  background: '#c084fc',
                  boxShadow: '0 0 8px rgba(192,132,252,0.6)',
                }}
              />
            </div>

            <div
              className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(122,51,255,0.4)',
                boxShadow: '0 0 60px rgba(122,51,255,0.2), inset 0 0 40px rgba(122,51,255,0.05)',
              }}
            >
              <img
                src={avatarImg}
                alt="Drake — Web Developer & Cybersecurity Practitioner"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #130e2a, #1e1045)'
                  const placeholder = document.createElement('div')
                  placeholder.style.cssText = 'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;'
                  placeholder.innerHTML = `
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(155,109,255,0.5)" stroke-width="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span style="font-size:11px;color:rgba(155,109,255,0.4);font-family:monospace">avatar.jpg</span>
                  `
                  e.target.parentNode.appendChild(placeholder)
                }}
              />
            </div>

            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                background: 'rgba(9, 5, 20, 0.95)',
                border: '1px solid rgba(122,51,255,0.35)',
                color: '#a78bfa',
                backdropFilter: 'blur(12px)',
              }}
            >
              BSIT · Cebu, PH
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors"
        aria-label="Scroll to About section"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  )
}
