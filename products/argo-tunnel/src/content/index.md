---
title: Welcome
order: 0
---

# Argo Tunnel docs

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Argo Tunnel offers an easy way to expose web servers securely to the internet, without opening up firewall ports and configuring ACLs. Argo Tunnel also ensures requests route through Cloudflare before reaching the web server, so you can be sure attack traffic is stopped with Cloudflare’s WAF and Unmetered DDoS mitigation, and authenticated with Access if you’ve enabled those features for your account.

Argo Tunnel relies on the `cloudflared` daemon to create a persistent connection between your web server and the Cloudflare network. You can lock down the web server to external requests. Instead, Argo Tunnel will connect out to Cloudflare from your origin.

<ButtonGroup>
  <Button type="primary" href="/getting-started">Get started</Button>
  <Button type="secondary" href="/learning/how-tunnel-works">How Argo Tunnel works</Button>
</ButtonGroup>
