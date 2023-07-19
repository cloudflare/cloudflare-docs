---
type: example
summary: Example of video playback with Cloudflare Stream and Shaka Player
tags:
  - Playback
pcx_content_type: configuration
title: Shaka Player
weight: 7
layout: example
---

[Run and edit this code in your browser on StackBlitz.](https://workers.new/stream/shaka-player) 

First, create a video element, using the poster attribute to set a preview thumbnail image. Refer to [Display thumbnails](/stream/viewing-videos/displaying-thumbnails/) for instructions on how to generate a thumbnail image using Cloudflare Stream.

```html
<video
	id="video"
	width="640"
	poster="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg"
	controls
	autoplay
></video>
```

Then listen for `DOMContentLoaded` event, create a new instance of Shaka Player, and load the manifest URI.

```javascript
// Replace the manifest URI with an HLS or DASH manifest from Cloudflare Stream
const manifestUri =
	'https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.mpd';

document.addEventListener('DOMContentLoaded', () => {
	const player = new shaka.Player(video);
	const video = document.getElementById('video');
	await player.load(manifestUri);
});
```

Refer to the [Shaka Player documentation](https://github.com/shaka-project/shaka-player) for more information.