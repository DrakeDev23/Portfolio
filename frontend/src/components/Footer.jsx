import { Github, Linkedin, Twitter, Terminal } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        backgroundColor: '#090514',
        borderTop: '1px solid rgba(122,51,255,0.12)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
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

        {/* Copyright */}
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Drake. All rights reserved.
        </p>

        {/* Social */}
        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
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
