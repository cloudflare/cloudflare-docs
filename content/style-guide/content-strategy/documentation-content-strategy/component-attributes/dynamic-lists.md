---
pcx_content_type: concept
title: Dynamic lists

---

# Dynamic lists

When at all possible, Cloudflare seeks to avoid creating static representations of dynamic options.

Potential examples include:

+ Exhaustive listing of fields
+ Replicating API content in developer docs
+ Maintaining lists of potential options in the UI (i.e., Alert types)
+ Things like Verified Bots

The preferred approach would be to do one of the following:

(with Engineering's help), create a dynamic component that pulls in data from another source.

**OR**

(for less overhead and tech debt), speak more generally to the categories or specific, high-value fields.
