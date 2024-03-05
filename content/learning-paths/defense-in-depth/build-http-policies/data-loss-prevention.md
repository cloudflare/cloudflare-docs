---
title: Use Data Loss Prevention (DLP) inspection
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

In order to use Data Loss Prevention (DLP) tools within Cloudflare Zero Trust, you first need to define your DLP profiles. [DLP profiles](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/) are complex objects with dictionaries, pre-built detections, and custom logic that you can reference as selectors within your Gateway policies.

## Configure a DLP profile

You may either use DLP profiles predefined by Cloudflare, or create your own custom profiles based on regex, predefined detection entries, and DLP datasets.

### Configure a predefined profile

{{<render file="data-loss-prevention/_predefined-profile.md" productFolder="cloudflare-one">}}

### Build a custom profile

{{<render file="data-loss-prevention/_custom-profile.md" productFolder="cloudflare-one">}}

## Best practices to build DLP security measures

For many Cloudflare users, Cloudflare Zero Trust is often one of the only measures in tackling preventing the loss of sensitive data. For other users, Zero Trust may be the one of the early in-line measures of a complex orchestration of a defense-in-depth strategy. No matter which journey you most resemble, developing effective and appropriate DLP policies and practices starts with first-principles definitions.

### Define your sensitive data

#### Various data forms

If your data patterns take many different forms and contexts, consider building a custom profile using one or multiple regular expressions (regex).

{{<Aside type="note" header="Rust regular expressions">}}
Cloudflare implements regular expressions with Rust. Make sure you account for this difference when writing expressions or using regular expression builders and generative AI.

To validate your regex, use [Rustexp](https://rustexp.lpil.uk/).
{{</Aside>}}

Here's an example of using a custom expression to detect [a good example]. This will look for…
[screenshot and matching api call]

#### Predefined datasets

If your data is a distinct [predefined dataset](/cloudflare-one/policies/data-loss-prevention/datasets/), you can build a profile by uploading a database to use in an Exact Data Match or Custom Wordlist function. Exact Data Match and Custom Wordlist feature some key differences:

|                     | Exact Data Match                                        | Custom Wordlist                                                    |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| **Encryption**      | Hashed and compared to encrypted traffic                | Stored as plaintext                                                |
| **Payload logging** | Matches redacted in logs                                | Matches appear in logs                                             |
| **Usage**           | PII (such as names, addresses, and credit card numbers) | Non-sensitive data (such as intellectual property and SKU numbers) |

We recommend using Exact Data Match for highly sensitive datasets and Custom Wordlists for lists of keywords.

As your datasets change and grow, we recommend building a pipeline to update the data source using our API endpoint. For example:

[example API call or workflow action]

#### Microsoft Information Protection (MIP) labels

If your data already contains Microsoft Information Protection (MIP) labeling schema, Cloudflare can detect those values in-transit automatically. Simply build a M365 CASB integration [link], and we'll automatically pull in your existing MIP definitions into the Cloudflare dashboard, which can then be used to build DLP profiles, and put to use in any Gateway HTTP policies.

#### Existing detection libraries

If your organization is most concerned about general data patterns that fit existing classifications such as PII, PHI, financial information, or source code, we recommend using our existing detection libraries. To help this better match the needs of your organization, you can build a complex profile that both checks for the presence of data matching an existing library, while also looking for data that matches a custom string detection or data from a database. Here's an example of that type of policy:
[screenshot and api call]

## Build functional Gateway DLP policies

The best way to begin applying data loss prevention inspection to your traffic and to minimize the chance of false positives and begin collecting actionable data is to start with the "known knowns" within your sensitive data policies. This means that rather than building policies to detect sensitive data like SSNs or financial information across all of your traffic to start, you should start by building policies that target both sensitive data types and destinations that are known data sources or points of high risk, inside or external to your organization.

For example, this might look for most organizations like an interest in detecting financial information egressing from user devices to a series of critical SaaS applications. To limit the risk of false positives, and to filter out logging 'noise' in the system, we'd recommend building your first series of policies to specify both target data and target destination.
[api and example docs]

Once you've analyzed the flow and magnitude of data from the known sources, you can begin focusing on more specialized or explicit datasets for more generalized sources. This might look like inspecting for multiple matching data loss deterministic attributes to all external sources (potentially excepting those that are known internal locations where sensitive data is intentionally transferred).

After developing a level of confidence from reviewing the logs and evaluating a rate of false positives for both types of policies, you can feel more confident in experimenting more broadly with data loss prevention policies.
