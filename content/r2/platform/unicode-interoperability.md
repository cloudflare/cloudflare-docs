---
title: Filename encoding and interoperability problems
pcx-content-type: reference
meta:
  title: Filename encoding and interoperability problems
---

## Filename encoding and interoperability problems

Since R2 is built on top of Workers, it supports Unicode natively. One nuance of Unicode that is often overlooked
is the issue of [filename interoperability](https://en.wikipedia.org/wiki/Filename#Encoding_indication_interoperability) due to [Unicode
equivalence](https://en.wikipedia.org/wiki/Unicode_equivalence).

Based on feedback from our users, we've chosen to NFC-normalize key names before storing by default. This means
`Héllo` and `Héllo` are the same object in R2 but different objects in other storage providers.

R2 is encoding-preserving for display though. When you list the objects, you'll get back the last encoding you uploaded with.

There are still some platform-specific differences to consider

* Windows filenames are case-insensitive while R2, Linux, and macOS are not.
* Windows console support for Unicode can be error-prone. Make sure to run `chcp 65001` before using command-line tools or use Cygwin
if your object names are coming out garbled.
* Linux allows distinct files that are unicode equivalent because filenames are byte streams. Unicode equivalent files on Linux
will map to the same R2 object.

If it's important for you to be able to bypass the unicode equivalence and use byte-oriented key names, contact your Cloudflare account
team.
