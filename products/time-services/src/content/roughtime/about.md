---
order: 0
---

# Roughtime Protocol

Endpoints on the Internet often synchronize their clocks using the Network Time
Protocol ([NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol)). NTP
provides precise synchronization, but is frequently deployed without a means of
authentication. This is due in part to weaknesses in the cryptographic
mechanisms used by the standard, but the added overhead also degrades precision
on high-load servers. (See [Dowling et al., USENIX
'16](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/dowling).)
As a result, a man-in-the-middle attacker can easily influence a victim’s clock.
By moving them back in time, the attacker can, for example, force a victim to
accept an expired (and possibly compromised) TLS certificate or session ticket.

For many applications, *precise* network time isn’t essential; to mitigate these
kinds of attacks, it suffices to be *accurate*, say, within 10 seconds of real
time. This observation is the primary motivation of Roughtime.

At its most basic level, Roughtime is a one-round protocol in which the client
requests the current time and the server sends a signed response. The response
is comprised of a timestamp (the number of microseconds since the Unix epoch)
and a *radius* (in microseconds) used to indicate the server’s uncertainty about
the reported time. For example, a radius of 1,000,000μs means the server is
reasonably sure that the true time is within one second of the reported time.

The server proves freshness of its response as follows. The request consists of
a short, random string called a *nonce*. which the server incorporates into its
signed response so that the nonce is needed to verify the signature. If the
nonce is sufficiently long (say, 16 bytes), then the number of possible nonces
is so large that it’s extremely unlikely the server has encountered (or will
ever encounter) a request with the same nonce. Thus, a valid signature serves as
cryptographic proof that the response is fresh.

A client can get Roughtime from just one server it trusts, or it may contact
many servers to make its calculation more robust. But the most distinctive
feature of Roughtime is that it adds *accountability* to time servers: if a
server misbehaves by providing inaccurate time, then the protocol allows clients
to produce publicly verifiable proof of this misbehavior. More on this on the
next page.
