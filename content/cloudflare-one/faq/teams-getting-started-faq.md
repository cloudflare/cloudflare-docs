---
pcx_content_type: faq
title: Getting started with Cloudflare Zero Trust
weight: 2
meta:
  description: Review FAQs about getting started with Cloudflare Zero Trust.
structured_data: true
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Getting started with Cloudflare Zero Trust

{{<faq-item>}}
{{<faq-question level=2 text="How do I sign up for Cloudflare Zero Trust?" >}}

{{<faq-answer>}}

You can sign up today at [this link](https://dash.cloudflare.com/sign-up/teams). Follow the onboarding steps, choose a team name and a payment plan, and start protecting your network in just a few minutes.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What's a team domain/team name?" >}}

{{<faq-answer>}}

Your team domain is a unique subdomain assigned to your Cloudflare account; for example, `<your-team-name>.cloudflareaccess.com`. Setting up a team domain is an essential step in your Zero Trust configuration. This is where your users will find the apps you have secured behind Cloudflare Zero Trust — displayed in the [App Launcher](/cloudflare-one/applications/app-launcher/) — and will be able to make login requests to them. The customizable portion of your team domain is called **team name**. You can view your team name and team domain in Zero Trust under **Settings** > **General**.

| team name        | team domain                             |
| ---------------- | --------------------------------------- |
| `your-team-name` | `<your-team-name>.cloudflareaccess.com` |

You can change your team name at any time, unless you have the Cloudflare dashboard SSO feature enabled on your account. Cloudflare dashboard SSO does not currently support team name changes.

{{<Aside type="warning" header="Warning">}}
If you change your team name, you need to update your organization’s identity providers (IdPs) and the WARP client to reflect the new team name in order to avoid any mismatch errors.
{{</Aside>}}

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How do I change my subscription plan?" >}}

{{<faq-answer>}}

To make changes to your subscription, visit the Billing section under Account in [Zero Trust](https://one.dash.cloudflare.com/). You can change or cancel your subscription at any time. Just remember - if you downgrade your plan during a billing cycle, your downgraded pricing will apply in the next billing cycle. If you upgrade during a billing cycle, you will be billed for the upgraded plan at the moment you select it.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How are active seats measured?" >}}

{{<faq-answer>}}

Cloudflare Zero Trust subscriptions consist of seats that users in your account consume. When users authenticate to an application or enroll their agent into WARP, they count against one of your active seats. Seats can be added, removed, or revoked at **Settings** > **Account** > **Plan**. If all seats are currently consumed, you must first remove users before decreasing your purchased seat count.

### Removing users

User seats can be removed for Access and Gateway at **My Team** > **Users**. Removing a user will have consequences both on Access and on Gateway:

- **Access**: All active sessions for that user will be invalidated. A user will be able to log back into an application unless you create an [Access policy](/cloudflare-one/policies/access/) to block future logins from that user.

- **Gateway**: All active devices for that user will be logged out of your Zero Trust organization, which stops all filtering and routing via the WARP client. A user will be able to re-enroll their device unless you create a [device enrollment policy](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#set-device-enrollment-permissions) to block them.

{{<Aside type="warning">}}

The Remove action will remove a user’s seat, but it will not permanently revoke their ability to authenticate. To permanently disable a user’s ability to authenticate, you must modify the policies that allow them to reach a given application or enroll a device in WARP.

{{</Aside>}}

### Revoking users

The Revoke action will terminate active sessions and log out active devices, but will not remove the user’s consumption of an active seat.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How do I know if my network is protected behind Cloudflare Zero Trust?" >}}

{{<faq-answer>}}

You can visit the [Zero Trust help page](https://help.teams.cloudflare.com). This page will give you an overview of your network details, as well as an overview of the categories that are being blocked and/or allowed.

{{</faq-answer>}}
{{</faq-item>}}
