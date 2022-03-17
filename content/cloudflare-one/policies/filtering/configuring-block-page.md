---
pcx-content-type: how-to
title: Block page
weight: 7
---

# Block page

Gateway responds to any blocked domain with 0.0.0.0, and does not return that blocked domain's IP address. As a result, the browser will show a default error page, and users will not be able to reach that website. This may cause confusion and lead some users to think that their Internet is not working.

Configuring a custom **block page** on the Zero Trust dashboard helps avoid this confusion. Your block page will display information such as the rule ID of the policy blocking the website, a policy-specific block message, your organization's name, and a global message you may want to show — for example, a message explaining that the website has been blocked by Gateway, and any points of contact for support within the organization.

To configure a custom block page:

1.  [Download and install the Cloudflare certificate](#download-and-install-the-cloudflare-certificate).
1.  Enable the block page for [HTTP](#enable-the-block-page-for-http-policies) or [DNS](#enable-the-block-page-for-dns-policies) policies.
1.  [Customize the block page](#customize-the-block-page).

## Download and install the Cloudflare certificate

First, follow [these instructions](/connections/connect-devices/warp/install-cloudflare-cert/) to download and install the Cloudflare certificate on your company devices.

## Enable the block page for HTTP policies

Gateway automatically enables a block page for all HTTP policies. When a user is blocked at the HTTP layer, the block page is displayed. As you configure a policy with a Block action, you can specify a policy-specific block message.

![Enable HTTP block page](/cloudflare-one/static/documentation/policies/http-block.png)

## Enable the block page for DNS policies

For DNS policies, you will need to enable the block page on a per-policy basis.

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Policies > DNS**.
1.  Find the policy for which you would like to set up a block page.
1.  Click **Edit**.
1.  Scroll down to find the **Configure policy settings** step.
1.  Toggle the **Display block page** switch.

  ![Enable block page](/cloudflare-one/static/documentation/policies/block-page-toggle.png)

1.  Click **Save**.

Your block page is now enabled for this policy.

## Customize the block page

You can customize the block page by making global changes that will show up every time a user navigates to a block page, independently of the type of rule (DNS or HTTP) that's blocking the website. These global customizations include:

- Adding your organization's name
- Adding a logo
- Adding a header text
- Adding a global block message
- Choosing a background color

All of these elements will display in addition to two fields specific to the policy that's blocking the website:

- **The policy-specific block message** you've specified while creating the policy. This message is displayed under your global block message, and above the Rule ID.

- **The Rule ID**, which will make it easier for admins to debug possible policy issues in relation to blocked websites.

To apply customizations to your block page, navigate to the **Block page** card under **Settings > General**.

![Block page](/cloudflare-one/static/documentation/policies/customize-settings-page.png)

Once you have completed your customization, click **Save**. Your customers will now see your custom block page when navigating to a blocked website.

![Final block page](/cloudflare-one/static/documentation/policies/final-block-page.png)

## Troubleshooting

* **Users are seeing `Warning: Potential Security Risk` when they encounter the custom block page.** If your users are seeing the following error when navigating to a blocked page, this is likely an error pertaining to the Cloudflare certificate. Double-check that you have downloaded the Cloudflare certificate and you have added it correctly to your system.

![Block page](/cloudflare-one/static/documentation/policies/https-browser-error.png)

* **I went through the setup but the custom block page still doesn't show for DNS policies.** Users will be able to see your custom block page if they are resolving DNS queries through:
  * The WARP client installed on their devices and enrolled in your Zero Trust organization.
  * A location with a matching source IPv4 address or prefix pointing at the IPv4 resolver IP, DoH, or DoT endpoint.
  * An IPv6 endpoint associated with a location in your account.
  * A dedicated IPv4 resolver IP address.
