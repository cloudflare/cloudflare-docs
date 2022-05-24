/**
 * Map of "Product Name" to GitHub usernames of PCX team.
 * @important "Product Name" keys must match values found in the ISSUE_TEMPLATE files!
 * Products are gatheres from these DevDocs & do not necessarily map to internal product names.
 * This PCX OWNERSHIP mapping is used for:
 *   - the "issues.opened" event to assign GitHub Issues to PCX member
 *   - TODO(future) the "pull_request.created" event to request review(s) instead of CODEOWNERS usage
 */
export const OWNERS: Record<string, string[]> = {
  '1.1.1.1': ['marciocloudflare'],
  'Analytics': ['angelampcosta'],
  'API': ['ranbel'],
  'API Shield': ['ranbel'],
  'Automatic Platform Optimization': ['dcpena'],
  'Bots': ['kodster28'],
  'BYOIP': ['haleycodes'], // TODO
  'Cache': ['angelampcosta'],
  'Client IP Geolocation': ['pedrosousa'],
  'Cloudflare One': ['ranbel'],
  'DDoS Protection': ['pedrosousa'],
  'DNS': ['kodster28'],
  'Email Routing': ['marciocloudflare'],
  'Firewall': ['pedrosousa'],
  'Fundamentals': ['kodster28'], // TODO
  'HTTP/3': ['angelampcosta'],
  'Image Optimization': ['marciocloudflare'],
  'Load Balancing': ['kodster28'],
  'Logs': ['angelampcosta'],
  'Magic Firewall': ['dcpena'],
  'Magic Transit': ['dcpena'],
  'Magic WAN': ['dcpena'],
  'Network Error Logging': ['haleycodes'], // TODO
  'Network Interconnect': ['dcpena'],
  'Page Shield': ['pedrosousa'],
  'Pages': ['deadlypants1973'],
  'Partners': ['haleycodes'], // TODO
  'Pub/Sub': ['dcpena'],
  'R2': ['deadlypants1973'],
  'Railgun': ['marciocloudflare'],
  'Randomness Beacon': ['kodster28'],
  'Registrar': ['marciocloudflare'],
  'Rules': ['pedrosousa'],
  'Ruleset Engine': ['pedrosousa'],
  'Security Center': ['ranbel'],
  'Spectrum': ['angelampcosta'],
  'SSL': ['kodster28'],
  'Stream': ['dcpena'],
  'Tenant': ['kodster28'],
  'Terraform': ['ranbel'],
  'Time Services': ['haleycodes'], // TODO
  'WAF': ['pedrosousa'],
  'Waiting Room': ['angelampcosta'],
  'WARP Client': ['ranbel'],
  'Web3': ['kodster28'],
  'Workers': ['deadlypants1973'],
  'Zaraz': ['marciocloudflare'],
}