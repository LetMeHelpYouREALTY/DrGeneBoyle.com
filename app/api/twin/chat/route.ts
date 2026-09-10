import { NextRequest, NextResponse } from 'next/server'
import { matchTwinFact, twinPersona } from '@/data/twinKnowledge'

export const runtime = 'nodejs'

type ChatBody = {
  message?: string
  history?: { role: 'user' | 'assistant'; content: string }[]
}

export async function POST(request: NextRequest) {
  let body: ChatBody
  try {
    body = (await request.json()) as ChatBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const message = body.message?.trim() || ''
  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  const matched = matchTwinFact(message)
  if (matched) {
    return NextResponse.json({
      reply: `${matched.answer}\n\n${twinPersona.disclaimer}`,
      matchedId: matched.id,
      source: 'knowledge',
    })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (apiKey) {
    try {
      const system = `You are the Virtual Twin of ${twinPersona.name} on ${twinPersona.site}.
Speak in first person as Gene’s digital twin. Be concise (2–4 sentences).
Role: ${twinPersona.role}.
Never invent license numbers, prices, or client names.
If asked for clinical or investment advice, refuse and invite a booked meeting.
${twinPersona.disclaimer}`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.OPENAI_TWIN_MODEL || 'gpt-4o-mini',
          temperature: 0.3,
          messages: [
            { role: 'system', content: system },
            ...(body.history || []).slice(-6),
            { role: 'user', content: message },
          ],
        }),
      })

      if (response.ok) {
        const data = (await response.json()) as {
          choices?: { message?: { content?: string } }[]
        }
        const reply = data.choices?.[0]?.message?.content?.trim()
        if (reply) {
          return NextResponse.json({ reply, source: 'model' })
        }
      }
    } catch {
      // Fall through to default reply
    }
  }

  return NextResponse.json({
    reply: `${twinPersona.greeting}\n\nI can help with CTMT-2 research, motherhood & SMI, acquisition advisory (CA/NV), credentials, or booking. Try one of those topics — or leave your email in the lead form for a human follow-up.`,
    source: 'fallback',
  })
}
