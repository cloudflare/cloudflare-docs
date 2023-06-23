---
_build:
  publishResources: false
  render: never
  list: never
---

## Microsoft Information Protection (MIP) sensitivity labels

{{<Aside type="note">}}

Requires [Cloudflare DLP](/cloudflare-one/policies/data-loss-prevention/).

{{</Aside>}}

Microsoft provides [MIP sensitivity labels](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide) to classify and protect sensitive data. When you add the CASB Microsoft 365 integration, Cloudflare will automatically retrieve the labels from your Microsoft account and populate them in a [DLP Profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/integration-profiles/).
