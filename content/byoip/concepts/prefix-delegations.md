---
title: Prefix delegations
pcx_content_type: concept
weight: 4
---

# Prefix delegations

BYOIP supports prefix delegations, which occur when a prefix owner account (Account A) allows another account (Account B) to use part or all of their prefix.

The effect of a delegation depends on the service used with the prefix. Currently BYOIP + CDN and BYOIP + Spectrum support prefix delegations.

## CDN

CDN delegations only have an effect if you are using [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) in addition to BYOIP + CDN. 

In this example, Account A is using BYOIP + CDN and Cloudflare for SaaS. Account A can validate and serve traffic for a custom hostname on any of the IPs in its prefix. If Account A delegates some or all of the prefix to Account B, Account B may also validate and serve traffic for custom hostnames on those IPs as well. This is very useful if you use Cloudflare for SaaS but manage different configurations in different accounts. All the accounts can use the IPs through a delegation.

## API calls for prefix delegations

API calls for delegations can be found at [Prefix Delegations](/api/operations/ip-address-management-prefix-delegation-list-prefix-delegations).

## Configure prefix delegations

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **IP Prefixes**.
2. Select **Edit** to modify a prefix. **Edit IP Prefixes** displays.
3. At the bottom of the page, select **Add Delegation**. Other accounts that your user is a part of will auto-load when you create the delegation.
4.  Select **Save**.

{{<Aside>}}
The dashboard only supports delegation of an entire prefix. If you want to delegate less than the entire prefix, use the API.
{{</Aside>}}

## Spectrum

If Account A delegates use of part or all of a prefix to Account B via a prefix delegation, Account B can also use the [Spectrum API](/spectrum/about/byoip/) with the IPs it was delegated access to.

**Example:** Account A is the primary owner of prefix 1.2.3.0/24. Account A delegates the use of 1.2.3.0/32 to Account B. Account B can now use the Spectrum API to create a Spectrum app with 1.2.3.0/32.
