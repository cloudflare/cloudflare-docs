---
pcx-content-type: reference
title: Use the Stream player
weight: 1
---

# Use the Stream player

The Stream player can be placed on a web page in an iframe element with the video UID (or [signed token](/stream/viewing-videos/securing-your-stream/)) replacing `$VIDEOID` in the example below.

```html
<iframe
  src="https://iframe.videodelivery.net/$VIDEOID"
  style="border: none"
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
  style="border: none"
  height="400"
  width="400"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

### Responsive

To make an iframe responsive, it needs styles to enforce an aspect ratio by setting the `iframe` to `position: absolute;` and having it fill a container that uses a calculated `padding-top` percentage.

```html
<!-- padding-top calculation is height / width (assuming 16:9 aspect ratio) -->
<div style="position: relative; padding-top: 56.25%">
  <iframe
    src="https://iframe.videodelivery.net/$VIDEOID"
    style="border: none; position: absolute; top: 0; height: 100%; width: 100%"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>
```

## Basic Options

Player options are configured with querystring parameters in the iframe's `src` attribute. For example:

`https://iframe.videodelivery.net/$VIDEOID?autoplay=true&muted=true`

{{<definitions>}}

- `autoplay` {{<prop-meta>}}default: `false`{{</prop-meta>}}

  - If the autoplay flag is included as a querystring parameter, the player will attempt to autoplay the video. If you don't want the video to autoplay, don't include the autoplay flag at all (instead of setting it to `autoplay=false`.) Note that mobile browsers generally do not support this attribute, the user must tap the screen to begin video playback. Please consider mobile users or users with Internet usage limits as some users don't have unlimited Internet access before using this attribute.

    {{<Aside>}}
Some browsers now prevent videos with audio from playing automatically. You may set `muted` to `true` to allow your videos to autoplay. For more information, go [here](https://webkit.org/blog/6784/new-video-policies-for-ios/).
    {{</Aside>}}

- `controls` {{<prop-meta>}}default: `true`{{</prop-meta>}}

  - Shows video controls such as buttons for play/pause, volume controls.

- `defaultTextTrack`

  - Will initialize the player with the specified language code's text track enabled. The value should be the BCP-47 language code that was used to [upload the text track](/stream/edit-manage-videos/edit-videos/adding-captions/). If the specified language code has no captions available, the player will behave as though no language code had been provided.

    {{<Aside>}}

This will _only_ work once during initialization. Beyond that point the user has full control over their text track settings.

        {{</Aside>}}

- `letterboxColor`

  - Any valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) provided will be applied to the letterboxing/pillarboxing of the player's UI. This can be set to `transparent` to avoid letterboxing/pillarboxing when not in fullscreen mode.

    {{<Aside type="note">}}

**Note:** Like all query string parameters, this value _must_ be URI encoded. For example, the color value `hsl(120 80% 95%)` can be encoded using JavaScript's `encodeURIComponent()` function to `hsl(120%2080%25%2095%25)`.

    {{</Aside>}}

- `loop` {{<prop-meta>}}default: `false`{{</prop-meta>}}

  - If enabled the player will automatically seek back to the start upon reaching the end of the video.

- `muted` {{<prop-meta>}}default: `false`{{</prop-meta>}}

  - If set, the audio will be initially silenced.

- `preload` {{<prop-meta>}}default: `none`{{</prop-meta>}}

  - This enumerated option is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. You may specify the value `preload="auto"` to preload the beginning of the video. Not including the option or using `preload="metadata"` will just load the metadata needed to start video playback when requested.

    {{<Aside>}}

The `<video>` element does not force the browser to follow the value of this option; it is a mere hint. Even though the `preload="none"` option is a valid HTML5 option, Stream player will always load some metadata to initialize the player. The amount of data loaded in this case is negligible.

      {{</Aside>}}

- `poster` {{<prop-meta>}}defaults to the first frame of the video{{</prop-meta>}}

  - A URL for an image to be shown before the video is started or while the video is downloading. If this attribute isn't specified, a thumbnail image of the video is shown.

    {{<Aside type="note">}}

**Note:** Like all query string parameters, this value _must_ be URI encoded. For example, the thumbnail at `https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270` can be encoded using JavaScript's `encodeURIComponent()` function to `https%3A%2F%2Fvideodelivery.net%2F5d5bc37ffcf54c9b82e996823bffbb81%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D68s%26height%3D270`.

        {{</Aside>}}

- `primaryColor`

  - Any valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) provided will be applied to certain elements of the player's UI.

    {{<Aside type="note">}}

**Note:** Like all query string parameters, this value _must_ be URI encoded. For example, the color value `hsl(120 80% 95%)` can be encoded using JavaScript's `encodeURIComponent()` function to `hsl(120%2080%25%2095%25)`.

        {{</Aside>}}

- `src`

  - The video id from the video you've uploaded to Cloudflare Stream should be included here.

- `startTime`

  - A timestamp that specifies the time when playback begins. If a plain number is used such as `?startTime=123`, it will be interpreted as `123` seconds. More human readable timestamps can also be used, such as `?startTime=1h12m27s` for `1 hour, 12 minutes, and 27 seconds`.

- `ad-url`

  - The Stream Player supports VAST Tags to insert ads such as prerolls. If you have a VAST tag URI, you can pass it to the Stream Player by setting the `ad-url` parameter. The URI must be encoded using a function like JavaScript's `encodeURIComponent()`.

{{</definitions>}}

## Debug Info

The Stream player Debug menu can be shown and hidden using the key combination `Shift-D` while the video is playing.
