---
title: How we detect phish
pcx_content_type: reference
weight: 1
layout: list
---

# How we detect phish

Area 1 uses a variety of factors to determine whether a given email message, a web domain or URL, or specific network traffic is part of a phishing campaign (marked with a `Malicious` [disposition](/email-security/reference/dispositions-and-attributes/)) or other common campaigns (for example, `Spam`).

These small pattern assessments are dynamic in nature and — in many cases — no single one in and of itself will determine the final verdict. Instead, our automated systems uses a combination of factors and non-factors to clearly distinguish between a valid phishing campaign and benign traffic.

## IP reputation

IP reputation is just one of many factors to consider but is not consistently accurate due to the dynamic nature of phishing campaigns.

For example, a particular sender IP in a Comcast range might have a mix of good and bad reputation. Flagging it purely on IP would subject a larger chunk of Comcast's IP address range to detections, which could lead to false positives.

## Sample attack types and detections

| Attack type | Example | Detections applied |
| --- | --- | --- |
| Malicious payload attached to the message | Classic campaign technique, which utilizes a variety of active attachment types (EXE, DOC, XLS, PPT, OLE, PDF, and more) as the malicious payload for ransomware attacks, Trojans, viruses, and malware. | Machine learning (ML) models on binary bitmaps of the payload as well as higher-level attributes of the payload, with specific focus on signatureless detections for maximum coverage. Additionally, for relevant active payloads, the engine invokes a real-time sandbox to assess behavior and determine maliciousness. |
| Encrypted malicious payload attached to the message, with password in message body as text | Campaigns that induce the user to apply a password within the message body to the attachment. | Real-time lexical parsing of message body for password extraction and ML models on binary bitmaps of the payload, signatureless detections for maximum coverage. |
| Encrypted malicious payload attached to the message, with password in message body as an image | Campaigns that induce the user to apply a password within the message body to the attachment, with the entire body or part of the body being an image. | Real-time OCR parsing of message body for password extraction and ML models on binary bitmaps of the payload, signatureless detections for maximum coverage. |
| Malicious payload within an archive attached to the message | Campaigns with payloads within typical archives, such as `.zip` files. | ML detection tree on the payload, as well as decomposition of each individual archive into component parts and fragments for compound documents. |
| Malicious URLs within message body | Typical phish campaigns with a socially engineered call to action URL that will implant malware (for example, Watering Hole attacks, Malvertizing, or scripting attacks). | Continuous Web crawling, followed by real-time link crawling for a select group of suspicious urls, followed by machine learning applied to URL patterns in combination with other pattern rules and topic-based machine learning models for exhaustive coverage of link-based attacks. |
| Malicious payload linked through a URL in a message | Campaigns where the URL links through to a remote malicious attachment (for example, in a `.doc` or `.pdf` file) | Remote document and/or attachment extraction followed by ML detection tree on the payload, instant crawl of links. |
| Blind URL campaigns | Entirely new domain with intentional obfuscation, seen for the first time in a campaign. | Link structure analysis, link length analysis, domain age analysis, neural net models on entire URL as well as domain and IP reputation of URL host, including autonomous system name reputation and geolocation based reputation. |
| Malicious URLs within a benign attachment in the message | Campaigns obfuscating the payload within attachments. | URL extraction within attachments, followed by above mentioned URL detection mechanisms. |
| Malicious URLs within an archive attached to the message | Campaigns obfuscating the payload within attachments. | Attachments decomposed recursively (both in archive formats and compound document formats) to extract URLs, followed by above mentioned URL detection mechanisms. |
| Malicious URLs behind URL shortening services | Campaigns leveraging Bitly, Owly, and similar services at multiple levels of redirection to hide the target URL. | URL shorteners crawled in real time at the moment of message delivery to get to the eventual target URL, followed by URL detection methods. Real-time shorterners are intentionally not crawled ahead of time due to the dynamic nature of these services and the variation of target URLs based on time and source. |
| Instant crawl of URLs within message body | Typical phish campaigns with a socially engineered call to action URL that will implant a malware (for example, Watering Hole attacks, Malvertizing, or scripting attacks). | Heuristics applied to URLs in message bodies that are not already detected from ahead of time crawling and those deemed suspicious according to strict criteria are crawled in real time. |
| Credential Harvesters | Form-based credential submission attacks, leveraging known brands (Office 365, Paypal, Dropbox, Google, and more). | Continuous Web crawling, computer vision on top brand lures, ML models, and infrastructure association. |
| Domain Spoof Attacks | Campaigns spoofing sender domains to refer to the recipient domain or some known partner domain. | Header mismatches, email authentication assessments, sender reputation analysis, homographic analysis, and punycode manipulation assessments. |
| Domain proximity attacks | Campaigns taking advantage of domain similarity to confuse the end user (for example, `sampledoma1n.com` or `sampledomaln.com` compared to `sampledomain.com`). | Header mismatches, email authentication assessments, and sender reputation analysis. |
| Email Auth violations  | Campaigns taking advantage of incorrect or invalid sender Auth records (SPF/DKIM/DMARC) and bypassing incoming Auth-based controls. | Assessment of sender authentication records against published SPF/DKIM/DMARC records, which is applied in combination with overall message attributes. |
| Name Spoof Attacks / Executive Attacks [(BEC)](/email-security/email-configuration/enhanced-detections/business-email-compromise/) | Campaigns targeting executives and high-value targets within the organization or using the high-value targets as sources to attack other employees within the organization. | Display names compared with known executive names for similarity using several matching models including the Levenshtein Algorithm, and if matched, flagged when sender is originating from an unknown domain. |
| Fileless / Linkless campaigns [(BEC)](/email-security/email-configuration/enhanced-detections/business-email-compromise/)  | Typically BEC campaigns with an offline CTA (call me, wire money, invoice, or others). | Message lexical analysis, subject analysis, word count assessments, and sender analysis. |
| Deferred campaign attacks  | Campaigns that have no malicious payload and the URL is clean when delivered, but is activated in a deferred manner (3-4 hours later), so the end user is compromised at click time. | URL rewrites and/or DNS blocks. |
| IP-based Spam | Volume-based, large scale spam campaigns primarily originating from compromised IP address spaces or botnets. | Sender and IP reputation, history, and volume analysis. |
| Content-based Spam | Commodity spam largely focused on selling wares. | Sender reputation, history, volume analysis, and message content analysis for commercial intent. |
| Web Phishing  | Directly originated or targeted through Web (for example, LinkedIn, Malvertizing, and more). | Web and DNS service and Network device integrations, like web proxies and Firewalls. |
| Mobile Phishing | Remote employee getting phished while outside the corporate network. | Employee email protection and Web and DNS services enforcement in remote users (typically through an MDM integration or an Always-On VPN solution). |
| Network Phishing | C2 communications for lateral spread within the network or malicious phish downloaded from an external host. Typically seen when an end user gets infected outside the organization, comes back into the network and the C2 hosts uses the infected endpoint to download the implant based on the IP address space it is now resident in. | Network device integrations (Firewalls) and API-based integrations within existing orchestration services. |
