---
_build:
  publishResources: false
  render: never
  list: never
---

MX Priority | Host
--- | ---
`10` | `mailstream-east.mxrecord.io`
`10` | `mailstream-west.mxrecord.io`
`20` | `mailstream-central.mxrecord.mx`

When configuring the Area 1 MX records, it is important to configure hosts with the correct MX priority. This will allow mail flows to the preferred hosts and fail over as needed.

If you are located in Europe or GDPR applies to the domain, use the following MX records. This will prioritize email flow through Germany and fail over to the United States.

MX Priority | Host
--- | --
`5` | `mailstream-eu1.mxrecord.io`
`10` | `mailstream-east.mxrecord.io`
`10` | `mailstream-west.mxrecord.io`
`20` | `mailstream-central.mxrecord.mx`

Once the MX records have been updated with the new MX records, delete your old MX records and leave only the ones above. DNS updates may take up to 36 hours to fully propagate around the Internet. Some of the faster DNS providers will start to update records within minutes. DNS changes will reach the major DNS servers in about an hour or follow the TTL value as described in the [Prerequisites section](#prerequisites).