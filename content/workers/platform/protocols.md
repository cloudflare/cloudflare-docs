---
pcx_content_type: concept
title: Protocols
---

# Protocols

Cloudflare Workers support the following protocols and protocol interfaces:

| Protocol  | Inbound | Outbound |
|---|---|---|
| **HTTP / HTTPS**  | Handle incoming HTTP requests using the [`fetch()` handler](workers/runtime-apis/fetch-event/#syntax-module-worker/)  | Make HTTP subrequests using the [`fetch()` API](/workers/runtime-apis/fetch/)  |
| **Direct TCP sockets**  | Support for handling inbound TCP connections is [coming soon](https://blog.cloudflare.com/introducing-socket-workers/)  | Create outbound TCP connections using the [`connect()` API](/workers/runtime-apis/tcp-sockets/) |
| **WebSockets**  | Accept incoming WebSocket connections using the [`WebSocket` API](/workers/runtime-apis/websockets/), or with [MQTT over WebSockets (Pub/Sub)](/pub-sub/learning/websockets-browsers/)  | [MQTT over WebSockets (Pub/Sub)](/pub-sub/learning/websockets-browsers/) |
| **MQTT** | Handle incoming messages to an MQTT broker with [Pub Sub](/pub-sub/learning/integrate-workers/) | Support for publishing MQTT messages to an MQTT topic is [coming soon](/pub-sub/learning/integrate-workers/) |


### Using Workers to process and forward emails

Instead of interacting directly via SMTP email servers, you can use [Email Workers](/email-routing/email-workers/), which provides a simple set of APIs to process and forward email.