---
title: User authentication
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Finally, decide how users will authenticate to your Zero Trust organization. There are two options: manual enrollment via an identity provider (IdP), or automatic enrollment with a [service token](/cloudflare-one/identity/service-tokens/).

| Authentication method | Pros | Cons |
| ----------------------|----- | ---- |
| Identity provider (most common)     | <li> Can build policies based on specific users and groups. </li> <li> DNS logs show who made the request. </li> | <li> Users must manually click on the WARP client and authenticate.</li> |
| Service token         | <li> No user authentication required. </li> <li> Immediate enforcement of policies. </li> | <li> Cannot use [identity selectors](/cloudflare-one/policies/gateway/identity-selectors/) in policies. </li> <li> DNS logs only show device-level information, not user identity. </li> |

## Configure IdP authentication

To allow users to authenticate with an identity provider:

{{<render file="_idp-integration.md" productFolder="cloudflare-one">}}

6. In your [device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/), verify that the IdP is selected as an authentication option.

Users will now be able to select this IdP when they are prompted to authenticate. To learn more about IdP configuration, refer to [SSO integration](/cloudflare-one/identity/idp-integration/).

## Configure service token authentication

To enroll devices with a service token:

{{<render file="_service-token-enrollment.md" productFolder="cloudflare-one">}}
