---
pcx-content-type: faq
title: FAQ
weight: 6
---

# FAQ

Below you will find answers to our most commonly asked questions on Cloudflare Zaraz. If you cannot find the answer you are looking for, head over to our [community page](https://community.cloudflare.com/) or [Discord channel](https://discord.gg/2TRr6nSxdd).

## Does Cloudflare process my HTML, removing existing scripts and then injecting Zaraz?

Cloudflare Zaraz does not remove other third-party scripts from the page. Zaraz [can be auto-injected or not](/zaraz/reference/options/#auto-inject-script), depending on your configuration.

## Does Zaraz work with Cloudflare Page Shield?

Yes. Refer to [Page Shield](/page-shield/) for more information related to this product.

## I cannot find the tool I need on Zaraz

The Zaraz engineering team is adding support to new tools all the time. You can also refer to the [community space](https://community.cloudflare.com/c/developers/integrationrequest/68) to ask for new integrations.


## I am trying to set up Facebook Pixel on my Zaraz account, but I do not see any data coming through.

It can take between 15 minutes to an hour for data to appear on Facebook’s interface, due the way Facebook Pixel works. You can also use [Debug Mode](/zaraz/advanced/debug-mode/) to confirm that data is being properly sent from your Zaraz account.

## Is there a way to prevent my third-party scripts from firing on specific pages, like `wp-admin`?

To prevent Zaraz from loading on specific pages, refer to [Block Zaraz on specific pages or domains](/zaraz/advanced/block-zaraz/).

## I cannot create a trigger for my tool to fire when the website is loaded. Do I have to add code to my website?

If you proxy your domain through Cloudflare, you do not need to add any code to your website. By default, Zaraz includes an automated `pageview` trigger. Some tools, like Google Analytics, automatically add this `pageview` trigger to an event. With other tools, you will need to add it manually. Refer to [Get started](/zaraz/get-started/) for more information.

## Can I set up custom dimensions for Google Analytics with Zaraz?

Yes. From the Zaraz dashboard, click **Edit** next to Google Analytics. Then, click **Settings** > **Add field** and choose the index number of the desired Custom Dimension and its value.

## I am a vendor. How can I integrate my tool with Zaraz?

The Zaraz team is working with third-party vendors to build their own Zaraz integrations using the Zaraz SDK. To request a new tool integration, or to collaborate on our SDK, contact us at zaraz@cloudflare.com.