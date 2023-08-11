---
_build:
  publishResources: false
  render: never
  list: never
---

With an **Inline deployment** for your [Area 1 setup](/email-security/deployment/), Area 1 evaluates email messages before they reach a user's inbox.

More technically, Area 1 becomes a hop in the SMTP processing chain and physically interacts with incoming email messages. Based on your policies, various messages are blocked before reaching the inbox.

![With inline deployment, messages travel through Area 1's email filter before reaching your users.](/images/email-security/deployment/inline-setup/inline-deployment-diagram.png)

## Benefits

When you choose an inline deployment, you get the following benefits:

- Messages are processed and physically blocked before delivery to a user's mailbox.
- Your deployment is simpler, because any complex processing can happen downstream and without modification.
- Area 1 can [modify delivered messages](/email-security/email-configuration/email-policies/text-addons/), adding subject or body mark-ups.
- Area 1 can offer high availability and adaptive message pooling.
- You can set up advanced handling downstream for non-quarantined messages with [added X-headers](/email-security/reference/dispositions-and-attributes/).

## Limitations

Inline deployments are not without their disadvantages. If you deploy Area 1 as your MX record, you will have to make changes to your DNS. If not — and you deploy Area 1 after your MX record — you will have a more complex SMTP architecture.

Additionally, this setup may require policy duplication on multiple solutions and the Mail Transfer Agent (MTA).