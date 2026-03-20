# Catalog Models TODO

- [ ] Replace staging URLs in catalog JSON code snippets with public API URLs
  - `src/content/catalog-models/black-forest-labs-flux-2-klein-9b.json` (line 67)
  - `src/content/catalog-models/google-nano-banana.json` (line 110)
  - Staging domain: `staging.gateway.ai.cfdata.org`
  - Should use: `api.cloudflare.com/client/v4/accounts/...` with `Authorization: Bearer` header
- [ ] `normalizePricingUnit` doesn't handle non-pricing keys gracefully (e.g. `"cost"` → `"per cost"`). Document expected key format or add edge case handling in `src/util/model-resolver.ts:15-18`.
