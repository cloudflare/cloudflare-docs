---
title: Cloud Connector
pcx_content_type: concept
weight: 8
---

{{<heading-pill style="beta">}}Cloud Connector{{</heading-pill>}}

Cloud Connector allows you to route matching incoming traffic from your website to a public cloud provider that you define such as AWS, Google Cloud, and Azure. With Cloud Connector you can make Cloudflare the control center for your web traffic, including traffic served from public cloud providers, without having to configure additional rules.

{{<Aside type="note">}}
We are gradually rolling out access to Cloud Connector throughout 2024. Refer to [Availability](#availability) for details. Support for Cloudflare R2 will be added soon.
{{</Aside>}}

## How it works

First, you configure a Cloud Connector rule that specifies:
- The cloud provider and a supported cloud service that will accept traffic.
- The traffic that will be routed to that cloud service.

Then, Cloudflare will create the [necessary configurations](#applied-configurations) so that the content is accessible for requests matching your Cloud Connector rule.

Cloud Connector rules are evaluated last in the request evaluation workflow. When there is a rule match and you have other rules changing the same settings, the Cloud Connector rule will win over other rules.

## Applied configurations

Cloud Connector will perform the following configurations automatically, depending on the cloud provider:
* Modify the `Host` header.
* Adjust SSL/TLS for bucket-related traffic (AWS S3 only).

## Availability

Cloud Connector is being rolled out gradually throughout 2024 to all customers. Once you have access, the Cloudflare dashboard will show a new **Cloud Connector** tab under **Rules** at the zone level. The maximum number of rules depends on your Cloudflare plan:

{{<feature-table id="rules.cloud_connector">}}
