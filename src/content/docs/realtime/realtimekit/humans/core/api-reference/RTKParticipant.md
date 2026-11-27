---
title: RTKParticipant
sidebar_position: 7
---

<!-- Auto Generated Below -->

<a name="module_RTKParticipant"></a>

This module represents a single participant in the meeting.
The participant object can be accessed from one of the participant lists
present in the `meeting.participants` object. For example,
```ts
const participant1 = meeting.participants.active.get(participantId);
const participant2 = meeting.participants.joined.get(participantId);
const participant3 = meeting.participants.active.toArray()[0];
const participantsNamedJohn = meeting.participants.active.toArray()
  .filter((p) => p.name === 'John');
```


* [RTKParticipant](#module_RTKParticipant)
    * [.id](#module_RTKParticipant+id)
    * [.userId](#module_RTKParticipant+userId)
    * [.name](#module_RTKParticipant+name)
    * [.picture](#module_RTKParticipant+picture)
    * [.customParticipantId](#module_RTKParticipant+customParticipantId)
    * [.device](#module_RTKParticipant+device)
    * [.videoTrack](#module_RTKParticipant+videoTrack)
    * [.audioTrack](#module_RTKParticipant+audioTrack)
    * [.screenShareTracks](#module_RTKParticipant+screenShareTracks)
    * [.videoEnabled](#module_RTKParticipant+videoEnabled)
    * [.audioEnabled](#module_RTKParticipant+audioEnabled)
    * [.screenShareEnabled](#module_RTKParticipant+screenShareEnabled)
    * [.producers](#module_RTKParticipant+producers)
    * [.manualProducerConfig](#module_RTKParticipant+manualProducerConfig)
    * [.supportsRemoteControl](#module_RTKParticipant+supportsRemoteControl)
    * [.presetName](#module_RTKParticipant+presetName)
    * [.stageStatus](#module_RTKParticipant+stageStatus)
    * [.isPinned](#module_RTKParticipant+isPinned)
    * [.pin()](#module_RTKParticipant+pin)
    * [.unpin()](#module_RTKParticipant+unpin)
    * [.disableAudio()](#module_RTKParticipant+disableAudio)
    * [.kick()](#module_RTKParticipant+kick)
    * [.disableVideo()](#module_RTKParticipant+disableVideo)
    * [.registerVideoElement(videoElem)](#module_RTKParticipant+registerVideoElement)
    * [.deregisterVideoElement([videoElem])](#module_RTKParticipant+deregisterVideoElement)

<a name="module_RTKParticipant+id"></a>

### participant.id
The peer ID of the participant.
The participants are indexed by this ID in the participant map.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+userId"></a>

### participant.userId
The user ID of the participant.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+name"></a>

### participant.name
The name of the participant.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+picture"></a>

### participant.picture
The picture of the participant.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+customParticipantId"></a>

### participant.customParticipantId
The custom id of the participant set during https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant REST API

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+device"></a>

### participant.device
The device configuration of the participant.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+videoTrack"></a>

### participant.videoTrack
The participant's video track.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+audioTrack"></a>

### participant.audioTrack
The participant's audio track.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+screenShareTracks"></a>

### participant.screenShareTracks
The participant's screenshare video and audio track.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+videoEnabled"></a>

### participant.videoEnabled
This is true if the participant's video is enabled.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+audioEnabled"></a>

### participant.audioEnabled
This is true if the participant's audio is enabled.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+screenShareEnabled"></a>

### participant.screenShareEnabled
This is true if the participant is screensharing.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+producers"></a>

### participant.producers
producers created by participant

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+manualProducerConfig"></a>

### participant.manualProducerConfig
producer config passed during manual subscription

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+supportsRemoteControl"></a>

### participant.supportsRemoteControl
This is true if the participant supports remote control.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+presetName"></a>

### participant.presetName
The preset of the participant.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+stageStatus"></a>

### participant.stageStatus
Denotes the participants's current stage status.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+isPinned"></a>

### participant.isPinned
Returns true if the participant is pinned.

**Kind**: instance property of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+pin"></a>

### participant.pin()
Returns `participant.id` if user has permission
to pin participants.

**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+unpin"></a>

### participant.unpin()
Returns `participant.id` if user has permission
to unpin participants.

**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+disableAudio"></a>

### participant.disableAudio()
Disables audio for this participant.
Requires the permission to disable participant audio.

**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+kick"></a>

### participant.kick()
Kicks this participant from the meeting.
Requires the permission to kick a participant.

**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+disableVideo"></a>

### participant.disableVideo()
Disables video for this participant.
Requires the permission to disable video for a participant.

**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  
<a name="module_RTKParticipant+registerVideoElement"></a>

### participant.registerVideoElement(videoElem)
**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  

| Param | Type |
| --- | --- |
| videoElem | <code>HTMLVideoElement</code> | 

<a name="module_RTKParticipant+deregisterVideoElement"></a>

### participant.deregisterVideoElement([videoElem])
**Kind**: instance method of [<code>RTKParticipant</code>](#module_RTKParticipant)  

| Param | Type |
| --- | --- |
| [videoElem] | <code>HTMLVideoElement</code> | 

