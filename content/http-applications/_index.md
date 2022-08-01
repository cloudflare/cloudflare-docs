---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
---

# Overview

Cloudflare **HTTP Applications** allow you to safely test, deploy, and roll back changes to your edge configuration settings.

## Benefits

By using HTTP Applications, you can:

- Manage edge configuration by use case, rather than hostname.
- Update staging configurations without having to manually recopy settings between subdomains.
- Test, deploy, and rollback changes as needed and without additional deployments.

## Availability

HTTP Applications are in an open Beta for Enterprise customers. For access, contact your account team.

## Limitations

To create an HTTP application from an existing zone, the following must be true:

- Your zone uses [WAF Managed Rulesets](https://support.cloudflare.com/hc/en-us/articles/5995821690637).
- Your zone is in an **Active** [status](/dns/zone-setups/reference/domain-status/).
- Your zone has the **New Navigation** enabled (visible from your profile dropdown).