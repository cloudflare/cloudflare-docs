---
title: RTKSelfMedia
sidebar_position: 16
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

## Members

<dl>
<dt><a href="#audioTrack">audioTrack</a></dt>
<dd><p>Returns the <code>audioTrack</code>.</p>
</dd>
<dt><a href="#rawAudioTrack">rawAudioTrack</a></dt>
<dd><p>Returns the <code>rawAudioTrack</code> having no middleware executed on it.</p>
</dd>
<dt><a href="#mediaPermissions">mediaPermissions</a></dt>
<dd><p>Returns the current audio and video permissions given by the user.
&#39;ACCEPTED&#39; if the user has given permission to use the media.
&#39;CANCELED&#39; if the user has canceled the screenshare.
&#39;DENIED&#39; if the user has denied permission to use the media.
&#39;SYS_DENIED&#39; if the user&#39;s system has denied permission to use the media.
&#39;UNAVAILABLE&#39; if the media is not available (or being used by a different application).</p>
</dd>
<dt><a href="#videoTrack">videoTrack</a></dt>
<dd><p>Returns the <code>videoTrack</code>.</p>
</dd>
<dt><a href="#rawVideoTrack">rawVideoTrack</a></dt>
<dd><p>Returns the <code>videoTrack</code> having no middleware executed on it.</p>
</dd>
<dt><a href="#screenShareTracks">screenShareTracks</a></dt>
<dd><p>Returns the screen share tracks.</p>
</dd>
<dt><a href="#audioEnabled">audioEnabled</a></dt>
<dd><p>Returns true if audio is enabled.</p>
</dd>
<dt><a href="#videoEnabled">videoEnabled</a></dt>
<dd><p>Returns true if video is enabled.</p>
</dd>
<dt><a href="#screenShareEnabled">screenShareEnabled</a></dt>
<dd><p>Returns true if screen share is enabled.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(options, [skipAwaits], [context])</a></dt>
<dd></dd>
<dt><a href="#addAudioMiddleware">addAudioMiddleware(audioMiddleware)</a></dt>
<dd><p>Adds the audio middleware to be executed on the raw audio stream.
If there are more than 1 audio middlewares,
they will be executed in the sequence they were added in.
If you want the sequence to be altered, please remove all previous middlewares and re-add.</p>
</dd>
<dt><a href="#removeAudioMiddleware">removeAudioMiddleware(audioMiddleware)</a></dt>
<dd><p>Removes the audio middleware, if it is there.</p>
</dd>
<dt><a href="#removeAllAudioMiddlewares">removeAllAudioMiddlewares()</a></dt>
<dd><p>Removes all audio middlewares, if they are there.</p>
</dd>
<dt><a href="#addVideoMiddleware">addVideoMiddleware(videoMiddleware)</a></dt>
<dd><p>Adds the video middleware to be executed on the raw video stream.
If there are more than 1 video middlewares,
they will be executed in the sequence they were added in.
If you want the sequence to be altered, please remove all previous middlewares and re-add.</p>
</dd>
<dt><a href="#setVideoMiddlewareGlobalConfig">setVideoMiddlewareGlobalConfig(config)</a></dt>
<dd><p>Sets global config to be used by video middlewares.</p>
</dd>
<dt><a href="#removeVideoMiddleware">removeVideoMiddleware(videoMiddleware)</a></dt>
<dd><p>Removes the video middleware, if it is there.</p>
</dd>
<dt><a href="#removeAllVideoMiddlewares">removeAllVideoMiddlewares()</a></dt>
<dd><p>Removes all video middlewares, if they are there.</p>
</dd>
<dt><a href="#getCurrentDevices">getCurrentDevices()</a></dt>
<dd><p>Returns the media devices currently being used.</p>
</dd>
<dt><a href="#getAudioDevices">getAudioDevices()</a></dt>
<dd><p>Returns the local participant&#39;s audio devices.</p>
</dd>
<dt><a href="#getVideoDevices">getVideoDevices()</a></dt>
<dd><p>Returns the local participant&#39;s video devices.</p>
</dd>
<dt><a href="#getSpeakerDevices">getSpeakerDevices()</a></dt>
<dd><p>Returns the local participant&#39;s speaker devices.</p>
</dd>
<dt><a href="#getDeviceById">getDeviceById(deviceId, kind)</a></dt>
<dd><p>Returns the local participant&#39;s device, indexed by ID and kind.</p>
</dd>
<dt><a href="#setDevice">setDevice(device)</a></dt>
<dd><p>Change the current media device that is being used by the local participant.</p>
</dd>
</dl>

<a name="audioTrack"></a>

Returns the `audioTrack`.

**Kind**: global variable  
<a name="rawAudioTrack"></a>

Returns the `rawAudioTrack` having no middleware executed on it.

**Kind**: global variable  
<a name="mediaPermissions"></a>

Returns the current audio and video permissions given by the user.
'ACCEPTED' if the user has given permission to use the media.
'CANCELED' if the user has canceled the screenshare.
'DENIED' if the user has denied permission to use the media.
'SYS_DENIED' if the user's system has denied permission to use the media.
'UNAVAILABLE' if the media is not available (or being used by a different application).

**Kind**: global variable  
<a name="videoTrack"></a>

Returns the `videoTrack`.

**Kind**: global variable  
<a name="rawVideoTrack"></a>

Returns the `videoTrack` having no middleware executed on it.

**Kind**: global variable  
<a name="screenShareTracks"></a>

Returns the screen share tracks.

**Kind**: global variable  
<a name="audioEnabled"></a>

Returns true if audio is enabled.

**Kind**: global variable  
<a name="videoEnabled"></a>

Returns true if video is enabled.

**Kind**: global variable  
<a name="screenShareEnabled"></a>

Returns true if screen share is enabled.

**Kind**: global variable  
<a name="init"></a>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| [options.video] | <code>boolean</code> |  | 
| [options.audio] | <code>boolean</code> |  | 
| [options.constraints] | <code>MediaConstraints</code> |  | 
| [skipAwaits] | <code>boolean</code> | <code>false</code> | 
| [context] | <code>Context</code> | <code></code> | 

<a name="addAudioMiddleware"></a>

Adds the audio middleware to be executed on the raw audio stream.
If there are more than 1 audio middlewares,
they will be executed in the sequence they were added in.
If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: global function  

| Param | Type |
| --- | --- |
| audioMiddleware | <code>AudioMiddleware</code> | 

<a name="removeAudioMiddleware"></a>

Removes the audio middleware, if it is there.

**Kind**: global function  

| Param | Type |
| --- | --- |
| audioMiddleware | <code>AudioMiddleware</code> | 

<a name="removeAllAudioMiddlewares"></a>

Removes all audio middlewares, if they are there.

**Kind**: global function  
<a name="addVideoMiddleware"></a>

Adds the video middleware to be executed on the raw video stream.
If there are more than 1 video middlewares,
they will be executed in the sequence they were added in.
If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: global function  

| Param | Type |
| --- | --- |
| videoMiddleware | <code>VideoMiddleware</code> | 

<a name="setVideoMiddlewareGlobalConfig"></a>

Sets global config to be used by video middlewares.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>VideoMiddlewareGlobalConfig</code> | config |
| config.disablePerFrameCanvasRendering | <code>boolean</code> | If set to true, Instead of calling Middleware for every frame, Middleware will only be called once that too with empty canvas,  it is the responsibility of the middleware author to keep updating this canvas. `meeting.self.rawVideoTrack` can be used to retrieve video track for the periodic updates. |

<a name="removeVideoMiddleware"></a>

Removes the video middleware, if it is there.

**Kind**: global function  

| Param | Type |
| --- | --- |
| videoMiddleware | <code>VideoMiddleware</code> | 

<a name="removeAllVideoMiddlewares"></a>

Removes all video middlewares, if they are there.

**Kind**: global function  
<a name="getCurrentDevices"></a>

Returns the media devices currently being used.

**Kind**: global function  
<a name="getAudioDevices"></a>

Returns the local participant's audio devices.

**Kind**: global function  
<a name="getVideoDevices"></a>

Returns the local participant's video devices.

**Kind**: global function  
<a name="getSpeakerDevices"></a>

Returns the local participant's speaker devices.

**Kind**: global function  
<a name="getDeviceById"></a>

Returns the local participant's device, indexed by ID and kind.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>string</code> | The ID of the device. |
| kind | <code>&#x27;audio&#x27;</code> \| <code>&#x27;video&#x27;</code> \| <code>&#x27;speaker&#x27;</code> | The kind of the device: audio, video, or speaker. |

<a name="setDevice"></a>

Change the current media device that is being used by the local participant.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>MediaDeviceInfo</code> | The device that is to be used. A device of the same `kind` will be replaced. the primary stream. |

