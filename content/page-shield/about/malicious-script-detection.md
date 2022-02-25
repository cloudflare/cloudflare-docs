---
order: 2
pcx-content-type: concept
---

# Detecting malicious scripts

Page Shield implements different mechanisms to determine if a script is malicious. These mechanisms are:

*   Malicious URL checks
*   Malicious domain checks
*   Malicious script detection

<Aside type="note">

This feature is available as a paid add-on for customers on an Enterprise plan.

</Aside>

## Malicious URL checks

Page Shield will search for the URLs of your JavaScript dependencies in threat feeds to determine if any of those scripts should be categorized as malicious.

Any updates to the threat feeds will trigger new checks for previously detected scripts, so that the Script Monitor dashboard always reflects the latest script categorization.

The Script Monitor dashboard displays the scripts that were considered malicious at the top of the scripts list.

You can [configure Malicious URL Alerts](/reference/alerts). You will receive an alert notification as soon as Cloudflare detects a malicious script URL in your domain.

## Malicious domain checks

Page Shield will search for the domains of your client-side JavaScript dependencies in threat feeds to determine if any of those scripts is being served from a known malicious domain.

Any updates to the threat feeds will trigger new checks for previously detected scripts, so that the Script Monitor dashboard always reflects the latest script categorization.

A domain previously reported as malicious can later be reported as non-malicious if, after further analysis, the domain is deemed safe. The Script Monitor dashboard will reflect the most up-to-date information.

You can configure [Malicious Domain Alerts](/reference/alerts). You will receive an alert notification as soon as Cloudflare detects a malicious script loaded from a known malicious domain in your domain.

## Malicious script detection

In this type of detection, Page Shield will download the script file and run it through a classifier. The classifier will perform several operations — deobfuscation, normalization, and decoding — before looking for correlations between form field fetches and data exfiltration calls. The stronger the correlation, the more likely the script is performing malicious operations like [Magecart-type attacks](https://sansec.io/what-is-magecart).

The script classifier will output a probability score for the script (also called the JS integrity score) between 1 and 99, where 1 means definitely malicious and 99 means definitely not malicious. This score, together with a threshold value, will determine if the malicious script detection system will classify the script as malicious or not.

The score threshold for considering a script as malicious is currently set to 10. If the script classification score is below this value, the Script Monitor dashboard will display the script as being malicious.

You can configure [Malicious Code Alerts](/reference/alerts). You will receive an alert notification as soon as Cloudflare detects JavaScript code classified as malicious in your domain.
