import { Github, Linkedin, Facebook, Instagram, Terminal } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/DrakeDev23' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/zedrick-dwyn-manguilimotan-85540b3b2/' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/stephen.mart.98' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/0_dr4k3/' },
]

export default function Footer() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.05 })

  return (
    <footer
      ref={ref}
      className={`relative reveal-fade ${isVisible ? 'reveal-visible' : ''}`}
      style={{
        backgroundColor: '#090514',
        borderTop: '1px solid rgba(122,51,255,0.12)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(122,51,255,0.12)', color: '#9b6dff' }}
          >
            <Terminal size={13} />
          </div>
          <span
            className="text-base font-black"
            style={{
              background: 'linear-gradient(135deg, #9b6dff, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Drake.
          </span>
        </div>

        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Drake. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (

            <a key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ color: '#6b7280' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(122,51,255,0.1)'
                e.currentTarget.style.color = '#9b6dff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#6b7280'
              }}
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
{/*s */}