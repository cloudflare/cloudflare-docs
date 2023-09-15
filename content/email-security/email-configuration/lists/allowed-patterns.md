---
title: Allowed patterns
pcx_content_type: concept
weight: 1
---

# Allowed patterns

When you set up **allowed patterns**, Cloudflare Area 1 email security exempts messages that match certain patterns from normal detection scanning.

## Add an allowed pattern

To create a new allowed pattern:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Allow List** > **Allowed Patterns**.
4. Select **+ New Pattern**.
5. Enter the pattern information:

    - **Allowed Pattern**: Enter one of the following types of pattern:

        - *Email addresses*, which must be a valid email.
        - *IP addresses*, which can only be IPv4. IPv6 and CIDR are invalid entries.
        - *Regular expressions*, which must be [valid](https://www.freeformatter.com/java-regex-tester.html) Java expressions.
    
    - **Allow Type**: Choose one or more of the following types:

        - *Trusted Sender*: Messages will bypass all [detections](/email-security/reference/dispositions-and-attributes/) and link following by Area 1. Typically, only applies to phishing simulations from vendors such as KnowB4.
        - *Exempt Recipient*: Will exempt messages from all Area 1 [detections](/email-security/reference/dispositions-and-attributes/) intended for recipients matching this pattern (email address or regular expression only). Typically, this only applies to submission mailboxes for user reporting to security.
        - *Acceptable Sender*: Will exempt messages from the `SPAM`, `SPOOF`, and `BULK` [dispositions](/email-security/reference/dispositions-and-attributes/#available-values) (but not `MALICIOUS` or `SUSPICIOUS`). Commonly used for external domains and sources that send mail on behalf of your organization, such as marketing emails or internal tools.
    
    - **Notes**: Provide additional notes about the allowed pattern.

6. If you chose *Trusted Sender* or *Acceptable Sender* in the previous step, you will be able to choose whether to verify the sender. When the **Verify Sender** option is selected, the allow list entry will only be honored if it aligns with a passing authentication by DMARC or SPF or DKIM.

7. Select **Save**.

### CSV uploads

You can also upload a CSV file of multiple allowed patterns. The CSV file must be smaller than 150 KB, start with a header row of all required values, and contain no additional fields.

An example file would look like this:

```txt
Pattern, Notes, Verify Email, Trusted Sender, 
Exempt Recipient, Acceptable Sender
whale@notaphish.com, not a phish, true, true, false, true
```