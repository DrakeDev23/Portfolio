import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import { PROJECTS } from '../constants/data'
import SectionHeader from './SectionHeader'

const INTERVAL = 4500

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef(null)

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % PROJECTS.length)
    }, INTERVAL)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(intervalRef.current)
  }, [resetTimer])

  const go = (dir) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + PROJECTS.length) % PROJECTS.length)
    resetTimer()
  }

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
    resetTimer()
  }

  const proj = PROJECTS[current]

  return (
    <section
      id="projects"
      className="py-28 relative"
      style={{ backgroundColor: '#090514' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(122,51,255,0.3), transparent)' }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(122,51,255,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="My Work" title="Featured Projects" />

        {/* Main carousel card */}
        <div
          key={proj.id}
          className="relative rounded-2xl overflow-hidden mb-4"
          style={{
            background: `linear-gradient(135deg, ${proj.color}18, ${proj.color}08, #130e2a)`,
            border: `1px solid ${proj.color}30`,
            minHeight: '340px',
          }}
        >
          {/* Decorative shapes */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${proj.color}12 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${proj.color}08 0%, transparent 70%)`, transform: 'translate(-30%, 30%)' }}
          />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
            {/* Project image placeholder */}
            <div
              className="w-full md:w-80 flex-shrink-0 rounded-xl overflow-hidden"
              style={{
                aspectRatio: '16/9',
                background: `linear-gradient(135deg, ${proj.color}20, #0f0c22)`,
                border: `1px solid ${proj.color}20`,
              }}
            >
              <img
                src={proj.image}
                alt={`${proj.title} screenshot`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  const fb = document.createElement('div')
                  fb.style.cssText = `
                    width:100%;height:100%;display:flex;flex-direction:column;
                    align-items:center;justify-content:center;gap:8px;
                    background: linear-gradient(135deg, ${proj.color}18, #0f0c22);
                  `
                  fb.innerHTML = `
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                      stroke="${proj.color}60" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="m21 15-5-5L5 21"/>
                    </svg>
                    <span style="font-size:10px;color:${proj.color}50;font-family:monospace">
                      projects/${proj.id}.jpg
                    </span>
                  `
                  e.target.parentNode.appendChild(fb)
                }}
              />
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: proj.color + 'cc' }}
                >
                  {proj.subtitle}
                </p>
                <h3 className="text-white text-3xl font-black mb-3">{proj.title}</h3>
                <p className="text-gray-400 leading-relaxed">{proj.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium"
                    style={{
                      background: `${proj.color}15`,
                      border: `1px solid ${proj.color}25`,
                      color: `${proj.color}cc`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ background: proj.color, color: 'white' }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#d1d5db',
                  }}
                >
                  <Github size={14} />
                  GitHub
                </button>
              </div>
            </div>
          </div>

          {/* Navigation controls inside card */}
          <div className="relative z-10 px-8 md:px-12 pb-8 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? proj.color : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-5 gap-3">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              className="relative rounded-xl overflow-hidden transition-all duration-200 text-left"
              style={{
                background: `linear-gradient(135deg, ${p.color}18, #0f0c22)`,
                border: i === current ? `1px solid ${p.color}60` : '1px solid rgba(122,51,255,0.12)',
                padding: '10px 12px',
                opacity: i === current ? 1 : 0.6,
                transform: i === current ? 'scale(1.03)' : 'scale(1)',
                boxShadow: i === current ? `0 4px 20px ${p.color}25` : 'none',
              }}
            >
              <p
                className="text-xs font-bold truncate"
                style={{ color: i === current ? 'white' : '#9ca3af' }}
              >
                {p.title}
              </p>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: p.color + '80', fontSize: '10px' }}
              >
                {p.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
