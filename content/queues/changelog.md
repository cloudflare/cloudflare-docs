---
pcx_content_type: changelog
title: Changelog
weight: 11
rss: file
---

# Changelog

## 2023-03-02

### Explicit acknowledgement

**New feature** You can now [acknowledge individual messages with a batch](https://developers.cloudflare.com/queues/learning/batching-retries/#explicit-acknowledgement) by calling `.ack()` on a message.

This allows you to mark a message as delivered as you process it within a batch, and avoids the entire batch from being re-delivered if your consumer throws an error during batch processing. This can be particularly useful when you are calling external APIs, writing messages to a database, or otherwise performing non-idempotent actions on individual messages within a batch.

## 2023-03-01

### Higher per-queue throughput

The per-queue throughput limit has now been [raised to 400 messages per second](/queues/platform/limits/).

## 2022-12-12

### Increased per-account limits

Queues now allows developers to create up to 100 queues per account, up from the initial beta limit of 10 per account. This limit will continue to increase over time.

## 2022-12-13

### sendBatch support

The JavaScript API for Queue producers now includes a `sendBatch` method which supports sending up to 100 messages at a time.
