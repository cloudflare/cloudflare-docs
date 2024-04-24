---
title: Mitigation reasons
pcx_content_type: reference
weight: 10
meta:
  title: Advanced TCP Protection mitigation reasons
---

# Mitigation reasons

The Advanced TCP Protection system applies mitigation actions for different reasons based on the connection states. The **Mitigation reason** field shown in the **Advanced TCP Protection** tab of the [Network Analytics](/analytics/network-analytics/) dashboard will contain more information on why a given packet was dropped by the system.

The connection states are the following:

* **New**: A SYN or SYN-ACK packet has been sent to attempt to open a new connection.
* **Open**: The three-way TCP handshake has been completed and the TCP connection is open.
* **Closing**: A FIN or FIN-ACK packet has been seen attempting to close a connection.
* **Closed**: The closing three-way handshake has been completed, or an RST packet has closed the connection.

The mitigation reasons are the following:

* **UNEXPECTED**: Packet dropped because it was not expected given the current state of the TCP connection it was associated with.
* **CHALLENGE_NEEDED**: Packet challenged because the system determined that the packet is most likely part of a packet flood.
* **CHALLENGE_PASSED**: Packet dropped because it belongs to a solved challenge.
* **NOT_FOUND**: Packet dropped because it is not part of an existing TCP connection and it is not establishing a new connection.
* **OUT_OF_SEQUENCE**: Packet dropped because its properties (for example, TCP flags or sequence numbers) do not match the expected values for the existing connection.
* **ALREADY_CLOSED**: Packet dropped because it belongs to a connection that is already closed.

Mitigation will only occur based on your Advanced TCP Protection configuration (rule sensitivities, configured allowlists and prefixes). The protection system will provide some tolerance to out-of-state packets to accommodate for the natural randomness of Internet routing.
