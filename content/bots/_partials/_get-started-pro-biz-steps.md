---
_build:
  publishResources: false
  render: never
  list: never
---

To start using Super Bot Fight Mode:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2.  Go to **Security** > **Bots**.
3.  Click **Configure Super Bot Fight Mode**.
4.  Choose how your domain should respond to various types of traffic:
    *   For more details on verified bots, refer to [Verified Bots](/bots/concepts/bot/#verified-bots).
    *   For more details on supported file types, refer to [Static resource protection](/bots/reference/static-resources/)
    *   For more details on invisible code injection, refer to [JavaScript detections](/bots/reference/javascript-detections/).

{{<Aside type="warning" header="Warning">}}
If your organization also uses [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/), keep **Definitely Automated** set to **Allow**. Otherwise, tunnels might fail with a `websocket: bad handshake` error.
{{</Aside>}}
