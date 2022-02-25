---
pcx-content-type: concept
title: About Logpush
weight: 21
---

# About Logpush

Push logs of Cloudflare's datasets to your cloud service in batches. Logpush is available to customers on Cloudflare's Enterprise plan.

Logpush delivers each batch of logs as a gzipped file containing data in newline-delimited JSON format (or [JSON lines](https://jsonlines.org/)) to your destination as soon as possible, generally in less than one minute.

These batches contain no more than 100,000 records per file. That limit may be raised in the future. There is no minimum batch size, and Logpush may deliver more than one file per minute. The number of files delivered depends on the number of logs that need to be delivered. More logs equals more batches and therefore more files. The number of files also depends on the number of Cloudflare log-processing servers needed to handle the volume of logs.

Prior to mid-2020, Logpush sent logs once every five minutes (referred to as Logpush v1). The change to more frequent log pushing allows Cloudflare to deliver information to you as close to real time as possible in smaller files. You may receive log files that contain fewer lines - that is expected. If you have legacy Logpush jobs configured to the old settings, use the Logpush API to upgrade your job to Logpush v2. All new jobs will use Logpush v2 by default.

<ButtonGroup>
  <Button type="primary" href="/get-started">Get started</Button>
</ButtonGroup>
