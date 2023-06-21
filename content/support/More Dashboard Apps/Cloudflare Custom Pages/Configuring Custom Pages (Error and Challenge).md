---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172706-Configuring-Custom-Pages-Error-and-Challenge-
title: Configuring Custom Pages (Error and Challenge)
---

# Configuring Custom Pages (Error and Challenge)

## Overview

Cloudflare uses a wide range of [error codes](https://support.cloudflare.com/hc/en-us/sections/200820298-Error-Pages) to identify issues in handling request traffic. By default, these error pages mention Cloudflare; however, custom error pages help you provide a consistent brand experience for your users. 

If you are on the Pro, Business, or Enterprise plan you can customize and brand these pages for your whole account or for specific domains. You can design custom error pages to appear during a security challenge or when an error occurs.

{{<Aside type="note">}}
500, 501, 503, and 505 responses do not trigger custom error pages to
avoid breaking specific API endpoints and other web applications.
{{</Aside>}}

Alternatively, Enterprise customers can customize 5XX error pages at their origin via **Enable Origin Error Pages** in the **Custom Pages** app in the dashboard..

{{<Aside type="note">}}
Enable Origin Error Pages excludes 521 and 522 errors.
{{</Aside>}}

___

## Step 1: Create a custom page

Before adding a custom error page to your Cloudflare account, you will need to design, code, and host that page on your own web server.

You can use the following custom error template to start building your page:

```html
<html>
<head></head>
 <body>
   ::[REPLACE WITH CUSTOM ERROR TOKEN NAME]::
 </body>
</html>
```

{{<Aside type="warning">}}
Your custom error page must include a custom error token and cannot
exceed 1.43 MB. Also, it must include HTML *\<head\>* and *\</head\>*
tags.
{{</Aside>}}

When published, any additional scripts, images, or stylesheets increase the size of your custom error page source by approximately 50%. Download the [collapsify](https://github.com/cloudflare/collapsify) tool to test your page size before publishing.

### Custom Page example

Here is sample code for a 5XX custom error page without styling: 

```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
    <title>5XX Level Errors page</title>
</head>
<body>
  <h1> 5XX Level Errors </h1>
  <h2>::CLOUDFLARE_ERROR_500S_BOX::</h2>
</body>
</html>
```

___

## Step 2: Select your custom error tokens

When designing your custom error page, you must include one page-specific custom error token.  Each custom error token provides diagnostic information that appears on the error page. 

To display a custom page for each error, create a separate page per error. For example, to create a custom error page for both **IP/Country Block** and **Interactive Challenge**, you must design and publish two separate pages. 

The following tables list each custom error token grouped by the applicable custom error page.

| **Token** | **Available to** |
| --- | --- |
| ::CLIENT\_IP:: | All pages |
| ::RAY\_ID:: | All pages |

{{<Aside type="warning">}}
Only one page-specific custom error token can be used per page.
{{</Aside>}}

| **Token** | **Available to** |
| --- | --- |
| ::GEO:: | IP/Country Block |
| ::CAPTCHA\_BOX:: | Interactive Challenge<br/>Country Challenge (CAPTCHA Challenge)<br/>Managed Challenge / I'm Under Attack Mode (Interstitial Page) |
| ::IM\_UNDER\_ATTACK\_BOX:: | JS Challenge |
| ::CLOUDFLARE\_ERROR\_500S\_BOX:: | 5XX Errors |
| ::CLOUDFLARE\_ERROR\_1000S\_BOX:: | 1XXX Errors |
| ::ALWAYS\_ONLINE\_NO\_COPY\_BOX:: | Always Online |

___

## Step 3: Style your custom page

Each custom error token has a default look and feel. However, you can use CSS to stylize each custom error tag using each tag's class ID. If you are familiar with CSS styling, you can customize the look and feel of the error page using each tag’s class ID. Please keep in mind that all the external resources like images, CSS, and scripts will be inlined during the process. As such, all external resources need to be available (i.e. return a 200 OK) otherwise an error will be thrown.

You can check if your page is fine using the following tool: [Collapsify](https://github.com/cloudflare/collapsify)

___

## Step 4: Publish your custom page

After customizing your custom error page, there are two options for adding the page to Cloudflare:

-   Account level: the custom error page will apply to every domain associated with your account.
-   Domain level: the custom error page will apply to only one domain associated with your account.

{{<Aside type="note">}}
If Cloudflare cannot load your site or you have blocked the United
States (US) via [IP Access
Rules](https://support.cloudflare.com/hc/articles/217074967 "Configuring IP Access Rules")
or firewall rules, publishing and previewing the error page will not
work.
{{</Aside>}}

### Account-level custom error page

To publish an account level custom error page:

1.  Log into your Cloudflare account.
2.  Click the **Configurations** tab.
3.  In the left navigation, click **Custom Pages.**
4.  Identify your desired custom error page type, then click the **Custom Pages** button. A **Custom Page** dialog will appear.
5.  Enter the URL of the custom error page you customized in your origin server, then click **Publish.**

### Domain level custom error page

To publish a domain level custom error page:

1.  Log into your Cloudflare account.
2.  Choose the domain for which you would like to publish a custom error page.
3.  Click the **Custom Pages** app.
4.  Identify your desired custom error page type, then click the **Custom Pages** button. A **Custom Page** dialog will appear.
5.  Enter the URL of the custom error page you customized in your origin server, then click **Publish.**

### Update custom error page after publishing

After successfully publishing the custom error page in the **Custom Pages** app, you can remove the page from your origin server. 

If in the future, you need to update your custom error page, you must re-publish the page at your origin and in the Cloudflare dashboard, even if the page URL remains unchanged.

___

## Troubleshoot common custom pages issues

### Error pages for blocked requests

If you block countries or IP addresses with [IP Access Rules](/waf/tools/ip-access-rules/), affected visitors will get a `1005` error and see your **IP/Country Block** custom page.

If you block countries or IP addresses with [firewall rules](/firewall/), affected visitors will see your **1000 Class Errors** custom page.

If you block countries or IP addresses with [WAF custom rules](/waf/custom-rules/), affected visitors will see your **WAF Block** custom page.

### 1xxx errors

**1XXX Errors** do not customize the following HTTP errors via the Custom Pages app:

-   1001 - Unable to resolve
-   1003 - Bad Host header
-   1018 - Unable to resolve because of ownership lookup failure
-   1023 - Unable to resolve because of feature lookup failure

### Custom error page size

Your custom error page cannot be blank and cannot exceed 1.43 MB. To avoid exceeding the custom error page limit, download [collapsify](https://github.com/cloudflare/collapsify) to test your page size before publishing. 

### General troubleshooting advice

-   If you encounter errors while attempting to preview or publish your custom error page, use an [HTML validator](https://validator.w3.org/) to ensure that your code resolves properly. 
-   Make sure that you are serving the custom error page with an HTTP 200 status code.

___

## Related resources

-   [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/)
-   [IP Access Rules](/waf/tools/ip-access-rules/)
-   [Cloudflare Web Application Firewall (WAF)](/waf/)
-   [Cloudflare Errors](https://support.cloudflare.com/hc/sections/200820298-Error-Pages)
-   [Collapsify](https://github.com/cloudflare/collapsify)
