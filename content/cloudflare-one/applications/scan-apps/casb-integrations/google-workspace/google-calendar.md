---
pcx_content_type: reference
title: Google Calendar
rss: file
---

# Google Calendar

{{<render file="casb/_integration-description.md" withParameters="Google Calendar;;Google Workspace account">}}

## Integration prerequisites

{{<render file="casb/_google-prereqs.md">}}

## Integration permissions

{{<render file="casb/_integration-perms.md" withParameters="Google Workspace;;google-workspace">}}

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Google Calendar;;google-workspace/google-calendar">}}

### Calendar sharing

| Finding                                       | Severity | Description                                                                           |
| --------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| Google Workspace Calendar Publicly Accessible | Medium   | A user's Google Calendar is publicly accessible on the Internet that anyone can read. |
