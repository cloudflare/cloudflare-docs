---
title: Filename encoding and interoperability problems
pcx_content_type: reference
---

## Filename encoding and interoperability problems

R2 is built on top of Workers and it supports Unicode natively. One nuance of Unicode that is often overlooked is the issue of [filename interoperability](https://en.wikipedia.org/wiki/Filename#Encoding_indication_interoperability) due to [Unicode equivalence](https://en.wikipedia.org/wiki/Unicode_equivalence).

Based on feedback from our users, we have chosen to NFC-normalize key names before storing by default. This means that `Héllo` and `Héllo`, for example, are the same object in R2 but different objects in other storage providers. Although `Héllo` and `Héllo` may be different character byte sequences, they are rendered the same.

R2 preserves the encoding for display though. When you list the objects, you will get back the last encoding you uploaded with.

There are still some platform-specific differences to consider:

* Windows filenames are case-insensitive while R2, Linux, and macOS are not.
* Windows console support for Unicode can be error-prone. Make sure to run `chcp 65001` before using command-line tools or use Cygwin if your object names appear to be incorrect.
* Linux allows distinct files that are unicode-equivalent because filenames are byte streams. Unicode-equivalent filenames on Linux will point to the same R2 object.

If it is important for you to be able to bypass the unicode equivalence and use byte-oriented key names, contact your Cloudflare account team.
