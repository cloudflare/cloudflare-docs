---
title: About
alwaysopen: true
weight: 1
hidden: false
showNew: false
---

Cloudflare Access, part of Cloudflare for Teams, protects internally managed resources by checking each request for identity and permission. When administrators secure an application behind Access, any request to the hostname of that application stops at Cloudflare’s network first. Once there, Cloudflare Access checks the request against the list of users who have permission to reach the application.

![Access Generic](../static/summary/network-diagram.png)

Deploying Access does not require exposing new holes in corporate firewalls. Teams connect their resources through a secure outbound connection, Argo Tunnel, which runs in your infrastructure to connect the applications and machines to Cloudflare. That tunnel makes outbound-only calls to the Cloudflare network and organizations can replace complex firewall rules with just one: disable all inbound connections.

Administrators then build rules to decide who should authenticate to and reach the tools protected by Access. Whether those resources are virtual machines powering business operations or internal web applications, like Jira or iManage, when a user needs to connect, they pass through Cloudflare first.

When users need to connect to the tools behind Access, they are prompted to authenticate with their team’s SSO and, if valid, instantly connected to the application without being slowed down. Internally managed apps suddenly feel like SaaS products, and the login experience is seamless and familiar.

Behind the scenes, every request made to those internal tools hits Cloudflare first where we enforce identity-based policies. Access evaluates and logs every request to those apps for identity, giving administrators more visibility and security than a traditional VPN.

Every Cloudflare data center, in 200 cities around the world, performs the entire authentication check. Users connect faster, wherever they are working, versus having to backhaul traffic to a home office.

Access also saves time for administrators. Instead of configuring complex and error-prone network policies, IT teams build policies that enforce authentication using their identity provider. Security leaders can control who can reach internal applications in a single pane of glass and audit comprehensive logs from one source.