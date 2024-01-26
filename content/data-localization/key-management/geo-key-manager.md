---
pcx_content_type: concept
title: Geo Key Manager
weight: 3
---

# Geo Key Manager

Geo Key Manager offers enhanced control over the storage location of private SSL/TLS keys, ensuring compliance with regional data regulations and security requirements.

## Customize key storage

By default, private keys will be encrypted and securely distributed to each data center, where they can be utilized for local SSL/TLS termination. Geo Key Manager allows you to choose where you want to store your private keys. Geo Key Manager was restricted to the US, EU, and high-security data centers, but with the new version of Geo Key Manager, available in [Closed Beta](https://blog.cloudflare.com/configurable-and-scalable-geo-key-manager-closed-beta/), you can now create `allowlists` and `blocklists` of countries in which your private keys will be stored. That means that you will be able to create specifications, such as storing your private keys exclusively in Australia or limiting private keys storage to the EU and the UK.

## Cloudflare data center flow example

The following diagram is a high-level example of the flow of the Cloudflare data centers without private TLS key. In this process, data centers have to request and create temporary Session Keys to perform TLS termination by reaching out to Cloudflare data centers which hold the private TLS keys:

<br>

```mermaid
sequenceDiagram
    participant User as End user
    participant CloudflarePoP as Closest data center without TLS Key
    participant CloudflarePoPwTLS as Data center with TLS Key
 
    User->>CloudflarePoP: Initial request
    Note right of CloudflarePoP: Closest data center cannot decrypt
    CloudflarePoP-->>CloudflarePoPwTLS: Requests TLS Signature
    CloudflarePoPwTLS-->>CloudflarePoP: Sends TLS Signature in order to establish Session Key
    Note right of CloudflarePoP: Decrypts and performs business logic (for example, WAF, Configuration Rules, Load Balancing)
    CloudflarePoP-->>User: Subsequent requests use the Session Key
    User-->>CloudflarePoP: 
```

<br>

For detailed information on implementation and configuration, refer to [Geo Key Manager documentation](/ssl/edge-certificates/geokey-manager/).
