---
pcx-content-type: overview
title: Keyless SSL
weight: 6
---

import KeylessSSLDefinition from "../\_partials/\_keyless-ssl-definition.md"

# Keyless SSL

<KeylessSSLDefinition/>

Prior to configuring Keyless SSL, we suggest you read our [technical ‘deep dive’](https://blog.cloudflare.com/keyless-ssl-the-nitty-gritty-technical-details/) on how the technology works and where your infrastructure sits within the scope of the TLS handshake.

The source code for our key server (what you will run) and keyless client (what our servers will contact your key server with) can be [found on GitHub](https://github.com/cloudflare/gokeyless).

***

## Availability

Keyless SSL is only available to Enterprise customers that maintain their own SSL certificate purchased from a valid Certificate Authority. Cloudflare does not supply any certificates for use with Keyless SSL.

***

## Terminology

### Cloudflare Keyless SSL key server (“key server”)

The key server is a daemon that you run on your own infrastructure. The key server receives inbound requests from Cloudflare’s keyless client on TCP port `2407` (by default) so you must make sure that your firewall and other access control lists permit these requests from Cloudflare’s IP ranges.

Your key servers are contacted by Cloudflare during the TLS handshake process and must be online to terminate new TLS connections. Existing sessions can be resumed using unexpired TLS session tickets without needing to contact the key server.

### Cloudflare Keyless SSL client (“keyless client”)

The keyless client is a process that runs on Cloudflare’s infrastructure. The keyless client makes outbound requests to your key server on TCP port `2407` for assistance in establishing new TLS sessions.
