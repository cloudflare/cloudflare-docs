---
pcx_content_type: get-started
title: Limits, timeouts and quotas
weight: 6
---

# Limits, Timeouts and Quotas

Understanding the limits and timeouts of Cloudflare Calls is crucial for optimizing the performance and reliability of your applications. This section outlines the key constraints and behaviors you should be aware of when integrating Cloudflare Calls into your app.

## Free

- Each account gets 1,000GB/month of data transfer from Cloudflare to your client for free.
- Data transfer from your client to Cloudflare is always free of charge.

## Limits

- **API Calls per Session**: You can make up to 50 API calls per second for each session. There is no ratelimit on a App basis, just sessions.

- **Tracks per API Call**: Up to 64 tracks can be added with a single API call. If you need to add more tracks to a session, you should distribute them across multiple API calls.

- **Tracks per Session**: There's no upper limit to the number of tracks a session can contain, the practical limit is governed by your connection's bandwidth to and from Cloudflare.

## Inactivity Timeout

- **Track Timeout**: Tracks will automatically timeout and be garbage collected after 30 seconds of inactivity, where inactivity is defined as no media packets being received by Cloudflare. This mechanism ensures efficient use of resources and session cleanliness across all Sessions that use a track.

## PeerConnection Requirements

- **Session State**: For any operation on a session (e.g., pulling or pushing tracks), the PeerConnection state must be `connected`. Operations will block for up to 5 seconds awaiting this state before timing out. This ensures that only active and viable sessions are engaged in media transmission.

## Handling Connectivity Issues

- **Internet Connectivity Considerations**: The potential for internet connectivity loss between the client and Cloudflare is an operational reality that must be addressed. Implementing a detection and reconnection strategy is recommended to maintain session continuity. This could involve periodic 'heartbeat' signals to your backend server to monitor connectivity status. Upon detecting connectivity issues, automatically attempting to reconnect and establish a new session is advised. Sessions and tracks will remain available for reuse for 30 seconds before timing out, providing a brief window for reconnection attempts.

Adhering to these limits and understanding the timeout behaviors will help ensure that your applications remain responsive and stable while providing a seamless user experience.