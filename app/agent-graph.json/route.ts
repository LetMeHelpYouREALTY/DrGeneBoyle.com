import { siteAgentGraph } from '@/lib/agent-graph'

export const dynamic = 'force-static'
export const revalidate = 86400

export function GET() {
  const body = JSON.stringify(siteAgentGraph(), null, 2)
  return new Response(body, {
    headers: {
      'Content-Type': 'application/agent-graph+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
