---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000307271-Troubleshooting-missing-pages-from-Cloudflare-Apps
title: Troubleshooting missing pages from Cloudflare Apps
---

# Troubleshooting missing pages from Cloudflare Apps



## Overview

Cloudflare Apps includes a page selection tool that allows you to install an app onto just one page or set of pages on your site. This tool relies on our web crawling technology which maps your site to allow you to select from a list of pages. Not all of your site may be accessible for a variety of reasons:

-   You may have portions of your site which are not being served through Cloudflare. You should consider ["orange-clouding"](https://support.cloudflare.com/hc/en-us/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-) them to enable Cloudflare Apps on those portions of your site.
-   The pages you're looking to add may not be accessible from your site's homepage via links or you may have too many links for us to follow.
-   The pages you're adding may be password-protected, preventing us from accessing them and adding them to your site map.
-   You may have recently added pages we haven't had a chance to crawl yet.
-   You may have disabled the [Always Online](https://support.cloudflare.com/hc/articles/200168436) setting which also prevents our automatic crawls from occurring.

Depending on the issue it may be helpful to trigger a manual crawl of your site by clicking the "Update now" button within the page selection dropdown. After clicking that button it can take several minutes for your site's pages to update.

___

## Manually add a page

If you are not able to get the relevant areas of your site to appear, you can manually add a page to the install.
