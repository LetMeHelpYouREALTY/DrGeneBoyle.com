# Email Routing runbook — drgeneboyle.com

**Goal:** Receive mail at `@drgeneboyle.com` and forward to Gene’s working inbox without Google Workspace / Microsoft 365.

**Done when:**

1. `dig MX drgeneboyle.com` returns Cloudflare `route*.mx.cloudflare.net`
2. Apex TXT includes `v=spf1 include:_spf.mx.cloudflare.net`
3. `cf2024-1._domainkey.drgeneboyle.com` has a DKIM TXT
4. A test message to `info@drgeneboyle.com` arrives at the verified destination

## Steps (dashboard)

1. Open [Cloudflare Email Routing](https://dash.cloudflare.com/?to=/:account/email-service/routing).
2. Onboard / enable **drgeneboyle.com** (auto-creates MX + SPF + DKIM).
3. **Destination addresses** → add and verify `eboyle@fielding.edu`.
4. **Routing rules** → create:

   - `info@drgeneboyle.com` → `eboyle@fielding.edu`

5. Send a test from a non-destination account; check inbox + spam.
6. Reply in chat if a test to `info@` fails so DNS/routing can be rechecked.

## Do not

- Orange-cloud the Vercel CNAMEs
- Add Google/Microsoft MX while Routing is on
- Change DMARC to `p=reject` until SPF/DKIM have been clean for a monitoring period

## References

- [Enable Email Routing](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/)
- [Email Service domain DNS](https://developers.cloudflare.com/email-service/configuration/domains/)
