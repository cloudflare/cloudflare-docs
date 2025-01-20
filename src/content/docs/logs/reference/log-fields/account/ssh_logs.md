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

Source address of the SSH command.

## Datetime

Type: `int or string`

Timestamp in UTC of when this message is being sent.

## Error

Type: `string`

SSH error. Only used if an error occurred.

## PTY

Type: `string`

Used by certain programs when running interactive shells to synchronize local with remote SSH terminal state.

## Payload

Type: `string`

Captured request/response data, base64-encoded in asciinema .cast format. This includes the command associated with the "exec" program type.

## ProgramFinishDatetime

Type: `int or string`

The date and time the specific SSH program was completed. This is empty until the program ends.

## ProgramID

Type: `string`

SSH program ID, a single SSH session can have multiple programs running.

## ProgramStartDatetime

Type: `int or string`

The date and time the specific SSH program started.

## ProgramType

Type: `string`

The SSH program being run e.g. "shell": default user's shell on target machine, "exec": execute provided command (used with "cmd" below), "x11": an interactive graphical environment, "direct-tcpip": direct tunneling, "forwarded-tcpip": reverse tunneling

## ServerAddress

Type: `string`

Destination address for the SSH command.

## SessionFinishDatetime

Type: `int or string`

The date and time the SSH session was completed. This is empty until the session ends.

## SessionID

Type: `string`

SSH session ID.

## SessionStartDatetime

Type: `int or string`

The date and time the SSH session was created.

## TargetID

Type: `string`

Identifier for which target is being accessed.

## UserEmail

Type: `string`

User email address.

## UserID

Type: `string`

Cloudflare user ID.

## Username

Type: `string`

Principal user being accessed on SSH server's machine. Empty if error raised when establishing connection.
