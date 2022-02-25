---
order: 3
pcx-content-type: concept
---

# Order of enforcement

Gateway evaluates HTTP policies as follows:

1. First, it evaluates all Do Not Inspect policies in order of precedence.
1. If no policies match, it evaluates all Isolate policies in order of precedence.
1. If no policies match, it evaluates all Allow, Block and Do Not Scan rules in order of precedence.

This order of enforcement allows Gateway to determine first if decryption should occur.

Once that's been established, Isolation policies are evaluated. When a user makes a request which triggers an Isolation policy, the request will be rerouted to an isolated browser and re-evaluated for HTTP policies.

This makes it possible for an isolated browser to remotely render a block page or have malicious content within the isolated browser blocked by HTTP policies.
