---
title: RTKPip
sidebar_position: 11
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

## Functions

<dl>
<dt><a href="#getInitials">getInitials()</a></dt>
<dd><p>Code from ui-kit. Same method used in the avatar component</p>
</dd>
<dt><a href="#_init">_init(context, self)</a></dt>
<dd></dd>
<dt><a href="#init">init([options])</a></dt>
<dd><p>Initialize PiP and prepare sources</p>
</dd>
<dt><a href="#disableSource">disableSource(source)</a></dt>
<dd></dd>
<dt><a href="#addSource">addSource(id, element, enabled, [displayText])</a></dt>
<dd><p>Add a video source from the participant grid</p>
</dd>
<dt><a href="#updateSource">updateSource(id, source)</a></dt>
<dd><p>Update a video source</p>
</dd>
<dt><a href="#removeSource">removeSource(id)</a></dt>
<dd><p>Remove the video source for the participant</p>
</dd>
<dt><a href="#removePinnedSource">removePinnedSource(id)</a></dt>
<dd><p>Remove the pinned source</p>
</dd>
<dt><a href="#removeAllSources">removeAllSources()</a></dt>
<dd><p>Remove all sources</p>
</dd>
<dt><a href="#enable">enable()</a></dt>
<dd><p>Enable PiP</p>
</dd>
</dl>

<a name="getInitials"></a>

Code from ui-kit. Same method used in the avatar component

**Kind**: global function  
<a name="_init"></a>

**Kind**: global function  

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| self | <code>Self</code> | 

<a name="init"></a>

Initialize PiP and prepare sources

**Kind**: global function  

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 
| [options.height] | <code>number</code> | 
| [options.width] | <code>number</code> | 

<a name="disableSource"></a>

**Kind**: global function  

| Param | Type |
| --- | --- |
| source | <code>string</code> | 

<a name="addSource"></a>

Add a video source from the participant grid

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id for the source (ex. participant id) |
| element | <code>HTMLVideoElement</code> | HTMLVideoElement for the video source |
| enabled | <code>boolean</code> | if source is enabled |
| [displayText] | <code>string</code> | two character display text |

<a name="updateSource"></a>

Update a video source

**Kind**: global function  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| source | <code>any</code> | 

<a name="removeSource"></a>

Remove the video source for the participant

**Kind**: global function  

| Param | Description |
| --- | --- |
| id | id for the source (ex. participant id) |

<a name="removePinnedSource"></a>

Remove the pinned source

**Kind**: global function  

| Param | Description |
| --- | --- |
| id | id for the source (ex. participant id) |

<a name="removeAllSources"></a>

Remove all sources

**Kind**: global function  
<a name="enable"></a>

Enable PiP

**Kind**: global function  
