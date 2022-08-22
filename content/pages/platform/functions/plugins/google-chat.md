---
pcx_content_type: concept
title: Google Chat
weight: 1
---

# Google Chat Pages Plugin

The Google Chat Pages Plugin creates a Google Chat bot which can respond to messages. It also includes an API for interacting with Google Chat (for example, for creating messages) without the need for user input. This API is useful for situations such as alerts.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-google-chat
```

## Usage

```typescript
---
filename: functions/google-chat.ts
---
import googleChatPlugin from "@cloudflare/pages-plugin-google-chat";

export const onRequest: PagesFunction = googleChatPlugin(async (message) => {
  if (message.text.includes("ping")) {
    return { text: "pong" };
  }

  return { text: "Sorry, I could not understand your message." };
});
```

The Plugin takes a function, which in turn takes an incoming message, and returns a `Promise` of a response message (or `void` if there should not be any response).

The Plugin only exposes a single route, which is the URL you should set in the Google Cloud Console when creating the bot.

![Google Cloud Console's Connection Settings for the Google Chat API showing 'App URL' selected and 'https://example.com/google-chat' entered into the 'App URL' text input.](/pages/platform/functions/plugins/google-chat.png)

### API

The Google Chat API can be called directly using the `GoogleChatAPI` class:

```typescript
---
filename: functions/alert.ts
---
import { GoogleChatAPI } from "@cloudflare/pages-plugin-google-chat/api";

export const onRequest: PagesFunction = () => {
  // Initialize a GoogleChatAPI with your service account's credentials
  const googleChat = new GoogleChatAPI({
    credentials: {
      client_email: "SERVICE_ACCOUNT_EMAIL_ADDRESS",
      private_key: "SERVICE_ACCOUNT_PRIVATE_KEY",
    },
  });

  // Post a message
  // https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/create
  const message = await googleChat.createMessage(
    { parent: "spaces/AAAAAAAAAAA" },
    undefined,
    {
      text: "I'm an alert!",
    }
  );

  return new Response("Alert sent.");
};
```

We recommend storing your service account's credentials in KV rather than in plain text as above.

The following functions are available on a `GoogleChatAPI` instance. Each take up to three arguments: an object of path parameters, an object of query parameters, and an object of the request body; as described in the [Google Chat API's documentation](https://developers.google.com/chat/api/reference/rest).

- [`downloadMedia`](https://developers.google.com/chat/api/reference/rest/v1/media/download)
- [`getSpace`](https://developers.google.com/chat/api/reference/rest/v1/spaces/get)
- [`listSpaces`](https://developers.google.com/chat/api/reference/rest/v1/spaces/list)
- [`getMember`](https://developers.google.com/chat/api/reference/rest/v1/spaces.members/get)
- [`listMembers`](https://developers.google.com/chat/api/reference/rest/v1/spaces.members/list)
- [`createMessage`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/create)
- [`deleteMessage`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/delete)
- [`getMessage`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/get)
- [`updateMessage`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/update)
- [`getAttachment`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages.attachments/get)
