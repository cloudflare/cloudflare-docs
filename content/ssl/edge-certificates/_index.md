---
pcx_content_type: navigation
title: Edge certificates
weight: 4
meta:
  description: Edge certificates are the SSL/TLS certificates that Cloudflare presents to your visitors. Consider how different certificate types align to common use cases.
---

# Edge certificates

Consider the information below for guidance on how to choose different edge certificates for common use cases, or refer to the other pages in this section for more options.

## Use cases

### Simplify issuance and renewal

Issuing and renewing certificates can take up a lot of time from your technical teams. Leverage Cloudflare [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) to simplify this process.

Advanced certificates offer more customization than Universal SSL.

With [custom certificates](/ssl/edge-certificates/custom-certificates/), you have full control in terms of certificate authority (CA) or certificate {{<glossary-tooltip term_id="validation level" link="/ssl/concepts/#validation-level">}}validation level{{</glossary-tooltip>}}, but you need to handle issuance and renewal on your own.

### Meet cipher suites requirements

The different algorithms used in SSL/TLS encryption can vary in terms of how secure they are.

Through [cipher suites customization](/ssl/reference/cipher-suites/customize-cipher-suites/) you can have control over which ciphers are used for your domain and/or specific hostnames, making it possible to achieve balance between highly available marketing websites (`www.example.com`) - that even legacy devices can access - and highly secure services or applications (`shop.example.com`) - that require [standards compliance](/ssl/reference/cipher-suites/compliance-status/).

Cipher suites customization applies to any edge certificate used in connections to a given hostname. However, to enable [custom cipher suites and other features](/ssl/edge-certificates/advanced-certificate-manager/#advanced-certificate-manager), you must [purchase the Advanced Certificate Manager add-on](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/acm/).

If you already have Advanced Certificate Manager, use the API to set up custom cipher suites. Refer to [Customize cipher suites](/ssl/reference/cipher-suites/customize-cipher-suites/) for more guidance.

### Automate domain control validation (DCV)

If you want to use Cloudflare but manage DNS externally ([partial setup](/dns/zone-setups/partial-setup/)), you may need to perform [domain control validation (DCV)](/ssl/edge-certificates/changing-dcv-method/) to prove that you have control over your domain before your SSL/TLS certificate can be issued.

To make this process easier and automate DCV at certificate renewal, use [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) and set up [delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).