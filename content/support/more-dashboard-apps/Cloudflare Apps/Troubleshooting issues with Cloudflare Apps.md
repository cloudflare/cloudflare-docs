---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000304691-Troubleshooting-issues-with-Cloudflare-Apps
title: Troubleshooting issues with Cloudflare Apps
---

# Troubleshooting issues with Cloudflare Apps



## Overview

{{<Aside type="warning">}}
When using Workers and Cloudflare Apps together they are \"pipelined.\"
The Cloudflare App will execute first, and when it fetches \"origin\",
the users Worker script will run directly after.
{{</Aside>}}

If you have trouble with an App installed from Cloudflare Apps onto your site:

1.  Verify that the app is placing itself in the location you expect on the page. You might have to scroll the page or choose a new location to find it.
2.  Be sure to carefully read the description and view the app's screenshots, it's possible the app works in a way you did not expect.
3.  Ensure that your site has at least the [basic skeleton](http://htmlshell.com/) of a legitimate HTML page.
4.  Ask for help on the [Cloudflare Community Forums](https://community.cloudflare.com/) in the area specially devoted to answering App questions.
5.  Reach out to the **Support Contact email address** listed on the right-side of the App's info page.
6.  Check your browser's developer tools for JavaScript errors, they may help explain how the app is interacting with your site.
7.  Disable Rocket Loader in the Performance tab, as the reordering of JavaScript calls may be causing the issue.
8.  Unfortunately due to the complex nature of websites, it's possible this app isn't compatible with your site. Look in the [Cloudflare Apps listing](https://www.cloudflare.com/apps/) for alternatives.

Lastly, if all these steps do not help you identify the problem, please file a support ticket and include a [HAR file](https://support.cloudflare.com/hc/en-us/articles/203118044-Gathering-information-for-troubleshooting-sites#h_8c9c815c-0933-49c0-ac00-b700700efce7) generated while the error occurs.

___

## Related Resources

-   [Gathering information to troubleshoot site issues](https://support.cloudflare.com/hc/en-us/articles/203118044) 
-   [Reporting bugs or feature requests for Cloudflare Apps](https://support.cloudflare.com/hc/en-us/articles/115001878371)
