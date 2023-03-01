---
source: https://support.cloudflare.com/hc/en-us/articles/115000310832-Certification-Authority-Authorization-CAA-FAQ
title: Certification Authority Authorization (CAA) FAQ
                  3 months ago
---

# Certification Authority Authorization (CAA) FAQ



## What is CAA and how can I create one?

A Certificate Authority Authorization (CAA) record allows domain owners to restrict issuance to specified Certificate Authorities (CAs). 

For more details and instructions on how to create these records, refer to our [developer documentation](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/caa-records).

___

## How does Cloudflare evaluate CAA records?

_CAA records_ are evaluated by a CA, not by Cloudflare.

___

## Why must I disable Universal SSL if my CAA records exclude Universal SSL issuance?

Since Universal SSL certificates are shared between customers, your _CAA records_ may prevent issuance of another customer’s Universal SSL. Therefore, Cloudflare must disable Universal SSL for your domain to ensure your _CAA records_ do not affect another customer.

If you do not require Universal SSL from Cloudflare, you can [disable Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl).

___

## What records are added to keep Universal SSL enabled?

If you use Cloudflare’s free Universal SSL certificates, you will see [several CAA records added by Cloudflare](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/caa-records#caa-records-added-by-cloudflare).

Used alone, _issuewild_ only permits wildcard issuance.  Therefore, Cloudflare cannot add your root domain to the certificate unless you specify the _Allow wildcards and specific hostnames_ option in the **Tag** dropdown:

![To add your root domain to the certificate, make sure the Tag dropdown specifies to allow wildcards and specific hostnames.](/support/static/dns_ui_updates_caa_records.png)

___

## What happens when Universal SSL is disabled?

Your domain name is immediately removed from the Universal SSL certificate and your users will observe SSL errors unless you [upload a custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates) (requires Business or Enterprise plan).

___

## How do I re-enable Universal SSL?

To re-enable Universal SSL:

1.  Log in to the Cloudflare dashboard.
2.  Click the appropriate Cloudflare account for the domain where you want to disable Universal SSL.
3.  Ensure the proper domain is selected.
4.  Click the **SSL/TLS** app.
5.  Scroll to the **Disable Universal SSL** section.
6.  Click **Enable Universal SSL**.

___

## What are the dangers of setting CAA records?

If you are part of a large organization or one where multiple parties are tasked with obtaining SSL certificates, include _CAA records_ that allow issuance for all CAs applicable for your organization.  Failure to do so can inadvertently block SSL issuance for other parts of your organization.
