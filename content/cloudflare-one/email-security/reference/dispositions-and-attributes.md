---
title: Dispositions and attributes
pcx_content_type: reference
weight: 2
---

# Dispositions and attributes

Email Security uses a variety of factors to determine whether a given email message, domain, URL, or packet is part of a {{<glossary-tooltip term_id="phishing">}}phishing{{</glossary-tooltip>}} campaign. These small pattern assessments are dynamic in nature and — in many cases — no single pattern will determine the final verdict.

## Dispositions

Any traffic that flows through Email Security is given a final disposition, which represents our evaluation of that specific message. Each message will receive only one disposition header, so your organization can take clear and specific actions on different message types.

You can use disposition values when [setting up auto-moves](/cloudflare-one/email-security/auto-moves/).

### Available values

{{<render file="email-security/_dispositions-and-attributes.md">}}