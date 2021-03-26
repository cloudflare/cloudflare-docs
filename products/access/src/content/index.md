---
title: Welcome
order: 0
---

# Cloudflare Access documentation

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access is a Zero Trust platform that secures self-hosted and SaaS applications by aggregating sources of user identity and trust, and enforcing rules on every request or login. When administrators secure an application behind Access, any request to the hostname of that application stops at Cloudflare’s network first. Once there, Cloudflare Access checks the request against the list of users who have permission to reach the application. Cloudflare Access can then apply additional rules to each login or integrate multiple SSO provider types.

Authentication checks are performed at our edge network of 200 data centers. This is much faster than, for instance, a VPN backhauling traffic to a home office.

Instead of configuring complex and error-prone network rules, IT teams build rules that enforce authentication using their identity provider. Security leaders can control who can reach internal applications in a single pane of glass and audit comprehensive logs from one source.

<ButtonGroup>
  <Button type="primary" href="/getting-started">Get started</Button>
  <Button type="secondary" href="/about/how-access-works">How Access works</Button>
</ButtonGroup>
