---
pcx_content_type: get-started
title: Generate Credentials
weight: 10
---

#  Generate TURN credentials

Cloudflare will issue TURN keys, but these keys cannot be used as credentials with `turn.cloudflare.com`. To use TURN, you need to create credentials with a expiring TTL value.

## Create a TURN key

To create a TURN credential, you first need to create a TURN key using [Dashboard](https://dash.cloudflare.com/?to=/:account/calls), or the [API](/api/operations/calls-turn-key-create).

You should keep your TURN key on the server side (don't share it with the browser/app). A TURN key is a long-term secret that allows you to generate unlimited, shoter lived TURN credentials for TURN clients.

With a TURN key you can:
- Generate TURN credentials that expire
- Revoke previously issued TURN credentials

## Create credentials

You should generate short-lived credentials for each TURN user. In order to create credentials, you should have a back-end service that uses your TURN Token ID and API token to generate credentials. It will make an API call like this:

```bash
curl https://rtc.live.cloudflare.com/v1/turn/keys/$TURN_KEY_ID/credentials/generate
--header "Authorization: Bearer $TURN_KEY_API_TOKEN" \
--header "Content-Type: application/json" \
--data '{"ttl": 86400}'
```

The JSON response below can then be passed on to your front-end application:

```json
{
  "iceServers": {
    "urls": [
      "stun:stun.cloudflare.com:3478",
      "turn:turn.cloudflare.com:3478?transport=udp",
      "turn:turn.cloudflare.com:3478?transport=tcp",
      "turns:turn.cloudflare.com:5349?transport=tcp"
    ],
    "username": "bc91b63e2b5d759f8eb9f3b58062439e0a0e15893d76317d833265ad08d6631099ce7c7087caabb31ad3e1c386424e3e",
    "credential": "ebd71f1d3edbc2b0edae3cd5a6d82284aeb5c3b8fdaa9b8e3bf9cec683e0d45fe9f5b44e5145db3300f06c250a15b4a0"
  }
}
```

Use `username` and `credential` as follows when instantiating the `RTCPeerConnection`:

```js
const myPeerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.cloudflare.com:3478",
    },
    {
      urls: "turn:turn.cloudflare.com:3478",
      username: "REPLACE_WITH_USERNAME",
      credential: "REPLACE_WITH_CREDENTIAL",
    },
    {
      urls: "turns:turn.cloudflare.com:5349?transport=tcp",
      username: "REPLACE_WITH_USERNAME",
      credential: "REPLACE_WITH_CREDENTIAL",
    },
    {
      urls: "turn:turn.cloudflare.com:3478?transport=tcp",
      username: "REPLACE_WITH_USERNAME",
      credential: "REPLACE_WITH_CREDENTIAL",
    },
  ],
});

```
The `ttl` value can be adjusted to expire the short lived key in a certain amount of time. This value should be larger than the time you'd expect the users to use the TURN service. For example, if you're using TURN for a video conferencing app, the value should be set to the longest video call you'd expect to happen in the app.

When using short-lived TURN credentials with WebRTC, credentials can be refreshed during a WebRTC session using the `RTCPeerConnection` [`setConfiguration()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setConfiguration) API.


## Revoke credentials

Short lived credentials can also be revoked before their TTL expires with a API call like this:

```bash
curl --request POST \
--header "Authorization: Bearer $TURN_KEY_API_TOKEN" \
https://rtc.live.cloudflare.com/v1/turn/keys/$TURN_KEY_ID/credentials/username/$USERNAME/revoke
  ```