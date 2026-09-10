'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/Link'

type SpotlightButtonProps = {
  /** Destination for the single most important visitor action */
  actionUrl?: string
  label?: string
  fallbackHref?: string
  supportingLine?: string
  eyebrow?: string
  helperWhenUnset?: string
}

/**
 * Spotlight Button — one clear action for visitors (book, contact, flagship link).
 * Keep this louder than secondary CTAs on /connect.
 */
export default function SpotlightButton({
  actionUrl,
  label = 'Book a strategy call',
  fallbackHref = '/contact',
  supportingLine,
  eyebrow = 'Spotlight',
  helperWhenUnset,
}: SpotlightButtonProps) {
  const href = actionUrl || fallbackHref
  const isExternal = Boolean(actionUrl && /^https?:\/\//i.test(actionUrl))
  const isConfigured = Boolean(actionUrl)

  return (
    <div
      id="spotlight"
      className="rounded-2xl border border-[color:var(--color-ink)]/10 bg-[color:var(--color-ink)] px-6 py-8 text-white shadow-sm dark:border-white/10"
    >
      <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">{eyebrow}</p>
      <h2 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">{label}</h2>
      {supportingLine ? <p className="mt-3 max-w-xl text-white/80">{supportingLine}</p> : null}
      <div className="mt-7">
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-dark inline-flex rounded-md px-6 py-3 text-sm font-semibold text-[color:var(--color-ink)] transition"
          >
            {label}
          </a>
        ) : (
          <Link
            href={href}
            className="bg-accent hover:bg-accent-dark inline-flex rounded-md px-6 py-3 text-sm font-semibold text-[color:var(--color-ink)] transition"
          >
            {label}
          </Link>
        )}
      </div>
      {!isConfigured && helperWhenUnset ? (
        <p className="mt-4 text-xs text-white/55">{helperWhenUnset}</p>
      ) : null}
    </div>
  )
}

type LeadFormProps = {
  twinTranscript?: string
  source?: string
}

export function LeadCaptureForm({
  twinTranscript = '',
  source = 'drgeneboyle.com/connect',
}: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setError('')
    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      company: String(form.get('company') || ''),
      message: String(form.get('message') || ''),
      intent: String(form.get('intent') || 'general'),
      source,
      twinTranscript,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to save lead')
      setStatus('success')
      event.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-700 dark:bg-gray-900/50"
    >
      <div>
        <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Capture a lead
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Saved to the DrGeneBoyle.com lead inbox / CRM webhook — not about.me.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Name</span>
          <input
            name="name"
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-950"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Email *</span>
          <input
            name="email"
            type="email"
            required
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-950"
            autoComplete="email"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Phone</span>
          <input
            name="phone"
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-950"
            autoComplete="tel"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Company</span>
          <input
            name="company"
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-950"
            autoComplete="organization"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Intent</span>
        <select
          name="intent"
          className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-950"
          defaultValue="general"
        >
          <option value="general">General inquiry</option>
          <option value="acquisition">Acquisition advisory</option>
          <option value="research">Research / CTMT-2 / SMI</option>
          <option value="meeting">Book a meeting</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Message</span>
        <textarea
          name="message"
          rows={4}
          className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-950"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-accent hover:bg-accent-dark rounded-md px-5 py-2.5 text-sm font-semibold text-[color:var(--color-ink)] transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send to CRM inbox'}
      </button>
      {status === 'success' ? (
        <p className="text-sm text-green-700 dark:text-green-400">
          Received. We’ll follow up from info@drgeneboyle.com.
        </p>
      ) : null}
      {status === 'error' ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  )
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export function VirtualTwinChat({ onTranscript }: { onTranscript?: (text: string) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hi — I’m Gene’s Virtual Twin on DrGeneBoyle.com. Ask about CTMT-2 research, motherhood & SMI, or CA/NV acquisition advisory.',
    },
  ])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)

  const transcript = useMemo(
    () => messages.map((m) => `${m.role}: ${m.content}`).join('\n'),
    [messages]
  )

  async function send() {
    const message = input.trim()
    if (!message || pending) return
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: message }]
    setMessages(nextMessages)
    setInput('')
    setPending(true)
    try {
      const res = await fetch('/api/twin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: nextMessages.slice(-8) }),
      })
      const data = await res.json()
      const reply = data.reply || 'Please try again, or email info@drgeneboyle.com.'
      const updated = [...nextMessages, { role: 'assistant' as const, content: reply }]
      setMessages(updated)
      onTranscript?.(updated.map((m) => `${m.role}: ${m.content}`).join('\n'))
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I hit a connection issue. Email info@drgeneboyle.com or use the lead form.',
        },
      ])
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex h-full min-h-[28rem] flex-col rounded-2xl border border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">Virtual Twin AI</p>
        <h2 className="font-display mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Chat with Gene’s twin
        </h2>
        <p className="mt-1 text-xs text-gray-500">Hosted on DrGeneBoyle.com · no about.me branding</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'assistant'
                ? 'max-w-[90%] rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                : 'ml-auto max-w-[90%] rounded-xl bg-[color:var(--color-ink)] px-3 py-2 text-sm text-white'
            }
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-gray-200 p-4 dark:border-gray-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void send()
          }}
          placeholder="Ask about research, acquisition, or booking…"
          className="focus:border-primary-500 focus:ring-primary-500 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-950"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={pending}
          className="bg-accent hover:bg-accent-dark rounded-md px-4 py-2 text-sm font-semibold text-[color:var(--color-ink)] disabled:opacity-60"
        >
          {pending ? '…' : 'Send'}
        </button>
      </div>
      <p className="sr-only">{transcript}</p>
    </div>
  )
}
