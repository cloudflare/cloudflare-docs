---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
---

# Overview

Cloudflare **Version Management** allows you to safely test, deploy, and roll back changes to your edge configuration settings.

## Benefits

By using Version Management, you can:

- Manage edge configuration by use case, rather than hostname.
- Create independent configurations to make changes with no risk of impacting live traffic.
- Safely deploy changes to test and pre production environments ahead of deploying to production.
- Quickly roll back deployed changes when issues occur.

## Availability

Version Management are in an open Beta for Enterprise customers. For access, contact your account team.

## Limitations

To create an HTTP application from an existing zone, the following must be true:

- Your zone uses [WAF Managed Rulesets](https://support.cloudflare.com/hc/articles/5995821690637).
- Your zone is in an **Active** [status](/dns/zone-setups/reference/domain-status/).