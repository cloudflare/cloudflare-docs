---
pcx_content_type: reference
title: Supported options
weight: 2
layout: single
meta:
    title: Supported options - Geo Key Manager
    description: Learn which options are supported for Geo Key Manager.
---

# Supported options

## Available regions

For customers with Geo Key Manager v2, you can use the `policy` parameter to specify following regions using the **Region code**:

| Region code | Region name |
| --- | --- |
| AFR | Africa |
| APAC | Asia Pacific |
| EEUR | Eastern Europe |
| ENAM | Eastern North America |
| EU | European Union |
| ME | Middle East |
| OC | Oceania |
| SAM | South America |
| WEUR | Western Europe |
| WNAM | Western North America |

---

## Available countries

For customers with Geo Key Manager v2, you can use the `policy` parameter to specify individual countries as well. Cloudflare is constantly expanding the number of supported countries. To indicate a country, specify the two-letter (ISO 3166) country code.

Examples of supported countries are Japan, Canada, India, and Austrailia.

---

## Highest security data centers

For customers with both Geo Key Manager v1 and v2, you can use the `geo_restrictions` parameter to only choose Cloudflare's highest security data centers.

The following aspects are unique to our highest security data centers, but the baseline security requirements for all data centers are also detailed in [our blog](https://blog.cloudflare.com/introducing-cloudflare-geo-key-manager/).

### Pre-scheduled and biometric controlled facility access

Employees of Cloudflare permitted to access the facility must have previously scheduled a visit before access will be granted.

Access to the entrance of the facility is controlled through the use of a biometric hand reader combined with an assigned access code.

### Private cages with biometric readers

All equipment is in private cages with physical access controlled via biometrics and recorded in audit logs.
Entrants have to pass through five separate readers before they can access the cage.

### Exterior security controls and monitoring

All points of ingress/egress are monitored by an intrusion detection system (IDS), with authorized users and access events archived for historical review.

### Interior security controls and monitoring

Interior points of ingress/egress are controlled by the access control subsystem, with entry routed through a mantrap. All areas are monitored and recorded with closed-circuit television, with data kept for a minimum of thirty days.

Exterior walls are airtight and may incorporate additional security measures such as reinforced concrete, Kevlar bullet board, vapor barriers, or bullet-proof front doors.