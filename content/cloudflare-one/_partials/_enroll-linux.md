---
_build:
  publishResources: false
  render: never
  list: never
---

1. Open a terminal window.
2. Run `warp-cli teams-enroll <your team name>` to enroll into Cloudflare Zero Trust using your organization's [team name](/cloudflare-one/glossary/#team-name).
3. Complete the authentication steps required by your organization in the browser window that opens.
4. Return to your terminal window and run `warp-cli enable-always-on` to toggle WARP to always stay connected.
