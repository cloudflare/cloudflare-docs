---
title: Netflow/IPFIX configuration
pcx_content_type: overview
weight: 3
---

# Netflow/IPFIX configuration

Magic Network Monitoring supports the NetFlow v5, NetFlow v9, and IPFIX network flow data formats. 

1. Log in to your router's configuration application.
2. Open your router's NetFlow configuration menu.
3. Set up your router's Flow Exporter configuration with the following values:

    Flow exporter
      - Destination IP address: 162.159.65.1
      - Destination Port: 2055
      - Transport Protocol: UDP

4. Set up your router's Flow Record configuration with the following values:

    Flow Record
      - match ipv4 protocol 
      - match ipv4 source address
      - match ipv4 destination address
      - match transport source-port
      - match transport destination-port
      - match interface input
