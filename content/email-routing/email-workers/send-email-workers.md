---
title: Send email from Workers
pcx_content_type: how-to
weight: 3
---

# <beta>Send emails from Workers</beta>

You can send an email from your Worker to a verified address. This is useful for when you want to know about certain types of events being triggered, for example.

Before you can bind an email address to your Worker, you need to [enable Email Routing](/email-routing/get-started/) and have at least one [verified email address](/email-routing/setup/email-routing-addresses/#destination-addresses). Then, create a new binding in the [`wrangler.toml` file](/workers/wrangler/configuration//#email-bindings):

```toml
send_email = [
    {type = "send_email", name = "<NAME_FOR_BINDING>", destination_address = "<YOUR_EMAIL>@example.com"},
]
```

## Types of bindings

Sending email from Workers has three types of bindings:

- **No attribute defined**: When you do not define an attribute, the binding has no restrictions in place. You can use it to send emails to any verified email address on your account.
- **`destination_address`**: When you define the `destination_address` attribute, you create a targeted binding. This means you can only send emails to the chosen email address. For example, `{type = "send_email", name = "<NAME_FOR_BINDING>", destination_address = "<YOUR_EMAIL>@example.com"}`. <br> For this particular binding, when you call the `send_email` function you can pass `null` or `undefined` to your Worker and it will assume the email address specified in the binding.
- **`allowed_destination_addresses`**: When you specify this attribute, you create an allowlist, and can send emails to any email address on the list.

{{<render file="_types-bindings.md">}}

## Example Worker

Refer to the example below to learn how to construct a Worker capable of sending emails. This example uses [MIMEText](https://www.npmjs.com/package/mimetext):

{{<Aside type="note">}}The sender has to be an email from the domain where you have Email Routing active.{{</Aside>}}

```js
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

function toReadableStream(value) {
 return new ReadableStream({
   start(controller) {
     var enc = new TextEncoder();
     controller.enqueue(enc.encode(value));
     controller.close();
   },
 });
}

export default {
 async fetch(request, env) {
   const msg = createMimeMessage();
   msg.setSender({ name: "GPT-4", addr: "<SENDER>@example.com" });
   msg.setRecipient("<RECIPIENT>@example2.com");
   msg.setSubject("An email generated in a worker");
   msg.setMessage(
     "text/plain",
     `Congratulations, you just sent an email from a worker.`
   );

   var message = new EmailMessage(
     "<SENDER>@example.com",
     "<RECIPIENT>@example.com",
     toReadableStream(msg.asRaw())
   );
   try {
     await env.SEB.send(message);
   } catch (e) {
     return new Response(e.message);
   }

   return new Response("Hello Send Email World!");
 },
};
```
