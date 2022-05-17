---
title: Overview
type: overview
pcx-content-type: overview
weight: 1
---

# Overview

Cloudflare **HTTP Applications** allow you to safely test, deploy, and roll back changes to your zone configuration settings.

## Benefits

By using HTTP Applications, you can:

- Manage edge configuration by use case, rather than hostname.
- Update staging configurations without having to manually re-copy settings between subdomains.
- Test, deploy, and rollback changes as needed and without additional deployments.

## Availability

HTTP Applications are in an open Beta for Enterprise customers. For access, contact your account team.

## Limitations

To use HTTP applications, your zone must:

- Use [WAF Managed Rulesets](https://support.cloudflare.com/hc/en-us/articles/5995821690637).
- Be in an **Active** [status](/dns/zone-setups/reference/domain-status/).
- Have **New Navigation** enabled (visible from your profile dropdown).