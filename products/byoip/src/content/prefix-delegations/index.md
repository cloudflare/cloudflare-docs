---
order: 3
---

# Prefix delegations

BYOIP supports prefix delegations. A prefix delegation is when the prefix owner account (Account A), allows use of part or all of the prefix to another account (Account B).

The effect of a delegation depends on the service you are using with the prefix. Currently BYOIP + CDN and BYOIP + Spectrum support prefix delegations. See below to learn more about prefix delegations with Spectrum and CDN.

**Spectrum**: If Account A delegates use of part or all of a prefix to Account B, via a delegation, Account B can also use the [Spectrum API](https://developers.cloudflare.com/spectrum/getting-started/byoip/) with the IPs it was delegated access to.

Example: Account A is the primary owner of prefix 1.2.3.4/24. Account A delegates the use of 1.2.3.4/32 to Account B. Account B may now use the Spectrum API to create a Spectrum app with 1.2.3.4/32.

**CDN**: CDN delegations only have an effect if you are using SSL for SaaS in addition to BYOIP + CDN. In this example Account A is using BYOIP + CDN and SSL for SaaS. Account A can validate and serve traffic for a custom hostname on any of the IPs in its prefix. If Account A delegates some or all of this prefix to Account B, Account B may also validate and serve traffic for custom hostnames on those IPs as well. This is very useful if you use SSL for SaaS but manage different configurations in different accounts. All the accounts can use the IPs through a delegation.

API calls for delegations can be found at [Prefix Delegations](https://api.cloudflare.com/#ip-address-management-prefix-delegation-properties).

In the UI, once you click in to ‘Edit’ a prefix — you will see the option to create a delegation towards the bottom of the screen. Other accounts your user is a part of will auto-load when you create the delegation. Afterwards just click ‘save’ and you’re all set.

![prefix delegation](../static/prefix_delegations.png)

<Aside>

__Note:__ The UI only supports delegation of an entire prefix. If you want to delegate less than the entire prefix, please use the api.

</Aside>
