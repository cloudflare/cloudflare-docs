---
order: 1
pcx-content-type: faq
---

[❮ Back to FAQ](/faq)

# Getting started with Cloudflare Zero Trust

## How do I sign up for Cloudflare Zero Trust?

You can sign up today at [this link](https://dash.cloudflare.com/sign-up/teams). Follow the onboarding steps, choose a team name and a payment plan, and start protecting your network in just a few minutes.

## What's a team domain/team name?

Your team domain is a unique subdomain assigned to your Cloudflare account; for example, `<your-team-name>.cloudflareaccess.com`. Setting up a team domain is an essential step in your Zero Trust configuration. This is where your users will find the apps you've secured behind Cloudflare Zero Trust — displayed in the [App Launcher](/applications/app-launcher) — and will be able to make login requests to them.  The customizable portion of your team domain is called **team name**. You can change this name at any time in the Zero Trust dashboard, under the **Authentication** tab.

| team name | team domain |
|-------------|-----------|
|  `your-team-name` | `<your-team-name>.cloudflareaccess.com` |

## How do I change my subscription plan?

To make changes to your subscription, visit the Billing section under Account on the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/). You can change or cancel your subscription at any time. Just remember - if you downgrade your plan during a billing cycle, your downgraded pricing will apply in the next billing cycle. If you upgrade during a billing cycle, you will be billed for the upgraded plan at the moment you select it. 

## How are active seats measured?

Cloudflare Zero Trust subscriptions consist of seats that users in your account consume. When users authenticate to an application or enroll their agent into WARP, they count against one of your active seats. Seats can be added, removed, or revoked at **Settings** > **Account** > **Plan**. If all seats are currently consumed, you must first remove users before decreasing your purchased seat count.

### Removing users

User seats can be removed for Access and Gateway at **My Team** > **Users**. Removing a user will have consequences both on Access and on Gateway:

* **Access**: All active sessions for that user will be invalidated. Note: A user will be able to log back into an application unless the Application’s policy is also updated to block future logins from that user.

* **Gateway**: All filtering and routing via the WARP client will cease until the user re-enrolls with their WARP client

<Aside type='warning'>

The Remove action will remove a user’s seat, but it will not permanently revoke their ability to authenticate. To permanently disable a user’s ability to authenticate, you must modify the policies that allow them to reach a given application or enroll a device in WARP.
  
</Aside>

### Revoking users

The Revoke action will terminate active sessions, but will not remove the user’s consumption of an active seat.

## How do I know if my network is protected behind Cloudflare Zero Trust?

You can visit the [Zero Trust help page](https://help.teams.cloudflare.com). This page will give you an overview of your network details, as well as an overview of the categories that are being blocked and/or allowed.
