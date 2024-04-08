---
title: Create an Access application
pcx_content_type: overview
weight: 1
layout: learning-unit
---

{{<render file="access/_self-hosted-intro.md" productFolder="cloudflare-one">}}
Each application can have multiple policies with different constraints depending on what user group is accessing the application. For example, you can create one policy that requires corporate users to present specific device posture checks or mutual TLS authentication events, and a second policy for contractors which does not require these attributes.

## Add your application to Access

{{<render file="access/_self-hosted-app.md" productFolder="cloudflare-one">}}

## Add an Access policy

{{<render file="access/_self-hosted-policy.md" productFolder="cloudflare-one">}}

## (Optional) Configure advanced settings

{{<render file="access/_self-hosted-settings.md" productFolder="cloudflare-one">}}

When users go to the application, they will be prompted to login with your identity provider.
