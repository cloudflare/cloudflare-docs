---
order: 3
---

# Overview to using Argo Tunnels

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

| Before you start |
|---|
| 1. [Get `cloudflared`](/getting-started/installation) |
| 2. [Authenticate `cloudflared`](/getting-started/setup) |

There are 3 high level steps towards setting up and running an Argo Tunnel:
 1. [Create a Named Argo Tunnel](/create-tunnel)
 2. [Route traffic to your Argo Tunnel](/routing-to-tunnel)
 3. [Run your Argo Tunnel](/run-tunnel)

Steps 1-2 are executed once per Tunnel, normally by an administrator, and Step 3
is executed whenever the Tunnel is to be started, normally by the owner of the
Tunnel (whom may be different from the administrator).

Be sure to check out our [Tutorials](/learning/tutorials) where you can also find
best practices for managing Tunnels as an administrator.