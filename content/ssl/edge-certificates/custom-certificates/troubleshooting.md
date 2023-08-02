---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4667724478349--You-have-reached-your-quota-for-the-requested-resource-Code-2005-
title: Troubleshooting
meta:
    title: Troubleshooting | Custom certificates
---

# Troubleshooting Custom certificates

## You have reached your quota for the requested resource. (Code: 2005)

### Problem Description

You receive the error "You have reached your quota for the requested resource. (Code: 2005)" when trying to upload a new Custom Certificate or edit an existing one.

### Root Cause

The quota for Custom Certificates depends on the **type** of certificate (**Custom Legacy** vs **Custom Modern**).

If you try to upload a certificate **type** but have already reached your quota, you will receive this error.

### Solution

First, check your Custom Certificate entitlements at **SSL/TLS** > **Edge Certificates**. 

Then, when actually uploading or editing the certificate, make sure you select the appropriate option in the **Legacy Client Support** dropdown at the bottom. 
