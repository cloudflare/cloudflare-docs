---
_build:
  publishResources: false
  render: never
  list: never
---

When you choose an **API deployment** for your [Cloud Email Security (formerly Area 1) setup](/email-security/deployment/), email messages only reach Cloud Email Security after they have already reached a user's inbox.

Then, through on integrations with your email provider, Cloud Email Security can [retract messages](/email-security/email-configuration/retract-settings/) based on your organization's policies.

![With API deployment, messages travel through Cloud Email Security's email filter after reaching your users.](/images/email-security/deployment/api-setup/api-deployment-diagram.png)

## Benefits

When you choose API deployment, you get the following benefits:

- Easy protection for complex email architectures, without requiring any change to mailflow operations.
- Agentless deployment for Microsoft 365 and Gmail.
- The initial email protection measures offered by your current email provider.

## Limitations

However, API deployment also has the following disadvantages:

- Cloud Email Security is dependent on your email provider's API infrastructure and outages will increase the message dwell time in the inbox.
- Cloud Email Security requires read and write access to mailboxes.
- Requires API support from your email provider (does not typically support on-premise providers).
- Your email provider may throttle API requests from Cloud Email Security.
- Detection rates may be lower if multiple solutions exist.
- Messages cannot be modified or quarantined.
- Certain URL rewrite schemes cannot be decoded (for example, Mimecast).