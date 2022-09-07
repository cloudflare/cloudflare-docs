---
pcx_content_type: concept
title: Non-identity onramps
weight: 5
---

# Non-identity onramps

With Cloudflare Zero Trust, you can isolate HTTP traffic from onramps such as [Gateway proxy endpoints](/cloudflare-one/connections/connect-devices/agentless/pac-files/) and [Magic WAN](). Since these onramps do not require users to log in to Access, [identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/) are not supported. 

{{<Aside type="note">}}
If you want to apply Isolate policies based on user identity, you will need to either install the [WARP client]() on your devices or manually redirect users to the [Clientless Web Isolation]() URL.
{{</Aside>}}

Non-identity browser isolation is disabled by default because the lack of user identity information poses potential [security risks]().  To enable, go to **Settings** > **Browser Isolation** and turn on **Non-identity on-ramp support**.

## Security best practices

## Set up non-identity Browser Isolation
1. Install the Cloudflare certificate
2. Connect your infrastructure to Gateway through proxy endpoints or Magic WAN
3. Enable non-identity browser isolation
3. Create non-identity HTTP policies with the Isolate action