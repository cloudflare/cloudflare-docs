---
title: Pass user identity to a private application
pcx_content_type: overview
weight: 2
layout: learning-unit
---

A common goal for many security organizations is to implement continuous authentication and authorization. The challenge is to accomplish this without introducing significant user interruption or requiring behavioral changes for your end users.

## Consume the Cloudflare JWT

The simplest method for reducing authentication friction for your end-users after implementing Cloudflare Access. Our simple, documented JWT architecture gives you an alternative to the direct integration between your SSO and your private application. The primary benefit: Cloudflare becomes the primary responsible party for ‘validating’ the token returned from your SSO, and your users only have a single authentication event required to access their private applications.

For microservices, we would recommend building a workflow to accept the Cloudflare JWT in the service directly instead of integrating directly with SSO; this will give you stronger-than-HTML security for users who have ‘passed’ authentication at Cloudflare, and will make your user login experience seamless.

## Add authorization headers with Workers

When applications do not have integrated SSO, or any other method to deliver JIT user provisioning or management, it is common to look for a way within Cloudflare to automatically pass user information into the private application, as determined by the authentication event that the user completed when going through Cloudflare. To best accomplish this, we recommend using Cloudflare Workers. Because these requests all flow through the Cloudflare network, you can use our edge-delivered code to manipulate requests almost infinitely. When a user authenticates through Cloudflare Access, we sign the Cloudflare Authorization JWT with salient information that can be referenced in a worker to be turned into authentication headers for your application.
[info or links to new tutorial here]

