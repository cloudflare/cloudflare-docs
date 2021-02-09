---
order: 2
---

# Global rules

Cloudflare for Teams applies a set of **global rules** to all accounts.

<TableWrap>

| Criteria | Value | Action | Description |
| -------- | ------ | ----------- | ------ |
| Hostname | `*.cloudflareclient.com` | bypass | `engage.cloudflareclient.com` is used by client for registration |
| Hostname | `*.assets.browser.run` | bypass | Do not inspect `assets.browser.run` or `*.assets.browser.run` |
| Hostname | `*.cloudflare-gateway.com` | bypass | Ensure we bypass requests to `cloudflare-gateway.com` DNS endpoint |
| Hostname | `*.cloudflarestatus.com` | bypass | Bypass `cloudflarestatus.com` so customers can reach the page in case of Gateway outage |
| Hostname | `*.net.cloudflare.com` | bypass | Bypass `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature |
| Hostname | `client.wns.windows.com` | bypass | Temp cert pinning global bypass |
| Hostname | `api.apple-cloudkit.com` | bypass | Temp cert pinning global bypass |
| Hostname | `gateway.icloud.com` | bypass | Temp cert pinning global bypass |
| Hostname | `*.edge.browser.run` | isolate | Anything bound for `*.edge.browser.run` needs to go the isolation browser |
| Hostname | `help.teams.cloudflare.com` | allow | Teams client will use this to check if Gateway is on by inspecting cert. Also will check if certificate is properly installed on client machine  | 
| Request Header | `Accept: text/html` | noisolate | Browsers issue an `Accept:` header that begins with `text/html`. Do not isolate if we don't see such a header because this is not a browser |

</TableWrap>
