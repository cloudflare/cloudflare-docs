---
title: Egress IPs
pcx_content_type: reference
weight: 1
---

# Egress IPs

When you set up Area 1 using an [inline deployment](/email-security/deployment/inline/), you need to tell your existing email providers to accept messages coming from Area 1's egress IP addresses.

## United States

For customers in the United States, enter the following IP addresses:

- **IPv4**:
  - `52.11.209.211`
  - `52.89.255.11`
  - `52.0.67.109`
  - `54.173.50.115`
  - `104.30.32.0/19`[^1]
  - `158.51.64.0/26`
  - `158.51.65.0/26`
  - `134.195.26.0/23`[^1]
- **IPv6**:
  - `2405:8100:c400::/38`[^2]

## Office 365 `/24` addresses

To be used instead of the `/19` and `/23` subnets:
  - `104.30.32.0/24`
  - `104.30.33.0/24`
  - `104.30.34.0/24`
  - `104.30.35.0/24`
  - `104.30.36.0/24`
  - `104.30.37.0/24`
  - `104.30.38.0/24`
  - `104.30.39.0/24`
  - `104.30.40.0/24`
  - `104.30.41.0/24`
  - `104.30.42.0/24`
  - `104.30.43.0/24`
  - `104.30.44.0/24`
  - `104.30.45.0/24`
  - `104.30.46.0/24`
  - `104.30.47.0/24`
  - `104.30.48.0/24`
  - `104.30.49.0/24`
  - `104.30.50.0/24`
  - `104.30.51.0/24`
  - `104.30.52.0/24`
  - `104.30.53.0/24`
  - `104.30.54.0/24`
  - `104.30.55.0/24`
  - `104.30.56.0/24`
  - `104.30.57.0/24`
  - `104.30.58.0/24`
  - `104.30.59.0/24`
  - `104.30.60.0/24`
  - `104.30.61.0/24`
  - `104.30.62.0/24`
  - `104.30.63.0/24`

## Europe

For customers in Europe, add all our US IP addresses. Additionally, you need to add the following IP addresses for our European data centers:

- `52.58.35.43`
- `35.157.195.63`

## India

For customers in India, add all our US IP addresses.

## Australia

For customers in Australia, add all our US IP addresses.

[^1]: Office 365 does not support this subnet mask range. If you use Office 365, you will have to use the broken down `/24` subnet mask IP addresses. Refer to **Office 365 `/24` addresses** for a list of these IPv4 addresses.

[^2]: Office 365 does not support IPv6 addresses.