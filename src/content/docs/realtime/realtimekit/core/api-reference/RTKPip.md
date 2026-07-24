---
title: RTKPip
sidebar_position: 11
---

<!-- Auto Generated Below -->

## Modules

<dl>
<dt><a href="#module_RTKPip">RTKPip</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getInitials">getInitials()</a></dt>
<dd><p>Code from ui-kit. Same method used in the avatar component</p>
</dd>
</dl>

<a name="module_RTKPip"></a>


* [RTKPip](#module_RTKPip)
    * [.disable](#module_RTKPip+disable)
    * [.init([options])](#module_RTKPip+init)
    * [.disableSource(source)](#module_RTKPip+disableSource)
    * [.addSource(id, element, enabled, [displayText])](#module_RTKPip+addSource)
    * [.updateSource(id, source)](#module_RTKPip+updateSource)
    * [.removeSource(id)](#module_RTKPip+removeSource)
    * [.removePinnedSource(id)](#module_RTKPip+removePinnedSource)
    * [.removeAllSources()](#module_RTKPip+removeAllSources)
    * [.enable()](#module_RTKPip+enable)

<a name="module_RTKPip+disable"></a>

### meeting.participants.pip.disable
Disable PiP

**Kind**: instance property of [<code>RTKPip</code>](#module_RTKPip)  
<a name="module_RTKPip+init"></a>

### meeting.participants.pip.init([options])
Initialize PiP and prepare sources

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 
| [options.height] | <code>number</code> | 
| [options.width] | <code>number</code> | 

<a name="module_RTKPip+disableSource"></a>

### meeting.participants.pip.disableSource(source)
**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  

| Param | Type |
| --- | --- |
| source | <code>string</code> | 

<a name="module_RTKPip+addSource"></a>

### meeting.participants.pip.addSource(id, element, enabled, [displayText])
Add a video source from the participant grid

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id for the source (ex. participant id) |
| element | <code>HTMLVideoElement</code> | HTMLVideoElement for the video source |
| enabled | <code>boolean</code> | if source is enabled |
| [displayText] | <code>string</code> | two character display text |

<a name="module_RTKPip+updateSource"></a>

### meeting.participants.pip.updateSource(id, source)
Update a video source

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| source | <code>any</code> | 

<a name="module_RTKPip+removeSource"></a>

### meeting.participants.pip.removeSource(id)
Remove the video source for the participant

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  

| Param | Description |
| --- | --- |
| id | id for the source (ex. participant id) |

<a name="module_RTKPip+removePinnedSource"></a>

### meeting.participants.pip.removePinnedSource(id)
Remove the pinned source

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  

| Param | Description |
| --- | --- |
| id | id for the source (ex. participant id) |

<a name="module_RTKPip+removeAllSources"></a>

### meeting.participants.pip.removeAllSources()
Remove all sources

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  
<a name="module_RTKPip+enable"></a>

### meeting.participants.pip.enable()
Enable PiP

**Kind**: instance method of [<code>RTKPip</code>](#module_RTKPip)  
<a name="getInitials"></a>

Code from ui-kit. Same method used in the avatar component

**Kind**: global function  
