---
order: 2
---

# Global rules

Cloudflare for Teams applies a set of **global rules** to all accounts.

<TableWrap>

| LHS | RHS | Action | Description |
| -------- | ---- |------ | ----------- |
| `http.conn.hostname` | `^(.*\\.)?cloudflareclient\\.com$` | "off" | `test.cloudflareclient.com` is used by client for connectivity checks |
| `http.conn.hostname` | `^(.*\\.)?cloudflareclient\\.com$` | "off" | `engage.cloudflareclient.com` is used by client for registration |
| `http.conn.hostname` | `^(.*\\.)?assets\\.browser\\.run$` | "off" | Do not inspect `assets.browser.run` or `*.assets.browser.run` |
| `http.conn.hostname` | `^(.*\\.)?cloudflare-gateway\\.com$` | "off" | Ensure we bypass requests to `cloudflare-gateway.com` DNS endpoint |
| `http.conn.hostname` | `^(.*\\.)?cloudflarestatus\\.com$` | "off" | Bypass `cloudflarestatus.com` so customers can reach the page in case of Gateway outage |
| `http.conn.hostname` | `^(.*\\.)?nel\\.cloudflare\\.com$` | "off" | Bypass `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature |
| `http.conn.hostname` | `client.wns.windows.com` | "off" | Temp cert pinning global bypass |
| `http.conn.hostname` | `api.apple-cloudkit.com` | "off" | Temp cert pinning global bypass |
| `http.conn.hostname` | `gateway.icloud.com` | "off" | Temp cert pinning global bypass |
| `http.conn.hostname` | `gateway.icloud.com` | "off" | Temp cert pinning global bypass |
| `http.request.host` | `\\.edge\\.browser\\.run$` | "isolate" | Anything bound for *.edge.browser.run needs to go the isolation browser |
| `http.request.host` | `help.teams.cloudflare.com` | "allow" | Teams client will use this to check if Gateway is on by inspecting cert. Also will check if certificate is properly installed on client machine  | 
| `http.request.headers.accept` | `^text/html` | "noisolate" | Browsers issue an "Accept:" header that begins with "text/html". Do not isolate if we don't see such a header because this is not a browser |

</TableWrap>