/**
 * Map "product-slug" to GitHub username(s) of PCX team.
 * @important "product-slug" keys must match `content/*` subdirectory names.
 * @note Products are gathered from these DevDocs & do not necessarily map to internal product names.
 * Products w/o any GitHub username(s) will ping `haleycode` for assignment.
 * This PCX OWNERSHIP mapping is used for:
 *   - the "issues.opened" event to assign GitHub Issues to PCX member
 *   - the "pull_request.opened" event to request review(s) instead of CODEOWNERS usage
 */
export const OWNERS: Record<string, string[]> = {
  "1.1.1.1": ["haleycode"],
  analytics: ["angelampcosta"],
  api: ["ranbel"],
  "api-shield": ["patriciasantaana"],
  "argo-smart-routing": ["dcpena"],
  "automatic-platform-optimization": ["dcpena"],
  bots: ["patriciasantaana"],
  byoip: [], // TODO
  cache: ["angelampcosta"],
  "china-network": ["pedrosousa"],
  "client-ip-geolocation": ["pedrosousa"],
  "cloudflare-for-platforms": ["kodster28"],
  "cloudflare-one": ["ranbel"],
  d1: ["deadlypants1973"],
  "ddos-protection": ["pedrosousa"],
  dns: ["kodster28"],
  "email-routing": ["marciocloudflare"],
  "email-security": ["marciocloudflare"],
  firewall: ["pedrosousa"],
  fundamentals: ["kodster28"],
  images: ["dcpena"],
  "learning-paths": ["kodster28"],
  "load-balancing": ["patriciasantaana"],
  logs: ["angelampcosta"],
  "magic-firewall": ["marciocloudflare"],
  "magic-network-monitoring": ["marciocloudflare"],
  "magic-transit": ["marciocloudflare"],
  "magic-wan": ["marciocloudflare"],
  "network-error-logging": ["dcpena"],
  "network-interconnect": ["dcpena"],
  "page-shield": ["pedrosousa"],
  pages: ["deadlypants1973"],
  "pub-sub": ["dcpena"],
  queues: ["deadlypants1973"],
  r2: ["deadlypants1973"],
  radar: ["haleycode"],
  railgun: ["haleycode"],
  "randomness-beacon": ["kodster28"],
  "reference-architecture": ["haleycode"],
  registrar: ["haleycode"],
  rules: ["pedrosousa"],
  "ruleset-engine": ["pedrosousa"],
  "security-center": ["ranbel"],
  spectrum: ["angelampcosta"],
  ssl: ["kodster28"],
  stream: ["dcpena"],
  tenant: ["kodster28"],
  terraform: ["ranbel"],
  "time-services": ["kodster28"],
  turnstile: ["patriciasantaana"],
  "version-management": ["kodster28"],
  waf: ["pedrosousa"],
  "waiting-room": ["angelampcosta"],
  "warp-client": ["haleycode"],
  web3: ["kodster28"],
  workers: ["deadlypants1973"],
  zaraz: ["haleycode"],
};

export const REVIEWERS: Record<string, string[]> = {
  analytics: ["soheiokamoto", "jherre", "tlozoot", "bharatnc", "victor-perov", "jimhawkridge", "46bit"],
  d1: ["nevikashah", "WalshyDev"],
  radar: ["meddulla", "G4brym"],
  logs: ["soheiokamoto", "jherre", "tlozoot", "bharatnc", "victor-perov"],
  pages: ["WalshyDev"],
  turnstile: ["migueldemoura", "punkeel", "worenga"],
};
