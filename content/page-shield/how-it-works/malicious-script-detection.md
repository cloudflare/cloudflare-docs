---
pcx_content_type: concept
title: Malicious script and connection detection
weight: 2
meta:
  description: Page Shield implements different mechanisms to determine if a script or a connection is malicious.
---

# Malicious script and connection detection

{{<Aside type="note">}}
This feature is available as a paid add-on for customers on an Enterprise plan.
{{</Aside>}}

Page Shield implements different mechanisms to determine if a script, or a connection made by a script, is malicious. These mechanisms are:

- Malicious URL checks
- Malicious domain checks
- Malicious script detection

Any updates to the threat feeds will trigger new checks for previously detected scripts or connections so that the Page Shield dashboards always reflect the latest categorization.

## Malicious URL checks

Page Shield will search for the URLs of your JavaScript dependencies in threat feeds to determine if any of those scripts should be categorized as malicious.

The Page Shield dashboards display the scripts that were considered malicious at the top of the scripts list.

You can [configure Malicious URL Alerts](/page-shield/reference/alerts/) to receive an alert notification as soon as Cloudflare detects a script from a malicious URL in your domain.

Depending on your current configuration, Page Shield can also search for malicious URLs in the URLs of outgoing connections made by scripts in your domain. To enable this check, you must [allow Page Shield to use the full URLs of outgoing connections](/page-shield/reference/settings/#connection-target-details) instead of only the hostname in Page Shield settings.

## Malicious domain checks

Page Shield will search for the domains of your client-side JavaScript dependencies in threat feeds to determine if any of those scripts is being served from a known malicious domain.

A domain previously reported as malicious can later be reported as non-malicious if, after further analysis, the domain is deemed safe.

Page Shield will also check the target domains of connections made by scripts in your domain's pages, following the same approach described for scripts.

You can configure [Malicious Domain Alerts](/page-shield/reference/alerts/) to receive an alert notification as soon as Cloudflare detects a malicious script loaded from a known malicious domain in your domain.

## Malicious script detection

In this type of detection, Page Shield will download the script file and run it through a classifier. The classifier will perform several operations — deobfuscation, normalization, and decoding — before looking for correlations between form field fetches and data exfiltration calls. The stronger the correlation, the more likely the script is performing malicious operations like [Magecart-type attacks](https://sansec.io/what-is-magecart).

The script classifier will output a probability score for the script (also called the JS integrity score) between 1 and 99, where 1 means definitely malicious and 99 means definitely not malicious. This score, together with a threshold value, will determine if the malicious script detection system will classify the script as malicious or not.

The score threshold for considering a script as malicious is currently set to 50. If the script classification score is below this value, the Page Shield dashboards will display the script as being malicious.

You can configure [Malicious Script Alerts](/page-shield/reference/alerts/). You will receive an alert notification as soon as Cloudflare detects JavaScript code classified as malicious in your domain.

---

## Malicious script and connection categories

Scripts and connections considered malicious are categorized based on data from threat intelligence feeds. The current categories are the following:

* Security threats
* Command-and-Control (C2) & Botnet
* Cryptomining
* Spyware
* Phishing
* Malware
* Domain Generation Algorithm (DGA) domain
* Typosquatting & Impersonation

Each script or connection considered malicious can belong to several categories.