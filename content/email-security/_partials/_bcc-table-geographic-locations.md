---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: address1;;address2;;address3;;address4;;address5;;address6
---

Select from the following BCC addresses to process email in the correct geographic location.

Host | Location | Note
--- | --- | ---
`$1` | USA | Use these servers to process email in the US.
`$2` | EU | Prioritizes email processing in Germany, with failover to US data centers.
`$3` | EU | Processes emails in the EU without failover to the USA.
`$4` | India | Best option to ensure data stays in India.
`$5` | India | Same as `mailstream-bom.mxrecord.mx`, with fallback to US servers.
`$6` | India | Best option for companies with a broader Asia presence.