---
title: API
pcx-content-type: concept
layout: single
weight: 2
meta:
   title: API deployment

---

# API deployment

When you choose an **API deployment** for your [Area 1 setup](/email-security/deployment/), email messages only reach Area 1 after they have already reached a user's inbox.

Then, through on integrations with your email provider, Area 1 will retract messages based on your organization's policies.

![With API deployment, messages travel through Area 1's email filter after reaching your users.](/email-security/static/api-deployment-diagram.png)

## Benefits

When you choose API deployment, you get the following benefits:

- Easy protection for complex email architectures, without requiring any change to mailflow operations.
- Agentless deployment for Microsoft 365 and Gmail.
- Initial email protection from your current email provider.

## Limitations

However, API deployment also has the following disadvantages:

- Area 1 is dependent on your email provider's API infrastructure and outages will increase the message dwell time in the inbox.
- Your email provider may throttle API requests from Area 1.
- Requires read and write access to mailboxes.
- Requires API support (does not typically support on-premise providers).
- Detection rates may be lower if multiple solutions exist.
- Messages cannot be modified or quarantined.
- Certain URL rewrite schemes cannot be decoded (for example, Mimecast).

## Get started

For help getting started, refer to our [setup guides](/email-security/deployment/api/setup/).