---
_build:
  publishResources: false
  render: never
  list: never
---

MX Priority | Host
---  | ---
`5`  | `mailstream-central.mxrecord.mx`
`10` | `mailstream-east.mxrecord.io`
`10` | `mailstream-west.mxrecord.io`

When configuring the Area 1 MX records, it is important to configure hosts with the correct MX priority. This will allow mail flows to the preferred hosts and fail over as needed.