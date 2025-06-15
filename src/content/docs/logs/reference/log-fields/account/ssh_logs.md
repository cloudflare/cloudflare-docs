---
# Code generator. DO NOT EDIT.

title: SSH Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `ssh_logs`.

## AccountID

Type: `string`

Cloudflare account ID.

## ClientAddress

Type: `string`

The source address of the SSH command.

## Datetime

Type: `int or string`

The timestamp in UTC of when this message is being sent.

## Error

Type: `string`

An SSH error. Only used if an error has occurred.

## PTY

Type: `string`

This is used by certain programs types to synchronize local and remote SSH terminal state.

## Payload

Type: `string`

The captured request/response data, in asciicast v2 format. This includes the command associated with the 'exec' program type.

## ProgramFinishDatetime

Type: `int or string`

The timestamp in UTC of the SSH program termination. This is empty until the program ends.

## ProgramID

Type: `string`

The SSH program ID. A single SSH session can have multiple programs running.

## ProgramStartDatetime

Type: `int or string`

The timestamp in UTC of the SSH program creation.

## ProgramType

Type: `string`

The SSH program being run. The options are 'shell': opens an interactive terminal, 'exec': execute a single specified command, 'x11': is for an interactive graphical environment, 'direct-tcpip': direct tunneling, 'forwarded-tcpip': reverse tunneling.

## ServerAddress

Type: `string`

The destination address for the SSH session.

## SessionFinishDatetime

Type: `int or string`

The timestamp in UTC of the SSH session termination. This is empty until the session ends.

## SessionID

Type: `string`

SSH session ID.

## SessionStartDatetime

Type: `int or string`

The timestamp in UTC of the SSH session creation.

## TargetID

Type: `string`

The identifier of the target being accessed.

## UserEmail

Type: `string`

User email address.

## UserID

Type: `string`

Cloudflare user ID.

## Username

Type: `string`

The principal user being accessed on SSH server's machine. This will be empty if an error was thrown when establishing the connection.
