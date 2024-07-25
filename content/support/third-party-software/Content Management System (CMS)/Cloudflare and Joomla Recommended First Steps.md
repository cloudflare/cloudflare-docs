---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/201997250-Cloudflare-and-Joomla-Recommended-First-Steps
title: Cloudflare and Joomla Recommended First Steps
---

# Cloudflare and Joomla: Recommended First Steps



## Overview

These basic steps will help reduce common areas of confusion for Joomla users that are new to the Cloudflare services. In addition, these steps are very quick and will generally take you only a few minutes of your time to help you make your experience using Cloudflare better.

___

## Restore visitor IP

Restore visitor IP by following the directions in [this article](https://support.cloudflare.com/hc/articles/200170786). Since Cloudflare acts as a proxy for sites using our network, Cloudflare’s IPs are going to show in your logs, including comments, unless you install something to restore the original visitor IP.

Why should you restore visitor IP?

If you receive a lot of comments or spam on your blog, you may mistakenly believe that Cloudflare is spamming you. Some other Joomla plugins or extensions  may also rely on the original visitor IP for the  services to work properly and reduce false alerts.

{{<Aside type="note">}}
You don't need to worry about this if you activated through a hosting
partner, since they already restore visitor IP addresses on their
servers by default.
{{</Aside>}}

___

## Create a PageRule to exclude Joomla

Create a [PageRule](https://support.cloudflare.com/hc/en-us/articles/200168306-Is-there-a-tutorial-for-Page-Rules-) to exclude the Joomla admin or Joomla login sections from Cloudflare’s caching and performance features. You can access PageRules in your [Cloudflare 'Settings' options](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-PageRule-).

Why do this?

While there is not always an issue, we have seen instances where optional performance features like Rocket Loader may inadvertently break certain functions (editors, etc.) in your Joomla back end.

___

## Allow IP addresses via Cloudflare Threat Control panel

Log in to your Cloudflare Threat Control panel and allow IP addresses you want traffic from or expect traffic from. Some common services you probably want to allow include:

-   APIs you’re pulling from
-   Monitoring services you use to monitor your site's uptime
-   Security services
-   IP addresses you frequently login from

Why do this?

If Cloudflare has an IP address with a high threat score going to your site, or if you have [Cloudflare's Web Application Firewall](https://cloudflare.com/waf) turned on, you may get challenged working in your back end and/or services you want to access your site may get challenged. Taking the steps to allow in the beginning will help prevent future surprises on your site.

{{<Aside type="note">}}
We allow all known search engine and social media crawlers in our macro
list. If you decide to block countries in Threat Control, please use
care because you may end up inadvertently blocking their crawlers
(blocking the USA, for example, could mean that their crawler gets
challenged).
{{</Aside>}}

___

## Review your basic security settings

If your site is  frequently the target of spam attacks or botnet attacks, changing your security level to a higher setting will help further reduce the amount of spam you get on your site. We default all users to a medium setting when they first add the domain to Cloudflare.

Why do this?

If you want your site to have less security and protection from various attacks, then you would want to change your settings to a lower level (please keep in mind this makes your site more vulnerable). If you want your site to have higher security, please keep in mind that you may get more false positives from visitors complaining about a challenge page that they have to pass to enter your site.

___

## Ensure requests from Cloudflare's IP ranges aren't blocked or limited

If you are using services like .htaccess, firewalls or server mods to manage access to your site from visitors, it is vitally important to make sure requests from Cloudflare’s IP ranges are not being blocked or limited in any way. The number one cause of site offline issues in our support channel is something blocking or restricting requests from our IPs, so please take the time to make sure that all of Cloudflare’s IPs are allowed on your server.

Why do this?

Prevent false offline messages from appearing on your site to you or visitors.
