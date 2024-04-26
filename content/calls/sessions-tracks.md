---
pcx_content_type: get-started
title: Sessions and Tracks
weight: 3
---

# Understanding Sessions and Tracks

Cloudflare Calls offers a simple yet powerful framework for building real-time experiences. At the core of this system are three key concepts: **Applications**,  **Sessions** and **Tracks**. Familiarizing yourself with these concepts is crucial for using Calls.

## Application
A Calls Application is an environment within different Sessions and Tracks can interact. Examples of this could be production, staging or different environments where you'd want separation between Sessions and Tracks. Cloudflare Calls usage can be queried at Application, Session or Track level.


## Sessions

A **Session** in Cloudflare Calls correlates directly to a WebRTC PeerConnection. It represents the establishment of a communication channel between a client and the nearest Cloudflare data center, as determined by Cloudflare's anycast routing. Typically, a client will maintain a single Session, encompassing all communications between the client and Cloudflare. 

- **One-to-One Mapping with PeerConnection**: Each Session is a direct representation of a WebRTC PeerConnection, facilitating real-time media data transfer.
- **Anycast Routing**: The client connects to the closest Cloudflare data center, optimizing latency and performance.
- **Unified Communication Channel**: A single Session can handle all types of communication between a client and Cloudflare, ensuring streamlined data flow.

## Tracks

Within a Session, there can be one or more **Tracks**. 

- **Tracks map to MediaStreamTrack**: Tracks align with the MediaStreamTrack concept, facilitating audio, video, or data transmission.
- **Globally Unique Ids**: When you push a track to Cloudflare, it is assigned a unique ID, which can then be used to pull the track into another session elsewhere.
- **Available globally**: The ability to push and pull tracks is central to what makes Calls a versatile tool for real-time applications. Each track is available globally to be retrieved from any Session within an App.

## Calls as a Programmable "Switchboard"

The analogy of a switchboard is apt for understanding Calls. Historically, switchboard operators connected calls by manually plugging in jacks. Similarly, Calls allows for the dynamic routing of media streams, acting as a programmable switchboard for modern real-time communication.

## Beyond "Rooms", "Users", and "Participants"

While many SFUs utilize concepts like "rooms" to manage media streams among users, this approach has scalability and flexibility limitations. Cloudflare Calls opts for a more granular and flexible model with Sessions and Tracks, enabling a wide range of use cases:

- Large-scale remote events, like 'fireside chats' with thousands of participants.
- Interactive conversations with the ability to bring audience members "on stage."
- Educational applications where an instructor can present to multiple virtual classrooms simultaneously.

### Presence Protocol vs. Media Flow

Calls distinguishes between the presence protocol and media flow, allowing for scalability and flexibility in real-time applications. This separation enables developers to craft tailored experiences, from intimate calls to massive, low-latency broadcasts.
