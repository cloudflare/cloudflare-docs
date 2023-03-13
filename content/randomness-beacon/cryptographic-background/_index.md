---
pcx_content_type: concept
title: Cryptographic Background
weight: 3
---

# Cryptographic Background

drand is an efficient randomness beacon daemon that utilizes pairing-based cryptography, `𝑡-of-𝑛` distributed key generation, and threshold BLS signatures to generate publicly-verifiable, unbiasable, unpredictable, distributed randomness.

This is an overview of the cryptographic building blocks drand uses to generate publicly-verifiable, unbiasable, and unpredictable randomness in a distributed manner.

The drand beacon has two phases: a setup phase and a beacon phase. Generally, we assume that there are *n* participants, out of which at most *f\<n* are malicious. drand relies heavily on threshold cryptography primitives, where (at minimum) a threshold of *t-f+1* nodes work together to successfully execute cryptographic operations.

Threshold cryptography has many applications as it avoids single points of failure. One application is cryptocurrency multi-sig wallets, where *t-of-n* participants are required to sign a transaction using a threshold signature scheme.

{{<Aside type="note" header="Note">}}
  This document is intended for a general audience. No cryptographic background knowledge is required to understand these concepts.
{{</Aside>}}