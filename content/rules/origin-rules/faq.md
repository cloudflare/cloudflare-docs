---
title: FAQ
pcx-content-type: faq
weight: 10
meta:
  title: FAQ — Origin Rules
---

# FAQ

Below you will find answers to the most commonly asked questions regarding Origin Rules.

## What happens if I use both an Origin Rule and a Page Rule to perform a host header/resolve override?

In this situation the Origin Rule parameters will override the [Page Rule](https://support.cloudflare.com/hc/en-us/articles/218411427) parameters. Consider the following example scenarios:

* A Page Rule defines a Host Header Override, but not an Resolve Override. An Origin Rule defines an Resolve Override, but not a Host Header Override. The resulting request will have the `Host` header defined by the Page Rule and the origin hostname defined by the Origin Rule.
* A Page Rule defines a Host Header Override, and an Origin Rule also defines a Host Header Override. The resulting request will have the `Host` header defined by the Origin Rule.

## Will Cloudflare automatically migrate my Page Rules with Host Header and Resolve Overrides to Origin Rules?

No. This is currently a manual process, since your Page Rules may include additional settings that Origin Rules do not currently support.
