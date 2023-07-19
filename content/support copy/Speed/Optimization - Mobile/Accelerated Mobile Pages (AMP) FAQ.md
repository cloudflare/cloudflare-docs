---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360060692691-Accelerated-Mobile-Pages-AMP-FAQ
title: Accelerated Mobile Pages (AMP) FAQ
---

# Accelerated Mobile Pages (AMP) FAQ



## What is AMP and how can I use it?

Accelerated Mobile Pages (AMP) are static pages that are rendered very quickly tailored towards mobile users. AMP uses a stricter flavor of HTML in order for mobile browsers to load faster. Please note that a standard web page isn't AMP compatible by default; your web page must be written in compliance with the AMP format.  Domains on [Cloudflare CNAME setups](https://support.cloudflare.com/hc/articles/360020348832) cannot utilize AMP Real URL. As a workaround, you can add the following CAA records in your authoritative DNS (the example below assumes that Cloudflare has issued a certificate from Digicert CA):


```txt
example.com IN CAA issue "digicert.com; cansignhttpexchanges=yes"
example.com IN CAA issuewild "digicert.com; cansignhttpexchanges=yes"
```

Helpful background on AMP:

-   [What is AMP?](https://www.ampproject.org/learn/about-amp/)
-   [How does AMP work?](https://www.ampproject.org/learn/how-amp-works/)
-   [How do I create an AMP page?](https://www.ampproject.org/docs/get_started/create)
-   [How do I publish an AMP enabled article?](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/publishing_checklist/)

Things to remember:

-   [Validate your AMP page](https://www.ampproject.org/docs/guides/validate)
-   [Make sure that your AMP page is discoverable](https://www.ampproject.org/docs/guides/discovery)
-   AMP will only appear for external links

___

## How can I validate an AMP enabled page?

Accelerated Mobile Pages require a particular structure to enable AMP features. If you'd like to know about creating an AMP enabled page, you can find out more at [AMP Project's - Create your first AMP page](https://www.ampproject.org/docs/get_started/create).

Validate your existing AMP enabled pages in one of three ways:

-   **Using AMPProject.org Validation** - Enter your URL through an AMP validator to look for warnings and/or errors: [Validate your AMP page](https://validator.ampproject.org/)

-   **Using Chrome Developer Tool**s - Validate your AMP enabled pages through Chrome Developer Tools:

1.  Open your AMP page in your browser
2.  Append "#development=1" to the URL, for example, http://localhost:8000/amp.html#development=1.
3.  Open the [Chrome DevTools console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) and check for validation errors.

-   **Using Browser Extensions** - AMP validator browser extensions are available for [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) and [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

Learn more about all of these tools and how to fix certain validation errors at [AMP Project validation options](https://www.ampproject.org/docs/guides/validate).

___

## Can I use WordPress with AMP?

Yes! Accelerated Mobile Pages are designed to speed up external AMP enabled articles on your Cloudflare enabled site. If you have a WordPress site and would like to make it AMP enabled, the [WordPress AMP Plugin](https://en-gb.wordpress.org/plugins/amp/) will do this automatically.

Once you've installed the plugin, test the functionality by adding `?amp=1` to the end of your WordPress URL (for example: `https://example.com/2016/01/01/amp-on/?amp=1`).
