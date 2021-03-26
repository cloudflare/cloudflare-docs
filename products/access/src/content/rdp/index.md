---
order: 5
hidden: true
---

# RDP

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access can secure connections over Remote Desktop Protocol (RDP).

Doing so requires configuring your Access-protected server to use Argo Tunnel for RDP connections. Argo Tunnel exposes your origin server directly to Cloudflare, avoiding external internet connections. Using Argo Tunnel ensures that Cloudflare evaluates all requests to your application.

Establishing an RDP connection to an Access-protected server requires installing Cloudflare's `cloudflared` command-line tool on the client machine so that it can connect over Argo Tunnel.

To begin, follow [these steps](/rdp/rdp-guide/). A video guide is [also available](/videos/configuring-access/).
