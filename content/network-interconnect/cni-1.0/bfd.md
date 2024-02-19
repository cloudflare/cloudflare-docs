---
pcx_content_type: concept
title: Bidirectional Forwarding Detection
---

# Bidirectional Forwarding Detection

Bidirectional Forwarding Detection (BFD) is a networking protocol that constantly monitors links and BGP sessions down to the second by sending a constant stream of traffic across the session.

If a small number of packets does not make it to the other side of the session, the session is considered down. This solution is useful for users who cannot tolerate any amount of packet loss during a session.

Bidirectional Forwarding Detection is only supported for users with private network interconnects (PNI). To begin using BFD, contact your account manager.
