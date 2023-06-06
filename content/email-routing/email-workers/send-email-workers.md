---
title: Send emails from Workers (beta)
pcx_content_type: how-to
weight: 3
---

{{<beta>}}Send emails from Workers{{</beta>}}

{{<render file="_send-emails-workers-intro.md" withParameters="Then, create a new binding in the [`wrangler.toml` file](/workers/wrangler/configuration/#email-bindings):">}}

```toml
send_email = [
    {type = "send_email", name = "<NAME_FOR_BINDING>", destination_address = "<YOUR_EMAIL>@example.com"},
]
```

## Types of bindings

There are three types of bindings:

- **No attribute defined**: When you do not define an attribute, the binding has no restrictions in place. You can use it to send emails to any verified email address [through Email Routing](/email-routing/setup/email-routing-addresses/#destination-addresses).
- **`destination_address`**: When you define the `destination_address` attribute, you create a targeted binding. This means you can only send emails to the chosen email address. For example, `{type = "send_email", name = "<NAME_FOR_BINDING>", destination_address = "<YOUR_EMAIL>@example.com"}`. <br> For this particular binding, when you call the `send_email` function you can pass `null` or `undefined` to your Worker and it will assume the email address specified in the binding.
- **`allowed_destination_addresses`**: When you specify this attribute, you create an allowlist, and can send emails to any email address on the list.

{{<render file="_types-bindings.md">}}

## Example Worker

Refer to the example below to learn how to construct a Worker capable of sending emails. This example uses [MIMEText](https://www.npmjs.com/package/mimetext):

{{<Aside type="note">}}The sender has to be an email from the domain where you have Email Routing active.{{</Aside>}}

```js
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
 async fetch(request, env) {
   const msg = createMimeMessage();
   msg.setSender({ name: "GPT-4", addr: "<SENDER>@example.com" });
   msg.setRecipient("<RECIPIENT>@example2.com");
   msg.setSubject("An email generated in a worker");
   msg.addMessage({
       contentType: 'text/plain',
       data: `Congratulations, you just sent an email from a worker.`
   });

   var message = new EmailMessage(
     "<SENDER>@example.com",
     "<RECIPIENT>@example.com",
     msg.asRaw()
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
