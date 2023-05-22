---
pcx_content_type: how-to
title: Non-identity on-ramps
weight: 5
---

# Non-identity on-ramps

With Cloudflare Zero Trust, you can isolate HTTP traffic from on-ramps such as [proxy endpoints](/cloudflare-one/connections/connect-devices/agentless/pac-files/) or [Magic WAN](/magic-wan/tutorials/secure-web-gateway/). Since these on-ramps do not require users to log in to Cloudflare WARP, [identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/) are not supported.

{{<Aside type="note">}}
If you want to apply Isolate policies based on user identity, you will need to either install the [WARP client](/cloudflare-one/connections/connect-devices/warp/) or manually redirect users to the [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/setup/clientless-browser-isolation/) URL.
{{</Aside>}}

## Set up non-identity browser isolation

1. [Install the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your devices.
2. Connect your infrastructure to Gateway using one of the following on-ramps:
   - Configure your browser to forward traffic to a Gateway proxy endpoint with [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/).
   - Connect your enterprise site router to Gateway with the [Anycast GRE or IPsec tunnel on-ramp to Magic WAN](/magic-wan/tutorials/secure-web-gateway/).
3. Enable non-identity browser isolation:
   1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Browser Isolation**.
   2. Turn on **Non-identity on-ramp support**.
4. Build a non-identity [HTTP policy](/cloudflare-one/policies/browser-isolation/isolation-policies/) to isolate websites in a remote browser.
