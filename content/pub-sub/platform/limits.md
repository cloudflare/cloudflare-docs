---
title: Limits
pcx_content_type: reference
weight: 2
---

# Limits

The table lists limits that apply to Pub/Sub brokers and clients during the beta release. 

{{<Aside>}}

These limits are subject to change and many will increase over time.

{{</Aside>}}

| Item                                             | Limit <img width=200/>| Notes |
|--------------------------------------------------|-------------|-----------------|
| Namespaces per Account                           | 1           | The maximum number of namespaces allowed on an account. <br/> Users may be able to create multiple namespaces in the future. |
| Brokers per Namespace                            | 3          | Can eventually be increased. |
| Subscribers per topic          | 1000            | The maximum number of subscribers per MQTT topic.
| Connections per Device                           | 1           | The number of simultaneous connections from a single client ID (or token). **More than one connection from the same client ID will result in existing clients receiving a DISCONNECT** using Reason Code 0x8e (Session Taken Over). |
| Maximum Packets per Second per Client	           | 10          | The number of MQTT packets per second a client can send to the broker. <br/> Clients that exceed this rate will receive a DISCONNECT with Reason Code 0x96 (Message rate too high).|
| Maximum Topic Length                             | 65k bytes	 | The maximum length of a topic, in bytes, including all slashes, prefixes, or wildcard symbols. |
| Maximum Topic Depth	                             | 8           |	The maximum number of forward slashes (`/`) allowed in a topic. |
| Maximum Message Size                             | 64KB        | Includes metadata such as client ID, additional metadata fields, and optional MQTT fields.|
| Maximum Client ID Length                         | 23 bytes    | The maximum length of an MQTT Client Identifier in bytes.<br/> Client IDs must also be at least 1 byte long per the MQTT standard. Shorter client IDs are rejected with a CONNACK using Reason Code 0x85 (Client Identifier not valid).|
| Maximum Username Length                         | 32 bytes    | The maximum length of the username in bytes. <br/> Usernames are optional, but if provided, must match the Client ID. <br/> Invalid usernames are rejected with CONNACK using Reason Code 0x86 (Bad Username or Password). |
| Maximum Password Length                          | 4,096 bytes | The maximum size of the UTF-8 encoded password, in bytes. <br/> Invalid passwords are rejected with CONNACK using Reason Code 0x86 (Bad Username or Password). |
| Connect Interval                                 | 10 seconds	 | Maximum interval that a client can wait between establishing TLS connection and send a CONNECT. <br/> Clients that take longer than this will be disconnected. |
| Minimum Keep Alive Interval	                     | 10 seconds  | Minimum time interval in which a client must send an MQTT control packet or a PINGREQ packet. <br/> Clients that take longer than this will be disconnected. |
| Maximum Session Expiry Interval	                 | 7 days      | Maximum time interval to retain a client's session state. Currently includes Subscriptions and Will messages. <br/> Note that 7 days is best effort, and in some cases, the session state may be shorter. |
| Maximum Number of Revoked Credentials per Broker | 10,000      |	The maximum number of credentials that can be revoked for a single broker. |

Storage and network units are in [SI units](https://physics.nist.gov/cuu/Units/binary.html).
