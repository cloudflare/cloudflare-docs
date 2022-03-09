---
pcx-content-type: how-to
title: Displaying thumbnails
weight: 5
---

# Displaying thumbnails

## Use Case 1: Generating a thumbnail on-the-fly

A thumbnail from your video can be generated using a special link where you specify the time from the video you'd like to get the thumbnail from.

`
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270
`

<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270" />

Using the `poster` query parameter in the embed URL, you can set a thumbnail to any time in your video. If [signed URLs](/stream/viewing-videos/securing-your-stream/) are required, you must use a signed URL instead of video IDs.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-html" language="html"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">iframe</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag">  </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">src</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">https://iframe.videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81?poster=https%3A%2F%2Fvideodelivery.net%2F5d5bc37ffcf54c9b82e996823bffbb81%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D68s%26height%3D270</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag">  </span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-name">style</span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-value CodeBlock--token-value CodeBlock--token-css CodeBlock--token-language-css CodeBlock--token-property">border</span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-value CodeBlock--token-value CodeBlock--token-css CodeBlock--token-language-css CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-value CodeBlock--token-value CodeBlock--token-css CodeBlock--token-language-css"> none</span><span class="CodeBlock--token-tag CodeBlock--token-special-attr CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag">  </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">height</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">720</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag">  </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">width</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">1280</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag">  </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">allow</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag">  </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">allowfullscreen</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">true</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">iframe</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Supported URL attributes are:

- **`time`** (default `0s`, configurable) time from the video e.g. `8m`, `5m2s`
- **`height`** (default `640`)
- **`width`** (default `640`)
- **`fit`** (default `crop`) to clarify what to do when requested height and width doesn't match the original upload, which should be one of:
  - **`crop`** cut parts of the video that doesn't fit in the given size
  - **`clip`** preserve the entire frame and decrease the size of the image within given size
  - **`scale`** distort the image to fit the given size
  - **`fill`** preserve the entire frame and fill the rest of the requested size with black background

## Use Case 2: Setting the default thumbnail timestamp using the API

By default, the Stream Player sets the thumbnail to the first frame of the video.

You can change this default value by setting the "thumbnailTimestampPct" value using the API:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X POST </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">&quot;Authorization: Bearer </span><span class="CodeBlock--token-string CodeBlock--token-variable">$TOKEN</span><span class="CodeBlock--token-string">&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-d </span><span class="CodeBlock--token-string">'{&quot;uid&quot;: &quot;$VIDEOID&quot;, &quot;thumbnailTimestampPct&quot;: &ltpct&gt}'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/accounts/</span><span class="CodeBlock--token-variable">$ACCOUNT</span><span class="CodeBlock--token-plain">/stream/</span><span class="CodeBlock--token-variable">$VIDEOID</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

`thumbnailTimestampPct` is a value between 0.0 (the first frame of the video) and 1.0 (the last frame of the video). This is particularly useful if you have videos of varying lengths. For example, you wanted the thumbnail to be the frame at the half way point of your videos, you can simply set the `thumbnailTimestampPct` value to 0.5.

The example will yield a request:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X POST </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">&quot;Authorization: Bearer </span><span class="CodeBlock--token-string CodeBlock--token-variable">$TOKEN</span><span class="CodeBlock--token-string">&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-d </span><span class="CodeBlock--token-string">'{&quot;uid&quot;: &quot;$VIDEOID&quot;, &quot;thumbnailTimestampPct&quot;: 0.5}'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/accounts/</span><span class="CodeBlock--token-variable">$ACCOUNT</span><span class="CodeBlock--token-plain">/stream/</span><span class="CodeBlock--token-variable">$VIDEOID</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Use Case 3: Generating animated thumbnails

Stream supports animated GIFs as thumbnails. Views using animated thumbnails do not count in Stream views or watch time for billing or analytics.

### Animated GIF thumbnails

`
 https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s
 `

<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s" />

Supported URL attributes for animated thumbnails are:

- **`time`** (default `0s`) time from the video e.g. `8m`, `5m2s`
- **`height`** (default `640`)
- **`width`** (default `640`)
- **`fit`** (default `crop`) to clarify what to do when requested height and width doesn't match the original upload, which should be one of:
  - **`crop`** cut parts of the video that doesn't fit in the given size
  - **`clip`** preserve the entire frame and decrease the size of the image within given size
  - **`scale`** distort the image to fit the given size
  - **`fill`** preserve the entire frame and fill the rest of the requested size with black background
- **`duration`** (default `5s`)
- **`fps`** (default `8`)
