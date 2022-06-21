---
pcx content type: concept
title: Migrating custom hostnames
weight: 
---

# Migrating Custom Hostnames
 
As a SaaS provider, you may want, or have, multiple zones to manage hostnames. Each zone can have different configurations or origins, as well as correlate to varying products. You might shift custom hostnames between zones to enable or disable certain features. Cloudflare facilitates migration within the same account through the steps below:
 
---
 
## CNAME
 
If your custom hostname uses a CNAME record, add the custom hostname to the new zone and update your DNS record to point to the new zone.
 
{{<Aside type="note">}}
 
If you would like to migrate the custom hostname without end customers changing the DNS target, use apex proxying.
 
{{</Aside>}}
 
1. Add custom hostname to your new zone.
 
1. Direct your customer to change the DNS record so that it points to the new zone.
 
1. Confirm that the custom hostname has validated in the new zone.

1. Wait for the certificate to validate automatically through Cloudflare or validate it using the DCV records.

1. Remove custom hostname from the old zone.

Once these steps are complete, the custom hostname's traffic will route to the second SaaS zone and will use its configuration.
 
## A record
 
Through Apex Proxying or BYOIP, you can migrate the custom hostname without action from your end customer.

1. Verify with the account team that your apex proxying IPs have been assigned to both SaaS zones.
 
1. Add custom hostname to the new zone.

1. Confirm that the custom hostname has validated in the new zone.

1. Wait for the certificate to validate automatically through Cloudflare or validate it using the DCV records.
 
1. Remove custom hostname from the old zone.
 
{{<Aside type = “note”>}}
 
The most recently edited custom hostname will be active. For instance, `example.com` exists on `SaaS Zone 1`. It is added to `SaaS Zone 2`. Because it was activated more recently on `SaaS Zone 2`, that is where it will be active. However, if edits are made to example.com on `SaaS Zone 1`, it will reactivate on that zone instead of `SaaS Zone 2`.
 
{{</Aside}} 
 
## Wildcard certificate
 
If you are migrating custom hostnames that rely on a Wildcard certificate, Cloudflare cannot automatically complete Domain Control Validation (DCV).
 
1. Add custom hostname to the new zone.
 
1. Direct your customer to change the DNS record so that it points to the new zone.
 
1. Validate the certificate on the new zone.
  
The custom hostname can activate on the new zone even if the certificate is still active on the old zone. This ensures a valid certificate exists during migration. However, it is important to validate the certificate on the new zone as soon as possible.
 
---
 
Verify that the custom hostname successfully activated after the migration in the Cloudflare Dashboard by selecting **SSL/TLS** > **Custom hostnames** > **{your custom hostname}**.
 

