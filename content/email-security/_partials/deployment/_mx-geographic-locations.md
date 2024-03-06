---
_build:
  publishResources: false
  render: never
  list: never
---

When configuring the Area 1 MX records, it is important to configure hosts with the correct MX priority. This will allow mail flows to the preferred hosts and fail over as needed.

Choose from the following Area 1 MX hosts, and order them by priority. For example, if you are located outside the US and want to prioritize email processing in the EU, add `mailstream-eu1.mxrecord.io` as your first host, and then the US servers.

Host <div style="width: 250px;"> | Location | Note
--- | --- | ---
<un><li>`mailstream-central.mxrecord.mx`</li> <li>`mailstream-east.mxrecord.io`</li> <li>`mailstream-west.mxrecord.io`</li></un> | US | Best option to ensure all email traffic processing happens in the US.
`mailstream-eu1.mxrecord.io` | EU | Best option to ensure all email traffic processing happens in Germany, with fallback to US data centers.
`mailstream-bom.mxrecord.mx` | India | Best option to ensure all email traffic processing happens within India. For compliance purposes use this MX record. Note, however, there is no redundancy should something go wrong.
`mailstream-india-primary.mxrecord.mx` | India | Same as `mailstream-bom.mxrecord.mx`, with fallback to US data centers.
`mailstream-asia.mxrecord.mx` | India | Best option for companies with a broader Asia presence.
`mailstream-syd.area1.cloudflare.net` | Australia / New Zealand | Best option to ensure all email traffic processing happens within Australia.
`mailstream-australia-primary.area1.cloudflare.net` | Australia / New Zealand | Best option to ensure all email traffic processing happens in Australia, with India and US data centers as backup.