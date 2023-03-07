---
pcx_content_type: concept
title: Geo Key Manager
weight: 3
---

# Geo Key Manager

By default, private keys will be encrypted and securely distributed to each data center, where they can be utilized for local SSL/TLS termination. Geo Key Manager allows you to choose where you want to store your private keys. Geo Key Manager was restricted to the US, EU, and high-security data centers, but with the new version of Geo Key Manager, available in [Closed Beta](https://blog.cloudflare.com/configurable-and-scalable-geo-key-manager-closed-beta/), we allow you to create `allowlists` and `blocklists` of countries in which your private keys will be stored. That means that you will be able to create specifications, for instance store your private keys only in Australia or store your private keys in the EU and in the UK.

For more information, refer to [Geo Key Manager documentation](/ssl/edge-certificates/geokey-manager/).
