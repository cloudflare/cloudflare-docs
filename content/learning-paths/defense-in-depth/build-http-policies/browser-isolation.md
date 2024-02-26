---
title: Get the most out of Browser Isolation
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Browser Isolation is a powerful tool to provide unique and transparent protection for your users using methods that surpass the capabilities of a traditional secure web gateway. There are other applications for Cloudflare's Browser Isolation technology that fit better into the upcoming Zero Trust Web Access module; this section focuses primarily on Browser Isolation for external services, assuming that most traffic from a device or a network is being forwarded to Cloudflare. If your organization is interested in implementing Browser Isolation, there are a few methods that Cloudflare recommends exploring.

As a note, Cloudflare's Browser Isolation technology was built to be used for 100% of a user's daily browsing; these recommendations aren't to suggest that you should necessarily limit or be cautious with your use of Browser Isolation, but instead to help identify practical outcomes that balance technology with actualized security benefits.

## Blocking copy, paste, and upload/download for Shadow IT

In beginning to deploy Cloudflare Zero Trust, you may have begun visualizing user traffic patterns using our Shadow IT [link] report. This gives you visibility into detected SaaS applications that your users engage with, and administrators can categorize on the basis of what the organization is or isn't permitting (or perhaps isn't contracted) for use. Otherwise, if you maintain a similar list manually or in other tools, you can port that data into a Zero Trust list, keep it updated via the API, and achieve the same outcomes.

You can control potential risk and shape user behavior without applying heavy-handed block policies by applying policies to 'isolate' user traffic to applications that match these categories. You can then set additional parameters in the policy, such as the ability to restrict copy/paste and upload/download, so that users can still access information in (and potentially even continue to use) the tools, while minimizing the risk of data loss.

[example policy flow screenshot and api call]

## Isolating all "gray-listed" traffic

A common method for using Browser Isolation to dramatically enhance your security posture by protecting against unknown or zero-day threats is to separate all HTTP traffic into known acceptable, known malicious, and 'unknown' buckets, and to isolate the 'unknown'. You can easily accomplish this by setting explicit allow policies for all your known applications and trusted websites (either by using Cloudflare application definitions or managing a list), setting explicit block policies for all security risks, known-malicious, and against-acceptable-use intentional denies, and then setting a policy to isolate all other traffic in this middle. In this context, if something is 'unknown' to the business, Cloudflare will isolate it by default, and prevent any malicious code from being executed client side, with additional controls available.
[screenshot and API example for three policies]

## Vendor-chaining using link-based isolation

Many vendors that may exist within your security framework that support URL manipulation can become an on-ramp for Browser Isolation to add additional security controls. For example, vendors like Zscaler and Proofpoint allow you to prepend links to URLs in a static or dynamic format; some customers have seen success by prepending the 'clientless isolation' link generated for your Cloudflare account to derive additional security benefits for potentially risky clicks. This will mean that if you have traffic not sent through Cloudflare today (IE, through another proxy), you can potentially prepend specific filtered requests with a link to automatically send the traffic to a Cloudflare isolated browser session without an endpoint agent installed.
[very quick arch diagram]
