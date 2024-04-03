---
pcx_content_type: get-started
title: Connection API
weight: 5
---

# Connection API over HTTPS

Cloudflare Calls simplifies the management of peer connections and media tracks through HTTPS API endpoints. These endpoints allow developers to efficiently manage sessions, add or remove tracks, and gather session information.

## API Endpoints

- **Create a New Session**: Initiates a new session on the Cloudflare Calls WebRTC server, establishing a PeerConnection on the client side.
  - `POST /apps/{appId}/sessions/new`
- **Add a New Track**: Adds a media track (audio or video) to an existing session.
  - `POST /apps/{appId}/sessions/{sessionId}/tracks/new`
- **Renegotiate a Session**: Updates the session's negotiation state to accommodate new tracks or changes in the existing ones.
  - `PUT /apps/{appId}/sessions/{sessionId}/renegotiate`
- **Close a Track**: Removes a specified track from the session.
  - `PUT /apps/{appId}/sessions/{sessionId}/tracks/close`
- **Retrieve Session Information**: Fetches detailed information about a specific session.
  - `GET /apps/{appId}/sessions/{sessionId}`

[View full API and schema (OpenAPI format)](https://gist.githubusercontent.com/renandincer/dd6e913a8c824d718e9eeb2e2ed0b783/raw/11e24edac2b0d8e1783f340793673cd576ac417c/Calls%2520API%2520v1)

## Handling Secrets

It is vital to manage App ID and it's secret securely. While track and session IDs can be public, they should be protected to prevent misuse. An attacker could exploit these IDs to disrupt service if your backend server does not authenticate request origins properly, for example by sending requests to close tracks on sessions other than their own. Ensuring the security and authenticity of requests to your backend server is crucial for maintaining the integrity of your application.

## Using STUN and TURN Servers

Cloudflare Calls is designed to operate efficiently without the need for TURN servers in most scenarios, as Cloudflare exposes a publicly routable IP address for Calls. However, integrating a STUN server can be necessary for facilitating peer discovery and connectivity.

- **Cloudflare STUN Server**: `stun.cloudflare.com:3478`

Utilizing Cloudflare's STUN server can help the connection process for Calls applications.

## Lifecycle of a Simple Session

This section provides an overview of the typical lifecycle of a simple session, focusing on audio-only applications. It illustrates how clients are notified by the backend server as new remote clients join or leave, incorporating video would introduce additional tracks and considerations into the session.

<div class="full-img">

![Example Lifecycle](/images/calls/calls-timeline.png)

</div>
