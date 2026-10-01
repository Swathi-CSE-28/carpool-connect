import { useState, useCallback, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import TopBar from '../../components/TopBar'
import { messages as initialMessages } from '../../data/mock'
import { useAuth } from '../../hooks/useAuth'

export default function Messages() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback((e) => {
    e.preventDefault()
    if (!text.trim()) return
    setMessages((prev) => [...prev, { id: `m${Date.now()}`, from: 'me', text: text.trim(), time: 'Now', mine: true }])
    setText('')
  }, [text])

  const otherPartyName = user?.role === 'driver' ? 'Priya Raman' : 'Arun Kumar'

  return (
    <div className="phone-shell">
      <TopBar title={otherPartyName} subtitle="Online" />
      <div className="screen-scroll px-4 pt-4 pb-2 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.mine ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white dark:bg-ink-800 text-ink-800 dark:text-ink-100 rounded-bl-sm border border-ink-100 dark:border-ink-700'}`}>
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.mine ? 'text-brand-100' : 'text-ink-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSend} className="sticky bottom-0 bg-white dark:bg-ink-900 border-t border-ink-100 dark:border-ink-800 px-4 py-3 flex items-center gap-2">
        <input className="input flex-1" placeholder="Type a message…" value={text} onChange={(e) => setText(e.target.value)} aria-label="Message" />
        <button type="submit" className="p-3 rounded-xl bg-brand-600 text-white flex-shrink-0" aria-label="Send message"><Send className="w-4 h-4" /></button>
      </form>
    </div>
  )
}
