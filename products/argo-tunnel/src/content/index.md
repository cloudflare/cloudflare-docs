---
title: Welcome
order: 0
---

# Argo Tunnel docs

Argo Tunnel offers an easy way to expose web servers securely to the internet, without opening up firewall ports and configuring ACLs. Argo Tunnel also ensures requests route through Cloudflare before reaching the web server, so you can be sure attack traffic is stopped with Cloudflare’s WAF and Unmetered DDoS mitigation, and authenticated with Access if you’ve enabled those features for your account.

Argo Tunnel relies on the `cloudflared` daemon to create a persistent connection between your web server and the Cloudflare network. You can lock down the web server to external requests. Instead, Argo Tunnel will connect out to Cloudflare from your origin.

<p><Link to="/getting-started" className="Button Button-is-docs-primary">Get started</Link> &nbsp; <Link to="/learning/how-tunnel-works" class="Button Button-is-docs-secondary">How Argo Tunnel works</Link></p>
