import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from './SectionHeader'

import awsImg from '../assets/images/projects/aws.jpeg'
import beautyImg from '../assets/images/projects/beauty.jpeg'
import meImg from '../assets/images/projects/me.jpeg'
import museoImg from '../assets/images/projects/museo.jpeg'
import publikaImg from '../assets/images/projects/publika.jpeg'
import realestateImg from '../assets/images/projects/realestate.jpeg'
import smpImg from '../assets/images/projects/smp.jpeg'
import trustpulseImg from '../assets/images/projects/trustpulse.jpeg'

const IMAGE_MAP = {
  'awscc-flurry': awsImg,
  beauty: beautyImg,
  me: meImg,
  museo: museoImg,
  publika: publikaImg,
  realestate: realestateImg,
  smp: smpImg,
  trustpulse: trustpulseImg,
}

const INTERVAL = 4500

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then((r) => r.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % projects.length)
    }, INTERVAL)
  }, [projects.length])

  useEffect(() => {
    if (projects.length === 0) return
    resetTimer()
    return () => clearInterval(intervalRef.current)
  }, [resetTimer, projects.length])

  const go = (dir) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + projects.length) % projects.length)
    resetTimer()
  }

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
    resetTimer()
  }

  if (loading) {
    return (
      <section id="projects" className="py-28 relative" style={{ backgroundColor: '#090514' }}>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader eyebrow="My Work" title="Featured Projects" />
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{
              minHeight: '340px',
              background: 'rgba(122,51,255,0.05)',
              border: '1px solid rgba(122,51,255,0.12)',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 animate-spin"
                style={{ borderColor: 'rgba(122,51,255,0.5)', borderTopColor: 'transparent' }}
              />
              <p className="text-gray-500 text-sm">Loading projects...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) return null

  const proj = projects[current]
  const projImage = IMAGE_MAP[proj.id]

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

        <div
          key={proj.id}
          className="relative rounded-2xl overflow-hidden mb-4"
          style={{
            background: `linear-gradient(135deg, ${proj.color}18, ${proj.color}08, #130e2a)`,
            border: `1px solid ${proj.color}30`,
            minHeight: '340px',
          }}
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${proj.color}12 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${proj.color}08 0%, transparent 70%)`,
              transform: 'translate(-30%, 30%)',
            }}
          />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">
            <div
              className="w-full md:w-80 flex-shrink-0 rounded-xl overflow-hidden"
              style={{
                aspectRatio: '16/9',
                background: `linear-gradient(135deg, ${proj.color}20, #0f0c22)`,
                border: `1px solid ${proj.color}20`,
              }}
            >
              {projImage && (
                <img
                  src={projImage}
                  alt={`${proj.title} screenshot`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

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
            </div>
          </div>

          <div className="relative z-10 px-8 md:px-12 pb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
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

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {projects.map((p, i) => (
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