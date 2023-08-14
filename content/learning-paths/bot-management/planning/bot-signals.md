---
title: Bot signals
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

As discussed previously, all requests to Cloudflare's network pass through our [bot detection engines](/learning-paths/bot-management/concepts/bot-detections/).

Cloudflare uses this information to surface different signals to help you identify the true origin of a request.

## Bot score

{{<render file="_bot-score-definition.md" productFolder="bots" >}}

The following table groups these scores into general buckets.

{{<render file="_bot-groupings.md" productFolder="bots" >}}

## Bot tags

{{<render file="_bot-tags.md" productFolder="bots" >}}
<br/>

{{<render file="_bot-tags-values.md" productFolder="bots" >}}

## Detection IDs

{{<render file="_detection-ids" productFolder="bots" >}}
<br/>

## JA3 Fingerprint

{{<render file="_ja3-fingerprint.md" productFolder="bots" >}}

## Verified bots

{{<render file="_verified-bots.md" productFolder="bots" >}}