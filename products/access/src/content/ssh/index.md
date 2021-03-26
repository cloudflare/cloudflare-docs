---
order: 5
hidden: true
---

# SSH

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access can secure connections over Secure Shell (SSH)

Doing so requires configuring your Access-protected server to use Argo Tunnel for SSH connections. Argo Tunnel exposes your origin server directly to Cloudflare, avoiding external internet connections. Using Argo Tunnel ensures that Cloudflare evaluates all requests to your application.

Establishing an SSH connection to an Access-protected server requires installing Cloudflare's `cloudflared` command-line tool on the client machine so that it can connect over Argo Tunnel.

|Guide|Description|
|---|---|
|[SSH Connection](/ssh/ssh-guide/)|Guide to connecting a machine to Cloudflare and connecting as an end user over SSH.|
|[Short-lived certificates](/ssh/short-live-cert-server/)|Guide to replacing SSH keys with short-lived certificates from Cloudflare.|
|[PuTTY Clients](/ssh/putty/)|Guide to using a PuTTY client to connect over SSH through Cloudflare Access.|

A video guide is [also available](/videos/configuring-access/).
