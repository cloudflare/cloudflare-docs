---
pcx_content_type: concept
title: Pricing
weight: 1
---

# Pricing

{{<render file="_durable_objects_pricing.md" productFolder="workers">}}

## Durable Objects billing examples

These examples exclude the costs for the Workers calling the Durable Objects. When modelling the costs of a Durable Object, note that:

* Inactive objects receiving no requests do not incur any duration charges.
* The [Hibernatable WebSocket API](/durable-objects/reference/websockets/#websocket-hibernation) can dramatically reduce duration-related charges for Durable Objects communicating with clients over the WebSocket protocol, especially if messages are only transmitted occassionally at sparse intervals.

### Example 1

This example represents a simple Durable Object used as a co-ordination service invoked via HTTP.

* A single Durable Object was called by a Worker 1.5 million times
* It is active for 1,000,000 seconds in the month

In this scenario, the estimated monthly cost would be calculated as:

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075
- 1,000,000 seconds \* 128 MB / 1 GB = 128,000 GB-s
- (128,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

**Estimated total**: ~$0.075 (requests) + $0.00 (compute duration) + minimum $5/mo usage = $5.08 per month

### Example 2

This example represents a moderately trafficked Durable Objects based application using WebSockets to broadcast game, chat or real-time user state across connected clients:

* 100 Durable Objects each have 50 WebSocket connections established to each of them.
* Clients send approximately one message a minute for eight active hours a day, every day of the month.

In this scenario, the estimated monthly cost would be calculated as:

- 50 requests to establish the WebSockets.
- 100 messages per minute \* 50 Durable Objects \* 60 minutes \* 8 hours \* 30 days = 72,000,000 requests.
- (72 million requests - included 1 million requests) x $0.15 / 1,000,000 = $10.65.
- 100 Durable Objects \* 60 seconds \* 60 minutes \* 8 hours \* 30 days / 2 = 42,200,000 seconds.
- 129,600,000 seconds \* 128 MB / 1 GB = 5,529,600 GB-s.
- (5,529,600 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $64.12.

**Estimated total**: $10.65 (requests) + $64.12 (compute duration) = $74.77 per month.

### Example 3

This example represents a horizontally scaled Durable Objects based application using WebSockets to communicate user-specific state to a single client connected to each Durable Object.

* 100 Durable Objects each have a single WebSocket connection established to each of them.
* Clients sent one message every second of the month so that the Durable Objects were active for the entire month.

In this scenario, the estimated monthly cost would be calculated as:

- 100 requests to establish the WebSockets.
- 1 message per second \* 100 connections \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 requests
- (259.2 million requests - included 1 million requests) x $0.15 / 1,000,000 = $38.73
- 100 Durable Objects \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 seconds
- 259,200,000 seconds \* 128 MB / 1 GB = 33,177,600 GB-s
- (33,177,600 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $409.72

**Estimated total**: $38.73 (requests) + $409.72 (compute duration) = $453.45 per month

## Transactional Storage API billing

{{<render file="_transactional_storage_api_pricing.md" productFolder="workers">}}
