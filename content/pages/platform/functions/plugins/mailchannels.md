---
pcx-content-type: concept
title: MailChannels
weight: 1
---

# MailChannels Pages Plugin

The MailChannels Pages Plugin intercepts all form submissions made which have the `data-static-form-name` attribute set. It then emails these form submissions using the MailChannels API.

The MailChannels API also allows you add a DomainKeys Identified Mail (DKIM) which is an email authentication standard that helps you to sign email messages from your domain with a digital signature using public-key cryptography.

To add a DKIM signature to a message, add the following fields to the `personalization` object for the message:

**`dkim_domain`**: This is the domain (`d=`) field for the DKIM signature. To pass DMARC, this should be aligned with the domain in the From header address.

**`dkim_selector`**: This is the selector (`s=`) field for the DKIM signature. It specifies where to find the associated public key in the DNS - see the DKIM specification for more details.

**`dkim_private_key`**: The base-64 encoded private key.

## Generate DKIM credentials 

You can generate your DKIM credentials using any DKIM generator of your choice. To add your generated credentials to your zone on the Cloudflare dashboard, do the following:

1. Select the Zone to add DKIM records to. 
2. In the menu on the left select **DNS** > **Add Record**.
3. In the drop-down menu, select **TXT** as the type of record.  
4. Enter your domain name.
5. Enter the DKIM record into your DNS server record as a text (TXT) entry. The name of your DNS record must follow this convention `[selector key]._domainkey.<Your domain>`. 
6. Add the value of your DKIM record in the content field.
7. Enter the Private key into your email server.

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
      "dkim_domain": "example.com",
      "dkim_selector": "mcdkim",
      "dkim_private_key": "<base64 encoded privatekey>"
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
