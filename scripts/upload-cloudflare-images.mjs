#!/usr/bin/env node
/**
 * Upload site portraits to Cloudflare Images (hosted).
 *
 * Requires:
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_API_TOKEN   (Images:Edit)
 * Optional:
 *   CF_IMAGES_ACCOUNT_HASH (printed after first upload / from dashboard)
 *
 * Usage:
 *   node ./scripts/upload-cloudflare-images.mjs
 *
 * Then set NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH in Vercel and redeploy.
 *
 * @see https://developers.cloudflare.com/images/storage/upload-images/methods/
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN

const uploads = [
  {
    id: 'eugene-boyle/headshot',
    file: resolve('public/static/images/eugene-boyle-headshot.jpg'),
    // Fallback: public GitHub raw if local missing
    url: 'https://raw.githubusercontent.com/LetMeHelpYouREALTY/DrGeneBoyle.com/main/public/static/images/eugene-boyle-headshot.jpg',
    metadata: {
      subject: 'Eugene Boyle, Ph.D.',
      usage: 'favicon,avatar,schema',
    },
  },
]

async function uploadOne({ id, file, url, metadata }) {
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`
  const form = new FormData()
  form.append('id', id)
  form.append('requireSignedURLs', 'false')
  form.append('metadata', JSON.stringify(metadata))

  if (file && existsSync(file)) {
    const buf = readFileSync(file)
    form.append('file', new Blob([buf], { type: 'image/jpeg' }), `${id.replace(/\//g, '-')}.jpg`)
    console.log(`Uploading file ${file} as ${id}…`)
  } else if (url) {
    form.append('url', url)
    console.log(`Uploading URL ${url} as ${id}…`)
  } else {
    throw new Error(`No file or url for ${id}`)
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    body: form,
  })
  const json = await res.json()
  if (!json.success) {
    console.error(JSON.stringify(json, null, 2))
    throw new Error(`Upload failed for ${id}`)
  }
  console.log('OK', json.result?.id, json.result?.variants?.[0] || '')
  return json.result
}

async function ensureFlexibleVariants() {
  // Best-effort: list variants; flexible variants are account-level toggle in dashboard.
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/variants`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  )
  const json = await res.json()
  if (json.success) {
    console.log(
      'Variants:',
      (json.result?.variants && Object.keys(json.result.variants)) || json.result
    )
  } else {
    console.warn('Could not list variants (enable Flexible variants in Images → Variants).')
  }
}

async function main() {
  if (!ACCOUNT_ID || !API_TOKEN) {
    console.error(
      'Missing CLOUDFLARE_ACCOUNT_ID and/or CLOUDFLARE_API_TOKEN.\n' +
        'Create a token with Cloudflare Images:Edit, then re-run.\n' +
        'Dashboard: https://dash.cloudflare.com/?to=/:account/images'
    )
    process.exit(1)
  }

  await ensureFlexibleVariants()
  for (const item of uploads) {
    try {
      await uploadOne(item)
    } catch (err) {
      // Idempotent-ish: if ID exists, try delete+reupload is dangerous; report and continue
      console.error(String(err))
      console.error(
        `If ID already exists, delete it in the dashboard or choose a new custom ID in data/siteMedia.ts`
      )
    }
  }

  console.log(`
Next steps:
1. Cloudflare dashboard → Images → Developer Resources → copy Account Hash
2. Vercel env: NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH=<hash>
3. Images → Variants → enable Flexible variants (required for gravity=face)
4. Redeploy www.drgeneboyle.com

Keep DNS gray-cloud → Vercel. Hosted Images use imagedelivery.net (no orange-cloud needed).
`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
