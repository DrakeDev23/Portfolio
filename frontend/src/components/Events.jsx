import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from './SectionHeader'

// ─── Image imports ────────────────────────────────────────────────────────────
import aiImg from '../assets/images/events/ai.jpeg'
import capstoneImg from '../assets/images/events/capstone.jpeg'
import ctfImg from '../assets/images/events/ctf.jpeg'
import ictImg from '../assets/images/events/ict.jpeg'
import launchImg from '../assets/images/events/launch.jpeg'
import networksecImg from '../assets/images/events/networksec.jpeg'
import webdevImg from '../assets/images/events/webdev.jpeg'

// ─── Event Data ───────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 'ctf',
    name: 'Capture The Flag — IT Days',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: 'Champion',
    achievement: 'champion',
    desc: 'Competed in a cybersecurity Capture The Flag challenge during CEC IT Days, clinching 1st place by solving challenges across cryptography, web exploitation, and forensics.',
    image: ctfImg,
  },
  {
    id: 'webdev',
    name: 'Web Dev Design — IT Days',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: '1st Runner-Up',
    achievement: 'runner-up',
    desc: 'Collaborated with my team to design and build a web application during CEC IT Days, earning 1st Runner-Up for our UI/UX design and overall execution.',
    image: webdevImg,
  },
  {
    id: 'ai',
    name: 'Gemini Study Jam',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: 'Participant',
    achievement: null,
    desc: 'Attended the Google Gemini Study Jam, a hands-on workshop exploring Gemini AI capabilities, prompt engineering, and practical AI integrations for developers.',
    image: aiImg,
  },
  {
    id: 'capstone',
    name: 'Capstone Presentation',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: 'Presenter',
    achievement: null,
    desc: 'Presented our capstone project to a panel of faculty and industry professionals, demonstrating technical implementation, research findings, and real-world impact.',
    image: capstoneImg,
  },
  {
    id: 'ict',
    name: 'ICT Congress',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: 'Delegate',
    achievement: null,
    desc: 'Participated in the ICT Congress, engaging with talks and workshops on emerging technologies, digital transformation, and the future of the tech industry in the region.',
    image: ictImg,
  },
  {
    id: 'launch',
    name: 'Launch 2025',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: 'Attendee',
    achievement: null,
    desc: "Attended Launch 2025, a flagship tech event celebrating innovation, student projects, and the kickoff of the academic year's technology initiatives.",
    image: launchImg,
  },
  {
    id: 'networksec',
    name: 'Network Security Seminar',
    location: 'Cebu Eastern College, Cebu City',
    date: 'January 1, 2025',           // ← change me
    role: 'Attendee',
    achievement: null,
    desc: 'Joined a network security seminar covering modern threat landscapes, ethical hacking fundamentals, and best practices for securing systems and infrastructure.',
    image: networksecImg,
  },
]

const ACCENT_COLORS = [
  '#7A33FF', '#9b33ff', '#6633ff',
  '#8833ff', '#7733ee', '#b347ff', '#7A33FF',
]

const VISIBLE = 3   // cards visible at once
const INTERVAL = 3000

export default function Events() {
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const maxOffset = EVENTS.length - VISIBLE

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setOffset((o) => (o >= maxOffset ? 0 : o + 1))
    }, INTERVAL)
  }, [maxOffset])

  useEffect(() => {
    if (!paused) startTimer()
    else clearInterval(intervalRef.current)
    return () => clearInterval(intervalRef.current)
  }, [paused, startTimer])

  const go = (dir) => {
    setOffset((o) => {
      const next = o + dir
      if (next < 0) return maxOffset
      if (next > maxOffset) return 0
      return next
    })
    // restart timer after manual nav
    if (!paused) startTimer()
  }

  return (
    <section
      id="events"
      className="py-28 relative"
      style={{ backgroundColor: '#090514' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(122,51,255,0.3), transparent)' }}
      />
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(122,51,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Conference Journey" title="Events & Conferences" />

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* Prev button */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous event"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Cards viewport — overflow hidden */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${offset} * (100% / ${VISIBLE} + 8px)))` }}
            >
              {EVENTS.map((ev, idx) => {
                const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length]
                const isWin = ev.achievement === 'champion'
                const isRunnerUp = ev.achievement === 'runner-up'

                return (
                  <article
                    key={ev.id}
                    className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    style={{
                      minWidth: `calc((100% - ${(VISIBLE - 1) * 24}px) / ${VISIBLE})`,
                      maxWidth: `calc((100% - ${(VISIBLE - 1) * 24}px) / ${VISIBLE})`,
                      background: `linear-gradient(135deg, ${accent}12, #0f0c22)`,
                      border: isWin
                        ? '1px solid rgba(255,215,0,0.35)'
                        : isRunnerUp
                          ? '1px solid rgba(192,192,192,0.3)'
                          : `1px solid ${accent}20`,
                      boxShadow: isWin
                        ? '0 0 24px rgba(255,215,0,0.08)'
                        : isRunnerUp
                          ? '0 0 20px rgba(192,192,192,0.06)'
                          : 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isWin
                        ? 'rgba(255,215,0,0.55)'
                        : isRunnerUp
                          ? 'rgba(192,192,192,0.5)'
                          : `${accent}45`
                      e.currentTarget.style.boxShadow = isWin
                        ? '0 8px 32px rgba(255,215,0,0.14)'
                        : isRunnerUp
                          ? '0 8px 32px rgba(192,192,192,0.1)'
                          : `0 8px 32px ${accent}15`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isWin
                        ? 'rgba(255,215,0,0.35)'
                        : isRunnerUp
                          ? 'rgba(192,192,192,0.3)'
                          : `${accent}20`
                      e.currentTarget.style.boxShadow = isWin
                        ? '0 0 24px rgba(255,215,0,0.08)'
                        : isRunnerUp
                          ? '0 0 20px rgba(192,192,192,0.06)'
                          : 'none'
                    }}
                  >
                    {/* Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${accent}18, #0a0718)` }}
                    >
                      <img
                        src={ev.image}
                        alt={ev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const fb = document.createElement('div')
                          fb.style.cssText = `
                            width:100%;height:100%;display:flex;flex-direction:column;
                            align-items:center;justify-content:center;gap:6px;
                          `
                          fb.innerHTML = `
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                              stroke="${accent}50" stroke-width="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <path d="m21 15-5-5L5 21"/>
                            </svg>
                            <span style="font-size:9px;color:${accent}40;font-family:monospace">
                              events/${ev.id}.jpeg
                            </span>
                          `
                          e.target.parentNode.appendChild(fb)
                        }}
                      />
                      {/* Role badge */}
                      <div
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: isWin
                            ? 'rgba(255,215,0,0.15)'
                            : isRunnerUp
                              ? 'rgba(192,192,192,0.12)'
                              : 'rgba(9,5,20,0.85)',
                          backdropFilter: 'blur(8px)',
                          border: isWin
                            ? '1px solid rgba(255,215,0,0.45)'
                            : isRunnerUp
                              ? '1px solid rgba(192,192,192,0.4)'
                              : `1px solid ${accent}30`,
                          color: isWin ? '#ffd700' : isRunnerUp ? '#d0d0d0' : accent,
                        }}
                      >
                        {ev.role}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-white font-bold text-sm mb-2 leading-snug">
                        {ev.name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-3">
                        {ev.desc}
                      </p>
                      <div className="mt-auto space-y-1.5">
                        <div className="flex items-center gap-2">
                          <MapPin size={12} strokeWidth={1.5} style={{ color: accent + '90' }} />
                          <span className="text-gray-500 text-xs">{ev.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} strokeWidth={1.5} style={{ color: accent + '90' }} />
                          <span className="text-gray-500 text-xs">{ev.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={() => go(1)}
            aria-label="Next event"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxOffset + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setOffset(i); if (!paused) startTimer() }}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === offset ? '24px' : '8px',
                height: '8px',
                background: i === offset ? '#7A33FF' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}