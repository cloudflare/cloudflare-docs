---
pcx_content_type: how-to
title: WebSocket traffic
weight: 9
---

# Filter WebSocket traffic

Gateway does not inspect or log [WebSocket](https://datatracker.ietf.org/doc/html/rfc6455) traffic. Instead, Gateway will only log the HTTP details used to make the WebSocket connection, as well as [network session information](/logs/reference/log-fields/account/zero_trust_network_sessions/). To filter your WebSocket traffic, create a policy with the `101` HTTP response code.

| Selector      | Operator | Value                   | Action |
| ------------- | -------- | ----------------------- | ------ |
| HTTP Response | is       | 101 SWITCHING_PROTOCOLS | Allow  |
