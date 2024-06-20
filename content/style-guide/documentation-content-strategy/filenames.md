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
- Use dashes dashes between words

```txt
---
header: Acceptable file names
---
/fundamentals/concepts/what-is-cloudflare/
/assets/images/api-shield/api-shield-call-sequence.png
```

```txt
---
header: Unacceptable file names
---
/fundamentals/concepts/What is Cloudflare/
/assets/images/api-shield/API_Image_1.png
```

These conventions are important for user readibility, SEO conventions, and making sure our GitHub actions do not break.

## Locations

### Content files

Add regular content files to the `/content/{product_folder}/` directory.

```txt
/fundamentals/concepts/what-is-cloudflare/
```

### Image files

Add image files to the `/assets/images/{product_folder}/` directory.

```txt
/assets/images/api-shield/api-shield-call-sequence.png
```