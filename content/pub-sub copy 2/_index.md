---
title: Overview
pcx_content_type: overview
weight: 0
---

# Cloudflare Pub/Sub

{{<Aside>}}

Pub/Sub is currently in private beta. Browse the documentation to understand how Pub/Sub works and integrates with our broader Developer Platform, and [sign up for the waitlist](https://www.cloudflare.com/cloudflare-pub-sub-lightweight-messaging-private-beta/) to get access in the near future.

{{</Aside>}}

Pub/Sub is Cloudflare's distributed MQTT messaging service. MQTT is one of the most popular messaging protocols used for consuming sensor data from thousands (or tens of thousands) of remote, distributed Internet of Things clients; publishing configuration data or remote commands to fleets of devices in the field; and even for building notification or messaging systems for online games and mobile apps.

Pub/Sub is ideal for cases where you have many (from a handful to tens of thousands of) clients sending small, sub-1MB messages — such as event, telemetry or transaction data — into a centralized system for aggregation, or where you need to push configuration updates or remote commands to remote clients at scale.

Pub/Sub:

- Scales automatically. You do not have to provision "vCPUs" or "memory", or set autoscaling parameters to handle spikes in message rates.
- Is global. Cloudflare's Pub/Sub infrastructure runs in over [270+ cities on our global network](https://www.cloudflare.com/network/). Every edge location is part of one, globally distributed Pub/Sub system.
- Is secure by default. Clients must authenticate and connect over TLS, and clients are issued credentials that are scoped to a specific broker.
- Allows you to create multiple brokers to isolate clients or use cases, for example, staging vs. production or customers A vs. B vs. C — as needed. Each broker is addressable by a unique DNS hostname.
- Integrates with Cloudflare Workers to enable programmable messaging capabilities: parse, filter, aggregate, and re-publish MQTT messages directly from your serverless code. 
- Supports MQTT v5.0, the most recent version of the MQTT specification, and one of the most ubiquitous messaging protocols in use today.

If you are new to the MQTT protocol, visit the [How Pub/Sub works](/pub-sub/learning/how-pubsub-works/) to better understand how MQTT differs from other messaging protocols.
