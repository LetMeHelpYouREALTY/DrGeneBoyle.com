import { NextRequest, NextResponse } from 'next/server'
import siteIdentity from '@/data/siteIdentity'

export const runtime = 'nodejs'

type LeadBody = {
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
  source?: string
  intent?: string
  twinTranscript?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function forwardWebhook(payload: Record<string, unknown>) {
  const webhook = process.env.CRM_WEBHOOK_URL || process.env.LEADS_WEBHOOK_URL
  if (!webhook) return { ok: false, skipped: true as const }

  const response = await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.CRM_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
  })

  return { ok: response.ok, status: response.status, skipped: false as const }
}

async function sendLeadEmail(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, skipped: true as const }

  const to = process.env.LEADS_NOTIFY_EMAIL || siteIdentity.email
  const from = process.env.LEADS_FROM_EMAIL || 'leads@drgeneboyle.com'

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `DrGeneBoyle.com Leads <${from}>`,
      to: [to],
      subject: `New lead — ${payload.name || payload.email || 'DrGeneBoyle.com'}`,
      text: JSON.stringify(payload, null, 2),
    }),
  })

  return { ok: response.ok, status: response.status, skipped: false as const }
}

export async function POST(request: NextRequest) {
  let body: LeadBody
  try {
    body = (await request.json()) as LeadBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const email = body.email?.trim() || ''
  const name = body.name?.trim() || ''
  const message = body.message?.trim() || ''

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }

  const payload = {
    name,
    email,
    phone: body.phone?.trim() || '',
    company: body.company?.trim() || '',
    message,
    source: body.source?.trim() || 'drgeneboyle.com/connect',
    intent: body.intent?.trim() || 'general',
    twinTranscript: body.twinTranscript?.trim() || '',
    site: 'https://www.drgeneboyle.com',
    receivedAt: new Date().toISOString(),
  }

  const [webhookResult, emailResult] = await Promise.all([
    forwardWebhook(payload),
    sendLeadEmail(payload),
  ])

  // Always accept the lead for UX; surface delivery mode for debugging.
  const delivered = Boolean(
    (webhookResult.ok && !webhookResult.skipped) || (emailResult.ok && !emailResult.skipped)
  )

  return NextResponse.json({
    success: true,
    delivered,
    channels: {
      crmWebhook: webhookResult,
      email: emailResult,
    },
    nextStep: 'Book a meeting on /connect or wait for a reply from info@drgeneboyle.com.',
  })
}
