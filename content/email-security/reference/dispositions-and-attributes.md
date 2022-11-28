---
title: Dispositions and attributes
pcx_content_type: reference
weight: 2
---

# Dispositions and attributes

Area 1 uses a variety of factors to determine whether a given email message, domain, URL, or packet is part of a phishing campaign. These small pattern assessments are dynamic in nature and — in many cases — no single pattern will determine the final verdict.

Based on these patterns, Area 1 may add `X-Headers` to each email message that passes through our system.

## Dispositions

Any traffic that flows through Area 1 is given a final **Disposition**, which represents our evaluation of that specific message. Each message will only receive one disposition header so your organization can take clear and specific actions on different message types.

You can use disposition values when [creating your quarantine policy](/email-security/email-configuration/domains-and-routing/domains/) or [setting up auto-retract](/email-security/email-configuration/retract-settings/).

### Available values

| Disposition | Description | Recommendation |
| --- | --- | --- | --- |
| `MALICIOUS` | Traffic invoked multiple phishing verdict triggers, met thresholds for bad behavior, and is associated with active campaigns. | Block |
| `SUSPICIOUS` | Traffic associated with phishing campaigns (and is under further analysis by our automated systems). | Research these messages internally to evaluate legitimacy. |
| `SPOOF` | Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies (SPF, DKIM, DMARC) or has mismatching `Envelope From` and `Header From` values. | Block after investigating (can be triggered by third-party mail services). | 
| `SPAM` | Traffic associated with non-malicious, commercial campaigns. | Route to existing Spam quarantine folder. |
| `BULK` (dashboard only) | Traffic associated with [Graymail](https://en.wikipedia.org/wiki/Graymail_(email)), that fall in between the definitions of `SPAM` and `SUSPICIOUS`. For example, a marketing email that intentionally obscures its unsubscribe link. | Monitor or tag |

### Header structure

When Area 1 adds a disposition header to an email message, that header matches the following format:

```txt
X-Area1Security-Disposition: [Value]
```

Note that emails with a disposition of `SPAM` will be tagged with `UCE` (unsolicited commercial emails) in their headers:

```txt
X-Area1Security-Disposition: UCE
```

## Attributes

Traffic that flows through Area 1 can also receive one or more **Attributes**, which indicate that a specific condition has been met.

### Available values

| Attribute | Notes |
| --- | --- |
| `CUSTOM_BLOCK_LIST` | This message matches a value you have defined in your custom block list. |
| `NEW_DOMAIN_SENDER=<REGISTRATION_DATE>` | Alerts to mail from a newly registered domain. Formatted as yyyy-MM-dd HH:mm:ss ZZZ. |
| `NEW_DOMAIN_LINK=<REGISTRATION_DATE>` | Alerts to mail with links pointing out to a newly registered domain. Formatted as yyyy-MM-dd HH:mm:ss ZZZ. |
| `ENCRYPTED` | Email message is encrypted. |
| `EXECUTABLE` | Email message contains an executable file. |
| `BEC` | Indicates that email address was contained in your [business email compromise (BEC)](/email-security/email-configuration/enhanced-detections/business-email-compromise/) list. Associated with `MALICIOUS` or `SPOOF` dispositions. |

### Header structure

When Area 1 adds a disposition header to an email message, that header matches the following format.

```txt
X-Area1Security-Attribute: [Value]
X-Area1Security-Attribute: [Value2]
```