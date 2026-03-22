---
title: RTKParticipants
sidebar_position: 8
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKParticipants"></a>

This module represents all the participants in the meeting (except the local user).
It consists of 4 maps:
- `joined`: A map of all participants that have joined the meeting.
- `waitlisted`: A map of all participants that have been added to the waitlist.
- `active`: A map of active participants who should be displayed in the meeting grid.
- `pinned`: A map of pinned participants.


* [RTKParticipants](#module_RTKParticipants)
    * [module.exports](#exp_module_RTKParticipants--module.exports) ⏏
        * [new module.exports(context, self, roomSocketHandler)](#new_module_RTKParticipants--module.exports_new)
        * [.waitlisted](#module_RTKParticipants--module.exports+waitlisted)
        * [.joined](#module_RTKParticipants--module.exports+joined)
        * ~~[.active](#module_RTKParticipants--module.exports+active)~~
        * [.videoSubscribed](#module_RTKParticipants--module.exports+videoSubscribed)
        * [.audioSubscribed](#module_RTKParticipants--module.exports+audioSubscribed)
        * [.pinned](#module_RTKParticipants--module.exports+pinned)
        * [.all](#module_RTKParticipants--module.exports+all)
        * [.pip](#module_RTKParticipants--module.exports+pip)
        * [.telemetry](#module_RTKParticipants--module.exports+telemetry)
        * [.viewMode](#module_RTKParticipants--module.exports+viewMode)
        * [.currentPage](#module_RTKParticipants--module.exports+currentPage)
        * [.lastActiveSpeaker](#module_RTKParticipants--module.exports+lastActiveSpeaker)
        * [.selectedPeers](#module_RTKParticipants--module.exports+selectedPeers)
        * [.count](#module_RTKParticipants--module.exports+count)
        * [.maxActiveRTKParticipantsCount](#module_RTKParticipants--module.exports+maxActiveRTKParticipantsCount)
        * [.pageCount](#module_RTKParticipants--module.exports+pageCount)
        * [.setMaxActiveRTKParticipantsCount(limit)](#module_RTKParticipants--module.exports+setMaxActiveRTKParticipantsCount)
        * [.acceptWaitingRoomRequest(id)](#module_RTKParticipants--module.exports+acceptWaitingRoomRequest)
        * [.acceptAllWaitingRoomRequest(userIds)](#module_RTKParticipants--module.exports+acceptAllWaitingRoomRequest)
        * [.rejectWaitingRoomRequest(id)](#module_RTKParticipants--module.exports+rejectWaitingRoomRequest)
        * [.setViewMode(viewMode)](#module_RTKParticipants--module.exports+setViewMode)
        * [.subscribe(peerIds, [kinds])](#module_RTKParticipants--module.exports+subscribe)
        * [.unsubscribe(peerIds, [kinds])](#module_RTKParticipants--module.exports+unsubscribe)
        * [.setPage(page)](#module_RTKParticipants--module.exports+setPage)
        * [.disableAllAudio(allowUnmute)](#module_RTKParticipants--module.exports+disableAllAudio)
        * [.disableAllVideo()](#module_RTKParticipants--module.exports+disableAllVideo)
        * ~~[.disableAudio(participantId)](#module_RTKParticipants--module.exports+disableAudio)~~
        * ~~[.disableVideo(participantId)](#module_RTKParticipants--module.exports+disableVideo)~~
        * ~~[.kick(participantId)](#module_RTKParticipants--module.exports+kick)~~
        * [.kickAll()](#module_RTKParticipants--module.exports+kickAll)
        * [.broadcastMessage(type, payload, target)](#module_RTKParticipants--module.exports+broadcastMessage)
        * [.getAllJoinedPeers(searchQuery, limit, offset)](#module_RTKParticipants--module.exports+getAllJoinedPeers)
        * [.getRTKParticipantsInMeetingPreJoin()](#module_RTKParticipants--module.exports+getRTKParticipantsInMeetingPreJoin)

<a name="exp_module_RTKParticipants--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKParticipants--module.exports_new"></a>

#### new module.exports(context, self, roomSocketHandler)
This constructs a new Participant object and maintains
the maps of active/joined/waitlisted/pinned/selectedPeers maps.
self : Self


| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| self | <code>Self</code> | 
| roomSocketHandler | <code>RoomSocketHandler</code> | 

<a name="module_RTKParticipants--module.exports+waitlisted"></a>

#### module.exports.waitlisted
Returns a list of participants waiting to join the meeting.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+joined"></a>

#### module.exports.joined
Returns a list of all participants in the meeting.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+active"></a>

#### ~~module.exports.active~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+videoSubscribed"></a>

#### module.exports.videoSubscribed
Returns a list of participants whose video streams are currently consumed.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+audioSubscribed"></a>

#### module.exports.audioSubscribed
Returns a list of participants whose audio streams are currently consumed.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+pinned"></a>

#### module.exports.pinned
Returns a list of participants who have been pinned.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+all"></a>

#### module.exports.all
Returns all added participants irrespective of whether they are currently
in the meeting or not

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+pip"></a>

#### module.exports.pip
Return the controls for Picture-in-Picture

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+telemetry"></a>

#### module.exports.telemetry
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+viewMode"></a>

#### module.exports.viewMode
Indicates whether the meeting is in 'ACTIVE_GRID' mode or 'PAGINATED' mode.

In 'ACTIVE_GRID' mode, participants are populated in the participants.active map
dynamically. The participants present in the map will keep changing when other
participants unmute their audio or turn on their videos.

In 'PAGINATED' mode, participants are populated in the participants.active map
just once, and the participants in the map will only change if the page number is
changed by the user using setPage(page).

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+currentPage"></a>

#### module.exports.currentPage
This indicates the current page that has been set by the user in PAGINATED mode.
If the meeting is in ACTIVE_GRID mode, this value will be 0.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+lastActiveSpeaker"></a>

#### module.exports.lastActiveSpeaker
This stores the `participantId` of the last participant who spoke in the meeting.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+selectedPeers"></a>

#### module.exports.selectedPeers
Keeps a list of all participants who have been present in the selected peers list.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+count"></a>

#### module.exports.count
Returns the number of participants who are joined in the meeting.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+maxActiveRTKParticipantsCount"></a>

#### module.exports.maxActiveRTKParticipantsCount
Returns the maximum number of participants that can be present in
the active map.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+pageCount"></a>

#### module.exports.pageCount
Returns the number of pages that are available in the meeting in PAGINATED mode.
If the meeting is in ACTIVE_GRID mode, this value will be 0.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+setMaxActiveRTKParticipantsCount"></a>

#### module.exports.setMaxActiveRTKParticipantsCount(limit)
Updates the maximum number of participants that are populated in
the active map.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | Updated max limit |

<a name="module_RTKParticipants--module.exports+acceptWaitingRoomRequest"></a>

#### module.exports.acceptWaitingRoomRequest(id)
Accepts requests from waitlisted participants if user
has appropriate permissions.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | peerId or userId of the waitlisted participant. |

<a name="module_RTKParticipants--module.exports+acceptAllWaitingRoomRequest"></a>

#### module.exports.acceptAllWaitingRoomRequest(userIds)
We need a new event for socket service events
since if we send them all together, sequence of events
can be unreliable

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type |
| --- | --- |
| userIds | <code>Array.&lt;string&gt;</code> | 

<a name="module_RTKParticipants--module.exports+rejectWaitingRoomRequest"></a>

#### module.exports.rejectWaitingRoomRequest(id)
Rejects requests from waitlisted participants if user
has appropriate permissions.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | participantId of the waitlisted participant. |

<a name="module_RTKParticipants--module.exports+setViewMode"></a>

#### module.exports.setViewMode(viewMode)
Sets the view mode of the meeting to either ACTIVE_GRID or PAGINATED.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| viewMode | <code>ViewMode</code> | The mode in which the active map should be populated |

<a name="module_RTKParticipants--module.exports+subscribe"></a>

#### module.exports.subscribe(peerIds, [kinds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type |
| --- | --- |
| peerIds | <code>Array.&lt;string&gt;</code> | 
| [kinds] | <code>Array.&lt;(&#x27;audio&#x27;\|&#x27;video&#x27;\|&#x27;screenshareAudio&#x27;\|&#x27;screenshareVideo&#x27;)&gt;</code> | 

<a name="module_RTKParticipants--module.exports+unsubscribe"></a>

#### module.exports.unsubscribe(peerIds, [kinds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type |
| --- | --- |
| peerIds | <code>Array.&lt;string&gt;</code> | 
| [kinds] | <code>Array.&lt;(&#x27;audio&#x27;\|&#x27;video&#x27;\|&#x27;screenshareAudio&#x27;\|&#x27;screenshareVideo&#x27;)&gt;</code> | 

<a name="module_RTKParticipants--module.exports+setPage"></a>

#### module.exports.setPage(page)
Populates the active map with participants present in the page number
indicated by the parameter `page` in PAGINATED mode.
Does not do anything in ACTIVE_GRID mode.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | The page number to be set. |

<a name="module_RTKParticipants--module.exports+disableAllAudio"></a>

#### module.exports.disableAllAudio(allowUnmute)
Disables audio for all participants in the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| allowUnmute | <code>boolean</code> | Allow participants to unmute after they are muted. |

<a name="module_RTKParticipants--module.exports+disableAllVideo"></a>

#### module.exports.disableAllVideo()
Disables video for all participants in the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+disableAudio"></a>

#### ~~module.exports.disableAudio(participantId)~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| participantId | <code>string</code> | ID of participant to be muted. |

<a name="module_RTKParticipants--module.exports+disableVideo"></a>

#### ~~module.exports.disableVideo(participantId)~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| participantId | <code>string</code> | ID of participant to be muted. |

<a name="module_RTKParticipants--module.exports+kick"></a>

#### ~~module.exports.kick(participantId)~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| participantId | <code>string</code> | ID of participant to be kicked. |

<a name="module_RTKParticipants--module.exports+kickAll"></a>

#### module.exports.kickAll()
Kicks all participants from the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
<a name="module_RTKParticipants--module.exports+broadcastMessage"></a>

#### module.exports.broadcastMessage(type, payload, target)
Broadcasts the message to participants

If no `target` is specified it is sent to all participants including `self`.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> |  |
| payload | <code>BroadcastMessagePayload</code> |  |
| target | <code>BroadcastMessageTarget</code> | object containing a list of `participantIds` or object containing `presetName` - every user with that preset will be sent the message |

<a name="module_RTKParticipants--module.exports+getAllJoinedPeers"></a>

#### module.exports.getAllJoinedPeers(searchQuery, limit, offset)
Returns all peers currently present in the room
If you are in a group call, use `meeting.participants.joined`
instead

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  

| Param | Type |
| --- | --- |
| searchQuery | <code>string</code> | 
| limit | <code>number</code> | 
| offset | <code>number</code> | 

<a name="module_RTKParticipants--module.exports+getRTKParticipantsInMeetingPreJoin"></a>

#### module.exports.getRTKParticipantsInMeetingPreJoin()
Returns all peers currently in the room, is a non paginated call
and should only be used if you are in a non room joined state,
if in a joined group call, use `meeting.participants.joined`

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipants--module.exports)  
