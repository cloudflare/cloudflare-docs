---
title: Block lists
pcx_content_type: concept
weight: 3
---

# Block lists

When you add **blocked senders**, Area 1 automatically marks all messages from these senders with a `MALICIOUS` [disposition](/email-security/reference/dispositions-and-attributes/).

## Add a blocked sender

To create a new blocked pattern:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Block List** > **Blocked Senders**.
4. Select **+ New Sender**.
5. Enter the pattern information:

    - **Sender**: Enter one of the following types of pattern:

        - *Email addresses*, which must be a valid email.
        - *IP addresses*, which can only be IPv4. IPv6 and CIDR are invalid entries.
        - *Regular expressions*, which must be [valid](https://www.freeformatter.com/java-regex-tester.html) Java expressions.
    
    - **Notes**: Provide additional notes about the blocked sender pattern.

6. Select **Save**.

### CSV uploads

You can also upload a CSV file of multiple allowed patterns. The CSV file must be smaller than 150 KB, start with a header row of all required values, and contain no additional fields.

An example file would look like this:

```txt
Blocked_Sender, Notes
john.smith@email.com, John Smith
melanie.turner@email.com, Melanie Turner
```
