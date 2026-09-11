import type { ReactNode } from 'react'
import AnswerCallout from '@/components/AnswerCallout'

type SectionBlockProps = {
  id?: string
  eyebrow?: string
  title: string
  /** One extractable answer sentence for AEO / GEO / speakable. */
  answer: ReactNode
  answerLabel?: string
  children?: ReactNode
}

/**
 * One job per section: H2 + direct-answer callout + optional supporting content.
 * Use on every page so each section is citation-ready for SEO / GEO / AEO.
 */
export default function SectionBlock({
  id,
  eyebrow,
  title,
  answer,
  answerLabel = 'Direct answer',
  children,
}: SectionBlockProps) {
  return (
    <section id={id} className="scroll-mt-24" data-speakable>
      {eyebrow ? (
        <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        {title}
      </h2>
      <AnswerCallout label={answerLabel}>{answer}</AnswerCallout>
      {children}
    </section>
  )
}
