import { useState } from 'react'
import { Code2, Shield } from 'lucide-react'
import { SKILLS } from '../constants/data'
import SectionHeader from './SectionHeader'

const TABS = [
  { key: 'Development', icon: <Code2 size={15} strokeWidth={1.5} />, label: 'Development' },
  { key: 'Cybersecurity', icon: <Shield size={15} strokeWidth={1.5} />, label: 'Cybersecurity' },
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Development')

  return (
    <section
      id="skills"
      className="py-28 relative"
      style={{ backgroundColor: '#090514' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(122,51,255,0.3), transparent)' }}
      />

      {/* Side ambient glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(122,51,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Tech Stack" title="Skills & Tools" />

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(122,51,255,0.12)' }}
          >
            {TABS.map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={
                  activeTab === key
                    ? {
                        background: 'linear-gradient(135deg, #7A33FF, #b347ff)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(122,51,255,0.3)',
                      }
                    : { color: '#9ca3af' }
                }
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {SKILLS[activeTab].map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>

        {/* Count label */}
        <p className="text-center mt-8 text-gray-600 text-sm">
          {SKILLS[activeTab].length} {activeTab === 'Development' ? 'technologies' : 'tools'} in stack
        </p>
      </div>
    </section>
  )
}
