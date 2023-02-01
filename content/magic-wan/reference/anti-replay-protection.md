---
pcx_content_type: concept
title: Anti-replay protection
---

# Anti-replay protection

If you use Magic WAN and Anycast IPsec tunnels, you will need to disable anti-replay protection. Review the information below to learn about replay attacks, why IPsec anti-replay must be disabled, and related considerations.

## Replay attacks

Replay attacks occur when a malicious actor intercepts and records a packet, and later sends the recorded packet to the target network again with an intent that benefits the attacker.

### Example

For example, consider a poorly designed IOT garage door opener. The device has a simple protocol for operation: A UDP packet contains the garage door password and either `open` or `shut` in its data segment. The data segment is then encrypted with the garage door's key and sent from the owner’s phone to either open or close the garage door. 

An attacker likely cannot open or close the garage door by guessing the encryption key and password. While the attacker cannot see the recorded packet’s encrypted content, if the garage is in their line-of-sight, they could potentially correlate and guess which packets are responsible for opening the garage door. When the attacker wants to open the door, they send the recorded `open` packet, and because the recorded packet would contain the password and already be encrypted with the right key, this door would open.

To prevent this replay attack, a user could add a packet number to each command sent to the garage door. The first could be `packet 1`, the second `packet 2` and so on, and the garage door would only accept packets containing the next number in the sequence each time. For example, after the garage door receives `packet 1,` it would only accept packet 2, and if an attacker tries to replay `packet 1`, the request is ignored.

## IPsec anti-replay protection

IPsec anti-replay protection works similarly to the prevention example in the scenario above. Each IPsec packet sent is assigned a sequence number by the sender. The receiver tracks which sequence numbers it has already seen and only accepts packets in a small window around the highest value the receiver has seen, and the window is typically 64-1024 packets. A window is used instead of strict sequencing because sometimes packets are reordered or lost on the Internet - having a range of acceptable packet sequence numbers helps absorb these issues.

## Magic WAN and anti-replay protection

Cloudflare's global Anycast network consists of thousands of servers in hundreds of data centers around the world. Similar to Cloudflare’s Anycast GRE tunnel implementation, Cloudflare’s IPsec implementation is also Anycast, which enables users to enjoy all the benefits of Cloudflare's Anycast network architecture. These benefits include unparalleled performance and low latency, greatly simplified configuration and management, and native network resiliency with automatic failover. Any packet for Magic WAN may go through any one of these servers where it will be encrypted and encapsulated with IPsec and sent to our user's router.

IPsec anti-replay protection was not designed for such a distributed scenario — the protection scheme is designed for a single sender and single receiver. For a single sender, keeping track of the sequence number is trivial, and the sequence number is stored in memory and incremented for every packet sent. For two or more senders though, the scenario becomes much, much more complex — each time a packet is sent by one sender, the rest must be updated with the new value. Keeping the thousands of possible senders in sync across continents introduces unacceptable delay and throughput problems and is generally intractable.

## Additional considerations

IPsec anti-replay protection is extremely important for transport mode —  host-to-host or even app-to-app IPsec. In transport mode, an attacker has a relatively easy time identifying the encrypted protocol and identifying which packets to replay if the protocol is even subject to replay attacks. Magic WAN, however, uses tunnel mode, which is inherently much harder to successfully replay attack.

There are several reasons that make replay attacks difficult with tunnel mode:

- **The entire inner packet is encrypted,** which means the attacker would know almost nothing about the user packet they capture and perform correlation for replay attack. The only information an attacker would know is the outer site network that encrypted the packet, the outer site network that receives it, and the approximate size of the packet. However, this information is not enough to identify specific inner user packet flows to correlate and replay. 
- **Replay attacks are only viable when the same encryption keys are used.** After rekeying, old, replayed packets will result in dropped packets at the router.
- **Most protocols are not susceptible to replay at the packet level.** The Internet can duplicate packets, which means TCP and many protocols built on UDP already include sequence numbers or similar to handle duplicate packets coming off the wire. For those, the replay traffic just looks like a duplicate packet and is handled by the end host correctly.
- **Anti-replay protection is available in a higher OSI layer.** Many modern day applications use secure communication protocols such as SSL/TLS, SSH, SFTP, etc. to transport application data. These secure communication protocols (at a higher OSI layer than network layer) natively support anti-replay protection.
- **The “attack surface” is reduced which lowers the probability for packet interception.** IPsec tunnels are site-to-site VPN tunnels between a user’s site router and Cloudflare’s global network, via dedicated ISP network connections, which are typically very secure. Additionally, the Anycast nature of Cloudflare’s IPsec implementation terminates the IPsec tunnel to one of the 300+ Cloudflare data centers closest to the customer’s edge router, which minimizes the physical distance and footprint the encrypted packets have to traverse.
