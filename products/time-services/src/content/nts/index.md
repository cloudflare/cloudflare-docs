---
order: 2
---

# Network Time Security

Network Time Security (NTS) provides cryptographic security for the client-server mode of the Network Time Protocol (NTP). This enables users to obtain time in an authenticated manner.

The NTS protocol is divided into two-phases. The first phase is the NTS key exchange that establishes the necessary key material between the NTP client and the server. This phase uses the Transport Layer Security (TLS) handshake and relies on the same public key infrastructure as the web. Once the keys are exchanged, the TLS channel is closed and the protocol enters the second phase. In this phase the results of that TLS handshake are used to authenticate NTP time synchronization packets via extension fields. For more information, read [RFC 8915](https://tools.ietf.org/html/rfc8915).
