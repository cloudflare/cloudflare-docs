---
pcx_content_type: how-to
title: Non-identity on-ramps
weight: 5
---

# Non-identity on-ramps

With Cloudflare Zero Trust, you can isolate HTTP traffic from on-ramps such as [proxy endpoints](/cloudflare-one/connections/connect-devices/agentless/pac-files/) or [Magic WAN](/magic-wan/tutorials/secure-web-gateway/). Since these on-ramps do not require users to log in to Cloudflare WARP, [identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/) are not supported.

{{<Aside type="note">}}
If you want to apply Isolate policies based on user identity, you will need to either install the [WARP client](/cloudflare-one/connections/connect-devices/warp/) or manually redirect users to the [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/agentless/clientless-browser-isolation/) URL.
{{</Aside>}}

## Set up non-identity browser isolation

1. [Install the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/) on your devices.
2. Connect your infrastructure to Gateway using one of the following on-ramps:
    - Configure your browser to forward traffic to a Gateway proxy endpoint with [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/).
    - Connect your enterprise site router to Gateway with the [Anycast GRE or IPsec tunnel on-ramp to Magic WAN](/magic-wan/tutorials/secure-web-gateway/).
3. Enable non-identity browser isolation:
    1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Settings** > **Browser Isolation**.
    2. Turn on **Non-identity on-ramp support**.
4. Create HTTP policies to isolate websites in a remote browser:
    1. Go to **Gateway** > **Policies** > **HTTP**.
    2. Build a non-identity [HTTP policy](/cloudflare-one/policies/filtering/http-policies/) using the Isolate action. The following example enables isolation for all web traffic:

        | Selector            | Operator | Value           | Action         |
        | --------------------| ---------| ----------------| -------------- |
        | Hostname            | matches regex  | `.*` | Isolate        |

        |Priority|
        |--------|
        | Last (after higher priority Block or Do Not Inspect rules)|

For more examples, refer to the list of [common HTTP policies](/cloudflare-one/policies/filtering/http-policies/common-policies/#isolate-high-risk-sites-in-remote-browser).
