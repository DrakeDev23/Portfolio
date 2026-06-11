import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import GlassCard from './GlassCard'

const INFO_ITEMS = [
  { icon: Mail, label: 'Email', value: 'maccogoth@example.com' },
  { icon: MapPin, label: 'Location', value: 'Cebu City, Philippines' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
]

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
}

function FormInput({ as: Tag = 'input', ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <Tag
      style={{
        ...INPUT_STYLE,
        borderColor: focused ? 'rgba(122,51,255,0.5)' : 'rgba(122,51,255,0.18)',
        background: focused ? 'rgba(122,51,255,0.04)' : 'rgba(255,255,255,0.03)',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

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
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set('name')}
                    aria-label="Name"
                  />
                  <FormInput
                    required
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={set('email')}
                    aria-label="Email"
                  />
                </div>
                <FormInput
                  required
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={set('subject')}
                  aria-label="Subject"
                />
                <FormInput
                  as="textarea"
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={set('message')}
                  aria-label="Message"
                  style={{ ...INPUT_STYLE, resize: 'none', lineHeight: '1.6' }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: status === 'sending' ? 0.65 : 1 }}
                >
                  <Send size={15} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
