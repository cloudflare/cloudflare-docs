---
pcx_content_type: concept
title: File conventions
---

# File conventions

Our docs have a few conventions around files.

## Naming

When creating new files, follow specific conventions for your naming.

Filenames should:
- Semantically communicate the purpose of the file
- Be lowercased
- Use dashes between words
- Only use `_index.md` for a single file under [folders](#folders)

```txt
---
header: Acceptable file names
---
/fundamentals/concepts/what-is-cloudflare.md
/assets/images/api-shield/api-shield-call-sequence.png

```

```txt
---
header: Unacceptable file names
---
/fundamentals/concepts/What is Cloudflare.md
/fundamentals/concepts/What-is-Cloudflare.md
/fundamentals/concepts/what-is-cloudflare/index.md
/assets/images/api-shield/API_Image_1.png
```

These conventions are important for user readibility, SEO conventions, and making sure our GitHub actions do not break.

## Folders

Each folder should have a file named `_index.md`.

```txt
/fundamentals/concepts/_index.md
```

This convention ensures that [Hugo](https://gohugo.io/) - our static site generator - treats the content as a [section](https://gohugo.io/content-management/sections/). The content at `/fundamentals/concepts/_index.md` will also be rendered at `https://developers.cloudflare.com/fundamentals/concepts/`.

## Content files

Add regular content files to the `/content/{product_folder}/` directory.

```txt
/content/fundamentals/concepts/what-is-cloudflare.md
```

## Image files

Add image files to the `/assets/images/{product_folder}/` directory.

```txt
/assets/images/api-shield/api-shield-call-sequence.png
```