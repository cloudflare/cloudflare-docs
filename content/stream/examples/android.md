---
type: example
summary: Example of video playback on Android using ExoPlayer
tags:
  - Playback
pcx_content_type: configuration
title: Android (ExoPlayer)
weight: 2
layout: example
---

[Run and edit this code in your browser on Stackblitz.](https://workers.new/stream/dash-js) 

```html
<html>
	<head>
		<script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
	</head>
	<body>
		<div>
			<div class="code">
				<video
					data-dashjs-player=""
					autoplay=""
					src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.mpd"
					controls="true"
				></video>
			</div>
		</div>
	</body>
</html>
```

Refer to the [dash.js documentation](https://github.com/Dash-Industry-Forum/dash.js/) for more information.