---
pcx_content_type: concept
title: Non-identity on-ramps
weight: 5
---

# Non-identity on-ramps

With Cloudflare Zero Trust, you can isolate HTTP traffic from on-ramps such as [proxy endpoints](/cloudflare-one/connections/connect-devices/agentless/pac-files/) or [Magic WAN](/magic-wan/tutorials/secure-web-gateway/). Since these on-ramps do not require users to log in to Cloudflare WARP, [identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/) are not supported.

{{<Aside type="note">}}
If you want to apply Isolate policies based on user identity, you will need to either install the [WARP client](/cloudflare-one/connections/connect-devices/warp/) or manually redirect users to the [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/agentless/clientless-browser-isolation/) URL.
{{</Aside>}}

Non-identity browser isolation is disabled by default because the lack of user identity information poses potential [security risks]().  To enable, go to **Settings** > **Browser Isolation** and turn on **Non-identity on-ramp support**.

## Security best practices

## Set up non-identity Browser Isolation

1. [Install the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/)
2. Connect your infrastructure to Gateway using one of the following on-ramps:
    - Configure browser to forward traffic to Gateway proxy endpoint with [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/).
    - Connect enterprise site router to Gateway with [Anycast GRE or IPsec tunnel on-ramp to Magic WAN](/magic-wan/tutorials/secure-web-gateway/).
3. Enable non-identity browser isolation
3. Create non-identity HTTP policies with the Isolate action