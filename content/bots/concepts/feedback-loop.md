---
pcx_content_type: concept
title: Bots Feedback Loop
---

# Bots Feedback Loop

The Bots Feedback Loop is an easy way for customers to send Cloudflare direct feedback in the case of Bot Management potentially scoring a request incorrectly. Before, customers could only report issues with bot scores via a support ticket or directly to their account team. 

Now, the Bots Feedback Loop allows customer to submit feedback via the API. When a customer submits a False Negative or a False Positive report, Cloudflare manually analyzes this data and uses it as a training dataset for our next Machine Learning model.

## Availability

Anyone who has access to Bot Analytics is able to submit feedback. Business and Enterprise customers who have Super Bot Fight Mode enabled will also be able to submit feedback. 

## False Positive

A false positive can happen if Cloudflare scores a request from a person using a browser, mobile application or desktop application in the **automated** or **likely automated** range.

## False Negative

If Cloudflare is unable to detect a portion of automated traffic on your site, submitting a False Negative report will help us catch it in the future.

### Subtypes

| Subtype | Definition |
| --- | --- |
| Account Creation Abuse | The automated creation of many new accounts in order to gain access to site resources. |
| Ad Fraud | Fraudulent increase in the number of times an advertisement is clicked on or displayed. |
| Credit Card Abuse | Attempts to repeatedly validate many credit card numbers or the same credit card number with different validation details. |
| Cashing Out | Abusing the target internet application to obtain valuable goods. |
| Login Abuse | Attempts to gain access to a password protected portion of an internet application using many different combinations of usernames and passwords. |
| Inventory Abuse | Automated abuse related to purchasing limited stock inventory or holding inventory to prevent others from making transactions. |
| Denial of Service | Automated requests with the intent of exhausting server resources to prevent the internet application from functioning. |
| Expediting | Automating the use of an internet application to make transactions faster than a human visitor to gain unfair advantage. |
| Fuzzing | Finding implementation bugs through the use of malformed data injection in an automated fashion. |
| Scraping | Automated retrieval of valuable or proprietary information from an internet application. |
| Spamming | The abuse of content forms to send spam. |
| Token Cracking | Identification of valid token codes providing some form of user benefit within the application. | 
| Vulnerability Scanning | Systematic enumeration and examination of identifiable, guessable and unknown content locations, paths, file names, parameters, in order to find weaknesses and points where a security vulnerability might exist. |

## Submit a Report

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **Bots**.
3. Apply **Bot score filter(s)**.
4. Select **Report incorrect data** and fill out the form.
5. Select **Submit**. 

### Recommendations when submitting a report

When you submit a report, use the filters available in the Bot Analytics dashboard to ensure that your report includes only the traffic that received an incorrect score. In addition to filtering by a score (required), you may want to filter by user-agent, IP, ASN or JA3 to more precisely highlight the section of traffic that was scored incorrectly. 

If you are not certain if some traffic received an incorrect score, keep this traffic in the report.  

We appreciate any comments you wish to leave in the description field that might help our team better understand these requests in the context of typical traffic to your domain.

### Recommendations after submitting a false positive

After submitting a false positive, you can explicitly allow the traffic if you are confident that this traffic source cannot be used for abuse in the future. To allow traffic, you can create a **Custom Rule** or **Firewall Rule** with an `allow` action that matches the characteristics of your false positive report. We recommend any allow rule that you create uses the most narrow possible scope, including restricting the request methods and URIs that the expected traffic has access to, in order to limit potential abuse.  

* Allowing an **IP address**: Only use an IP address to allow traffic if the IP is a dedicated resource that belongs only to the traffic source you wish to allow. <br>If the traffic you want to allow shares an IP with other traffic sources, or if the IP changes frequently, consider an alternative to allowing by IP address.

* Allowing a **[JA3 fingerprint](/bots/concepts/ja3-fingerprint/)**:  If you want to allow access to a stable software client that does not come from a dedicated IP, you can do so by looking up the JA3 fingerprint(s) used by that client in the Bot Analytics dashboard, and creating a **Custom Rule** or **Firewall Rule** to allow traffic based on that JA3 fingerprint. JA3 fingerprints will only match a client’s TLS library, so be cautious in looking for both overlap with other clients and with variation based on the operating system. <br><br>Cloudflare does not recommend relying on JA3 rules for mobile applications that may be abused. If you have questions about how to securely allow traffic from your mobile application, please contact your account team. 

### Recommendations after submitting a false negative

After submitting a false negative report, you can explicitly block or rate-limit the incorrectly scored traffic using a combination of characteristics such as IP address, JA3 fingerprint, ASN, and user-agent. Before blocking or rate-limiting based on JA3 fingerprint, please use Bot Analytics to confirm that fingerprint is not being used by legitimate traffic sources. 