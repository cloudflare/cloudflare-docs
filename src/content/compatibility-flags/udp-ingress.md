---
name: "UDP ingress"
sort_date: "2026-11-26"
enable_date: "2026-11-26"
enable_flag: "udp_ingress"
disable_flag: "no_udp_ingress"
---

This flag lets your Worker receive User Datagram Protocol (UDP) flows in its [`connect()` handler](/workers/runtime-apis/handlers/connect/#udp-flows). To receive public UDP traffic, [configure a Spectrum UDP application with your Worker as its origin](/spectrum/how-to/route-udp-traffic-to-a-worker/). The flag alone does not create a public UDP endpoint.

If your Worker uses an earlier [compatibility date](/workers/configuration/compatibility-dates/), add `udp_ingress` to opt in. UDP ingress does not require the `experimental` flag when `udp_ingress` is enabled.
