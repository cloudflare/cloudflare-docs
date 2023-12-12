---
pcx_content_type: reference
title: Let's Encrypt chain change
weight: 1
meta:
  description: Review notes on the expiration of ISRG Root X1 cross-signed with DST Root CA X3, and how it may affect Cloudflare customers that use Let’s Encrypt.
---

# Let's Encrypt chain change

Let's Encrypt - one of the [certificate authorities](/ssl/reference/certificate-authorities/) used by Cloudflare - has announced the expiration of its chain (ISRG Root X1) that is cross-signed by IdenTrust (DST Root CA X3). This article explains what to expect, when, and how you can prepare if needed.

## Overview

Let’s Encrypt issues certificates through two chains: the ISRG Root X1 chain and the ISRG Root X1 chain cross-signed by IdenTrust’s DST Root CA X3.

As explained in the [Let's Encrypt announcement](https://letsencrypt.org/2023/07/10/cross-sign-expiration), the cross-signed chain has allowed their certificates to be widely trusted, while the pure chain gradually developed compatibility with various devices over the last three years.

Now, the number of Android devices trusting the pure ISRG Root X1 corresponds to 93.9%, and Let's Encrypt has decided to drop the cross-signed chain.

## Impact

## Important dates

## Recommendations