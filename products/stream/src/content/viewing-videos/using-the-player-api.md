---
order: 1
---

# Using the player API

The SDK provides an API for programatically controlling the player and listening for player events.

## Example

```html
<!-- You can use styles and CSS on this iframe element where the video player will appear -->
<iframe
  src="https://iframe.videodelivery.net/$VIDEOID"
  style="border: none;"
  height="720"
  width="1280"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
  id="stream-player"
></iframe>

<script src="https://embed.videodelivery.net/embed/sdk.latest.js"></script>

<!-- Your javascript code below-->
<script>
  const player = Stream(document.getElementById('stream-player'))
  player.addEventListener('play', () => {
    console.log('playing!')
  })
  player.play().catch(() => {
    console.log('playback failed, muting to try again')
    player.muted = true
    player.play()
  })
</script>
```

## Methods

<Definitions>

- `play()` <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ Promise">Promise</TypeLink>

  - Start video playback.

- `pause()` <Type>null</Type>

  - Pause video playback.

</Definitions>

## Properties

<Definitions>

- `autoplay` <Type>boolean</Type>

  - Sets or returns whether the autoplay attribute was set, allowing video playback to start upon load.

    <Aside>

    Some browsers prevent videos with audio from playing automatically. You may add the `mute` attribute to allow your videos to autoplay. For  more information, go [here](https://webkit.org/blog/6784/new-video-policies-for-ios/).

    </Aside>

- `buffered` <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges">TimeRanges</TypeLink> <PropMeta>readonly</PropMeta>

  - An object conforming to the TimeRanges interface. This object is normalized, which means that ranges are ordered, don't overlap, aren't empty, and don't touch (adjacent ranges are folded into one bigger range).

- `controls` <Type>boolean</Type>

  - Sets or returns whether the video should display controls (like play/pause etc.)

- `currentTime` <Type>integer</Type>

  - Returns the current playback time in seconds. Setting this value seeks the video to a new time.

- `duration` <Type>integer</Type> <PropMeta>readonly</PropMeta>

  - Returns the duration of the video in seconds.

- `ended` <Type>boolean</Type> <PropMeta>readonly</PropMeta>

  - Returns whether the video has ended.

- `loop` <Type>boolean</Type>

  - Sets or returns whether the video should start over when it reaches the end

- `muted` <Type>boolean</Type>

  - Sets or returns whether the audio should be played with the video

- `paused` <Type>boolean</Type> <PropMeta>readonly</PropMeta>

  - Returns whether the video is paused

- `played` <Type>boolean</Type> <PropMeta>readonly</PropMeta>

  - An object conforming to the TimeRanges interface. This object is normalized, which means that ranges are ordered, don't overlap, aren't empty, and don't touch (adjacent ranges are folded into one bigger range).

- `preload` <Type>boolean</Type>

  - Sets or returns whether the video should be preloaded upon element load.

  <Aside>

    The `<video>` element does not force the browser to follow the value of this attribute; it is a mere hint. Even though the `preload="none"` option is a valid HTML5 attribute, Stream player will always load some metadata to initialize the player. The amount of data loaded in this case is negligable.

    </Aside>

- `volume` <Type>float</Type>

  - Sets or returns volume from 0.0 (silent) to 1.0 (maximum value)

</Definitions>

## Events

### Standard Video Element Events

We support most of the [standardized media element events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).

<Definitions>

- `abort`

  - Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.

- `canplay`

  - Sent when enough data is available that the media can be played, at least for a couple of frames.

- `canplaythrough`

  - Sent when the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.

- `durationchange`

  - The metadata has loaded or changed, indicating a change in duration of the media. This is sent, for example, when the media has loaded enough that the duration is known.

- `ended`

Sent when playback completes.

- `error`

  - Sent when an error occurs. (e.g. the video has not finished encoding yet, or the video fails to load due to an incorrect signed URL)

- `loadeddata`

  - The first frame of the media has finished loading.

- `loadedmetadata`

  - The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.

- `loadstart`

 - Sent when loading of the media begins.

- `pause`

  - Sent when the playback state is changed to paused (paused property is true).

- `play`

  - Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.

- `playing`

  - Sent when the media has enough data to start playing, after the play event, but also when recovering from being stalled, when looping media restarts, and after seeked, if it was playing before seeking.

- `progress`

  - Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute.

- `ratechange`

  - Sent when the playback speed changes.

- `seeked`

  - Sent when a seek operation completes.

- `seeking`

  - Sent when a seek operation begins.

- `stalled`

  - Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.

- `suspend`

  - Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.

- `timeupdate`

  - The time indicated by the element's currentTime attribute has changed.

- `volumechange`

  - Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).

- `waiting`

  - Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).

</Definitions>

### Non-standard Events

Non-standard events are prefixed with `stream-` to distinguish them from standard events.

<Definitions>

- `stream-adstart`

  - Fires when `ad-url` attribute is present and the ad begins playback

- `stream-adend`

  - Fires when `ad-url` attribute is present and the ad finishes playback

- `stream-adtimeout`

  - Fires when `ad-url` attribute is present and the ad took too long to load.

</Definitions>