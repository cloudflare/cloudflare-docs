---
title: Use DLP (Data Loss Prevention) inspection
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

In order to use Data Loss Prevention tools within the Cloudflare Zero Trust platform, you need to first define your objects. DLP Profiles are complex objects with dictionaries, pre-built detections, and custom logic that you reference as selectors within your Gateway policies.
[docs broken into module steps for creating a dlp profile]

## Best practices: building ideal data loss prevention security measures with minimal overhead

For many Cloudflare customers, Cloudflare Zero Trust is sometimes the first or an early measure in tackling the multi-faceted challenge that is preventing the loss of sensitive data within your organization. For others, it may be the first inline measure, or part of a complex orchestration of a defense-in-depth strategy. No matter which journey you most resemble, developing effective and appropriate data loss prevention policies and practices starts with first-principles definitions.

What defines the sensitive data that you are interested in monitoring or protecting?
If it is a pattern of data that can take many different forms and contexts, consider building a custom profile using one or multiple regular (regex) expressions. Cloudflare uses Wirefilter regex, so ensure this accounted for when writing expressions or using regular expression builders or generative AI.

Here's an example of using a custom expression to detect [a good example]. This will look for…
[screenshot and matching api call]

If it is a pre-defined, distinct dataset, you can build a profile by uploading a database to use in an Exact Data Match or Custom Wordlist function within DLP profiles. Exact Data Match is ideal for maintaining a highly sensitive dataset, such as a PII list, while Custom Wordlists are preferable for managing a list of keywords. As this dataset changes and grows, we recommend building a pipeline to update the data source using our API endpoint. As an example, that kind of pipeline may look like this:
[example API call or workflow action]
If it is data that is already tagged with Microsoft Information Protection (MIP) labeling schema, you don't need to reinvent the wheel to detect those values in-transit on Cloudflare. Simply build a M365 CASB integration [link], and we'll automatically pull in your existing MIP definitions into the Cloudflare dashboard, which can then be used to build DLP profiles, and put to use in any Gateway HTTP policies.
If your organization is most concerned about general data patterns that fit existing classifications such as PII, PHI, financial information, or source code, we recommend using our existing detection libraries. To help this better match the needs of your organization, you can build a complex profile that both checks for the presence of data matching an existing library, while also looking for data that matches a custom string detection or data from a database. Here's an example of that type of policy:
[screenshot and api call]

## Best practices: building functional DLP policies in Gateway

The best way to begin applying data loss prevention inspection to your traffic and to minimize the chance of false positives and begin collecting actionable data is to start with the "known knowns" within your sensitive data policies. This means that rather than building policies to detect sensitive data like SSNs or financial information across all of your traffic to start, you should start by building policies that target both sensitive data types and destinations that are known data sources or points of high risk, inside or external to your organization.

For example, this might look for most organizations like an interest in detecting financial information egressing from user devices to a series of critical SaaS applications. To limit the risk of false positives, and to filter out logging 'noise' in the system, we'd recommend building your first series of policies to specify both target data and target destination.
[api and example docs]

Once you've analyzed the flow and magnitude of data from the known sources, you can begin focusing on more specialized or explicit datasets for more generalized sources. This might look like inspecting for multiple matching data loss deterministic attributes to all external sources (potentially excepting those that are known internal locations where sensitive data is intentionally transferred).

After developing a level of confidence from reviewing the logs and evaluating a rate of false positives for both types of policies, you can feel more confident in experimenting more broadly with data loss prevention policies.
