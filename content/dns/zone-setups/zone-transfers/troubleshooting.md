---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4667723574925-Error-when-adding-Secondary-Nameservers-nsXXXX-secondary-cloudflare-com-at-Registrar
title: Troubleshooting
meta: 
    title: Troubleshooting secondary nameservers
---

# Troubleshooting secondary nameservers

When [updating your registrar](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/#4-update-registrar) with the Cloudflare secondary nameservers (`nsXXXX.secondary.cloudflare.com`), you get an error.

{{<Aside type="note">}}

The exact error message depends on the system. Some examples would be: `Entity reference not found`,` Authorization error`, `Unable to create foreign nameserver`.

{{</Aside>}}

Upon contacting your registrar, their services confirm that the Cloudflare nameservers cannot be added at this time.

___

## Root Cause

This issue may arise when one of our nameservers used for secondary setup are removed from the Verisign side.

___

## Solution

The Cloudflare engineering team needs to be engaged [through Support](/support/contacting-cloudflare-support/) to make sure the nameserver gets registered again manually at Verisign.
