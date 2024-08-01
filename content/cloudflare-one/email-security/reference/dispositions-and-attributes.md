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

| Disposition | Description | Recommendation |
| --- | --- | --- | --- |
| `MALICIOUS` | Traffic invoked multiple phishing verdict triggers, met thresholds for bad behavior, and is associated with active campaigns. | Block |
| `SUSPICIOUS` | Traffic associated with phishing campaigns (and is under further analysis by our automated systems). | Research these messages internally to evaluate legitimacy. |
| `SPOOF` | Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies (SPF, DKIM, DMARC) or has mismatching `Envelope From` and `Header From` values. | Block after investigating (can be triggered by third-party mail services). | 
| `SPAM` | Traffic associated with non-malicious, commercial campaigns. | Route to existing Spam quarantine folder. |
| `BULK` | Traffic associated with [Graymail](https://en.wikipedia.org/wiki/Graymail_(email)), that falls in between the definitions of `SPAM` and `SUSPICIOUS`. For example, a marketing email that intentionally obscures its unsubscribe link. | Monitor or tag |