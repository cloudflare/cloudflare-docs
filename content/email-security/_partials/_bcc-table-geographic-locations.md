---
_build:
  publishResources: false
  render: never
  list: never
---

Select from the following BCC addresses to keep email processing in the correct geographic location.


Host | Location | Note
--- | --- | ---
`<customer_name>@mxrecord.io` | USA | 
`<customer_name>@mailstream-eu-primary.journaling.mxrecord.io` | EU | Prioritizes email processing in Germany, with failover to US data centers.
`<customer_name>@mailstream-eu1.mxrecord.io` | EU | Processes emails in the EU without failover to the USA.
`<customer_name>@mailstream-bom.mxrecord.mx` | India | Best option to ensure data stays in India.
`<customer_name>@mailstream-india-primary.mxrecord.mx` | India | Same as `mailstream-bom.mxrecord.mx`, with fallback to US servers.
`<customer_name>@mailstream-asia.mxrecord.mx` | India | Best option for companies with a broader Asia presence.

