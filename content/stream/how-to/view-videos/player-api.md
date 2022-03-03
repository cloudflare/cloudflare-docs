---
title: View with the player API 
pcx-content-type: reference
weight: 2
meta:
  title: View with the player API 
---

# View with the player API 

The SDK provides an API for programmatically controlling the player and listening for player events.

## Methods

{{<definitions>}}

- `play()` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">}}Promise{{</type-link>}}
  - Start video playback.

- `pause()` {{<type>}}null{{</type>}}
  - Pause video playback.

{{</definitions>}}

## Properties

{{<definitions>}}

- `autoplay` {{<type>}}boolean{{</type>}}
  - Sets or returns whether the autoplay attribute was set, allowing video playback to start upon load.
  
    {{<Aside>}}
  Some browsers prevent videos with audio from playing automatically. You may add the `mute` attribute to allow your videos to autoplay. For  more information, go [here](https://webkit.org/blog/6784/new-video-policies-for-ios/).
    {{</Aside>}}

- `buffered` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges">}}TimeRanges{{</type-link>}} {{<prop-meta>}}readonly{{</prop-meta>}}

  - An object conforming to the TimeRanges interface. This object is normalized, which means that ranges are ordered, don't overlap, aren't empty, and don't touch (adjacent ranges are folded into one bigger range).

- `controls` {{<type>}}boolean{{</type>}}
  - Sets or returns whether the video should display controls (like play/pause etc.)

- `currentTime` {{<type>}}integer{{</type>}}
  - Returns the current playback time in seconds. Setting this value seeks the video to a new time.

- `defaultTextTrack`
  - Will initialize the player with the specified language code's text track enabled. The value should be the BCP-47 language code that was used to [upload the text track](/stream/how-to/add-captions). If the specified language code has no captions available, the player will behave as though no language code had been provided.

    {{<Aside>}}
  This will _only_ work once during initialization. Beyond that point the user has full control over their text track settings.
    {{</Aside>}}

- `duration` {{<type>}}integer{{</type>}} {{<prop-meta>}}readonly{{</prop-meta>}}
  - Returns the duration of the video in seconds

- `ended` {{<type>}}boolean{{</type>}} {{<prop-meta>}}readonly{{</prop-meta>}}
  - Returns whether the video has ended.

- `loop` {{<type>}}boolean{{</type>}}
  - Sets or returns whether the video should start over when it reaches the end

- `muted` {{<type>}}boolean{{</type>}}
  - Sets or returns whether the audio should be played with the video

- `paused` {{<type>}}boolean{{</type>}} {{<prop-meta>}}readonly{{</prop-meta>}}
  - Returns whether the video is paused

- `played` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges">}}TimeRanges{{</type-link>}}{{<prop-meta>}}readonly{{</prop-meta>}}
  - An object conforming to the TimeRanges interface. This object is normalized, which means that ranges are ordered, don't overlap, aren't empty, and don't touch (adjacent ranges are folded into one bigger range).

- `preload` {{<type>}}boolean<{{</type>}}
  - Sets or returns whether the video should be preloaded upon element load. 

    {{<Aside>}}
  The `<video>` element does not force the browser to follow the value of this attribute; it is a mere hint. Even though the `preload="none"` option is a valid HTML5 attribute, Stream Player will always load some metadata to initialize the player. The amount of data loaded in this case is negligible.
    {{</Aside>}}

- `primaryColor` {{<type>}}string{{</type>}}
  - Any valid [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) provided will be applied to certain elements of the player's UI.

- `volume` {{<type>}}float{{</type>}}
  - Sets or returns volume from 0.0 (silent) to 1.0 (maximum value)

{{</definitions>}}
