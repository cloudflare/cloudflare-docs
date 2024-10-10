---
pcx_content_type: concept
title: Full setup
sidebar:
  order: 1
  label: About
---

import { FeatureTable, Render } from "~/components"

<Render file="full-setup-definition" />

## How to

For more details, refer to [Set up a full domain](/dns/zone-setups/full-setup/setup/).

## Availability

<FeatureTable id="dns.full_setup" />
