---
type: example
summary: Example of video playback with Cloudflare Stream and Vidstack
tags:
  - Playback
pcx_content_type: configuration
title: Vidstack
weight: 7
layout: example
---

[Run and edit this code in your browser on StackBlitz.](https://workers.new/stream/vidstack)

There's a few options to choose from when getting started with Vidstack. Follow any of the links
below that makes the most sense with your current setup:

- [npm + HTML](#html)
- [npm + React](#react)
- [CDN + HTML](#cdn)

## HTML

1. Install the package:

```bash
npm i vidstack
```

2. Import styles and custom elements:

```js
import "vidstack/styles/base.css";
// the following styles are optional - remove to go headless.
import "vidstack/styles/ui/buttons.css";
import "vidstack/styles/ui/sliders.css";

import { defineCustomElements } from "vidstack/elements";

defineCustomElements();
```

3. Add player markup:

```html
<media-player
  src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8"
  poster="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg"
  controls
  aspect-ratio="16/9"
>
  <media-outlet></media-outlet>
</media-player>
```

You're all setup! You can refer to the [Vidstack documentation](https://www.vidstack.io/docs/player/getting-started/editor-setup)
to continue getting started.

## React

1. Install packages:

```bash
npm i vidstack @vidstack/react
```

2. Setup player:

```jsx
import "vidstack/styles/base.css";
// the following styles are optional - remove to go headless.
import "vidstack/styles/ui/buttons.css";
import "vidstack/styles/ui/sliders.css";

import { MediaPlayer, MediaOutlet } from "@vidstack/react";

function Player() {
  return (
    <MediaPlayer
      src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8"
      poster="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg"
      controls
      aspectRatio={16/9}
    >
      <MediaOutlet />
    </MediaPlayer>
  );
}
```

You're all setup! You can refer to the [Vidstack documentation](https://www.vidstack.io/docs/react/player/getting-started/editor-setup) to continue getting started.

## CDN

1. Import stylesheets and scripts:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/base.min.css" />
<!-- the following styles are optional - remove to go headless -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/ui/buttons.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vidstack/styles/ui/sliders.min.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/vidstack/dist/cdn/prod.js"></script>
```

2. Setup player:

```html
<media-player
  src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8"
  poster="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg"
  controls
  aspect-ratio="16/9"
>
  <media-outlet></media-outlet>
</media-player>
```

You're all setup! You can refer to the [Vidstack documentation](https://www.vidstack.io/docs/player/getting-started/editor-setup) to continue getting started.
