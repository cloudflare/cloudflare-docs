# Terminology and product names

## Correct product name casing

**Warning:** any `+` prose line that uses these terms incorrectly:

| Correct | Incorrect |
| ------- | --------- |
| DDoS | DDOS, ddos, Ddos |
| Zero Trust | zero trust, Zero trust |
| CAPTCHA | Captcha, captcha |
| Internet | internet (when used as a proper noun — "the Internet") |
| SSL | ssl |
| TLS | tls |
| WAF | waf |
| Cloudflare Workers | cloudflare workers, CF Workers |
| Workers AI | workers ai |

Note: "internet" lowercase is acceptable as an adjective ("internet traffic", "internet-facing") — only flag when used as the proper noun referring to the global network ("the internet" should be "the Internet").

## Deprecated jargon

**Warning:** any `+` prose line using these deprecated terms:

| Instead of | Use |
| ---------- | --- |
| whitelist | allowlist |
| blacklist | blocklist |
| master / slave | primary / replica (or context-specific terms) |
| man-in-the-middle | on-path attack |
| sanity check | validate / smoke test |
| out-of-the-box | default |
| on-prem | on-premises |

## UI interaction terms

See `writing.md` for "click", "navigate to", "see", "enable/disable" rules — those are in the writing domain.

## Example values

Use these reserved values in examples — they are safe and will not resolve to live origins:

| Type | Values |
| ---- | ------ |
| Domains | `example.com`, `example.org`, `myappexample.com` |
| IPv4 ranges | `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` |
| URL placeholders | `<YOUR_DOMAIN>`, `<ZONE_ID>`, `<ACCOUNT_ID>` |
| API shell variables | `$ZONE_ID`, `$CLOUDFLARE_API_TOKEN` (in curl blocks) |

**Suggestion:** any `+` line that uses real-looking but non-reserved domains (e.g. `yourdomain.com`, `mysite.com`) in examples where a reserved value would be appropriate.
