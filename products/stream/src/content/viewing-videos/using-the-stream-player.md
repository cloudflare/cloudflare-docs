---
order: 0
---

# Using the Stream player

The Stream player can be placed on a web page in an iframe element with the video UID (or [signed URL](/security/signed-urls/)) replacing `$VIDEOID` in the example below.

```html
<iframe
  src="https://iframe.videodelivery.net/$VIDEOID"
  style="border: none;"
  height="720"
  width="1280"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

Stream player is also available as a [React](https://www.npmjs.com/package/@cloudflare/stream-react) or [Angular](https://www.npmjs.com/package/@cloudflare/stream-angular) components

## Player Size

### Fixed Dimensions

Changing the `height` and `width` attributes on the `iframe` will change the pixel value dimensions of the iframe displayed on the host page.

```html
<iframe
  src="https://iframe.videodelivery.net/$VIDEOID"
  style="border: none;"
  height="400"
  width="400"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

### Responsive

To make an iframe responsive, it needs styles to enforce an aspect ratio by setting the `iframe` to `position: absolute;` and having it fill a container that uses a calculated `padding-top` percentage.

```html
<!-- padding-top calcultion is height / width (assuming 16:9 aspect ratio) -->
<div style="position: relative; padding-top: 56.25%;">
  <iframe
    src="https://iframe.videodelivery.net/$VIDEOID"
    style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>
```

## Basic Options

Player options are configured with querystring parameters in the iframe's `src` attribute. For example:

`https://iframe.videodelivery.net/$VIDEOID?autoplay=true&muted=true`

<Definitions>

- `autoplay` <PropMeta>default: `false`</PropMeta>

  - Tells the browser to immediately start downloading the video and play it as soon as it can. Note that mobile browsers generally do not support this attribute, the user must tap the screen to begin video playback. Please consider mobile users or users with Internet usage limits as some users don't have unlimited Internet access before using this attribute.

    <Notice>

    Some browsers now prevent videos with audio from playing automatically. You may set `muted` to `true` to allow your videos to autoplay. For more information, go [here](https://webkit.org/blog/6784/new-video-policies-for-ios/).

    </Notice>

- `controls` <PropMeta>default: `true`</PropMeta>

  - Shows video controls such as buttons for play/pause, volume controls.

- `loop` <PropMeta>default: `false`</PropMeta>

  - If enabled the player will automatically seek back to the start upon reaching the end of the video.

- `muted` <PropMeta>default: `false`</PropMeta>

  - If set, the audio will be initially silenced.

- `preload` <PropMeta>default: `none`</PropMeta>

  - This enumerated option is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. You may specify the value `preload="auto"` to preload the beginning of the video. Not including the option or using `preload="metadata"` will just load the metadata needed to start video playback when requested.

    <Notice>

    The `<video>` element does not force the browser to follow the value of this option; it is a mere hint. Even though the `preload="none"` option is a valid HTML5 option, Stream player will always load some metadata to initialize the player. The amount of data loaded in this case is negligable.

    </Notice>

- `poster` <PropMeta>defaults to the first frame of the video</PropMeta>

  - A URL for an image to be shown before the video is started or while the video is downloading. If this attribute isn't specified, a thumbnail image of the video is shown.

- `src`

  - The video id from the video you've uploaded to Cloudflare Stream should be included here.

</Definitions>