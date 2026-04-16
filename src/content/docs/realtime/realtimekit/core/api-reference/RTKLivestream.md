---
title: RTKLivestream
sidebar_position: 5
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKLivestream"></a>

The RTKLivestream module represents the state of the current livestream, and allows
to start/stop live streams.


* [RTKLivestream](#module_RTKLivestream)
    * [module.exports](#exp_module_RTKLivestream--module.exports) ⏏
        * [new module.exports(context, self)](#new_module_RTKLivestream--module.exports_new)
        * [.telemetry](#module_RTKLivestream--module.exports+telemetry)
        * [.setRTKLivestreamState(livestreamState)](#module_RTKLivestream--module.exports+setRTKLivestreamState)
        * [.start([livestreamConfig])](#module_RTKLivestream--module.exports+start)
        * [.stop()](#module_RTKLivestream--module.exports+stop)

<a name="exp_module_RTKLivestream--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKLivestream--module.exports_new"></a>

#### new module.exports(context, self)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| self | <code>Self</code> | 

<a name="module_RTKLivestream--module.exports+telemetry"></a>

#### module.exports.telemetry
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKLivestream--module.exports)  
<a name="module_RTKLivestream--module.exports+setRTKLivestreamState"></a>

#### module.exports.setRTKLivestreamState(livestreamState)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKLivestream--module.exports)  

| Param | Type |
| --- | --- |
| livestreamState | <code>RTKLivestreamState</code> | 

<a name="module_RTKLivestream--module.exports+start"></a>

#### module.exports.start([livestreamConfig])
Starts livestreaming the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKLivestream--module.exports)  

| Param | Type |
| --- | --- |
| [livestreamConfig] | <code>StartRTKLivestreamConfig</code> | 

<a name="module_RTKLivestream--module.exports+stop"></a>

#### module.exports.stop()
Stops livestreaming the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKLivestream--module.exports)  
