---
title: Pre-clearance support
pcx_content_type: reference
weight: 14
layout: single
---

# Pre-clearance support for single-page applications

You can integrate Cloudflare challenges on single-page applications (SPA) by allowing Turnstile to issue a pre-clearance cookie. The pre-clearance level is set upon widget creation or widget modification using the Turnstile API.

For Enterprise customers eligible to disable domain checks, Cloudflare recommends issuing pre-clearance cookies on widgets where at least one domain is specified.

{{<Aside type="note">}}
Pre-clearance cookies only support zones that are orange-clouded.
{{</Aside>}}

## Enable pre-clearance on a new site 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Turnstile** > **Add Site**
3. Under **Would you like to opt for pre-clearance for this site?** select **Yes**.
4. Choose the pre-clearance level from the select box.
5. Select **Create**. 

## Enable pre-clearance on an existing site

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Turnstile**.
3. Go to the existing widget or site and select **Settings**.
4. Under **Would you like to opt for pre-clearance for this site?** select **Yes**.
5. Choose the pre-clearance level from the select box. 
6. Select **Update**.

### Pre-clearance level options

- **Interactive**: Interactive pre-clearance allows a user with a clearance cookie to not be challenged by Interactive, Managed Challenge, or JavaScript Challenge Firewall Rules

- **Managed**: Managed allows a user with a clearance cookie to not be challenged by Managed Challenge or JavaScript Challenge Firewall Rules

- **Non-interactive**: Non-interactive allows a user with a clearance cookie to not be challenged by JavaScript Challenge Firewall Rules

## Configure the challenge passage setting

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **Settings**.
3. Under **Challenge Passage**, configure the time frame by selecting an option from the dropdown menu.