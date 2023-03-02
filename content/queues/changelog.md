---
pcx_content_type: changelog
title: Changelog
weight: 11
rss: file
---

# Changelog

## 2023-03-01

### Higher per-queue throughput

The per-queue throughput limit has now been [raised to 400 messages per second](/queues/platform/limits/).

## 2022-12-12

### Increased per-account limits

Queues now allows developers to create up to 100 queues per account, up from the initial beta limit of 10 per account. This limit will continue to increase over time.

## 2022-12-13

### sendBatch support

The JavaScript API for Queue producers now includes a `sendBatch` method which supports sending up to 100 messages at a time.
