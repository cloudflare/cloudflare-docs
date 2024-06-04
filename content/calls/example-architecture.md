---
pcx_content_type: get-started
title: Example architecture
weight: 10
---

# Example architecture for a video calling app

<div class="full-img">

![Example Architecture](/images/calls/video-calling-application.png)

</div>

1. Clients connect to the backend service
2. Backend service manages the relationship between the clients and the tracks they should subscribe to
3. Backend service contacts the Cloudflare Calls API to pass the SDP from the clients to establish the WebRTC connection and relays back the Calls API SDP reply and renegotiation messages.
4. Admin manages the rooms and room members.
5. If desired, functions like "breakout rooms" can be implemented in the backend service without disconnecting the WebRTC connection of the clients.
6. If desired, headless clients can be used to record the content from other clients or publish content.
