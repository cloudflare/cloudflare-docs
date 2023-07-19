---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000635308-Accelerated-Mobile-Links-sunset-
title: Accelerated Mobile Links (sunset)
---

# Accelerated Mobile Links (sunset)



## Overview

Cloudflare started disabling the **Accelerated Mobile Links** (AML) feature on April 30, 2019.

AML used Accelerated Mobile Pages (AMP) technology to speed up the rendering of links in your site.

Since releasing AML, we have learned that many of our users aren’t looking for AMP only, but also want to optimize the visitor experience when following links from Google search results. In the interest of improving that experience, we are discontinuing development of AML in favor of the new Web Packaging technology. Web Packaging will remove “google.com/amp/” from the beginning of your URLs when visitors follow links from Google.

Following the discontinuation of Cloudflare AML, links on your site will point directly to their intended destination, rather than Cloudflare’s AMP Cache. These links will continue to work as designed, and no additional action is required on your part.

If you are interested in learning more about the upcoming Web Packaging release, please complete the following form: [https://cfl.re/webpackaging](https://cfl.re/webpackaging).
