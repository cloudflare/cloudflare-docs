---
title: RTKThemePreset
sidebar_position: 19
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKThemePreset"></a>

The RTKThemePreset class represents the meeting theme for the current participant


* [RTKThemePreset](#module_RTKThemePreset)
    * [module.exports](#exp_module_RTKThemePreset--module.exports) ⏏
        * [new module.exports(preset)](#new_module_RTKThemePreset--module.exports_new)
        * _instance_
            * ~~[.setupScreen](#module_RTKThemePreset--module.exports+setupScreen)~~
            * ~~[.waitingRoom](#module_RTKThemePreset--module.exports+waitingRoom)~~
            * ~~[.controlBar](#module_RTKThemePreset--module.exports+controlBar)~~
            * ~~[.header](#module_RTKThemePreset--module.exports+header)~~
            * ~~[.pipMode](#module_RTKThemePreset--module.exports+pipMode)~~
            * [.viewType](#module_RTKThemePreset--module.exports+viewType)
            * [.livestreamViewerQualities](#module_RTKThemePreset--module.exports+livestreamViewerQualities)
            * [.maxVideoStreams](#module_RTKThemePreset--module.exports+maxVideoStreams)
            * [.maxScreenShareCount](#module_RTKThemePreset--module.exports+maxScreenShareCount)
            * ~~[.plugins](#module_RTKThemePreset--module.exports+plugins)~~
            * [.disabledPlugins](#module_RTKThemePreset--module.exports+disabledPlugins)
        * _static_
            * [.fromResponse(preset)](#module_RTKThemePreset--module.exports.fromResponse)
            * [.default()](#module_RTKThemePreset--module.exports.default)
            * [.init([preset], [useDefault])](#module_RTKThemePreset--module.exports.init)

<a name="exp_module_RTKThemePreset--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKThemePreset--module.exports_new"></a>

#### new module.exports(preset)

| Param | Type |
| --- | --- |
| preset | <code>PresetV2CamelCased</code> | 

<a name="module_RTKThemePreset--module.exports+setupScreen"></a>

#### ~~module.exports.setupScreen~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+waitingRoom"></a>

#### ~~module.exports.waitingRoom~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+controlBar"></a>

#### ~~module.exports.controlBar~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+header"></a>

#### ~~module.exports.header~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+pipMode"></a>

#### ~~module.exports.pipMode~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+viewType"></a>

#### module.exports.viewType
The `viewType` tells the type of the meeting
possible values are: GROUP_CALL| LIVESTREAM | CHAT | AUDIO_ROOM

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+livestreamViewerQualities"></a>

#### module.exports.livestreamViewerQualities
The `livestreamViewerQualities` specifies the allowed qualities of a stream,
that can be viewed by a livestream viewer

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+maxVideoStreams"></a>

#### module.exports.maxVideoStreams
The `maxVideoStreams` contains the maximum video
streams for mobile and desktop

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+maxScreenShareCount"></a>

#### module.exports.maxScreenShareCount
The `maxScreenShareCount` contains the maximum
possible concurrent screen shares

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+plugins"></a>

#### ~~module.exports.plugins~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports+disabledPlugins"></a>

#### module.exports.disabledPlugins
The `disabledPlugins` property returns id of all disabled plugins

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
<a name="module_RTKThemePreset--module.exports.fromResponse"></a>

#### module.exports.fromResponse(preset)
**Kind**: static method of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
**Deprecated.**: Use init()  

| Param | Type |
| --- | --- |
| preset | <code>PresetV2CamelCased</code> | 

<a name="module_RTKThemePreset--module.exports.default"></a>

#### module.exports.default()
**Kind**: static method of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  
**Deprecated.**: Use init()  
<a name="module_RTKThemePreset--module.exports.init"></a>

#### module.exports.init([preset], [useDefault])
**Kind**: static method of [<code>module.exports</code>](#exp_module_RTKThemePreset--module.exports)  

| Param | Type | Default |
| --- | --- | --- |
| [preset] | <code>PresetV2CamelCased</code> |  | 
| [useDefault] | <code>boolean</code> | <code>true</code> | 

