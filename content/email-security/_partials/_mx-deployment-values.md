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

If you are located in Europe or GDPR applies to the domain, use the following MX records. This will prioritize email flow through Germany and fail over to the United States.

MX Priority | Host
---  | --
`5`  | `mailstream-eu1.mxrecord.io`
`10` | `mailstream-central.mxrecord.mx`
`20` | `mailstream-east.mxrecord.io`
`20` | `mailstream-west.mxrecord.io`

If you are located in India, use the following MX records:

MX Priority | Host | Note
5	| `mailstream-bom.mxrecord.mx` | Best option to ensure data stays in India. For compliance purposes use this MX record. Note, however, there is no redundancy should something go wrong.
10 | `mailstream-india-primary.mxrecord.mx` | Same as `mailstream-bom.mxrecord.mx`, with fallback to US servers.
20 | `mailstream-asia.mxrecord.mx` | Best option for companies with a broader Asia presence.




Once the MX records have been updated with the new MX records, delete your old MX records and leave only the ones above. DNS updates may take up to 36 hours to fully propagate around the Internet. Some of the faster DNS providers will start to update records within minutes.