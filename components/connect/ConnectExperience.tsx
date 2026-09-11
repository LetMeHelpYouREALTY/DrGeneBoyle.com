'use client'

import { useState } from 'react'
import SpotlightButton, {
  LeadCaptureForm,
  VirtualTwinChat,
} from '@/components/connect/ConnectWidgets'
import { spotlightConfig } from '@/data/connectHub'

export default function ConnectExperience() {
  const [transcript, setTranscript] = useState('')
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL || ''
  const spotlightHref = process.env.NEXT_PUBLIC_SPOTLIGHT_HREF || bookingUrl
  const spotlightLabel = process.env.NEXT_PUBLIC_SPOTLIGHT_LABEL || spotlightConfig.defaultLabel

  return (
    <div className="space-y-8">
      <SpotlightButton
        actionUrl={spotlightHref || undefined}
        label={spotlightLabel}
        fallbackHref={spotlightConfig.fallbackHref}
        supportingLine={spotlightConfig.supportingLine}
        eyebrow={spotlightConfig.eyebrow}
        helperWhenUnset={spotlightConfig.helperWhenUnset}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <VirtualTwinChat onTranscript={setTranscript} />
        <LeadCaptureForm twinTranscript={transcript} source="drgeneboyle.com/connect" />
      </div>

      {bookingUrl ? (
        <section className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
          <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Schedule with Google Calendar
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Book directly on DrGeneBoyle.com — appointments write to Gene’s Google Calendar.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl">
            <iframe
              title="Google Calendar appointment schedule"
              src={bookingUrl}
              className="h-[640px] w-full border-0"
              loading="lazy"
            />
          </div>
        </section>
      ) : null}
    </div>
  )
}
