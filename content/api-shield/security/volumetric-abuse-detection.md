---
pcx_content_type: concept
type: overview
title: Volumetric Abuse Detection
weight: 3
layout: list
---

# Volumetric Abuse Detection

Cloudflare Volumetric Abuse Detection helps you set up a system of adaptive rate limiting.

## Process

After [API Discovery](/api-shield/security/api-discovery/), Cloudflare looks for endpoint abuse based on common user traffic.

For example, your API might see different levels of traffic to a `/reset-password` endpoint than a `/login` endpoint. Additionally, your `/login` endpoint might see higher than average traffic after a successful marketing campaign.

These two scenarios speak to the limitations of traditional rate limiting. Not only does traffic vary between endpoints, but it also can vary over time for the same endpoint. Volumetric Abuse Detection solves these problems with unsupervised learning to develop separate baselines for each API and better adjust to changes in user behavior.

This process currently requires a session identifier, like an authorization token available as a request header.

{{<render file="_blog-post.md">}}

## Availability

Volumetric Abuse Detection is only available for Enterprise customers. If you are an Enterprise customer and interested in this product, contact your account team.
