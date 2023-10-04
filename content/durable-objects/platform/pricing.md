---
pcx_content_type: concept
title: Pricing
---

# Pricing

{{<render file="_durable_objects_pricing.md" productFolder="workers">}}

## Durable Objects billing examples

These examples exclude the costs for the Workers calling the Durable Objects.

### Example 1

If a single Durable Object was called by a Worker 1.5 million times, and was active for 1,000,000 seconds in the month, the estimated cost in a month would be:

Total = ~$0.08 USD + Minimum $5/mo usage = $5.08

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075
- 1,000,000 seconds \* 128 MB / 1 GB = 128,000 GB-s
- (128,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

### Example 2

If 100 Durable Objects each had 100 WebSocket connections established to each of them which sent approximately one message a minute for a month, the estimated cost in a month would be, if the messages overlapped so that the Durable Objects were actually active for half the month:

Total = ~$64.65 USD + $202.36 USD + Minimum $5/mo usage = $272.01

- 100 requests to establish the WebSockets.
- 100 messages per minute \* 100 Durable Objects \* 60 minutes \* 24 hours \* 30 days = 432,000,000 requests
- (432 million requests - included 1 million requests) x $0.15 / 1,000,000 = $64.65
- 100 Durable Objects \* 60 seconds \* 60 minutes \* 24 hours \* 30 days / 2 = 129,600,000 seconds
- 129,600,000 seconds \* 128 MB / 1 GB = 16,588,800 GB-s
- (16,588,800 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $202.36

### Example 3

If 100 Durable Objects each had a single WebSocket connection established to each of them, which sent one message a second for a month, and the messages overlapped so that the Durable Objects were actually active for the entire month, the estimated cost in a month would be:

Total = ~$38.73 USD + $409.72 USD + Minimum $5/mo usage = $453.45

- 100 requests to establish the WebSockets.
- 1 message per second \* 100 connections \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 requests
- (259.2 million requests - included 1 million requests) x $0.15 / 1,000,000 = $38.73
- 100 Durable Objects \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 seconds
- 259,200,000 seconds \* 128 MB / 1 GB = 33,177,600 GB-s
- (33,177,600 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $409.72

## Transactional Storage API billing

{{<render file="_transactional_storage_api_pricing.md" productFolder="workers">}}