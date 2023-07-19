---
title: Delivery guarantees
pcx_content_type: overview
weight: 3
layout: list
---

# Delivery guarantees

Delivery guarantees or "delivery modes" define how strongly a messaging system enforces the delivery of messages it processes. Each mode comes with a number of trade-offs. As you make stronger guarantees about message delivery, the system needs to perform more checks and acknowledgments to ensure that messages are delivered, or maintain state to ensure a message is only delivered the specified number of times. This increases the latency of the system and reduces the overall throughput of the system. Each "real" message may require an additional 2-4 messages, and an equivalent number of additional roundtrips, before it can be considered delivered.

Pub/Sub is based on the MQTT protocol, which allows per-message flexibility around delivery guarantees or [Quality of Service](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901234) in MQTT terms. 


| Level | Default| Currently supported | Details | Best for |
|-------|--------|---------------------|---------|----------|
| At most once (QoS 0)| Yes | Yes | Often called "best-effort", where a message is published without any formal acknowledgement of receipt, and isn't replayed. <br/><br/> Has the least performance overhead as this mode does not generate additional acknowledgement packets for messages sent or delivered. <br/><br/> Depending on the reliability of the network or system (as a whole), some messages can be lost as subscribers are not required to acknowledge receipt.| Telemetry, metrics and event data, where data points are quickly superseded and/or where messages are sent at a high rate and you want to minimize resource utilization on the client. <br/><br/> QoS 0 offers the lowest latency (due to the lack of acknowledgement overhead) and thus highest per-client throughput.|
| At least once (QoS 1) | - | No | Typically implemented through a handshake or "acknowledgement" protocol, a message will be re-sent until it is formally acknowledged by a recipient. <br/><br/> A message can, depending on the behavior and configuration of the system, be re-sent and thus delivered more than once. Incurs a small overhead due to additional acknowledgement packets. <br> | Transaction processing, most forms of chat messaging, and remote command processing such as to IoT devices). <br/><br/> Subscribers can often handle duplicates at the persistency layer by ensuring each message carries a unique identifier or "idempotency key." Even if the message is received more than once, the database layer will reject the duplicate key. |
| Exactly once (QoS 2 | - | No | The hardest to achieve and incurs significant per-message overhead on both the client, server and network. <br/><br/> It requires not only a way to acknowledge delivery, but additional state on the sender and receiver to ensure that a message is only accepted once, and that duplicates are discarded.| Processing use-cases where subscribers must receive the message only once. Ideal when message rates are fairly low and where latency is not a primary concern. <br/><br/>This is typically very rare, and QoS 2 naturally increases latency and reduces throughput due to the additional acknowledgement packets. You should only use QoS 2 if your publishers, subscribers, or persistency layer cannot be changed to handle idempotent inserts.|


## Determine the right delivery mode

Each mode comes with a number of trade-offs. As you make stronger guarantees about message delivery, the system needs to perform more checks and acknowledgments to ensure that messages are delivered or maintain state to ensure a message is only delivered the specified number of times. This increases the latency of the system and reduces the overall throughput of the system. Each "real" message may require an additional 2-4 messages and an equivalent number of additional roundtrips, before it can be considered delivered.

MQTT specifies delivery guarantees at a per-message (PUBLISH) level, rather than at a per-broker or per-topic level as some other messaging systems do.

- This allows additional flexibility. General metrics and telemetry data that can afford a small percentage of "lost" messages can be sent with QoS level 0 (at most once), which is the default.
  - For example, the loss of 5-10 messages over 1000 sensor readings is unlikely to impact subsequent data analysis, especially if the payload is small and the data superseded quickly by a subsequent reading.
- In other cases, however, such as when delivering a chat message to another user, or publishing transaction data to a central system, the ability to set a higher QoS level — QoS level 1 corresponding to "at least once" and QoS level 2 to "exactly once" — means that only those messages incur the additional overhead.
For most use cases, QoS level 0 is ideal for high-volume telemetry or sensor data, where concrete acknowledgement of delivery is not required. For other cases, such as publishing transaction data, chat messages or user-facing notifications, QoS level 1 ("at least once") is recommended. 
