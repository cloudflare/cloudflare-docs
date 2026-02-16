---
title: RTKPolls
sidebar_position: 13
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKPolls"></a>

The RTKPolls module consists of the polls that have been created in the meeting.


* [RTKPolls](#module_RTKPolls)
    * [.items](#module_RTKPolls+items)
    * [.create(question, options, anonymous, hideVotes)](#module_RTKPolls+create)
    * [.vote(pollId, index)](#module_RTKPolls+vote)

<a name="module_RTKPolls+items"></a>

### meeting.polls.items
An array of poll items.

**Kind**: instance property of [<code>RTKPolls</code>](#module_RTKPolls)  
<a name="module_RTKPolls+create"></a>

### meeting.polls.create(question, options, anonymous, hideVotes)
Creates a poll in the meeting.

**Kind**: instance method of [<code>RTKPolls</code>](#module_RTKPolls)  

| Param | Default | Description |
| --- | --- | --- |
| question |  | The question that is to be voted for. |
| options |  | The options of the poll. |
| anonymous | <code>false</code> | If true, the poll votes are anonymous. |
| hideVotes | <code>false</code> | If true, the votes on the poll are hidden. |

<a name="module_RTKPolls+vote"></a>

### meeting.polls.vote(pollId, index)
Casts a vote on an existing poll.

**Kind**: instance method of [<code>RTKPolls</code>](#module_RTKPolls)  

| Param | Description |
| --- | --- |
| pollId | The ID of the poll that is to be voted on. |
| index | The index of the option. |

