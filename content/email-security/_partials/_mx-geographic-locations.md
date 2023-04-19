---
_build:
  publishResources: false
  render: never
  list: never
---

If you are located in India, Europe or GDPR applies to you, select from the following MX records to process email in the correct geographic location. Do not forget to configure the correct MX priority as well:

{{<table-wrap>}}

Host | Location | Note
--- | --- | ---
`mailstream-central.mxrecord.mx` <br /> `mailstream-east.mxrecord.io` <br /> `mailstream-west.mxrecord.io` | USA | Use these servers outside the EU or India.
`mailstream-eu1.mxrecord.io` | EU | Prioritizes email flow through Germany, with fallback to US servers.
`mailstream-bom.mxrecord.mx` | India | Best option to ensure data stays in India. For compliance purposes use this MX record. Note, however, there is no redundancy should something go wrong.
`mailstream-india-primary.mxrecord.mx` | India | Same as `mailstream-bom.mxrecord.mx`, with fallback to US servers.
`mailstream-asia.mxrecord.mx` | India | Best option for companies with a broader Asia presence.

{{</table-wrap>}}