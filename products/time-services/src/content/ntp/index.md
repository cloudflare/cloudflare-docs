---
order: 1
---

# Network Time Protocol

[Network Time Protocol](https://tools.ietf.org/html/rfc1305) (NTP) is an Internet protocol designed to synchronize time between computer systems communicating over unreliable and variable-latency network paths.

 NTP works by having a client send a query packet out to an NTP server that then responds with its clock time. The client then computes an estimate of the difference between its clock and the remote clock and attempts to compensate for network delay in this. NTP client queries multiple servers and implements algorithms to select the best estimate, and rejects clearly wrong answers.

NTP works by having a client send a query packet out to an NTP server that then responds with its clock time. The client then computes an estimate of the difference between its clock and the remote clock and attempts to compensate for network delay in this. NTP client queries multiple servers and implements algorithms to select the best estimate, and rejects clearly wrong answers.
