---
title: Reply to emails from Workers
pcx_content_type: how-to
weight: 3
---

# Reply to emails from Workers

{{<render file="_reply-emails-workers-intro.md" withParameters="Then, create a new binding in the [`wrangler.toml` file](/workers/wrangler/configuration/#email-bindings):">}}

```js
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
  async email(message, env, ctx) {

    const ticket = createTicket(message);

    const msg = createMimeMessage();
    msg.setHeader("In-Reply-To", message.headers.get("Message-ID"));
    msg.setSender({ name: "Thank you for you contact", addr: "<SENDER>@example.com" });
    msg.setRecipient(message.from);
    msg.setSubject("Email Routing Auto-reply");
    msg.addMessage({
      contentType: 'text/plain',
      data: `We got your message, your ticket number is ${ ticket.id }`
    });

    var replyMessage = new EmailMessage(
      "<SENDER>@example.com",
      message.from,
      msg.asRaw()
    );

    message.reply(replyMessage);
  }
}
```

To mitigate security risks and abuse, replying to incoming emails has a few requirements:

* The incoming email has to have valid [DMARC](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/).
* The email can only be replied to once in the same `EmailMessage` event.
* The `In-Reply-To` header of the reply message must be set to the `Message-ID` of the incoming message.
* The recipient the reply must match the incoming sender.
* The outgoing sender domain must match the same domain that received the email.

If these and other internal conditions are not met, then `reply()` will fail with an exception, otherwise you can freely compose your reply message and send it back to the original sender.