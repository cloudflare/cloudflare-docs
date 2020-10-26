---
title: Drand Project
order: 0
---

# What is drand?

The drand project aims to address the current lack of services providing distributed public randomness. Distributed to increase the reasilience and trustworthiness. drand provides a standalone randomness-as-a-service network that is application agnostic. For example, similar to NTP networks serving timing information accross the globe. drand follows the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle), relying on well-researched cryptographic building blocks and open-source software design principles and libraries, such as protobuf and gRPC, to ensure high performance and interoperability. drand also attempts to use sane security defaults, such as having TLS enabled by default. 

Beyond that, drand adds new features important for its practical deployment, such as being able to securely add and remove members of the network through [resharing](https://ieeexplore.ieee.org/document/1183515) while keeping the same shared public key necessary for randomness verification.