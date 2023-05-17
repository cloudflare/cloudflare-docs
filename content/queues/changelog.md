---
pcx_content_type: changelog
title: Changelog
weight: 11
rss: file
---

# Changelog

## 2023-03-28

### Consumer concurrency (enabled)

Queue consumers will now [automatically scale up](/queues/learning/consumer-concurrency/) based on the number of messages being written to the queue. To control or limit concurrency, you can explicitly define a [`max_concurrency`](/queues/platform/configuration/#consumer) for your consumer.

## 2023-03-15

### Consumer concurrency (upcoming)

Queue consumers will soon automatically scale up concurrently as a queues' backlog grows in order to keep overall message processing latency down. Concurrency will be enabled on all existing queues by 2023-03-28.

**To opt-out, or to configure a fixed maximum concurrency**, set `max_concurrency = 1` in your `wrangler.toml` file or via [the queues dashboard](https://dash.cloudflare.com/?to=/:account/queues).

**To opt-in, you do not need to take any action**: your consumer will begin to scale out as needed to keep up with your message backlog. It will scale back down as the backlog shrinks, and/or if a consumer starts to generate a higher rate of errors. To learn more about how consumers scale, refer to the [consumer concurrency](/queues/learning/consumer-concurrency/) documentation.

## 2023-03-02

### Explicit acknowledgement (new feature)

You can now [acknowledge individual messages with a batch](/queues/learning/batching-retries/#explicit-acknowledgement) by calling `.ack()` on a message.

This allows you to mark a message as delivered as you process it within a batch, and avoids the entire batch from being redelivered if your consumer throws an error during batch processing. This can be particularly useful when you are calling external APIs, writing messages to a database, or otherwise performing non-idempotent actions on individual messages within a batch.

## 2023-03-01

### Higher per-queue throughput

The per-queue throughput limit has now been [raised to 400 messages per second](/queues/platform/limits/).

## 2022-12-12

### Increased per-account limits

Queues now allows developers to create up to 100 queues per account, up from the initial beta limit of 10 per account. This limit will continue to increase over time.

## 2022-12-13

### sendBatch support

The JavaScript API for Queue producers now includes a `sendBatch` method which supports sending up to 100 messages at a time.
