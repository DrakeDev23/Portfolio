import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import GlassCard from './GlassCard'

// ── API base URL from Vite env ─────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

// ── Static info ────────────────────────────────────────────────────────────
const INFO_ITEMS = [
  { icon: Mail, label: 'Email', value: 'maccogoth@example.com' },
  { icon: MapPin, label: 'Location', value: 'Cebu City, Philippines' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
]

// ── Limits (mirror backend) ────────────────────────────────────────────────
const LIMITS = { name: 80, email: 254, subject: 150, message: 2000 }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// ── Client-side sanitize ───────────────────────────────────────────────────
function sanitize(value, maxLen) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLen)
}

function sanitizeForm(f) {
  return {
    name: sanitize(f.name, LIMITS.name),
    email: sanitize(f.email, LIMITS.email),
    subject: sanitize(f.subject, LIMITS.subject),
    message: sanitize(f.message, LIMITS.message),
  }
}

// ── Validation ─────────────────────────────────────────────────────────────
function validate(f) {
  const e = {}
  if (!f.name) e.name = 'Name is required.'
  else if (f.name.length < 2) e.name = 'Name must be at least 2 characters.'
  if (!f.email) e.email = 'Email is required.'
  else if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address.'
  if (!f.subject) e.subject = 'Subject is required.'
  else if (f.subject.length < 3) e.subject = 'Subject must be at least 3 characters.'
  if (!f.message) e.message = 'Message is required.'
  else if (f.message.length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

// ── Styles ─────────────────────────────────────────────────────────────────
const INPUT_STYLE = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(122,51,255,0.18)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: '#e5e7eb',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  fontFamily: 'Inter, system-ui, sans-serif',
  boxSizing: 'border-box',
}

const ERROR_STYLE = {
  color: '#f87171',
  fontSize: '11px',
  marginTop: '4px',
  paddingLeft: '4px',
}

// ── FormInput ──────────────────────────────────────────────────────────────
function FormInput({ as: Tag = 'input', error, style: extra, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ width: '100%' }}>
      <Tag
        style={{
          ...INPUT_STYLE,
          ...extra,
          borderColor: error
            ? 'rgba(248,113,113,0.6)'
            : focused
              ? 'rgba(122,51,255,0.5)'
              : 'rgba(122,51,255,0.18)',
          background: focused ? 'rgba(122,51,255,0.04)' : 'rgba(255,255,255,0.03)',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {error && <p style={ERROR_STYLE} role="alert">{error}</p>}
    </div>
  )
}

// ── Contact ────────────────────────────────────────────────────────────────
const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const clean = sanitizeForm(form)
    const fieldErrors = validate(clean)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setStatus('sending')

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clean),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      setStatus('sent')
      setForm(EMPTY)
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Contact error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section
      id="contact"
      className="py-28 relative"
      style={{ backgroundColor: '#090514' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(122,51,255,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(122,51,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader eyebrow="Reach Out" title="Get in Touch" />

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-6">
            <p className="text-gray-400 leading-relaxed">
              Whether you have a project idea, a CTF team invitation, or just want to connect
              the inbox is open. I&apos;ll get back within a day.
            </p>
            <div className="space-y-4">
              {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                <GlassCard key={label}>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(122,51,255,0.12)', color: '#9b6dff' }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="section-eyebrow" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
                        {label}
                      </p>
                      <p className="text-gray-200 text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right */}
          <GlassCard>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}
                >
                  <CheckCircle size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Message sent</h3>
                  <p className="text-gray-500 text-sm">I&apos;ll get back to you soon.</p>
                </div>
              </div>
            ) : status === 'error' ? (
              <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}
                >
                  <Send size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Something went wrong</h3>
                  <p className="text-gray-500 text-sm">
                    Couldn&apos;t send the message. Try again or email me directly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set('name')}
                    aria-label="Name"
                    maxLength={LIMITS.name}
                    error={errors.name}
                  />
                  <FormInput
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={set('email')}
                    aria-label="Email"
                    maxLength={LIMITS.email}
                    error={errors.email}
                  />
                </div>
                <FormInput
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={set('subject')}
                  aria-label="Subject"
                  maxLength={LIMITS.subject}
                  error={errors.subject}
                />
                <FormInput
                  as="textarea"
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={set('message')}
                  aria-label="Message"
                  maxLength={LIMITS.message}
                  error={errors.message}
                  style={{ resize: 'none', lineHeight: '1.6' }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: status === 'sending' ? 0.65 : 1 }}
                >
                  <Send size={15} />
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  )
}