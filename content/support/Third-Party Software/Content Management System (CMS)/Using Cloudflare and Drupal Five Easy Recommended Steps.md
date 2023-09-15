---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/201883834-Using-Cloudflare-and-Drupal-Five-Easy-Recommended-Steps
title: Using Cloudflare and Drupal Five Easy Recommended Steps
---

# Using Cloudflare and Drupal: Five Easy Recommended Steps



## Overview

These basic steps will help reduce common areas of confusion for Drupal users that are new to using Cloudflare to speed up and protect their sites. In addition, these steps are very quick and will generally take only a few minutes of your time to go through.

**Step #1**

Install the [Cloudflare Drupal plugin](https://drupal.org/project/cloudflare) to restore visitor IP information. Since Cloudflare acts as a proxy for sites using our network, Cloudflare’s IPs are going to show in your logs, including comments, unless you install something to restore the original visitor IP.

Why should you install the plugin?

If you receive a lot of comments or spam on your blog, you may mistakenly believe that Cloudflare is spamming you. Some other Drupal plugins or extensions may also rely on the original visitor IP for the  services to work properly and reduce false alerts.

Note: You don’t need to worry about this if you activated through a certified Cloudflare [certified Cloudflare Hosting partner](https://www.cloudflare.com/partners/technology-partners/), since they already [restore visitor IPs](https://support.cloudflare.com/hc/articles/200170786) by default.

**Step #2**

Create a [Page Rule](https://support.cloudflare.com/hc/articles/200168306) to exclude the Drupal admin or Drupal login sections from Cloudflare’s caching and performance features. You can access Page Rules in the [Rules app](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-PageRule-).

Why do this?

While there is not always an issue, we have seen some optional performance features like Rocket Loader inadvertently breaking certain functions (editors, etc.) in your site's admin area..

**Step #3**

Allow IP addresses you expect traffic from in the Cloudflare **Firewall** App. Some common services you probably want to allow include:

-   APIs you’re pulling from
-   Monitoring services you use to monitor your site's uptime
-   Security services
-   IP addresses you frequently login from

Why do this?

If Cloudflare has an IP address with a high threat score going to your site, or if you have [Cloudflare's Web Application Firewall](https://www.cloudflare.com/waf) turned on, you may get challenged working in your back end and/or services you want to access your site may get challenged. Taking the steps to allow in the beginning will help prevent future surprises on your site.

**Note:** We allow all known search engine and social media crawlers in our macro list. If you decide to block countries in Threat Control, please use care because you may end up inadvertently blocking their crawlers (blocking the USA, for example, could mean that a good crawler gets challenged).

**Step #4**

Review your basic security settings

If your site is frequently the target of spam attacks or botnet attacks, changing your security level to a higher level will reduce the amount of spam you get on your site. We default all users to a medium setting when they first add the domain to Cloudflare.

Why do this?

If you want your site to have less security and protection from various attacks, then you would want to [change your settings](https://support.cloudflare.com/hc/articles/200170056) to a lower level (please keep in mind this makes your site more vulnerable). If you want your site to have higher security, please keep in mind that you may get more false positives from visitors complaining about a challenge page that they have to pass to enter your site.

**Step #5**

If you are using services like .htaccess, firewalls or server mods to manage access to your site from visitors, it is vitally important to make sure requests from [Cloudflare’s IP ranges](https://www.cloudflare.com/ips) are not being blocked or limited in any way. The number one cause of site offline issues in our support channel is something blocking or restricting requests from our IPs, so please take the time to make sure that all of Cloudflare’s IPs are allowed on your server and with your hosting provider.

Why do this?

Prevent false offline messages from appearing on your site to you or visitors.

**Note:** You do not need to ask your host to allow our IPs when activating through a hosting partner. You should still make sure any other security services you're running on the site have our IPs allowed.
