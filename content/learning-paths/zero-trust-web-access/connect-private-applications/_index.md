---
title: Connect your private applications
pcx_content_type: overview
weight: 3
layout: learning-module
---

# Connect your private applications

Cloudflare Tunnel allows you to securely connect your applications to Cloudflare without a publicly routable IP address. With Tunnel, you do not send traffic to an external IP — instead, a lightweight daemon in your infrastructure (`cloudflared`) creates outbound-only connections to Cloudflare's global network.

## Objectives

By the end of this module, you will be able to:

- Create a Cloudflare Tunnel.
- Publish your application via a public hostname.
