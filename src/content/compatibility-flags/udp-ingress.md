---
name: "UDP ingress"
sort_date: "2026-11-26"
enable_date: "2026-11-26"
enable_flag: "udp_ingress"
disable_flag: "no_udp_ingress"
---

This flag lets your Worker receive User Datagram Protocol (UDP) flows in its `connect()` handler. Use `socket.protocol` to distinguish UDP sockets (`"udp"`) from TCP sockets (`"tcp"`).

Each chunk on a UDP socket is one `Datagram`. Read its bytes with `datagram.data`, or wrap a `Uint8Array` with `new Datagram(bytes)` to send it.

If your Worker uses `experimental` for UDP ingress on an earlier compatibility date, add `udp_ingress` to keep receiving flows.
