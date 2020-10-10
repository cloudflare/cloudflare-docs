---
title: About
weight: -1
showNew: false
alwaysopen: false
---

Argo Tunnel offers an easy way to expose web servers securely to the internet, without opening up firewall ports and configuring ACLs. Argo Tunnel also ensures requests route through Cloudflare before reaching the web server, so you can be sure attack traffic is stopped with Cloudflare’s WAF and Unmetered DDoS mitigation, and authenticated with Access if you've enabled those features for your account.

Argo Tunnel relies on the `cloudflared` daemon to create a persistent connection between your web server and the Cloudflare network. Once the daemon is running and the Tunnel has been configured, you can lock down the web server to external requests to only allow connections from Cloudflare.
