---
_build:
  publishResources: false
  render: never
  list: never
---

### Heuristics

{{<render file="_bots-heuristics.md">}} 

The Heuristics engine immediately gives automated requests a score of one.

### Machine learning

{{<render file="_bots-ml.md">}}

The ML engine produces scores 2 through 99.

### Anomaly detection

{{<render file="_bots-ad.md">}}

### JavaScript detections

{{<render file="_bots-jsd.md">}}

JSD is enabled by default but completely optional. To adjust your settings, open the Bot Management Configuration page from **Firewall** > **Bots**.

### Notes on detection

{{<render file="_bots-cookie.md">}}
