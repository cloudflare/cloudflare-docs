---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4667724478349--You-have-reached-your-quota-for-the-requested-resource-Code-2005-
title: Troubleshooting
meta:
    title: Troubleshooting | Custom certificates
---

# Troubleshooting custom certificates

## You have reached your quota for the requested resource. (Code: 2005)

### Problem description

You receive the error "You have reached your quota for the requested resource. (Code: 2005)" when trying to upload a new custom certificate or edit an existing one.

### Root cause

The quota for custom certificates depends on the **type** of certificate (**Custom Legacy** vs **Custom Modern**).

If you try to upload a certificate **type** but have already reached your quota, you will receive this error.

### Solution

First, check your custom certificate entitlements at **SSL/TLS** > **Edge Certificates**.

Then, when actually uploading or editing the certificate, make sure you select the appropriate option in the **Legacy Client Support** dropdown at the bottom.

## The certificate chain you uploaded does not include any hostnames from your zone. Please check your input and try again. (Code: 2103)

### Problem description

You receive the error "The certificate chain you uploaded does not include any hostnames from your zone. Please check your input and try again. (Code: 2103)" when trying to upload a new custom certificate or edit an existing one.

### Root cause

Cloudflare verifies that uploaded custom certificates include a hostname for the associated zone. Moreover, this hostname must be included as a Subject Alternative Name (SAN). This is following the standard set by the [CA/Browser Forum](https://cabforum.org/wp-content/uploads/BRv1.2.5.pdf#page=16).

### Solution

Make sure your certificate contains a Subject Alternative Name (SAN) specifying a hostname in your zone. You can use the `openssl` command below and look for `Subject Alternative Name` in the output.

```bash
$ openssl x509 -in certificateFile.pem -noout -text
```

If it does not exist, you will need to request a new certificate.
