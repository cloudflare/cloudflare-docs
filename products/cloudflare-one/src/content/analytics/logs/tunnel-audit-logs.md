---
order: 5
pcx-content-type: reference
---

# Tunnel Audit logs

Audit Logs for Tunnel are available in the [account section of the Cloudflare dashboard](https://dash.cloudflare.com/?account=audit-log) which you can find by clicking on your name or email in the upper right-hand corner of the dashboard. The following actions are logged:

Action       | Description
-------------|--------------
Registered   | This is logged when Tunnel is started and connects to the Cloudflare edge.
Unregistered | This is logged when Tunnel is disconnected from the Cloudflare edge.
CNAME add    | This is logged when Tunnel registers a new DNS (CNAME or AAAA) record for the tunneled application.