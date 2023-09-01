---
title: Overview
type: overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare R2 
---

# Cloudflare R2

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

You can use R2 for multiple scenarios, including but not limited to:

- Storage for cloud-native applications
- Cloud storage for web content
- Storage for podcast episodes
- Data lakes (analytics and big data)
- Cloud storage output for large batch processes, such as machine learning model artifacts or data sets
  
{{<button-group>}}
{{<button type="primary" href="/r2/get-started/">}}Get started{{</button>}}
{{<button type="secondary" href="/r2/examples/">}}Browse the examples{{</button>}}
{{</button-group>}}

## Features

{{<feature header="Location Hints" href="/r2/buckets/data-location/#location-hints">}}

Location Hints are optional parameters you can provide during bucket creation to indicate the primary geographical location you expect data will be accessed from.

{{</feature>}}

{{<feature header="CORS" href="/r2/buckets/cors/">}}

Configure CORS to interact with objects in your bucket and configure policies on your bucket.

{{</feature>}}

{{<feature header="Public buckets" href="/r2/buckets/public-buckets/">}}

Public buckets expose the contents of your R2 bucket directly to the Internet. 

{{</feature>}}

{{<feature header="Bucket scoped tokens" href="/r2/api/s3/tokens/">}}

Create bucket scoped tokens for granular control over who can access your data.

{{</feature>}}

## Related products

{{<related header="Workers" href="/workers/" product="workers">}}

A [serverless](https://www.cloudflare.com/learning/serverless/what-is-serverless/) execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.
{{</related>}}

{{<related header="Stream" href="/stream/" product="stream">}}

Upload, store, encode, and deliver live and on-demand video with one API, without configuring or maintaining infrastructure.
{{</related>}}

{{<related header="Images" href="/images/" product="images">}}

A suite of products tailored to your image-processing needs.
{{</related>}}

## More resources

{{<resource-group>}}

{{<resource header="Pricing" href="/r2/pricing" icon="price">}} Understand pricing for free and paid tier rates. {{</resource>}}

{{<resource header="Discord" href="https://discord.gg/cloudflaredev" icon="logo-Discord">}} Ask questions, show off what you are building, and discuss the platform with other developers. {{</resource>}}

{{<resource header="Twitter" href="https://twitter.com/cloudflaredev" icon="twitter">}} Learn about product announcements, new tutorials, and what is new in Cloudflare Workers. {{</resource>}}

{{</resource-group>}}

