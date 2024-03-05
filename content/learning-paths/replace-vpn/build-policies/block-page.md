---
title: Gateway block page
pcx_content_type: overview
weight: 5
layout: learning-unit
---

With Cloudflare Zero Trust, you can deliver actionable feedback to users when they are blocked by a Gateway policy. Custom block messages can reduce user confusion and decrease your IT ticket load.

There are two different ways to surface block messages:

- [Custom block page](#custom-block-page)
- [WARP client block notifications](#warp-client-block-notifications)

## Custom block page

You can display a custom block page in the browser when users are blocked by a Gateway DNS or HTTP policy. This is a static page that educates users on why they were blocked and how to contact IT.

The custom block page has a few drawbacks:

- To display the block page, you must install a [user-side certificate](/learning-paths/replace-vpn/configure-device-agent/enable-tls-decryption/#configure-user-side-certificates) on the end user device.
- You cannot customize the block message for individual DNS policies.
- The block page does not appear when users are blocked by a Gateway network policy.
- The custom block page only displays when the user loads a site in a browser. If, for instance, the user is allowed to visit a site but not allowed to upload a file, the file upload would fail silently and the user would not get a block page.

To work around these limitations, we recommend using [WARP client block notifications](#warp-client-block-notifications).

{{<Aside type="note">}}
The Gateway custom block page is a different concept from [Access custom block pages](/cloudflare-one/applications/custom-pages/#block-page), which are used in conjunction with Cloudflare Access policies.
{{</Aside>}}

### Enable the block page for DNS policies

{{<render file="gateway/_add-block-page.md" productFolder="cloudflare-one">}}

### Customize the block page

{{<render file="gateway/_customize-block-page.md" productFolder="cloudflare-one">}}

## WARP client block notifications

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

For more granular user feedback, you can enable WARP client block notifications on any Gateway DNS or Network _Block_ policy. Blocked users will receive an operating system notification from the WARP client with a custom message you set.

Client notifications provide additional functionality over the [custom block page](#custom-block-page):

- Client notifications work with network policies, which means you can surface feedback for all partial actions on user traffic including blocking a specific port, file upload, or protocol.

- Client notifications allow you to direct users to a unique link per individual policy. For example, you could link users to your organization's acceptable use policy, data protection policy, or any existing IT troubleshooting infrastructure. If no infrastructure for this exists within your organization, you can quickly deploy an HTML site on [Cloudflare Pages](/pages/), put the site behind a [Cloudflare Access policy](/cloudflare-one/policies/access/), and provide dynamic feedback based on the identity and device posture values found in the user's [Access JWT](/cloudflare-one/identity/authorization-cookie/application-token/).
