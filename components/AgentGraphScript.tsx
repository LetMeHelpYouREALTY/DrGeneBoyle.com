import { siteAgentGraph } from '@/lib/agent-graph'

/**
 * Embeds the site agent graph on every page for AI crawlers.
 * Also discoverable at /agent-graph.json.
 */
export default function AgentGraphScript() {
  const graph = siteAgentGraph()
  return (
    <script
      id="agent-graph"
      type="application/agent-graph+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
