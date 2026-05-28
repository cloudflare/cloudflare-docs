---
title: RTKParticipantMap
sidebar_position: 20
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKParticipantMap"></a>

This is a map of participants, indexed by `participant.id` (a participant's peer ID).
This map emits an event whenever a participant present in the map emits an event.
For example, when a participant is added to this map, a `participantJoined` event is
emitted from the map. When a participant object emits an event `videoUpdate`, the map
re-emits that event (provided the participant is present in the map).


* [RTKParticipantMap](#module_RTKParticipantMap)
    * [module.exports](#exp_module_RTKParticipantMap--module.exports) ⏏
        * [new module.exports(logger, [options])](#new_module_RTKParticipantMap--module.exports_new)
        * [.add(participant, [emitEvent])](#module_RTKParticipantMap--module.exports+add)
        * [.clear([emitEvent], [removeListeners])](#module_RTKParticipantMap--module.exports+clear)
        * [.delete(participantId, [emitEvent], [removeListeners])](#module_RTKParticipantMap--module.exports+delete)

<a name="exp_module_RTKParticipantMap--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKParticipantMap--module.exports_new"></a>

#### new module.exports(logger, [options])

| Param | Type |
| --- | --- |
| logger | <code>Logger</code> | 
| [options] | <code>MapEvents</code> | 

<a name="module_RTKParticipantMap--module.exports+add"></a>

#### module.exports.add(participant, [emitEvent])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipantMap--module.exports)  

| Param | Type | Default |
| --- | --- | --- |
| participant | <code>T</code> |  | 
| [emitEvent] | <code>boolean</code> | <code>true</code> | 

<a name="module_RTKParticipantMap--module.exports+clear"></a>

#### module.exports.clear([emitEvent], [removeListeners])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipantMap--module.exports)  

| Param | Type | Default |
| --- | --- | --- |
| [emitEvent] | <code>boolean</code> | <code>true</code> | 
| [removeListeners] | <code>boolean</code> | <code>false</code> | 

<a name="module_RTKParticipantMap--module.exports+delete"></a>

#### module.exports.delete(participantId, [emitEvent], [removeListeners])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKParticipantMap--module.exports)  

| Param | Type | Default |
| --- | --- | --- |
| participantId | <code>string</code> |  | 
| [emitEvent] | <code>boolean</code> | <code>true</code> | 
| [removeListeners] | <code>boolean</code> | <code>false</code> | 

