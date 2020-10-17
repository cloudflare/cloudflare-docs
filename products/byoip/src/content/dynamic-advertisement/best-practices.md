---
title: Best practices
order: 2
---

# Best practices for dynamic advertisement

Best practices when managing dynamic advertisement.

--------------------------------

## Verify user roles & obtain prefix IDs

To ensure smooth operation in general and simplify the advertisement process during an attack scenario, complete the following tasks:

* **Assign appropriate user roles.** Ensure that users assigned to manage the status of IP prefix advertisement have the Administrator or Super Administrator role in your Cloudflare account. For instructions, see [Setting up Multi-user accounts on Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare#12345682).

* **Get a list of the Prefix IDs you want to manage.** Maintaining a list of Cloudflare IDs for each prefix simplifies management via the Cloudflare API, since most dynamic advertisement operations require them.

  To obtain Prefix IDs, go your Cloudflare account home page and review [get prefix IDs](/dynamic-advertisement/configure-dynamic-advertisement#get-prefix-ids), or use the [list prefixes](https://api.cloudflare.com/#ip-address-management-prefixes-list-prefixes) operation in the Cloudflare API. Refer to these Prefix IDs when managing prefix advertisement.

--------------------------------

## Enable prefix advertisement

<Aside>

Be sure to enable prefix advertisement with Cloudflare before you withdraw the advertisement from your data center.

Withdrawing the advertisement from your data center without first enabling it with Cloudflare can result in dropped traffic, since that traffic will not have access to a valid route.

</Aside>

To avoid latency and the possibility of dropped routes, enable prefix advertisement from Cloudflare **before** you withdraw the advertisement from your data center, as outlined in these steps:

1. To enable prefix advertisement, [use the IP Prefixes page](/dynamic-advertisement/configure-dynamic-advertisement#use-the-ip-prefixes-page-to-configure-dynamic-advertisement) in your Cloudflare account home or use the [Update Prefix Dynamic Advertisement Status](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-get-advertisement-status) operation in the Cloudflare API. This operation requires your Account ID, Prefix IDs, and API key. (For instructions, see [get prefix IDs](/dynamic-advertisement/configure-dynamic-advertisement#get-prefix-ids).)

  Enablement takes 2–7 minutes.

2. Verify the advertisement using looking glass of your choice—[Hurricane Electric Internet Services](https://lg.he.net/), for example. Use the Cloudflare ASN (13335) to track the advertisement route.

3. Remove the prefix advertisement that originates from your data center.

--------------------------------

## Disable prefix advertisement

To disable (withdraw) prefix advertisement, reverse the steps you used to enable it:

1. Add the prefix advertisement to your data center.

2. [Optional] Verify the advertisement using a looking glass of your choice—[Hurricane Electric Internet Services](https://lg.he.net/), for example.

3. To disable prefix advertisement at Cloudflare’s edge, see the [IP prefixes page](/dynamic-advertisement/configure-dynamic-advertisement#use-the-ip-prefixes-page-to-configure-dynamic-advertisement) in your Cloudflare account home or use the [Update Prefix Dynamic Advertisement Status](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-get-advertisement-status) operation in the Cloudflare API. This operation requires your Account ID, Prefix IDs, and API key. (For instructions, see [get prefix IDs](/dynamic-advertisement/configure-dynamic-advertisement#get-prefix-ids).

Disablement takes approximately 15 minutes.
