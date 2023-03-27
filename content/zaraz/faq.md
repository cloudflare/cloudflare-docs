---
pcx_content_type: faq
title: FAQ
weight: 10
---

# FAQ

Below you will find answers to our most commonly asked questions. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) or [Discord channel](https://discord.gg/2TRr6nSxdd) to explore additional resources.

- [General](#general)
- [Tools](#tools)

---

## General

### Setting up Zaraz

#### Zaraz does not appear to be working. Is there a way to check where the problem is?

Yes. You can use the metrics in [Zaraz Monitoring](/zaraz/monitoring/) to help you find where in the workflow the problem occurred.

#### Is Zaraz compatible with Content Security Policies (CSP)?

Yes. To learn more about how Zaraz works to be compatible with CSP configurations, refer to the [Cloudflare Zaraz supports CSP](https://blog.cloudflare.com/cloudflare-zaraz-supports-csp/) blog post.

#### Does Cloudflare process my HTML, removing existing scripts and then injecting Zaraz?

Cloudflare Zaraz does not remove other third-party scripts from the page. Zaraz [can be auto-injected or not](/zaraz/reference/settings/#auto-inject-script), depending on your configuration, but if you have existing scripts that you intend to load with Zaraz, you should remove them.

#### Does Zaraz work with Cloudflare Page Shield?

Yes. Refer to [Page Shield](/page-shield/) for more information related to this product.

#### Is there a way to prevent Zaraz from loading on specific pages, like under `/wp-admin`?

To prevent Zaraz from loading on specific pages, refer to [Load Zaraz selectively](/zaraz/advanced/load-selectively/).

### Zaraz Web API

#### Using the `zaraz.ecommerce()` method returns an undefined error.

E-commerce tracking needs to be enabled in [the Zaraz Settings page](/zaraz/reference/settings/#e-commerce-tracking) before you can start using the E-commerce Web API.

---

## Tools

### Google Analytics

#### After moving from Google Analytics 4 to Zaraz, I can no longer see demographics data. Why?

You probably have enabled **Hide Originating IP Address** in the [Settings option](/zaraz/get-started/edit-tools-and-actions/) for Google Analytics 4. This tells Zaraz to not send the IP address to Google. To have access to demographics data and anonymize your visitor's IP, you should use [**Anonymize Originating IP Address**](#i-see-two-ways-of-anonymizing-ip-address-information-on-the-third-party-tool-google-analytics-one-in-privacy-and-one-in-additional-fields-which-is-the-correct-one) instead.

#### I see two ways of anonymizing IP address information on the third-party tool Google Analytics: one in Privacy, and one in Additional fields. Which is the correct one?

There is not a correct option, as the two options available in Google Analytics (GA) do different things.

The **Hide Originating IP Address** option in [Tool Settings](/zaraz/get-started/edit-tools-and-actions/) prevents Zaraz from sending the IP address from a visitor to Google. This means that GA treats Zaraz’s Worker’s IP address as the visitor’s IP address. This is often close in terms of location, but it might not be.

With the **Anonymize Originating IP Address** available in the [Add field](/zaraz/get-started/additional-fields/) option, Cloudflare sends the visitor’s IP address to Google as is, and passes the [`aip` parameter](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#aip) to GA. This asks GA to anonymize the data.

#### I set up Event Reporting (enhanced measurements) for Google Analytics, but it only reports Page View, Session Start, and First Visit. All other events, such as scroll and outbound, are missing.

This is not a bug. Zaraz does not offer all the automatic events the normal GA4 JavaScript snippets offer out of the box. You will need to build [triggers](/zaraz/get-started/create-trigger/) and [actions](/zaraz/get-started/create-actions/) to capture those events. Refer to [Get started](/zaraz/get-started/) to learn more about how Zaraz works.

#### Can I set up custom dimensions for Google Analytics with Zaraz?

Yes. Refer to [Additional fields](/zaraz/get-started/additional-fields/) to learn how to send additional data to tools.

### Facebook Pixel

#### I am trying to set up Facebook Pixel on my Zaraz account, but I do not see any data coming through.

It can take between 15 minutes to several hours for data to appear on Facebook’s interface, due the way Facebook Pixel works. You can also use [debug mode](/zaraz/web-api/debug-mode/) to confirm that data is being properly sent from your Zaraz account.

### Custom HTML

#### Can I use Google Tag Manager together with Zaraz?

You can load Google Tag Manager using Zaraz, but it is not recommended. Tools configured inside Google Tag Manager cannot be optimized by Zaraz, and cannot be restricted by the Zaraz privacy controls. In addition, Google Tag Manager could slow down your website because it requires additional JavaScript, and its rules are evaluated client-side. If you are currently using Google Tag Manager, we recommend replacing it with Zaraz by configuring your tags directly as Zaraz tools.

#### Why should I prefer a native tool integration instead of an HTML snippet?

Adding a tool to your website via a native Zaraz integration is always better than using an HTML snippet. HTML snippets usually depends on additional client-side requests, and require client-side code execution, which can slow down your website. They are often a security risk, as they can be hacked. Moreover, it can be very difficult to control their affect on the privacy of your visitors. Tools included in the Zaraz library are not suffering from these issues - they are fast, executed at the edge, and be controlled and restricted because they are sandboxed.

### Other tools

#### I cannot find the tool I need on Zaraz.

The Zaraz engineering team is adding support to new tools all the time. You can also refer to the [community space](https://community.cloudflare.com/c/developers/integrationrequest/68) to ask for new integrations.

#### I cannot get a tool to load when the website is loaded. Do I have to add code to my website?

If you proxy your domain through Cloudflare, you do not need to add any code to your website. By default, Zaraz includes an automated `Pageview` trigger. Some tools, like Google Analytics, automatically add a `Pageview` action that uses this trigger. With other tools, you will need to add it manually. Refer to [Get started](/zaraz/get-started/) for more information.

#### I am a vendor. How can I integrate my tool with Zaraz?

The Zaraz team is working with third-party vendors to build their own Zaraz integrations using the Zaraz SDK. To request a new tool integration, or to collaborate on our SDK, contact us at zaraz@cloudflare.com.

