---
pcx_content_type: tutorial
title: Custom CA for API Shield mTLS
weight: 6
---

# Use your chosen CA for API Shield mTLS

This page explains how you can set up mTLS wth API Shield using client certificates that have not been issued with Cloudflare CA.

This is specially useful if you already have mTLS implemented and client certificates issued by the CAs are already installed on devices.

## Availability

* Currently, this process can only be completed via API.
* To be able to set this up, your account must be on an Enterprise plan.
* Each Enterprise account can upload up to five CAs. This quota does not apply to CAs uploaded through [Cloudflare Access](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

## 1. Upload the CA root certificate

## 2. Associate custom CA with mTLS hosts

## 3. Enforce client certificate validation