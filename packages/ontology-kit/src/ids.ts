import type { OntologyScheme, OntologySiteConfig } from './types'

export function ontologyOrigin(config: OntologySiteConfig): string {
  return (config.ontologyBaseUrl ?? config.siteUrl).replace(/\/$/, '')
}

export function siteOrigin(config: OntologySiteConfig): string {
  return config.siteUrl.replace(/\/$/, '')
}

export function conceptId(config: OntologySiteConfig, schemeId: string, slug: string): string {
  return `${ontologyOrigin(config)}/ontology/${schemeId}#${slug}`
}

export function schemeNodeId(config: OntologySiteConfig, schemeId: string): string {
  return `${ontologyOrigin(config)}/ontology/${schemeId}#scheme`
}

export function catalogId(config: OntologySiteConfig): string {
  return `${ontologyOrigin(config)}/ontology#catalog`
}

export function schemeAboutId(config: OntologySiteConfig, scheme: OntologyScheme): string {
  const mapped = config.topicIds?.[scheme.id]
  if (mapped) return mapped
  return `${siteOrigin(config)}${scheme.hubPath}#topic`
}

export function absoluteSitePath(config: OntologySiteConfig, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${siteOrigin(config)}${path.startsWith('/') ? path : `/${path}`}`
}
