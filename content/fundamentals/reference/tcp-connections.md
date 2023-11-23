---
pcx_content_type: reference
title: TCP connections
---

# TCP connections

The following sections explain how Cloudflare directs traffic efficiently with Anycast routing and serves as an intermediary between users and origin servers. The second part covers TCP connections and keepalives for performance optimization, and lastly, TCP Fast Open (TFO), a protocol extension that enhances the speed of TCP connections.

## How Cloudflare connects user to origin

Users connect to Cloudflare by sending requests from their devices to Cloudflare's global network. Cloudflare connects to the origin server by acting as an intermediary between the user and the origin.

```mermaid
flowchart LR
accTitle: Connections with Cloudflare
A[Visitor] <-- Connection --> B[Cloudflare global network] <-- Connection --> C[Origin server]
```
<br/>

User traffic is routed to the nearest Cloudflare data center based on the shortest [Border Gateway Protocol](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) (BGP) path, thanks to [Anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) routing. Cloudflare then processes the request. In case a request is not served from Cloudflare’s data center, Cloudflare will open a connection to the origin server to forward the request.

## TCP connections and keepalives

HTTP (Hypertext Transfer Protocol) is a [Layer 7](https://en.wikipedia.org/wiki/OSI_model) application protocol that operates over TCP. By default, HTTP opens a new TCP connection for each request-response cycle, which can lead to performance overhead due to the repeated connection establishment and teardown. 

Keepalives are a mechanism that bridges TCP and HTTP and allow a single TCP connection to remain open for multiple HTTP requests and responses. This minimizes the connection overhead and latency associated with establishing new TCP connections for each web resource. Keepalives improve the efficiency and responsiveness of web applications by facilitating the reuse of existing connections, reducing network traffic, and enhancing user experience. 

TCP connections can persist even after HTTP requests have concluded. However, to manage resources efficiently, idle connections are typically terminated after a certain period of inactivity. To enhance connection reuse and minimize connection overhead, keepalives are employed. These mechanisms collectively optimize the performance and reliability of web applications while conserving network resources.

If either a user or an origin does not respond to two keepalives, Cloudflare will sever the connection by sending a TCP Reset (RST) packet.

For connections to users, Cloudflare has a default idle timeout of 300 seconds. After the 300 seconds, Cloudflare will start sending keepalive probes every 75 seconds. If nine consecutive probes are unanswered, Cloudflare will sever the connection by sending an RST packet.

{{<Aside type="note">}}

Be aware that even if there are keepalives, Cloudflare cannot guarantee to keep a connection, since besides idleness, there are other reasons, like capacity balancing, data center maintenance or node restarts that can cause disconnections. Having this in mind, applications should be structured to handle disconnections gracefully.  

{{</Aside>}}

TCP connection settings between the user and Cloudflare and between Cloudflare and Origin can be customized for Enterprise customers. Reach out to your account team for more details.

## TCP Fast Open (TFO)

[TCP Fast Open](https://en.wikipedia.org/wiki/TCP_Fast_Open) (TFO) is a protocol extension that can significantly improve the speed of establishing TCP connections by allowing data to be sent in the initial SYN packet, rather than requiring a separate handshake before data transmission begins. TFO can reduce latency and improve website and application performance, particularly on high-latency networks. Cloudflare supports TFO on user and Origin connections.

When a client initiates a connection to a web server protected by Cloudflare, it sends a TCP SYN packet to request a connection. Cloudflare, acting as a reverse proxy, intercepts the SYN packet and responds with a SYN-ACK packet to establish the connection. With TFO enabled, Cloudflare can also send initial data (such as HTTP request data) in the SYN-ACK packet, eliminating the need for an additional round-trip for data transmission. The client receives the SYN-ACK packet with data and acknowledges it with an ACK packet. This fast tracks the connection setup.
