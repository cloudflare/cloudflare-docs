---
pcx_content_type: reference
title: Strict (SSL-Only Origin Pull)
weight: 5
meta:
    title: Strict (SSL-Only Origin Pull) - SSL/TLS encryption modes
---

# Strict (SSL-Only Origin Pull) - SSL/TLS encryption modes

_This method is only available for Enterprise zones._

Connections to the origin will always be made using SSL/TLS, regardless of the scheme requested by the visitor.

The certificate presented by the origin will be validated the same as with [Full (strict) mode](/ssl/origin-configuration/ssl-modes/full-strict/).

## Use when

You want the most secure configuration available for your origin, you are an Enterprise customer, and you meet the requirements for [**Full (strict)** mode](/ssl/origin-configuration/ssl-modes/full-strict/).

## Required setup

The setup is the same as [**Full (strict)** mode](/ssl/origin-configuration/ssl-modes/full-strict/), but you select **Strict (SSL-Only Origin Pull)** for your encryption mode.

## Limitations

{{<render file="_ssl-mode-errors.md">}}