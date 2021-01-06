---
order: 0
---

# Connect applications

You can connect applications, servers, and other resources to Cloudflare's network using Argo Tunnel. Argo Tunnel provides a secure connection to Cloudfare without requiring that your organization open firewall ports. Argo Tunnel also ensures requests route through Cloudflare before reaching the web server, so you can be sure attack traffic is stopped with Cloudflare’s WAF and Unmetered DDoS mitigation, and authenticated with Access if you’ve enabled those features for your account.

Argo Tunnel relies on the `cloudflared` daemon to create a persistent connection between your web server and the Cloudflare network. You can lock down the web server to external requests. Instead, Argo Tunnel will connect out to Cloudflare from your origin.

`cloudflared` can be deployed once to support multiple resources or applications.