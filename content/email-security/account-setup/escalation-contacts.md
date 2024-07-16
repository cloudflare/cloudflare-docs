---
title: Escalation contacts
pcx_content_type: how-to
weight: 2
---

# Escalation contacts

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

Whenever Cloud Email Security finds an exceptional {{<glossary-tooltip term_id="phishing">}}phishing{{</glossary-tooltip>}} threat or Email Service irregularity behavior (compromised email servers at a partner or vendor, wire fraud tactics, and more), we try to reach out to our customers.

There are four types of contacts available to configure, each with a priority type:
- **SOC Contact**: P1 priority.
- **Triage Analyst**: P2 priority.
- **In-Depth Analyst**: P3 priority.
- **Executive Contact**: P4 priority.

Cloud Email Security will start by reaching out to P1-level contacts. If they do not respond, we will then try reaching out to the other contacts down the list until we receive a reply from one of these groups.

You can enable these special notifications through an opt-in process:

1. Log in to the [Cloud Email Security dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Subscriptions** > **Escalation Contacts**.
4. Select **Add Contact**.
5. Fill out the form.
6. Select **Save**.

{{<Aside type="note">}}

If you select **Critical Service Events**, the contact will be sent a text and/or an email message. They will need to select the link to confirm the subscriptions.

{{</Aside>}}