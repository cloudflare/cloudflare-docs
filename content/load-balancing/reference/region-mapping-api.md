---
title: Region Mapping API
order:
pcx-content-type: reference
---

import RegionMapping from "../_partials/_region-mapping.md"

# Cloudflare Region Mapping API

## Overview

Cloudflare’s Region Mapping API has several uses:
- Identify which countries/areas (states/provinces in the case of the U.S. and Canada) are part of a specific Cloudflare Load Balancer region.
- Identify the Cloudflare Load Balancer region for a particular country/area (states/provinces in the case of the U.S. and Canada).

The Region Mapping API uses 2-letter [ISO-3166-1 alpha-2 codes](https://www.iso.org/iso-3166-country-codes.html) for countries/areas and, in the case of the U.S. and Canada, ISO-3166-2 subdivision codes for states/provinces. Only the U.S. and Canada are provided with these subdivisions.

There are two main optional parameters for the Region Mapping API:
- country_code is a string containing a two-letter alpha-2 country code per ISO 3166-1. For example: /load_balancers/regions?country_code=US
- subdivision_code is a string containing a two-letter subdivision code for the U.S. and Canada per ISO 3166-2. For example: /load_balancers/regions?subdivision_code=CA

For additional details and examples on using the Region Mapping API, see [Cloudflare’s API documentation](https://api.cloudflare.com/#load-balancer-regions-properties).

## List of Load Balancer regions

<RegionMapping/>
