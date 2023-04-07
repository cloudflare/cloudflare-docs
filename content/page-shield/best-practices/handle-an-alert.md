---
title: Handle an alert
pcx_content_type: best-practices
weight: 2
meta:
  title: Handle a Page Shield alert
---

# Handle a Page Shield alert

If you receive a Page Shield alert, sometimes you need to perform some manual investigation to confirm the nature of the script. Use the guidance provided in this page as a starting point for your investigation.

## Step 1 - Understand what triggered the alert

Start by identifying the [detection system](/page-shield/how-it-works/malicious-script-detection/) that triggered the alert. A link is provided in the alert that will send you directly to the Page Shield dashboard to the relevant resource that needs reviewing. Alternatively, do the following:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield**.
3. Under **Active Scripts** or **Active Connections**, search for the resource mentioned on the alert you received.
4. Select **Details** next to the resource you identified. The example screenshot below shows a malicious script resource.

![Page Shield dialog box showing the details of a script considered malicious.](/page-shield/static/handle-alert-malicious-script-example.png)

The details page will specify which detection system triggered the alert. Check the values of the following fields:

* **Malicious code**
* **Malicious URL**
* **Malicious domain**

Different detection mechanisms may consider the script malicious at the same time. This increases the likelihood of the detection not being a false positive.

## Step 2 - Find the page where the resource was detected

If you received an alert for a potentially malicious script:

1. Navigate to the page on your website that is loading the script or performing the connection. Open a browser and navigate to one of the URLs in the **Last seen on pages** field (shown in the script details dialog box).

2. Open the browser's developer tools to confirm that the script is being loaded. You can check this in the developer tools' **Network** tab, searching for the script name, URL, or hostname.

If you received an alert for a potentially malicious connection:

1. Go to the page on your website where the connection that triggered the alert is being made. Open a browser and go to one of the URLs specified in the **Page URLs** field (shown in the connection details dialog box).

2. Open the browser's developer tools to confirm that the connection is being made. You can check this in the developer tools' **Network** tab, searching for the target hostname of the connection.

If you find the script or connection, this means the script is being loaded (or the connection is being established) for all website visitors — proceed to [step 3](#step-3---check-the-script-reputation).

If you do not find the script being loaded or the connection being made, this could mean one of the following:

* The script is being loaded (or the connection is being made) by visitors' browser extensions.
* Your current state will not load the script or make the connection. Complex applications might load scripts and establish connections based on state.
* You are not in the correct geographic location (or similar condition).
* The attacker is only loading the script or making the connection for a percentage of visitors or visitors with specific browsers/signatures.

In this case, in addition to the steps indicated below, the best approach is:

* From a safe virtual environment, use online search tools and search for the given resource. Review results and resource metadata, for example domain registration details;
* If in doubt, scan the application codebase for the resource and if found, clarify the purpose.

## Step 3 - Check the script reputation

If Page Shield considers the resource’s domain a "malicious domain", it is likely that the domain does not have a good reputation. The domain may be known for hosting malware or for being used for phishing attacks. Usually, reviewing the domain/hostname is sufficient to understand why you received the alert. You can use tools like Cloudflare’s [Security Center Investigate](https://dash.cloudflare.com/?to=/:account/security-center/investigate) platform to help with this validation.

If Cloudflare's internal systems classified the script as containing "malicious code", external tools may not confirm the detection you got from Page Shield, since the machine learning (ML) model being used is Cloudflare-specific technology. However, you can re-run Page Shield’s ML model against the script source code, by using Cloudflare’s [Security Center Analyze](https://dash.cloudflare.com/?to=/:account/security-center/investigate/analyze) tool to confirm the match.

## Step 4 (optional) - Analyze the script content

You could use a virtual machine to perform some of the following analysis:

1. Open the script URL and get the script source code. If the script is obfuscated or encoded, this could be a sign that the script is malicious.
2. Scan the script source code for any hostnames or IP addresses.
3. For each hostname or IP address you identified, use Cloudflare's Security Center Investigate platform to look up threat information and/or search online for potential Indicators of Compromise.

---

## Conclusion

If a resource which triggered a malicious alert from Page Shield:

* Is actively present in your application
* Is being loaded from a malicious host or IP address, or has malicious code
* Has malicious hostnames or IP addresses in its source code, which may be obfuscated/encoded

You should investigate further, since these indicators can be a sign of an ongoing active compromise.
