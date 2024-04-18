---
pcx_content_type: concept
title: Managed service providers (MSPs)
weight: 15
---

# Managed service providers (MSPs)

Managed service providers (MSPs) are third-party entities that can deploy and manage a Cloudflare Zero Trust configuration for your organization.

## Types of accounts

### Parent-child accounts

In Gateway, you can configure your filtering policies with consultation from an MSP, including account or unit level policies. Gateway integrates with [Cloudflare Tenant](/tenant/) with a new feature that provides parent-child configurations. This allows MSP partners to create and manage accounts, set global corporate security policies, and allow appropriate management or overrides at the individual business unit or team level.

The Tenant platform allows MSPs ability to create millions of end customer accounts at their discretion to support their specific onboarding and configurations. This also ensures proper separation of ownership between customers and allows end customers to access the Cloudflare dashboard directly, if required.

Each account created is a separate container of subscribed resources (zero trust policies, zones, workers, etc.) for each of the MSPs end customers. Customer administrators can be invited to each account as necessary for self-service management, while the MSP retains control of the capabilities enabled for each account.

### Siloed accounts
