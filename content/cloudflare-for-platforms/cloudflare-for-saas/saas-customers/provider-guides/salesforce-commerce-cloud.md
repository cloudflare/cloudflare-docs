---
pcx_content_type: configuration
title: Salesforce Commerce Cloud
meta:
    title: Salesforce Commerce Cloud | Provider guides
    description: Learn how to configure your Enterprise zone with Salesforce Commerce Cloud.
---

# Salesforce Commerce Cloud (SFCC)

{{<render file="_provider-guide-intro" withParameters="Salesforce Commerce Cloud">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="Salesforce Commerce Cloud">}}

## How it works

For additional detail about how traffic routes when O2O is enabled, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

To enable O2O requires the following:
1. Your SFCC environment must be configured as an "SFCC Proxy Zone". If you currently have an "SFCC Legacy Zone", you cannot enable O2O. More details on the different types of SFCC configurations can be found [here](https://help.salesforce.com/s/articleView?id=cc.b2c_ecdn_proxy_zone_faq.htm&type=5).
2. Your own Cloudflare zone on an Enterprise plan.

If you meet the above requirements, O2O can then be enabled per hostname. To enable O2O for a specific hostname within your Cloudflare zone, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a Proxied `CNAME` DNS record with a target of the `CNAME` provided by SFCC Business Manager, which is the dashboard used by SFCC customers to configure their storefront environment.

The `CNAME` provided by SFCC Business Manager will resemble `commcloud.prod-abcd-example-com.cc-ecdn.net` and contains 3 distinct parts. For each hostname routing traffic to SFCC, be sure to update each part of the example `CNAME` to match your SFCC environment:

1. **Environment**: `prod` should be changed to `prod` or `dev` or `stg`.
2. **Realm**: `abcd` should be changed to the Realm ID assigned to you by SFCC.
3. **Domain Name**: `example-com` should be changed to match your domain name in a hyphenated format.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `commcloud.prod-abcd-example-com.cc-ecdn.net` | Proxied |

For O2O to be configured properly, make sure your Proxied DNS record targets your SFCC CNAME **directly**. Do not indirectly target the SFCC CNAME by targeting another Proxied DNS record in your Cloudflare zone which targets the SFCC CNAME.

{{<details header="Correct configuration">}}

For example, if the hostnames routing traffic to SFCC are `www.example.com` and `preview.example.com`, the following is a **correct** configuration in your Cloudflare zone:

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `www.example.com` | `commcloud.prod-abcd-example-com.cc-ecdn.net` | Proxied |
| `CNAME` | `preview.example.com` | `commcloud.prod-abcd-example-com.cc-ecdn.net` | Proxied |

{{</details>}}

{{<details header="Incorrect configuration">}}

And, the following is an **incorrect** configuration because `preview.example.com` indirectly targets the SFCC CNAME via the `www.example.com` Proxied DNS record, which means O2O will not be properly enabled for hostname `preview.example.com`:

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `www.example.com` | `commcloud.prod-abcd-example-com.cc-ecdn.net` | Proxied |
| `CNAME` | `preview.example.com` | `www.example.com` | Proxied |

{{</details>}}

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="Salesforce Commerce Cloud">}}

### Resolving SSL errors using Cloudflare Managed Certificates

If you encounter SSL errors when attempting to activate a Cloudflare Managed Certificate, verify if you have a `CAA` record on your domain name with command `dig +short example.com CAA`.

If you do have a `CAA` record, verify that it permits SSL certificates to be issued by the [certificate authorities supported by Cloudflare](/ssl/reference/certificate-authorities/).
