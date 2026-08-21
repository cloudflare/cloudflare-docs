---
title: Images
description: Rules for image syntax and asset paths in MDX content.
---

## Rules

- If an added line outside a fenced code block uses a raw `<img>` tag to embed a content image (screenshot, diagram, illustration) → **warning**: use Markdown image syntax instead: `![Alt text](~/assets/images/{product}/file.png)`. Exception: `<img>` is acceptable inside fenced code blocks, inside JSX component props that accept image elements, or when the line is part of an HTML/JSX application code example shown to the reader.

- If an added line references a content image via an absolute `/images/...` path or a `public/images/...` path → **warning**: store the image under `src/assets/images/{product}/` and reference it with `~/assets/images/{product}/...`. Images in `src/assets/images/` get Astro asset optimization, responsive variants, and cache-busting. Only use `public/` for assets that need a stable static URL (e.g. OG images, badges, files referenced from non-Astro contexts). Exception: paths inside fenced code blocks or code examples.

- If a Markdown image uses empty alt text `![](...)` for a non-decorative content image → **suggestion**: add descriptive alt text per the style guide.

## Examples

Correct:

```mdx
![Cloudflare dashboard showing the DNS records page with an A record highlighted](~/assets/images/dns/dns-records.png)
```

Incorrect:

```mdx
<img src="/images/precursor/precursor-rules.png" alt="Precursor mode selector" />
```

```mdx
![Precursor mode selector](/images/precursor/precursor-rules.png)
```
