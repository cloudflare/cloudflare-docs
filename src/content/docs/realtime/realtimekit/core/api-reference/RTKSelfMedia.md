---
title: RTKSelfMedia
sidebar_position: 16
---

<!-- Auto Generated Below -->

<a name="module_RTKSelfMedia"></a>

The RTKSelfMedia class provides methods to manage the local participant's media.


* [RTKSelfMedia](#module_RTKSelfMedia)
    * [.audioTrack](#module_RTKSelfMedia+audioTrack)
    * [.rawAudioTrack](#module_RTKSelfMedia+rawAudioTrack)
    * [.mediaPermissions](#module_RTKSelfMedia+mediaPermissions)
    * [.videoTrack](#module_RTKSelfMedia+videoTrack)
    * [.rawVideoTrack](#module_RTKSelfMedia+rawVideoTrack)
    * [.screenShareTracks](#module_RTKSelfMedia+screenShareTracks)
    * [.audioEnabled](#module_RTKSelfMedia+audioEnabled)
    * [.videoEnabled](#module_RTKSelfMedia+videoEnabled)
    * [.screenShareEnabled](#module_RTKSelfMedia+screenShareEnabled)
    * [.addAudioMiddleware(audioMiddleware)](#module_RTKSelfMedia+addAudioMiddleware)
    * [.removeAudioMiddleware(audioMiddleware)](#module_RTKSelfMedia+removeAudioMiddleware)
    * [.removeAllAudioMiddlewares()](#module_RTKSelfMedia+removeAllAudioMiddlewares)
    * [.addVideoMiddleware(videoMiddleware)](#module_RTKSelfMedia+addVideoMiddleware)
    * [.setVideoMiddlewareGlobalConfig(config)](#module_RTKSelfMedia+setVideoMiddlewareGlobalConfig)
    * [.removeVideoMiddleware(videoMiddleware)](#module_RTKSelfMedia+removeVideoMiddleware)
    * [.removeAllVideoMiddlewares()](#module_RTKSelfMedia+removeAllVideoMiddlewares)
    * [.getCurrentDevices()](#module_RTKSelfMedia+getCurrentDevices)
    * [.getAudioDevices()](#module_RTKSelfMedia+getAudioDevices)
    * [.getVideoDevices()](#module_RTKSelfMedia+getVideoDevices)
    * [.getSpeakerDevices()](#module_RTKSelfMedia+getSpeakerDevices)
    * [.getDeviceById(deviceId, kind)](#module_RTKSelfMedia+getDeviceById)
    * [.setDevice(device)](#module_RTKSelfMedia+setDevice)

<a name="module_RTKSelfMedia+audioTrack"></a>

### meeting.self.audioTrack
Returns the `audioTrack`.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+rawAudioTrack"></a>

### meeting.self.rawAudioTrack
Returns the `rawAudioTrack` having no middleware executed on it.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+mediaPermissions"></a>

### meeting.self.mediaPermissions
Returns the current audio and video permissions given by the user.
'ACCEPTED' if the user has given permission to use the media.
'CANCELED' if the user has canceled the screenshare.
'DENIED' if the user has denied permission to use the media.
'SYS_DENIED' if the user's system has denied permission to use the media.
'UNAVAILABLE' if the media is not available (or being used by a different application).

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+videoTrack"></a>

### meeting.self.videoTrack
Returns the `videoTrack`.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+rawVideoTrack"></a>

### meeting.self.rawVideoTrack
Returns the `videoTrack` having no middleware executed on it.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+screenShareTracks"></a>

### meeting.self.screenShareTracks
Returns the screen share tracks.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+audioEnabled"></a>

### meeting.self.audioEnabled
Returns true if audio is enabled.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+videoEnabled"></a>

### meeting.self.videoEnabled
Returns true if video is enabled.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+screenShareEnabled"></a>

### meeting.self.screenShareEnabled
Returns true if screen share is enabled.

**Kind**: instance property of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+addAudioMiddleware"></a>

### meeting.self.addAudioMiddleware(audioMiddleware)
Adds the audio middleware to be executed on the raw audio stream.
If there are more than 1 audio middlewares,
they will be executed in the sequence they were added in.
If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type |
| --- | --- |
| audioMiddleware | <code>AudioMiddleware</code> | 

<a name="module_RTKSelfMedia+removeAudioMiddleware"></a>

### meeting.self.removeAudioMiddleware(audioMiddleware)
Removes the audio middleware, if it is there.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type |
| --- | --- |
| audioMiddleware | <code>AudioMiddleware</code> | 

<a name="module_RTKSelfMedia+removeAllAudioMiddlewares"></a>

### meeting.self.removeAllAudioMiddlewares()
Removes all audio middlewares, if they are there.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+addVideoMiddleware"></a>

### meeting.self.addVideoMiddleware(videoMiddleware)
Adds the video middleware to be executed on the raw video stream.
If there are more than 1 video middlewares,
they will be executed in the sequence they were added in.
If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type |
| --- | --- |
| videoMiddleware | <code>VideoMiddleware</code> | 

<a name="module_RTKSelfMedia+setVideoMiddlewareGlobalConfig"></a>

### meeting.self.setVideoMiddlewareGlobalConfig(config)
Sets global config to be used by video middlewares.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>VideoMiddlewareGlobalConfig</code> | config |
| config.disablePerFrameCanvasRendering | <code>boolean</code> | If set to true, Instead of calling Middleware for every frame, Middleware will only be called once that too with empty canvas,  it is the responsibility of the middleware author to keep updating this canvas. `meeting.self.rawVideoTrack` can be used to retrieve video track for the periodic updates. |

<a name="module_RTKSelfMedia+removeVideoMiddleware"></a>

### meeting.self.removeVideoMiddleware(videoMiddleware)
Removes the video middleware, if it is there.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type |
| --- | --- |
| videoMiddleware | <code>VideoMiddleware</code> | 

<a name="module_RTKSelfMedia+removeAllVideoMiddlewares"></a>

### meeting.self.removeAllVideoMiddlewares()
Removes all video middlewares, if they are there.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+getCurrentDevices"></a>

### meeting.self.getCurrentDevices()
Returns the media devices currently being used.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+getAudioDevices"></a>

### meeting.self.getAudioDevices()
Returns the local participant's audio devices.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+getVideoDevices"></a>

### meeting.self.getVideoDevices()
Returns the local participant's video devices.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+getSpeakerDevices"></a>

### meeting.self.getSpeakerDevices()
Returns the local participant's speaker devices.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  
<a name="module_RTKSelfMedia+getDeviceById"></a>

### meeting.self.getDeviceById(deviceId, kind)
Returns the local participant's device, indexed by ID and kind.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>string</code> | The ID of the device. |
| kind | <code>&#x27;audio&#x27;</code> \| <code>&#x27;video&#x27;</code> \| <code>&#x27;speaker&#x27;</code> | The kind of the device: audio, video, or speaker. |

<a name="module_RTKSelfMedia+setDevice"></a>

### meeting.self.setDevice(device)
Change the current media device that is being used by the local participant.

**Kind**: instance method of [<code>RTKSelfMedia</code>](#module_RTKSelfMedia)  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>MediaDeviceInfo</code> | The device that is to be used. A device of the same `kind` will be replaced. the primary stream. |

