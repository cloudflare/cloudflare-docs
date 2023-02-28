---
title: Bot signals
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

After running requests through various [detection engines](/learning-paths/modules/security/bot-management-concepts/bot-detections/?learning_path=bot-management), Cloudflare surfaces these insights as part of Bot Management.

## Bot insights

### Bot score

{{<render file="_bot-score-definition.md" productFolder="bots" >}}

The following table groups these scores into general buckets.

{{<render file="_bot-groupings.md" productFolder="bots" >}}

### Bot tags

{{<render file="_bot-tags.md" productFolder="bots" >}}
<br/>

{{<render file="_bot-tags-values.md" productFolder="bots" >}}

### Detection IDs

{{<render file="_detection-ids" productFolder="bots" >}}
<br/>

### JA3 Fingerprint

{{<render file="_ja3-fingerprint.md" productFolder="bots" >}}

### Verified bots

{{<render file="_verified-bots.md" productFolder="bots" >}}

---

## Associated products

Cloudflare surfaces these bot signals in different products so you can take actions based on specific aspects of a request.

```mermaid
    flowchart LR
      accTitle: Bot request scoring
      accDescr: When requests reach Cloudflare, we add additional data points based on bot characteristics.
      A[Request] --> B
      B --> C
      B --> D
      B --> E
      subgraph Cloudflare
        B((Bot detection engines))
        C[Workers]
        D[Firewall]
        E[Logs]
      end
```
<br/>

### Firewall fields

{{<render file="_firewall-variables.md" productFolder="bots" >}}

### Workers fields

{{<render file="_workers-cf-request.md" productFolder="bots" >}}

### Log fields

{{<render file="_bot-log-fields.md" productFolder="bots" >}}