import type { ReactNode } from 'react'

type AnswerCalloutProps = {
  label?: string
  children: ReactNode
}

export default function AnswerCallout({ label = 'Direct answer', children }: AnswerCalloutProps) {
  return (
    <aside
      data-speakable
      className="answer-callout border-accent/40 bg-mist/80 my-8 rounded-xl border-l-4 px-5 py-4 shadow-sm backdrop-blur-sm dark:bg-gray-900/70"
    >
      <p className="text-accent mb-2 text-xs font-semibold tracking-[0.16em] uppercase">{label}</p>
      <div className="text-base leading-relaxed text-gray-800 dark:text-gray-100">{children}</div>
    </aside>
  )
}
