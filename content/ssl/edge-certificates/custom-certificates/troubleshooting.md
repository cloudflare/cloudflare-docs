---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4667724478349--You-have-reached-your-quota-for-the-requested-resource-Code-2005-
title: Troubleshooting
meta:
    title: Troubleshooting | Custom certificates
---

# Troubleshooting custom certificates

## Generic troubleshooting

### Make sure your key and certificate match

You can use an external tool such as the [SSLShopper Certificate Key Matcher](https://www.sslshopper.com/certificate-key-matcher.html) to check your certificate and make sure the key matches.

### Check the certificate details

You can use `openssl` to check all the details of your certificate:

```bash
$ openssl x509 -in certificate.crt -noout -text
```

Then, make sure all the information is correct before uploading.


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

## The private key you uploaded is invalid. Please check your input and try again. (Code: 2106)

### Problem description

You receive the error "The private key you uploaded is invalid. Please check your input and try again. (Code: 2106)" when trying to upload a new custom certificate or edit an existing one.

### Root cause

Cloudflare requires separate, pem-encoded files for the SSL private key and certificate. 
Contact your Certificate Authority (CA) to confirm whether your current certificate meets this requirement or request your CA to assist with certificate format conversion.

### Solution

Make sure your certificate complies with these [requirements](/ssl/edge-certificates/custom-certificates/uploading/#certificate-requirements).
Check that the certificate and private keys match before uploading the certificate in the Cloudflare dashboard. This [external resource](https://www.sslshopper.com/article-most-common-openssl-commands.html) might help.
