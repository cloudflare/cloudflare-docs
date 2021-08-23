---
order:
pcx-content-type: reference
---

# Event logs

Spectrum logs the entire lifecycle of every client that connects through it. These event logs are available through Logpush as a separate category (dataset type `spectrum_events`); they are not part of HTTP log events.

For each connection, Spectrum logs a connect event and either a disconnect or error event. Details on status codes can be found below.

### Configuring Logpush

Spectrum [log events](https://developers.cloudflare.com/logs/log-fields/) can be configured through the [dashboard](https://developers.cloudflare.com/logs/logpush/logpush-dashboard/) and [API](https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/).

### Status Codes

<TableWrap>

| Code | Description |
| --- | -------- |
| 0	    | Connection was opened successfully. |
| 200   | Normal connection closure. |
| 400   | The TLS client hello sent during the client/edge TLS handshake contained an invalid SNI. |
| 403	| Connection closed because the client IP matched a firewall rule with deny action. |
| 443	| The client TLS handshake failed. |
| 444	| The origin closed the connection by sending a reset (RST) packet. Not all data may have been sent. |
| 445	| A timeout event (ETIMEDOUT) occurred on an established connection to origin.  |
| 446	| Origin keepalive expired (EHOSTUNREACH). |
| 447	| Error while reading from or writing to an established origin connection (ECONNREFUSED). |
| 448	| Origin connection closed due to a broken pipe (EPIPE). |
| 490	| Client TLS error on established connection. |
| 496	| Client host is unreachable (EHOSTUNREACH). |
| 497	| A timeout event (ETIMEDOUT) occurred on an established connection to client. |
| 498	| Established client connection closed due to broken pipe (EPIPE). |
| 499	| The client closed the connection by sending a reset (RST) packet. Not all data may have been sent. |
| 500	| Internal Cloudflare error. |
| 503	| Error related to performing the TLS handshake with keyless SSL. |
| 520	| Unknown origin connection error. |
| 521	| Origin refused to open the connection (ECONNREFUSED). |
| 522	| Opening a connection to origin failed: ETIMEDOUT |
| 523	| Opening a connection to origin failed: ENETUNREACH |
| 524	| Opening a connection to origin failed due to an internal system error. |
| 530	| Internal error while resolving origin to an IP. |
| 531	| Could not resolve origin to an IP. |
| 532	| The origin connection was not opened because the origin IP is blacklisted. |
| 533	| Internal error while resolving origin to an IP. |
| 540	| The client/edge TLS handshake failed due to an invalid configuration. |
| 999	| Unknown connection error. |

</TableWrap>
