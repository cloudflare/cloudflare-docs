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
  "1.1.1.1": ["marciocloudflare"],
  analytics: ["angelampcosta"],
  api: ["ranbel"],
  "api-shield": ["ranbel"],
  "argo-smart-routing": ["maxvp"],
  "automatic-platform-optimization": ["dcpena"],
  bots: ["kodster28"],
  byoip: [], // TODO
  cache: ["angelampcosta"],
  "china-network": [], // TODO
  "client-ip-geolocation": ["pedrosousa"],
  "cloudflare-one": ["ranbel"],
  "ddos-protection": ["pedrosousa"],
  dns: ["kodster28"],
  "email-routing": ["marciocloudflare"],
  firewall: ["pedrosousa"],
  fundamentals: ["kodster28"], // TODO
  http3: ["angelampcosta"],
  images: ["marciocloudflare"],
  "load-balancing": ["kodster28"],
  logs: ["angelampcosta"],
  "magic-firewall": ["dcpena"],
  "magic-transit": ["dcpena"],
  "magic-wan": ["dcpena"],
  "network-error-logging": [], // TODO
  "network-interconnect": ["dcpena"],
  "page-shield": ["pedrosousa"],
  pages: ["deadlypants1973"],
  partners: [], // TODO
  "pub-sub": ["dcpena"],
  r2: ["deadlypants1973"],
  railgun: ["marciocloudflare"],
  "randomness-beacon": ["kodster28"],
  registrar: ["marciocloudflare"],
  rules: ["pedrosousa"],
  "ruleset-engine": ["pedrosousa"],
  "security-center": ["ranbel"],
  spectrum: ["angelampcosta"],
  ssl: ["kodster28"],
  stream: ["dcpena"],
  tenant: ["kodster28"],
  terraform: ["ranbel"],
  "time-services": [], // TODO
  waf: ["pedrosousa"],
  "waiting-room": ["angelampcosta"],
  "warp-client": ["marciocloudflare"],
  web3: ["kodster28"],
  workers: ["deadlypants1973"],
  zaraz: ["marciocloudflare"],
};
