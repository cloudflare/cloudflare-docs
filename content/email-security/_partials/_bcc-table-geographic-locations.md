---
_build:
  publishResources: false
  render: never
  list: never
---

Select from the following BCC addresses to process email in the correct geographic location.

Host <div style="width: 250px;"> | Location | Note
--- | --- | ---
`<customer_name>@journaling.mxrecord.io` | US | Best option to ensure all email traffic processing happens US data centers.
`<customer_name>@journaling.mailstream-eu-primary.mxrecord.io` | EU | Best option to ensure all email traffic processing happens in Germany, with fallback to US data centers.
`<customer_name>@journaling.mailstream-eu1.mxrecord.io` | EU | Best option to ensure all email traffic processing happens within the EU without fallback to US data centers.
`<customer_name>@journaling.mailstream-bom.mxrecord.mx` | India | Best option to ensure all email traffic processing happens within India.
`<customer_name>@journaling.mailstream-india-primary.mxrecord.mx` | India | Same as `mailstream-bom.mxrecord.mx`, with fallback to US data centers.
`<customer_name>@journaling.mailstream-asia.mxrecord.mx` | India | Best option for companies with a broader Asia presence.
`<customer_name>@journaling.mailstream-syd.area1.cloudflare.net` | Australia / New Zealand | Best option to ensure all email traffic processing happens within Australia.
`<customer_name>@journaling.mailstream-australia.area1.cloudflare.net` | Australia / New Zealand | Best option to ensure all email traffic processing happens in Australia, with India and US data centers as backup.