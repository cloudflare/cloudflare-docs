---
title: Prefix delegations
pcx-content-type: concept
---

# Prefix delegations

BYOIP supports prefix delegations, which occur when a prefix owner account (Account A) allows another account (Account B) to use part or all of their prefix.

The effect of a delegation depends on the service used with the prefix. Currently BYOIP + CDN and BYOIP + Spectrum support prefix delegations.

## CDN 

CDN delegations only have an effect if you are using [SSL for SaaS](https://developers.cloudflare.com/ssl/ssl-for-saas) in addition to BYOIP + CDN. In this example, Account A is using BYOIP + CDN and SSL for SaaS. Account A can validate and serve traffic for a custom hostname on any of the IPs in its prefix. If Account A delegates some or all of the prefix to Account B, Account B may also validate and serve traffic for custom hostnames on those IPs as well. This is very useful if you use SSL for SaaS but manage different configurations in different accounts. All the accounts can use the IPs through a delegation.

## API calls for prefix delegations

API calls for delegations can be found at [Prefix Delegations](https://api.cloudflare.com/#ip-address-management-prefix-delegation-properties).

## Dashboard for prefix delegations

1. From **Account Home**, click **IP Prefixes**.
1. Click **Edit** to modify a prefix. **Edit IP Prefixes** displays. 
1. At the bottom of the page, click **Add Delegation**. Other accounts your user is a part of will auto-load when you create the delegation.
1. When you are done, click **Save**.

<Aside>

The dashboard only supports delegation of an entire prefix. If you want to delegate less than the entire prefix, use the API.

</Aside>

## Spectrum 

If Account A delegates use of part or all of a prefix to Account B via a prefix delegation, Account B can also use the [Spectrum API](https://developers.cloudflare.com/spectrum/about/byoip) with the IPs it was delegated access to.

**Example:** Account A is the primary owner of prefix 1.2.3.4/24. Account A delegates the use of 1.2.3.4/32 to Account B. Account B can now use the Spectrum API to create a Spectrum app with 1.2.3.4/32.