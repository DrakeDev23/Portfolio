import { MapPin, Calendar, Tag } from 'lucide-react'
import { EVENTS } from '../constants/data'
import SectionHeader from './SectionHeader'

const ACCENT_COLORS = [
  '#7A33FF', '#9b33ff', '#6633ff',
  '#8833ff', '#7733ee', '#b347ff',
]

export default function Events() {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((ev, idx) => {
            const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length]
            return (
              <article
                key={ev.id}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${accent}12, #0f0c22)`,
                  border: `1px solid ${accent}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}45`
                  e.currentTarget.style.boxShadow = `0 8px 32px ${accent}15`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accent}20`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
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
                          events/${ev.id}.jpg
                        </span>
                      `
                      e.target.parentNode.appendChild(fb)
                    }}
                  />

                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(9,5,20,0.85)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${accent}30`,
                      color: accent,
                    }}
                  >
                    {ev.role}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold text-sm mb-3 leading-snug">
                    {ev.name}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} strokeWidth={1.5} style={{ color: accent + '90', flexShrink: 0 }} />
                      <span className="text-gray-500 text-xs">{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} strokeWidth={1.5} style={{ color: accent + '90', flexShrink: 0 }} />
                      <span className="text-gray-500 text-xs">{ev.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
