---
title: Regions
pcx-content-type: reference
---

## Regions in R2

R2 is designed from the ground up to be global - unlike other object storage services, there is no need to select a specific region to store data in.

During the open beta period, R2 stores data in a small number of points of presence in North America.  Data is stored in a single region and replicated within that region for high availability. Over time, we plan on adding additional data centers. As these data centers come online, R2 will automatically place a single copy of your files in the data center that is closest to your user's requests.

In the future, we plan to allow developers to specify a number of copies of data that R2 should keep and automatically distribute across data centers for lower latency access.
