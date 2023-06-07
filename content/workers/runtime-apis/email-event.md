---
pcx_content_type: configuration
title: EmailEvent
---

# EmailEvent

## Background

An `EmailEvent` is the event type to programmatically process your emails with a Worker. You can reject, forward, or drop emails according to the logic you construct in your Worker.

---

## Syntax: Service Worker

`EmailEvent` can be handled in Workers functions written using the Service Worker syntax by attaching to the `email` event with `addEventListener`:

```js
addEventListener("email", (event) => {
  event.message.forward("<YOUR_EMAIL>");
});
```
### Properties

{{<definitions>}}

- `event.message` {{<type>}}EmailMessage{{</type>}}

  - An [`EmailMessage` object](/workers/runtime-apis/email-event/#emailmessage-definition).

{{</definitions>}}

---

## Syntax: ES modules

`EmailEvent` can be handled in Workers functions written using the [ES modules format](/workers/learning/migrate-to-module-workers/) by adding an `email` function to your module's exported handlers:

```js
export default {
  async email(message, env, ctx) {
    message.forward("<YOUR_EMAIL>");
  },
};
```

### Parameters

{{<definitions>}}

- `message` {{<type>}}EmailMessage{{</type>}}

  - An [`EmailMessage` object](/workers/runtime-apis/email-event/#emailmessage-definition).

- `env` {{<type>}}object{{</type>}}

  - An object containing the bindings associated with your Worker using ES modules format, such as KV namespaces and Durable Objects.

- `ctx` {{<type>}}object{{</type>}}
  - An object containing the context associated with your Worker using ES modules format. Currently, this object just contains the `waitUntil` function.

{{</definitions>}}

---

## `EmailMessage` definition

```ts
 interface EmailMessage<Body = unknown> {
  readonly from: string;
  readonly to: string;
  readonly headers: Headers;
  readonly raw: ReadableStream;
  readonly rawSize: number;

  setReject(reason: String): void;
  forward(rcptTo: string, headers?: Headers): Promise<void>;
}
```

{{<definitions>}}

- `from` {{<type>}}string{{</type>}}

  - `Envelope From` attribute of the email message.

- `to` {{<type>}}string{{</type>}}

  - `Envelope To` attribute of the email message.

- `headers` {{<type>}}Headers{{</type>}}

  - A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

- `raw` {{<type>}}ReadableStream{{</type>}}

  - [Stream](/workers/runtime-apis/streams/readablestream) of the email message content.

- `rawSize` {{<type>}}number{{</type>}}

  - Size of the email message content.

- {{<code>}}setReject(reason{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Reject this email message by returning a permanent SMTP error back to the connecting client, including the given reason.

- {{<code>}}forward(rcptTo{{<param-type>}}string{{</param-type>}}, headers{{<param-type>}}Headers{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise{{</type>}}

  - Forward this email message to a verified destination address of the account. If you want, you can add extra headers to the email message. Only `X-*` headers are allowed.
  - When the promise resolves, the message is confirmed to be forwarded to a verified destination address.

{{</definitions>}}
