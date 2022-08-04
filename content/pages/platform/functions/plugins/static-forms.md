---
pcx_content_type: concept
title: Static Forms
weight: 1
---

# Static Forms Pages Plugin

The Static Forms Pages Plugin intercepts all form submissions made which have the `data-static-form-name` attribute set. This allows you to take action on these form submissions by, for example, saving the submission to KV.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-static-forms
```

## Usage

```typescript
---
filename: functions/_middleware.ts
---
import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest: PagesFunction = staticFormsPlugin({
  respondWith: ({ formData, name }) => {
    const email = formData.get('email')
    return new Response(`Hello, ${email}! Thank you for submitting the ${name} form.`)
  }
});
```

```html
---
filename: public/sales-enquiry.html
---
<body>
  <h1>Sales enquiry</h1>
  <form data-static-form-name="sales">
    <label>Email address <input type="email" name="email" /></label>
    <label>Message <textarea name="message"></textarea></label>
    <button type="Submit">
  </form>
</body>
```

The Plugin takes a single argument, an object with a `respondWith` property. This function takes an object with a `formData` property (the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance) and `name` property (the name value of your `data-static-form-name` attribute). It should return a `Response` or `Promise` of a `Response`. It is in this `respondWith` function that you can take action such as serializing the `formData` and saving it to a KV namespace.

The `method` and `action` attributes of the HTML form do not need to be set. The Plugin will automatically override them to allow it to intercept the submission.
