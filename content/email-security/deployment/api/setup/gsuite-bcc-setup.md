---
title: Gmail BCC setup
pcx_content_type: integration-guide
weight: 1
meta:
    title: Setup phishing risk assessment for Gmail with Cloud Email Security (formerly Area 1)
updated: 2022-10-11
---

# Gmail BCC setup with Cloud Email Security (formerly Area 1)

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

For customers using Gmail, setting up Cloud Email Security via BCC is quick and easy. All you need to do is create a content compliance filter to send emails to Cloud Email Security through BCC. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Gmail with Cloud Email Security.](/images/email-security/deployment/api-setup/gmail/gmail-bcc-flow.png)

To setup Cloud Email Security phishing risk assessment for Gmail:

{{<render file="deployment/_gmail-bcc-setup.md">}}

## Geographic locations

{{<render file="deployment/_bcc-table-geographic-locations.md">}}