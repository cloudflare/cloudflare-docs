---
title: Detection dispositions
pcx-content-type: reference
weight: 1
---

# Detection disposition status

Any traffic that flows through Area 1 Email Security receives a final **disposition**, which represents our evaluation of that specific message. Each message will only receive one status so your organization can take clear and specific actions on different message types.

## Header structure

When Area 1 evaluates an email message, it adds a header to that message in the following format.

```txt
X-Area1Security-Disposition: [Value]: Final verdicts for any message
```