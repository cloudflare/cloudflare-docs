---
title: MQTT compatibility
pcx_content_type: reference
weight: 3
---

# MQTT compatibility

{{<Aside type="note">}}

Pub/Sub will continue to expand support for MQTT protocol features during the beta period. The documentation will be updated to reflect the expanded features, so check these docs periodically.

{{</Aside>}}

Pub/Sub supports the core parts of the [MQTT v5.0 specification](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html), and any MQTT v5.0 compatible client should be able to connect to a Pub/Sub Broker.

MQTT is one of the most pervasive “messaging protocols” deployed today. There are tens of millions (at least!) of devices that speak MQTT today, from connected payment terminals through to autonomous vehicles, cell phones, and even video games. Sensor readings, telemetry, financial transactions or mobile notifications and messages are all common use cases for MQTT, and the flexibility of the protocol allows developers to make trade-offs around reliability, topic hierarchy, and persistence specific to their use case.

{{<Aside>}}

In many cases, the MQTT specification mandates that a client is explicitly disconnected when attempting to use features not supported by a broker. Ensure that your client only uses supported features to avoid disconnection loops that prevent a client from sending messages to a broker.

{{</Aside>}}

Pub/Sub supports the following MQTT protocol features.

| Protocol feature                      | Supported         | Details |
|---------------------------------------|-------------------|---------|
| User Name & Password Authentication	  | Yes               | Pub/Sub uses signed JSON Web Tokens in place of passwords for authenticating clients. <br/> For more information on how authentication works, refer to [Authentication and Authorization](/pub-sub/platform/authentication-authorization).|
| Mutual TLS (TLS Client Credentials)	  | Not yet supported |	None yet |
|Enhanced Authentication | Not supported| Commonly used to support Kerberos. |
|Delivery: At Most Once (QoS 0)	        | Yes (default)     | This is the default QoS level in MQTT and relies on the underlying TCP connection and system for basic delivery guarantees and network-level re-transmissions. |
| Delivery: At Least Once (QoS 1)	      | Not yet supported |	The broker will return a DISCONNECT with Reason Code 0x9B (QoS not supported) if a client attempts to send a message with an unsupported Quality of Service mode.|
Delivery: Exactly Once (QoS 2)          | Not yet supported     | The broker will return a DISCONNECT with Reason Code 0x9B (QoS not supported) if a client attempts to send a message with an unsupported Quality of Service mode. |
| Retain                                | Not yet supported | The Broker will return a DISCONNECT Reason Code of 0x9A (Retain not supported) if a client attempts to send a message with the Retain bit set to any value other than zero (0). |
| Will Messages                         |	Not yet supported | Will messages (sometimes called "Last Will" messages) are not currently supported and will be ignored by a broker. |
| Receive Maximum	                      | Not yet supported	| Only applies to QoS 1 and QoS 2 messages, which are not currently supported. |
| Single-level Wildcard (`+` character)	| Not yet supported	| The broker will return a DISCONNECT Reason Code of 0x90 (Topic Name invalid) if a client attempts to subscribe to a Topic with a wildcard (`+` or `#` character).  |
| Multi-level Wildcard (`#` character)  | Not yet supported | The broker will return a DISCONNECT Reason Code of 0x90 (Topic Name invalid) if a client attempts to subscribe to a topic with a wildcard (`+` or `#` character).|  
| Shared Subscriptions                  | Not yet supported | Clients that attempt to SUBSCRIBE to a Shared Subscription, which are prefixed with a literal `$share/` string, the server will return a DISCONNECT with Reason Code 0x9E (Shared Subscriptions not supported). |
| Subscription Identifiers              | Not yet supported | Clients that send a SUBSCRIBE packet with a Subscription Identifier will receive a DISCONNECT with Reason Code of 0xA1 (Subscription Identifiers not supported). |
| User Properties                       | Not yet supported | [User Properties](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc464547991) included in a PUBLISH packet will not be forwarded to subscribers. |

## Permissions and IAM

During the beta period, users need the **Super Administrator** or **Administrator** permission to create, modify, or delete namespaces or brokers associated with an account.

In the future, Pub/Sub will have brokers-specific IAM permissions for:

- **Admin** - Create, edit, and delete namespaces; create, edit, and delete brokers
- **User** - Create, edit, and delete brokers (only); view namespaces but cannot create or delete namespaces
- **Viewer** - View brokers. Can view config but cannot issue new credentials or modify config

Longer term, Pub/Sub will allow users to scope those permissions per namespace to better support isolated environments and distributed teams.
