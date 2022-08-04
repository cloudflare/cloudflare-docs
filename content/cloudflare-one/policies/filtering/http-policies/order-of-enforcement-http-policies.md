---
pcx_content_type: concept
title: Order of enforcement
weight: 4
---

# Order of enforcement

Gateway evaluates HTTP policies as follows:

1.  First, it evaluates all Do Not Inspect policies in order of precedence (lowest value first, or from top to bottom as shown in the UI).
2.  If no policies match, it evaluates all Isolate policies in order of precedence.
3.  If no policies match, it evaluates all Allow, Block and Do Not Scan policies in order of precedence.

This order of enforcement allows Gateway to determine first if decryption should occur.

Once that's been established, Isolation policies are evaluated. When a user makes a request which triggers an Isolation policy, the request will be rerouted to an isolated browser and re-evaluated for HTTP policies. This makes it possible for an isolated browser to remotely render a block page or have malicious content within the isolated browser blocked by HTTP policies.

For Allow and Block policies, you can modify the order of precendence by dragging and dropping individual policies in the UI.
