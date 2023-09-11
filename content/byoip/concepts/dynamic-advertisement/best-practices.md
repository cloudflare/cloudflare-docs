---
title: Best practices
pcx_content_type: reference
meta:
  title: Best practices for dynamic advertisement
---

# Dynamic advertisement best practices

## Verify user roles & obtain prefix IDs

To prevent issues and simplify the advertisement process during an attack scenario, complete the following tasks.

- **Assign appropriate user roles.** Ensure that users assigned to manage the status of IP prefix advertisement have the **Administrator** or **Super Administrator** role in your Cloudflare account. For more information, refer to [Setting up Multi-user accounts on Cloudflare](/fundamentals/account-and-billing/members/).

- **Get a list of the Prefix IDs you want to manage.** Maintain a list of Cloudflare prefix IDs to simplify dynamic advertisement management and operations. To obtain Prefix IDs, review [obtain prefix IDs](/byoip/how-to/configure-dynamic-advertisement/#obtain-prefix-ids) from the dashboard or use the [list prefixes](/api/operations/ip-address-management-prefixes-list-prefixes) operation in the Cloudflare API. Refer to these Prefix IDs when managing prefix advertisement.

## Enable prefix advertisement

To avoid latency and the possibility of dropped routes, enable prefix advertisement from Cloudflare before you withdraw the advertisement from your data center.

1.  To enable prefix advertisement, refer to [configure dynamic advertisement](/byoip/how-to/configure-dynamic-advertisement/). This operation requires your Account ID, Prefix IDs, and API key.
2.  Verify the advertisement using a looking glass of your choice, such as [Hurricane Electric Internet Services](https://lg.he.net/). Use the Cloudflare ASN (13335) to track the advertisement route.
3.  Remove the prefix advertisement that originates from your data center.

{{<Aside type="note">}}
If you do not remove the advertisement from your data center, some of your traffic may not route through Cloudflare for protection, depending on which routes your ISP prefers. 

If you want to continue advertising from your data center while using Magic Transit, one option is to advertise a less specific route and have Cloudflare advertise more specific routes.
{{</Aside>}}

Enablement takes approximately five to seven minutes.

## Disable prefix advertisement

To disable (withdraw) prefix advertisement, reverse the steps you used to enable it:

1.  Add the prefix advertisement to your data center.
2.  (Optional) Verify the advertisement using a looking glass of your choice, such as [Hurricane Electric Internet Services](https://lg.he.net/).
3.  To disable prefix advertisement at Cloudflare’s edge, refer to [configure dynamic advertisement](/byoip/how-to/configure-dynamic-advertisement/). This operation requires your Account ID, Prefix IDs, and API key.

Disablement takes approximately 15 minutes.