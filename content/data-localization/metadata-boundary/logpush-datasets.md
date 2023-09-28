---
pcx_content_type: concept
title: Logpush datasets supported
weight: 2
---

# Logpush datasets supported

The table below lists the [Logpush datasets](/logs/reference/log-fields/) that support zones or accounts with Customer Metadata Boundary (CMB) enabled. The column **Respects CMB** indicates whether enabling CMB impacts the dataset (yes/no). The last two columns inform you if CMB is available with US and EU.

Be aware that if you enable CMB for a dataset that does not support your region, no data will be pushed to your destination.

{{<table-wrap style="font-size: 87%">}}

| Dataset name | Level | Respects CMB | Available with US CMB region | Available with EU CMB region |
| --- | --- | --- | --- | --- |
| HTTP requests | Zone | ✅ | ✅ | ✅ |
| Firewall events | Zone | ✅ | ✅ | ✅ |
| DNS logs | Zone | ✅ | ✅ | ✘ |
| NEL reports | Zone | ✘ | ✅ | ✘ |
| Spectrum events | Zone | ✅ | ✅ | ✘ |
| Access Requests | Account | ✅ | ✅ | ✘ |
| Audit Logs | Account | ✘ | ✅ | ✘ |
| CASB Findings | Account | ✘ | ✅ | ✘ |
| Device Posture Results | Account | ✘ | ✅ | ✘ |
| DNS Firewall logs | Account | ✅ | ✅ | ✘ |
| Gateway DNS | Account | ✅ | ✅ | ✅ |
| Gateway HTTP | Account | ✅ | ✅ | ✅ |
| Gateway Network | Account | ✅ | ✅ | ✅ |
| Magic IDS Detections | Account | ✅ | ✅ | ✘ |
| Network Analytics Logs | Account | ✅ | ✅ | ✘ |
| Workers Trace Events | Account | ✅ | ✅ | ✘ |
| Zero Trust Sessions | Account | ✅ | ✅ | ✘ |

{{</table-wrap>}}