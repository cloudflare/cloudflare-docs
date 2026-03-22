---
title: RTKSelf
sidebar_position: 15
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKSelf"></a>

The RTKSelf module represents the current user, and allows to modify the state
of the user in the meeting. The audio and video streams of the user can be retrieved from
this module.


* [RTKSelf](#module_RTKSelf)
    * [.telemetry](#module_RTKSelf+telemetry)
    * [.peerId](#module_RTKSelf+peerId)
    * [.roomState](#module_RTKSelf+roomState)
    * [.permissions](#module_RTKSelf+permissions)
    * [.config](#module_RTKSelf+config)
    * [.roomJoined](#module_RTKSelf+roomJoined)
    * [.isPinned](#module_RTKSelf+isPinned)
    * [.cleanupEvents()](#module_RTKSelf+cleanupEvents)
    * [.setName(name)](#module_RTKSelf+setName)
    * [.setupTracks(options)](#module_RTKSelf+setupTracks)
    * [.enableAudio()](#module_RTKSelf+enableAudio)
    * [.enableVideo()](#module_RTKSelf+enableVideo)
    * [.updateVideoConstraints()](#module_RTKSelf+updateVideoConstraints)
    * [.enableScreenShare()](#module_RTKSelf+enableScreenShare)
    * [.updateScreenshareConstraints()](#module_RTKSelf+updateScreenshareConstraints)
    * [.disableAudio()](#module_RTKSelf+disableAudio)
    * [.disableVideo()](#module_RTKSelf+disableVideo)
    * [.disableScreenShare()](#module_RTKSelf+disableScreenShare)
    * [.getAllDevices()](#module_RTKSelf+getAllDevices)
    * [.setIsPinned()](#module_RTKSelf+setIsPinned)
    * [.pin()](#module_RTKSelf+pin)
    * [.unpin()](#module_RTKSelf+unpin)
    * [.hide()](#module_RTKSelf+hide)
    * [.show()](#module_RTKSelf+show)
    * [.setDevice(device)](#module_RTKSelf+setDevice)
    * [.updateVideo()](#module_RTKSelf+updateVideo)

<a name="module_RTKSelf+telemetry"></a>

### meeting.self.telemetry
**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+peerId"></a>

### meeting.self.peerId
NOTE(ishita1805): Discussed with Ravindra, added a duplicate for consistency
when using identifiers in Locker.
We might want to look at deprecating the `id` sometime later.

**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+roomState"></a>

### meeting.self.roomState
Returns the current state of room
init - Inital State
joined - User is in the meeting
waitlisted - User is in the waitlist state
rejected - User's was in the waiting room, but the entry was rejected
kicked - A priveleged user removed the user from the meeting
left - User left the meeting
ended - The meeting was ended

**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+permissions"></a>

### meeting.self.permissions
Returns the current permission given to the user for the meeting.

**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+config"></a>

### meeting.self.config
Returns configuration for the meeting.

**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+roomJoined"></a>

### meeting.self.roomJoined
Returns true if the local participant has joined the meeting.

**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+isPinned"></a>

### meeting.self.isPinned
Returns true if the current user is pinned.

**Kind**: instance property of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+cleanupEvents"></a>

### meeting.self.cleanupEvents()
**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+setName"></a>

### meeting.self.setName(name)
The name of the user can be set by calling this method.
This will get reflected to other participants ONLY if
this method is called before the room is joined.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the user. |

<a name="module_RTKSelf+setupTracks"></a>

### meeting.self.setupTracks(options)
Sets up the local media tracks.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The audio and video options. |
| [options.video] | <code>boolean</code> | If true, the video stream is fetched. |
| [options.audio] | <code>boolean</code> | If true, the audio stream is fetched. |
| [options.forceReset] | <code>boolean</code> | If true, force resets tracks before re-acquiring. |

<a name="module_RTKSelf+enableAudio"></a>

### meeting.self.enableAudio()
This method is used to unmute the local participant's audio.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+enableVideo"></a>

### meeting.self.enableVideo()
This method is used to start streaming the local participant's video
to the meeting.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+updateVideoConstraints"></a>

### meeting.self.updateVideoConstraints()
This method is used to apply constraints to the current video
stream.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+enableScreenShare"></a>

### meeting.self.enableScreenShare()
This method is used to start sharing the local participant's screen
to the meeting.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+updateScreenshareConstraints"></a>

### meeting.self.updateScreenshareConstraints()
This method is used to apply constraints to the current screenshare
stream.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+disableAudio"></a>

### meeting.self.disableAudio()
This method is used to mute the local participant's audio.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+disableVideo"></a>

### meeting.self.disableVideo()
This participant is used to disable the local participant's video.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+disableScreenShare"></a>

### meeting.self.disableScreenShare()
This method is used to stop sharing the local participant's screen.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+getAllDevices"></a>

### meeting.self.getAllDevices()
Returns all media devices accessible by the local participant.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+setIsPinned"></a>

### meeting.self.setIsPinned()
**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+pin"></a>

### meeting.self.pin()
Returns `self.id` if user has permission
to pin participants.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+unpin"></a>

### meeting.self.unpin()
Returns `self.id` if user has permission
to unpin participants.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+hide"></a>

### meeting.self.hide()
Hide's user's tile in the UI (locally)

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+show"></a>

### meeting.self.show()
Show's user's tile in the UI if hidden (locally)

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
<a name="module_RTKSelf+setDevice"></a>

### meeting.self.setDevice(device)
Change the current media device that is being used by the local participant.

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>MediaDeviceInfo</code> | The device that is to be used. A device of the same `kind` will be replaced. the primary stream. |

<a name="module_RTKSelf+updateVideo"></a>

### meeting.self.updateVideo()
Internal method, do not use

**Kind**: instance method of [<code>RTKSelf</code>](#module_RTKSelf)  
