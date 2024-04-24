---
pcx_content_type: navigation
title: Policies
weight: 7
meta:
  description: A policy is a set of rules that regulate network activity, such as who logs in to your applications or which websites your users can reach.
---

# Policies

With Cloudflare Zero Trust, you can create:

- [**Secure Web Gateway**](/cloudflare-one/policies/gateway/) policies to inspect outbound traffic to the Internet, with {{<glossary-tooltip term_id="Cloudflare Gateway">}}Cloudflare Gateway{{</glossary-tooltip>}}.
- [**Access**](/cloudflare-one/policies/access/) policies to secure inbound traffic to your applications with {{<glossary-tooltip term_id="Cloudflare Access">}}Cloudflare Access{{</glossary-tooltip>}}.
- [**Browser Isolation**](/cloudflare-one/policies/browser-isolation/) policies to protect your organization's devices from threats on the Internet, and to prevent data loss.
- [**Data Loss Prevention**](/cloudflare-one/policies/data-loss-prevention/) policies to detect and secure your sensitive data.

## Related tutorials

### Secure Web Gateway policies

- [Inspect HTTP and block file uploads](/cloudflare-one/policies/gateway/http-policies/common-policies/#block-google-drive-uploads)
- [Block sites by host and URL](/cloudflare-one/policies/gateway/http-policies/common-policies/#block-sites)
- [Block sites by TLD](/cloudflare-one/policies/gateway/dns-policies/common-policies/#block-top-level-domains)
- [Block sites for specific users](/cloudflare-one/policies/gateway/http-policies/common-policies/#check-user-identity)

### Zero Trust policies

- [Require Gateway connections](/cloudflare-one/identity/devices/)
- [Secure SSH and HTTP for GitLab](/cloudflare-one/tutorials/gitlab/)
- [Require U2F keys with Okta](/cloudflare-one/tutorials/okta-u2f/)
- [Require specific countries](/cloudflare-one/identity/users/groups/)
