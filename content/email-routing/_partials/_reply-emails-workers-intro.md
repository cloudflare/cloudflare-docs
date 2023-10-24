---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: lastSentence
---

You can reply to incoming emails with another new message and implement smart auto-responders programmatically, adding any content and context in the main body of the message. Think of a customer support email automatically generating a ticket and returning the link to the sender, an out-of-office reply with instructions when you're on vacation, or a detailed explanation of why you rejected an email.

Reply to emails is a new method of the [EmailMessage object](/email-routing/email-workers/runtime-api/#emailmessage-definition) in the Runtime API. Here's how it works:
