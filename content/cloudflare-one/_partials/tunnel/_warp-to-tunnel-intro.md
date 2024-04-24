---
_build:
  publishResources: false
  render: never
  list: never
---

You can use Cloudflare Tunnel to create a secure, outbound-only connection from your server to Cloudflare's edge. This requires running the `cloudflared` daemon on the server. Users reach the service by installing the [Cloudflare WARP client](/cloudflare-one/connections/connect-devices/warp/) on their device and enrolling in your Zero Trust organization. Remote devices will be able to connect as if they were on your private network. By default, all devices enrolled in your organization can access the service unless you build policies to allow or block specific users.
