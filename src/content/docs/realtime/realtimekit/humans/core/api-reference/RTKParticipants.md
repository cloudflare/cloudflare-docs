---
title: RTKParticipants
sidebar_position: 8
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
    * [.waitlisted](#module_RTKParticipants+waitlisted)
    * [.joined](#module_RTKParticipants+joined)
    * [.active](#module_RTKParticipants+active)
    * [.videoSubscribed](#module_RTKParticipants+videoSubscribed)
    * [.audioSubscribed](#module_RTKParticipants+audioSubscribed)
    * [.pinned](#module_RTKParticipants+pinned)
    * [.all](#module_RTKParticipants+all)
    * [.pip](#module_RTKParticipants+pip)
    * [.viewMode](#module_RTKParticipants+viewMode)
    * [.currentPage](#module_RTKParticipants+currentPage)
    * [.lastActiveSpeaker](#module_RTKParticipants+lastActiveSpeaker)
    * [.selectedPeers](#module_RTKParticipants+selectedPeers)
    * [.count](#module_RTKParticipants+count)
    * [.maxActiveParticipantsCount](#module_RTKParticipants+maxActiveParticipantsCount)
    * [.pageCount](#module_RTKParticipants+pageCount)
    * [.setMaxActiveParticipantsCount(limit)](#module_RTKParticipants+setMaxActiveParticipantsCount)
    * [.acceptWaitingRoomRequest(id)](#module_RTKParticipants+acceptWaitingRoomRequest)
    * [.acceptAllWaitingRoomRequest(userIds)](#module_RTKParticipants+acceptAllWaitingRoomRequest)
    * [.rejectWaitingRoomRequest(id)](#module_RTKParticipants+rejectWaitingRoomRequest)
    * [.setViewMode(viewMode)](#module_RTKParticipants+setViewMode)
    * [.subscribe(peerIds, [kinds])](#module_RTKParticipants+subscribe)
    * [.unsubscribe(peerIds, [kinds])](#module_RTKParticipants+unsubscribe)
    * [.setPage(page)](#module_RTKParticipants+setPage)
    * [.disableAllAudio(allowUnmute)](#module_RTKParticipants+disableAllAudio)
    * [.disableAllVideo()](#module_RTKParticipants+disableAllVideo)
    * [.kickAll()](#module_RTKParticipants+kickAll)
    * [.broadcastMessage(type, payload, target)](#module_RTKParticipants+broadcastMessage)
    * [.getAllJoinedPeers(searchQuery, limit, offset)](#module_RTKParticipants+getAllJoinedPeers)
    * [.getParticipantsInMeetingPreJoin()](#module_RTKParticipants+getParticipantsInMeetingPreJoin)

<a name="module_RTKParticipants+waitlisted"></a>

### meeting.participants.waitlisted
Returns a list of participants waiting to join the meeting.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+joined"></a>

### meeting.participants.joined
Returns a list of all participants in the meeting.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+active"></a>

### meeting.participants.active
Returns a list of participants whose streams are currently consumed.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+videoSubscribed"></a>

### meeting.participants.videoSubscribed
Returns a list of participants whose video streams are currently consumed.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+audioSubscribed"></a>

### meeting.participants.audioSubscribed
Returns a list of participants whose audio streams are currently consumed.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+pinned"></a>

### meeting.participants.pinned
Returns a list of participants who have been pinned.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+all"></a>

### meeting.participants.all
Returns all added participants irrespective of whether they are currently
in the meeting or not

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+pip"></a>

### meeting.participants.pip
Return the controls for Picture-in-Picture

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+viewMode"></a>

### meeting.participants.viewMode
Indicates whether the meeting is in 'ACTIVE_GRID' mode or 'PAGINATED' mode.

In 'ACTIVE_GRID' mode, participants are populated in the participants.active map
dynamically. The participants present in the map will keep changing when other
participants unmute their audio or turn on their videos.

In 'PAGINATED' mode, participants are populated in the participants.active map
just once, and the participants in the map will only change if the page number is
changed by the user using setPage(page).

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+currentPage"></a>

### meeting.participants.currentPage
This indicates the current page that has been set by the user in PAGINATED mode.
If the meeting is in ACTIVE_GRID mode, this value will be 0.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+lastActiveSpeaker"></a>

### meeting.participants.lastActiveSpeaker
This stores the `participantId` of the last participant who spoke in the meeting.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+selectedPeers"></a>

### meeting.participants.selectedPeers
Keeps a list of all participants who have been present in the selected peers list.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+count"></a>

### meeting.participants.count
Returns the number of participants who are joined in the meeting.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+maxActiveParticipantsCount"></a>

### meeting.participants.maxActiveParticipantsCount
Returns the maximum number of participants that can be present in
the active map.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+pageCount"></a>

### meeting.participants.pageCount
Returns the number of pages that are available in the meeting in PAGINATED mode.
If the meeting is in ACTIVE_GRID mode, this value will be 0.

**Kind**: instance property of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+setMaxActiveParticipantsCount"></a>

### meeting.participants.setMaxActiveParticipantsCount(limit)
Updates the maximum number of participants that are populated in
the active map.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | Updated max limit |

<a name="module_RTKParticipants+acceptWaitingRoomRequest"></a>

### meeting.participants.acceptWaitingRoomRequest(id)
Accepts requests from waitlisted participants if user
has appropriate permissions.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | peerId or userId of the waitlisted participant. |

<a name="module_RTKParticipants+acceptAllWaitingRoomRequest"></a>

### meeting.participants.acceptAllWaitingRoomRequest(userIds)
We need a new event for socket service events
since if we send them all together, sequence of events
can be unreliable

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type |
| --- | --- |
| userIds | <code>Array.&lt;string&gt;</code> | 

<a name="module_RTKParticipants+rejectWaitingRoomRequest"></a>

### meeting.participants.rejectWaitingRoomRequest(id)
Rejects requests from waitlisted participants if user
has appropriate permissions.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | participantId of the waitlisted participant. |

<a name="module_RTKParticipants+setViewMode"></a>

### meeting.participants.setViewMode(viewMode)
Sets the view mode of the meeting to either ACTIVE_GRID or PAGINATED.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| viewMode | <code>ViewMode</code> | The mode in which the active map should be populated |

<a name="module_RTKParticipants+subscribe"></a>

### meeting.participants.subscribe(peerIds, [kinds])
**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type |
| --- | --- |
| peerIds | <code>Array.&lt;string&gt;</code> | 
| [kinds] | <code>Array.&lt;(&#x27;audio&#x27;\|&#x27;video&#x27;\|&#x27;screenshareAudio&#x27;\|&#x27;screenshareVideo&#x27;)&gt;</code> | 

<a name="module_RTKParticipants+unsubscribe"></a>

### meeting.participants.unsubscribe(peerIds, [kinds])
**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type |
| --- | --- |
| peerIds | <code>Array.&lt;string&gt;</code> | 
| [kinds] | <code>Array.&lt;(&#x27;audio&#x27;\|&#x27;video&#x27;\|&#x27;screenshareAudio&#x27;\|&#x27;screenshareVideo&#x27;)&gt;</code> | 

<a name="module_RTKParticipants+setPage"></a>

### meeting.participants.setPage(page)
Populates the active map with participants present in the page number
indicated by the parameter `page` in PAGINATED mode.
Does not do anything in ACTIVE_GRID mode.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | The page number to be set. |

<a name="module_RTKParticipants+disableAllAudio"></a>

### meeting.participants.disableAllAudio(allowUnmute)
Disables audio for all participants in the meeting.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| allowUnmute | <code>boolean</code> | Allow participants to unmute after they are muted. |

<a name="module_RTKParticipants+disableAllVideo"></a>

### meeting.participants.disableAllVideo()
Disables video for all participants in the meeting.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+kickAll"></a>

### meeting.participants.kickAll()
Kicks all participants from the meeting.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  
<a name="module_RTKParticipants+broadcastMessage"></a>

### meeting.participants.broadcastMessage(type, payload, target)
Broadcasts the message to participants

If no `target` is specified it is sent to all participants including `self`.

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> |  |
| payload | <code>BroadcastMessagePayload</code> |  |
| target | <code>BroadcastMessageTarget</code> | object containing a list of `participantIds` or object containing `presetName` - every user with that preset will be sent the message |

<a name="module_RTKParticipants+getAllJoinedPeers"></a>

### meeting.participants.getAllJoinedPeers(searchQuery, limit, offset)
Returns all peers currently present in the room
If you are in a group call, use `meeting.participants.joined`
instead

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  

| Param | Type |
| --- | --- |
| searchQuery | <code>string</code> | 
| limit | <code>number</code> | 
| offset | <code>number</code> | 

<a name="module_RTKParticipants+getParticipantsInMeetingPreJoin"></a>

### meeting.participants.getParticipantsInMeetingPreJoin()
Returns all peers currently in the room, is a non paginated call
and should only be used if you are in a non room joined state,
if in a joined group call, use `meeting.participants.joined`

**Kind**: instance method of [<code>RTKParticipants</code>](#module_RTKParticipants)  
