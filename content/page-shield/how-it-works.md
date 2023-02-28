---
title: How it works
pcx_content_type: concept
weight: 3
meta:
  title: How Page Shield works
---

# How Page Shield works

Page Shield simplifies external script management by tracking loaded resources like scripts and providing alerts when it detects new resources or malicious scripts. Page Shield also tracks the connections made by scripts on your domain's pages and checks if they are malicious based on their destination.

Enabling Page Shield adds a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) deployed with a [report-only directive](/page-shield/reference/csp-header/) to collect information from the browser. This allows Cloudflare to provide you with a list of all scripts running on your application and the connections they make to third-party endpoints.

Page Shield provides a **Monitors** dashboard for reviewing the scripts loaded in your domain and the connections they make:

* **Active scripts** shows a list of [active scripts](/page-shield/reference/script-statuses/) in your website.
* **Active connections** shows a list of [active connections](/page-shield/reference/script-statuses/) in your website.

The **All Reported Scripts** and **All Reported Connections** dashboards show the full list of detected scripts and connections in your domain, respectively, including infrequent and inactive ones.

Since the script and connection lists are based on sampling, there may be a small delay between deploying a script and having its data displayed in Page Shield's dashboards.

## Additional features

If you are an Enterprise customer with a paid add-on, you will have access to the following additional features:

* **Detect potentially [malicious scripts and connections](#) in your domain**: Scripts and connections considered malicious will appear at the top of their corresponding dashboards.

* [**Code change alerts**](/page-shield/reference/alerts/): Configure a notification for code change alerts to receive a daily notification about changed scripts in your domain.

* **Define a positive security model using [policies](#)**: Ensures only allowed scripts are loaded by the browser, heavily reducing the attack surface for unwanted third-party scripts being loaded or injected into your application.

## Learn more

For more background on Page Shield, refer to the [Page Shield is generally available](https://blog.cloudflare.com/page-shield-generally-available/) blog post.
