import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Bot } from 'lucide-react'
import { CHATBOT_RESPONSES } from '../constants/data'

const INITIAL_MESSAGES = [
  {
    id: 'init',
    role: 'bot',
    text: "Hey! I'm Drake's AI assistant. Ask me anything about his skills, projects, or background.",
  },
]

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div
          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5"
          style={{ background: 'rgba(122,51,255,0.2)', color: '#9b6dff' }}
        >
          <Bot size={12} />
        </div>
      )}
      <div
        className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed"
        style={
          isUser
            ? {
              background: 'linear-gradient(135deg, #7A33FF, #b347ff)',
              color: 'white',
              borderBottomRightRadius: '4px',
            }
            : {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(122,51,255,0.15)',
              color: '#d1d5db',
              borderBottomLeftRadius: '4px',
            }
        }
      >
        {msg.text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: 'rgba(122,51,255,0.2)', color: '#9b6dff' }}
      >
        <Bot size={12} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(122,51,255,0.15)',
          borderBottomLeftRadius: '4px',
        }}
      >
        {[0, 0.18, 0.36].map((delay, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{ background: '#7A33FF', animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  const send = () => {
    const q = input.trim()
    if (!q || typing) return
    setMessages((m) => [...m, { id: Date.now(), role: 'user', text: q }])
    setInput('')
    setTyping(true)
    const delay = 900 + Math.random() * 700
    setTimeout(() => {
      const reply = CHATBOT_RESPONSES[Math.floor(Math.random() * CHATBOT_RESPONSES.length)]
      setMessages((m) => [...m, { id: Date.now(), role: 'bot', text: reply }])
      setTyping(false)
    }, delay)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 flex flex-col overflow-hidden z-50 rounded-2xl"
          style={{
            background: '#0d0a1e',
            border: '1px solid rgba(122,51,255,0.25)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,51,255,0.1)',
            maxHeight: '480px',
          }}
          role="dialog"
          aria-label="AI Chat Assistant"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(122,51,255,0.15), rgba(180,71,255,0.08))',
              borderBottom: '1px solid rgba(122,51,255,0.2)',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7A33FF, #b347ff)', color: 'white' }}
            >
              <Bot size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-none mb-1">Drake&apos;s Assistant</p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  style={{ boxShadow: '0 0 6px rgba(74,222,128,0.7)' }}
                />
                <span className="text-green-400 text-xs">Online</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ overscrollBehavior: 'contain' }}
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <div
            className="p-3 flex gap-2 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(122,51,255,0.15)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask anything..."
              aria-label="Chat message"
              className="flex-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(122,51,255,0.2)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: '#e5e7eb',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(122,51,255,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(122,51,255,0.2)')}
            />
            <button
              onClick={send}
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex items-center justify-center transition-all duration-200"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: input.trim() && !typing
                  ? 'linear-gradient(135deg, #7A33FF, #b347ff)'
                  : 'rgba(255,255,255,0.05)',
                color: input.trim() && !typing ? 'white' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: input.trim() && !typing ? 'pointer' : 'default',
                flexShrink: 0,
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7A33FF, #b347ff)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: open
            ? '0 4px 24px rgba(122,51,255,0.5)'
            : '0 8px 32px rgba(122,51,255,0.4)',
          color: 'white',
        }}
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}

        {!open && (
          <span
            className="absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2"
            style={{
              borderColor: '#090514',
              boxShadow: '0 0 8px rgba(74,222,128,0.6)',
            }}
          />
        )}
      </button>
    </>
  )
}
