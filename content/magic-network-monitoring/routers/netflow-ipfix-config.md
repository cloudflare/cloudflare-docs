---
title: Netflow/IPFIX configuration
pcx_content_type: how-to
weight: 3
meta:
    description: A step-by-step configuration guide for exporting NetFlow or IPFIX data to Cloudflare’s network.
---

# Netflow/IPFIX configuration

Magic Network Monitoring supports the NetFlow v5, NetFlow v9, and IPFIX network flow data formats. 

1. Log in to your router's configuration application.
2. Open your router's NetFlow configuration menu.
3. Set up your router's **Flow Exporter** configuration with the following values:

    - **Destination IP address**: `162.159.65.1`
    - **Destination Port**: `2055`
    - **Transport Protocol**: `UDP`

4. Set up your router's **Flow Record** configuration with the following values:

    - `match ipv4 protocol `
    - `match ipv4 source address`
    - `match ipv4 destination address`
    - `match transport source-port`
    - `match transport destination-port`
    - `match interface input`
    - `collect transport tcp flag`
    - `collect counter packets long`
    - `collect counter bytes long`
    - `collect flow sampler`
    - `collect timestamp sys-uptime first`
    - `collect timestamp sys-uptime last`

5. Confirm your router's Netflow template. It should not contain duplicated fields.
