---
title: Connect user devices to Cloudflare
pcx_content_type: overview
weight: 6
layout: learning-module
---

# Connect user devices to Cloudflare

The WARP client encrypts designated traffic from a user's device to Cloudflare's edge. It can run alongside other VPN clients so long as there are no route conflicts.

This setup uses a positive security model, meaning that only certain IP ranges or domains (local or external) are proxied through Cloudflare's network. Most admins test by downloading the client and authenticating in, but you can also install WARP via Managed deployments.

## Objectives

By the end of this module, you will be able to:

- You will be able to define which users can connect devices to your Zero Trust organization
- Download and deploy WARP 
