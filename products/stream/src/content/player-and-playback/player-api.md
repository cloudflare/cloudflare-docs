---
hidden: true
---

# Player API

Attributes are added in the `<stream>` tag without quotes, as you can see below:

    <stream attribute-added-here src="5d5bc37ffcf54c9b82e996823bffbb81"></stream>

Multiple attributes can be used together, added one after each other like this:

     <stream attribute-1 attribute-2 attribute-3 src="5d5bc37ffcf54c9b82e996823bffbb81"></stream>

## Supported attributes

<Definitions>

- `autoplay` <Type>boolean</Type>

  - Tells the browser to immediately start downloading the video and play it as soon as it can. Note that mobile browsers generally do not support this attribute, the user must tap the screen to begin video playback. Please consider mobile users or users with Internet usage limits as some users don't have unlimited Internet access before using this attribute.

    <Aside>

    To disable video autoplay, the `autoplay` attribute needs to be removed altogether as this attribute. Setting `autoplay="false"` will not work; the video will autoplay if the attribute is there in the `<stream>` tag.

    In addition, some browsers now prevent videos with audio from playing automatically. You may add the `mute` attribute to allow your videos to autoplay. For  more information, go [here](https://webkit.org/blog/6784/new-video-policies-for-ios/).

    </Aside>

- `controls` <Type>boolean</Type>

  - Shows the default video controls such as buttons for play/pause, volume controls. You may choose to build buttons and controls that work with the player. [See an example.](/recipes/custom-player-ui/)

- `height` <Type>integer</Type>

  - The height of the video's display area, in CSS pixels.

- `loop` <Type>boolean</Type>

  - A Boolean attribute; if included in the HTML tag, player will, automatically seek back to the start upon reaching the end of the video.

- `muted` <Type>boolean</Type>

  - A Boolean attribute which indicates the default setting of the audio contained in the video. If set, the audio will be initially silenced.

- `preload` <Type>string | null</Type>

  - This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. You may choose to include this attribute as a boolean attribute without a value, or you may specify the value `preload="auto"` to preload the beginning of the video. Not including the attribute or using `preload="metadata"` will just load the metadata needed to start video playback when requested.

    <Aside>

    The `<video>` element does not force the browser to follow the value of this attribute; it is a mere hint. Even though the `preload="none"` option is a valid HTML5 attribute, Stream player will always load some metadata to initialize the player. The amount of data loaded in this case is negligable.

    </Aside>

- `poster` <Type>string</Type>

  - A URL for an image to be shown before the video is started or while the video is downloading. If this attribute isn't specified, a thumbnail image of the video is shown.

- `src` <Type>string</Type>

  - The video id from the video you've uploaded to Cloudflare Stream should be included here.

- `width` <Type>integer</Type>

  - The width of the video's display area, in CSS pixels.

</Definitions>

## Methods

<Definitions>

- `play()` <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ Promise">Promise</TypeLink>

  - Start video playback.

- `pause()` <Type>null</Type>

  - Pause video playback.

</Definitions>

## Properties

<Definitions>

- `autoplay`

  - Sets or returns whether the autoplay attribute was set, allowing video playback to start upon load.

- `controls`

  - Sets or returns whether the video should display controls (like play/pause etc.)

- `currentTime`

  - Returns the current playback time in seconds. Setting this value seeks the video to a new time.

- `duration` <PropMeta>readonly</PropMeta>

  - Returns the duration of the video in seconds.

- `ended` <PropMeta>readonly</PropMeta>

  - Returns whether the video has ended.

- `loop`

  - Sets or returns whether the video should start over when it reaches the end

- `muted`

  - Sets or returns whether the audio should be played with the video

- `paused` <PropMeta>readonly</PropMeta>

  - Returns whether the video is paused

- `preload`

  - Sets or returns whether the video should be preloaded upon element load.

- `volume`

  - Sets or returns volume from 0.0 (silent) to 1.0 (maximum value)

</Definitions>

## Events

### Standard video element events

<Definitions>

Stream supports most of the [standardized media element events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).

- `abort`

  - Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.

- `canplay`

  - Sent when enough data is available that the media can be played, at least for a couple of frames.

- `canplaythrough`

  - Sent when the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.

- `durationchange`

  - The metadata has loaded or changed, indicating a change in duration of the media.  This is sent, for example, when the media has loaded enough that the duration is known.

- `ended`

  - Sent when playback completes.

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

### Non-standard events

Non-standard events are prefixed with `stream-` to distinguish them from standard events.

<Definitions>

- `stream-adstart`

  - Fires when `ad-url` attribute is present and the ad begins playback

- `stream-adend`

  - Fires when `ad-url` attribute is present and the ad finishes playback

- `stream-adtimeout`

  - Fires when `ad-url` attribute is present and the ad took too long to load.

</Definitions>
