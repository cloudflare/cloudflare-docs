---
title: Dynamic Advertisement
alwaysopen: true
weight: 3
---

Toggling on/off a BGP advertisement by the Cloudflare edge is a simple API call, or UI toggle. You can authorize a call with your email and api key, or create a [service token](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys) for this purpose.  You may also toggle/on advertisement in the UI, but will be asked to confirm the action.

**You may toggle the advertisement status of a prefix once every 15 minutes, and it may take up to ten minutes for an advertisement/withdrawal to take effect.**

Additionally, you can add free text descriptions to your prefixes.


A successful response from the API means our service registered the request, the actual withdrawal/announcement may take up to ten minutes to take affect.

Finally, the API/UI support adding 'delegations' to your prefixes. Delegations allow other Cloudflare accounts interact with your prefix. The effect of a 'delegation' is service specific, so please see the ##delegations## section to learn more.

To toggle advertisement status from the UI simple click into the IP Prefixes product - located on the account home page, and click 'edit' on an invdividual prefix. 


![Advertisement status ui](
    ../static/prefix_ui.png)

From the dropdown 'Status' - either select 'Withdrawn' or 'Advertised', then click save. You will be asked to confirm you choice.

API users can find all the calls documented here: [API docs](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties) along with examples.

