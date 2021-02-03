---
order: 6
---

# SSH

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access can secure connections over Secure Shell (SSH). Doing so requires configuring your Access-protected server to use [Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/) for SSH connections. Without Argo Tunnel, Access can be circumvented by using a server's public IP address. Argo Tunnel exposes your origin server directly to Cloudflare only, avoiding external internet connections.

![SLC-cert-handoff](../../static/short-lived/slc-cert-handoff.png)

| Guide | Description |
|-------|-------------|
| **[SSH Connections](/protocols-and-connections/ssh/ssh-connections/)** | Instructions on how to connect a machine to Cloudflare and connecting as an end user over SSH.|
| **[Short-Lived Certificates](/protocols-and-connections/ssh/short-lived-certificates/)** | Instructions on how to replace SSH keys with short-lived certificates from Cloudflare.|
| **[PuTTY Clients](/protocols-and-connections/ssh/putty-clients/)** | Instructions on how to use a PuTTY client to connect over SSH through Cloudflare Access.|
