---
title: Isolated traffic
order: 2
---

# Isolated traffic
This page describes what traffic is isolated by default.

## API traffic is not isolated
Isolation policies are applied to requests that include `Accept: text/html*`. This allows Browser Isolation policies to co-exist with API traffic.

## Self managed isolation policies
By default self-managed organizations are managed by the account administrator. See [isolation policies](/administration/isolation-policies) to learn how to configure Browser Isolation.

## Managed beta organization rules
Users participating in the `browser-beta` organization will have most traffic isolated by default with exceptions.

Common certificate pinning websites are not decrypted and video conferencing is excluded. 

Here is the `browser-beta` configuration:

### Block security threats
| Selector | Operator | Value | Action |
| - | - | - | - |
| Security Threats | In | `All security threats` | Block

### Block adult themes
| Selector | Operator | Value | Action |
| - | - | - | - |
| Content Categories | In | `Adult Themes` | Block

### Simulate Gateway block page
| Selector | Operator | Value | Action |
| - | - | - | - |
| URL Path | Is | `/cf-simulate-block` | Block

### Bypass common cert pinning sites
| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | matches regex | `.*whispersystems.org\|.*signal.org\|.*zoom.us\|.*zoomgov.com\|.*wellsfargo.com\|.*usaa.com\|.*apple.com\|.*icloud.com` | Bypass

### Isolate Google Search
This rule is placed above bypass Google Workspace to ensure all Google Search endpoints are isolated.

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | matches regex | `www\.google\.co.*\|www\.google\.com.*` | Isolate

### Bypass Google Workspace
This rule is defined to avoid isolating Google Meet as Microphones / Webcams are not available in isolated browsers.

Google Single Sign On does not work across isolated and non-isolated sessions.

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | matches regex | `.*\.google\.com\|.*\.gstatic\.com\|accounts\.youtube\.com\|.*googleusercontent\.com\|.*\.googleapis\.com` | Bypass

### Isolate everything
| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | matches regex | `.*` | Isolate