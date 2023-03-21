---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4667724478349--You-have-reached-your-quota-for-the-requested-resource-Code-2005-
title: You have reached your quota for the requested resource. (Code 2005)
---

# "You have reached your quota for the requested resource. (Code: 2005)"



## Problem Description

The error "You have reached your quota for the requested resource. (Code: 2005)" is thrown when trying to upload a new Custom Certificate or edit an existing one. 

___

## Root Cause

Usually this error is due to the fact that the quota for Custom Certificate is by **type** of certificate: **Custom Legacy** vs **Custom Modern**. By default when uploading a certificate, the type is set to **Custom Modern**. But if you only have quota for **Custom Legacy** certificates then the error will be thrown. 

___

## Solution

First of all check your entitlements under SSL/TLS -> Edge Certificate. It will read:You can upload X Custom Legacy certificate pack. You can upload Y Custom Modern certificate packs.Then when actually uploading or editing the certificate, make sure you select the appropriate option in the **Legacy Client Support** dropdown at the bottom. 

___

## Additional Information

More details about Custom Certificates can be found here:

[/ssl/edge-certificates/custom-certificates](/ssl/edge-certificates/custom-certificates)
