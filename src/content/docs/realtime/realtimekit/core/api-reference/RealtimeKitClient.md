---
title: RealtimeKitClient
sidebar_position: 3
---

<!-- Auto Generated Below -->

<a name="module_RealtimeKitClient"></a>

The RealtimeKitClient class is the main class of the web core library.
An object of the RealtimeKitClient class can be created using
`await RealtimeKitClient.init({ ... })`. Typically, an object of `RealtimeKitClient` is
named `meeting`.


* [RealtimeKitClient](#module_RealtimeKitClient)
    * _instance_
        * [.participants](#module_RealtimeKitClient+participants)
        * [.self](#module_RealtimeKitClient+self)
        * [.meta](#module_RealtimeKitClient+meta)
        * [.ai](#module_RealtimeKitClient+ai)
        * [.plugins](#module_RealtimeKitClient+plugins)
        * [.chat](#module_RealtimeKitClient+chat)
        * [.polls](#module_RealtimeKitClient+polls)
        * [.connectedMeetings](#module_RealtimeKitClient+connectedMeetings)
        * [.__internals__](#module_RealtimeKitClient+__internals__)
        * [.join()](#module_RealtimeKitClient+join)
        * [.leave()](#module_RealtimeKitClient+leave)
    * _static_
        * [.initMedia([options], [skipAwaits], [cachedUserDetails])](#module_RealtimeKitClient.initMedia)
        * [.init(options)](#module_RealtimeKitClient.init)

<a name="module_RealtimeKitClient+participants"></a>

### meeting.participants
The `participants` object consists of 4 maps of participants,
`waitlisted`, `joined`, `active`, `pinned`. The maps are indexed by
`peerId`s, and the values are the corresponding participant objects.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+self"></a>

### meeting.self
The `self` object can be used to manipulate audio and video settings,
and other configurations for the local participant. This exposes methods
to enable and disable media tracks, share the user's screen, etc.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+meta"></a>

### meeting.meta
The `room` object stores information about the current meeting, such
as chat messages, polls, room name, etc.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+ai"></a>

### meeting.ai
The `ai` object is used to interface with AI features.
You can obtain the live meeting transcript and use other meeting AI
features such as summary, and agenda using this object.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+plugins"></a>

### meeting.plugins
The `plugins` object stores information about the plugins available in
the current meeting. It exposes methods to activate and deactivate them.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+chat"></a>

### meeting.chat
The chat object stores the chat messages that were sent in the meeting.
This includes text messages, images, and files.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+polls"></a>

### meeting.polls
The polls object stores the polls that were initiated in the meeting.
It exposes methods to create and vote on polls.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+connectedMeetings"></a>

### meeting.connectedMeetings
The connectedMeetings object stores the connected meetings states.
It exposes methods to create/read/update/delete methods for connected meetings.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+__internals__"></a>

### meeting.\_\_internals\_\_
The __internals__ object exposes the internal tools & utilities such as features and logger
so that client can utilise the same to build their own feature based UI.
Logger (__internals__.logger) can be used to send logs to servers
	to inform  of issues, if any, proactively.

**Kind**: instance property of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+join"></a>

### meeting.join()
The `join()` method can be used to join the meeting.
A `roomJoined` event is emitted on `self` when the room
is joined successfully.

**Kind**: instance method of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient+leave"></a>

### meeting.leave()
The `leave()` method can be used to leave a meeting.

**Kind**: instance method of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  
<a name="module_RealtimeKitClient.initMedia"></a>

### meeting.initMedia([options], [skipAwaits], [cachedUserDetails])
**Kind**: static method of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  

| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> |  | 
| [options.video] | <code>boolean</code> |  | 
| [options.audio] | <code>boolean</code> |  | 
| [options.constraints] | <code>MediaConstraints</code> |  | 
| [skipAwaits] | <code>boolean</code> | <code>false</code> | 
| [cachedUserDetails] | <code>CachedUserDetails</code> |  | 

<a name="module_RealtimeKitClient.init"></a>

### meeting.init(options)
The `init` method can be used to instantiate the RealtimeKitClient class.
This returns an instance of RealtimeKitClient, which can be used to perform
actions on the meeting.

**Kind**: static method of [<code>RealtimeKitClient</code>](#module_RealtimeKitClient)  

| Param | Description |
| --- | --- |
| options | The options object. |
| options.authToken | The authorization token received using the API. |
| options.baseURI | The base URL of the API. |
| options.defaults | The default audio and video settings. |

