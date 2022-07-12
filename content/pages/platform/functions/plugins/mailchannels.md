---
pcx-content-type: concept
title: MailChannels
weight: 1
---

# MailChannels Pages Plugin

The MailChannels Pages Plugin intercepts all form submissions made which have the `data-static-form-name` attribute set. It then emails these form submissions using the MailChannels API.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-mailchannels
```

## Usage

```typescript
---
filename: functions/_middleware.ts
---
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "support@example.com" }],
    },
  ],
  from: {
    name: "ACME Support",
    email: "support@example.com",
  },
  respondWith: () => {
    return new Response(
      `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
    );
  },
});
```

```html
---
filename: public/contact.html
---
<body>
  <h1>Contact us</h1>
  <form data-static-form-name="contact">
    <label>Email address <input type="email" name="email" /></label>
    <label>Message <textarea name="message"></textarea></label>
    <button type="Submit">
  </form>
</body>
```

The Plugin takes a single argument, an object with a number of properties:

- `personalizations` is required and should be set to either an array, or a function which returns an array. If set to a function, it is passed a single object parameter which contains the incoming `request` (`Request`), `formData` (`FormData`) and `name` (`String`). This is useful if you want to populate dynamic values based on the form submission.

- `from` is also mandatory and should be set to either an object, or a function which returns an object. Again, if set to a function, it is passed a single object parameter which contains `request`, `formData` and `name`.

- `subject` is an optional `String` or function which returns a string. It defaults to `New <NAME> form submission`.

- `content` is an optional array or function which returns an array. It defaults to a `text/html` and `text/plain` body array, detailing the form submission contents.

- `respondWith` is a required function which takes the `request`, `formData` and `name` object parameter and returns a `Response` or `Promise` of a `Response`. Assuming the form submission is successful, this function will be called to generate response for visitors.

The `method` and `action` attributes of the HTML form do not need to be set. The Plugin will automatically override them to allow it to intercept the submission.

For more information about MailChannels and the options they support, refer to [the documentation](https://mailchannels.zendesk.com/hc/en-us/articles/4565898358413-Sending-Email-from-Cloudflare-Workers-using-MailChannels-Send-API).
