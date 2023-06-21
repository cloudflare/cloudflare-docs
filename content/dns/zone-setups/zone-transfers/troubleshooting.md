---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4667723574925-Error-when-adding-Secondary-Nameservers-nsXXXX-secondary-cloudflare-com-at-Registrar
title: Troubleshooting
meta: 
    title: Troubleshooting | Secondary Nameservers
---

# Troubleshooting Secondary Nameservers

## Error adding secondary nameservers at Registrar

When trying to configure a namerserver as part of the Secondary DNS offering from Cloudflare (`nsXXXX.secondary.cloudflare.com`), an error is thrown.

Upon contacting the Registrar, their services confirm that the nameservers from Cloudflare cannot be added at this time.

Error depends on the system, and might be:

`Entity reference not found Authorization error; Unable to create foreign nameserver`

___

## Root Cause

This issue may arise when one of our nameservers used for secondary nameservers are removed from the Verisign side.

___

## Solution

The Cloudflare Engineering team needs to be engaged through Support to make sure the nameserver gets registered again manually with Verisign.
