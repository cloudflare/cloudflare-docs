---
pcx-content-type: faq
title: FAQ
weight: 6
---

# FAQ

Below you will find answers to our most commonly asked questions on Cloudflare Zaraz. If you cannot find the answer you are looking for, head over to our [community page](https://community.cloudflare.com/) or [Discord channel](https://discord.gg/2TRr6nSxdd).

- [General](#general)
- [Tools](#tools)

---

## General

### Is Zaraz compatible with Content Security Policies (CSP)?

Yes. To learn more about how Zaraz works to be compatible with CSP configurations, refer to the [Cloudflare Zaraz supports CSP](https://blog.cloudflare.com/cloudflare-zaraz-supports-csp/) blog post.

### Does Cloudflare process my HTML, removing existing scripts and then injecting Zaraz?

Cloudflare Zaraz does not remove other third-party scripts from the page. Zaraz [can be auto-injected or not](/zaraz/reference/settings/#auto-inject-script), depending on your configuration.

### Does Zaraz work with Cloudflare Page Shield?

Yes. Refer to [Page Shield](/page-shield/) for more information related to this product.

### Is there a way to prevent Zaraz from loading on specific pages, like under `/wp-admin`?

To prevent Zaraz from loading on specific pages, refer to [Block Zaraz on specific pages or domains](/zaraz/advanced/block-zaraz/).

---

## Tools

### I see two ways of anonymizing IP address information on the third-party tool Google Analytics: one in Privacy, and one in Additional fields. Which is the correct one?

There is not a correct option, as the two options available in Google Analytics (GA) do different things.

The **Hide Originating IP Address** option in [Tool Settings](/zaraz/get-started/edit-tools-and-actions/) prevents Zaraz from sending the IP address from a visitor to Google. This means that GA treats Zaraz’s Worker’s IP address as the visitor’s IP address. This is often close in terms of location, but it might not be.

With the **Anonymize Originating IP Address** available in the [Add field](/zaraz/get-started/additional-fields/) option, Cloudflare sends the visitor’s IP address to Google as is, and passes the [`aip` parameter](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#aip) to GA. This asks GA to anonymize the data.

### I set up Event Reporting (enhanced measurements) for Google Analytics, but it only reports Page View, Session Start, and First Visit. All other events, such as scroll and outbound, are missing.

This is not a bug. Zaraz does not offer all the automatic events the normal GA4 JavaScript snippets offer out of the box. You will need to build [triggers](/zaraz/get-started/create-trigger/) and [actions](/zaraz/get-started/create-actions/) to capture those events. Refer to [Get started](/zaraz/get-started/) to learn more about how Zaraz works.

### Can I set up custom dimensions for Google Analytics with Zaraz?

Yes. Refer to [Additional fields](/zaraz/get-started/additional-fields/) to learn how to send additional data to tools.

### I am trying to set up Facebook Pixel on my Zaraz account, but I do not see any data coming through.

It can take between 15 minutes to several hours for data to appear on Facebook’s interface, due the way Facebook Pixel works. You can also use [debug mode](/zaraz/web-api/debug-mode/) to confirm that data is being properly sent from your Zaraz account.

### I cannot find the tool I need on Zaraz.

The Zaraz engineering team is adding support to new tools all the time. You can also refer to the [community space](https://community.cloudflare.com/c/developers/integrationrequest/68) to ask for new integrations.

### I cannot get a tool to load when the website is loaded. Do I have to add code to my website?

If you proxy your domain through Cloudflare, you do not need to add any code to your website. By default, Zaraz includes an automated `Pageview` trigger. Some tools, like Google Analytics, automatically add a "Pageview" action that uses this trigger. With other tools, you will need to add it manually. Refer to [Get started](/zaraz/get-started/) for more information.

### I am a vendor. How can I integrate my tool with Zaraz?

The Zaraz team is working with third-party vendors to build their own Zaraz integrations using the Zaraz SDK. To request a new tool integration, or to collaborate on our SDK, contact us at zaraz@cloudflare.com.