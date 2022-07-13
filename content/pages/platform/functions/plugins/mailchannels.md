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

## DKIM support for Mailchannel API

The MailChannels API also allows you add a DomainKeys Identified Mail (DKIM) which is an email authentication standard that helps you to sign email messages from your domain with a digital signature using public-key cryptography. Refer to [Cloudflare DNS DKIM guide](https://www.cloudflare.com/en-ca/learning/dns/dns-records/dns-dkim-record/) to learn more.

{{<Aside type= "note" header="Optional content">}}
When using the MailChannel plugin adding DKIM is optional. 
{{</Aside>}}

To add a DKIM signature to a message, add the following fields to the `personalization` object for the message:

**`dkim_domain`**: This is the domain (`d=`) field for the DKIM signature. To pass DMARC, this should be aligned with the domain in the From header address.

**`dkim_selector`**: This is the selector (`s=`) field for the DKIM signature. It specifies where to find the associated public key in the DNS - see the DKIM specification for more details.

**`dkim_private_key`**: The base-64 encoded private key.

## Generate DKIM credentials 

You can generate your DKIM credentials using [OpenSSL](https://www.openssl.org/) in the following steps:

1. Generate your private key and DNS credentials by running the command below in your terminal: 

```sh
$ openssl genrsa 2048 | tee private_key.pem | openssl rsa -pubout -outform der | openssl base64 -A | awk '{print "v=DKIM1; k=rsa; p="$1}' > dkim_record.txt
```
{{<Aside type="note" header="Command breakdown">}}

`openssl genrsa 2048` generates a 2048-bit RSA key. The output is passed to

`tee private_key.pem`, which writes the key to the `private_key.pem` file, and passes the key to

`openssl rsa -outform der | openssl base 64 -A`, which converts the key from PEM format to DER format, then base64 encodes it (this essentially removes the header from the PEM formatted key). The output is then passed to dkim_record.txt

{{</Aside>}}

2. Copy the private key from `private_key.pem`file and add it to your Function

3. Create a DNS record with the content of the `dkim_record.txt` file content.


Look in your generated `dkim_record.txt` file for your generated credentials, and add them to your Zone on the Cloudflare dashboard. Follow the steps below:

1. Select the Zone to add DKIM records. 
2. In the menu on the left select **DNS** > **Add Record**.
3. In the drop-down menu, select **TXT** as the type of record.  
4. Enter your domain name.
5. Enter the DKIM record into your DNS server as a text (TXT) entry. The name of your DNS record must follow this convention `[selector key]._domainkey.<Your domain>`. 

{{<Aside type= "note" header="Selector value">}}
You can choose any value as the selector, as long as it is permitted as a DNS hostname (that is, all lowercase letters, numbers and hyphens). It is recommended to use the name of the service and a date indicator. This makes it easy to remember where this key is used, for example, `cloudflare2022`.
{{</Aside>}}

6. Add the content of your `dkim_record.txt` file in the content field.
7. Add the private key to your Pages Function.

![Follow the instructions above to add DKIM credentials to your Zone DNS records](/pages/platform/functions/plugins/mailchannel_DKIM_DNS_setup.png)

## Add DKIM fields to personalization object

```typescript
---
filename: functions/_middleware.ts
---
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "support@example.com" }],
      "dkim_domain": "support@example.com",
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

### Related resources

* [Adding a DKIM Signature](https://mailchannels.zendesk.com/hc/en-us/articles/7122849237389-Adding-a-DKIM-Signature)
* [How to create a DKIM record with OpenSSL](https://www.mailhardener.com/kb/how-to-create-a-dkim-record-with-openssl)
* [Cloudflare + MailChannels Email Sending with DKIM](https://github.com/maggie-j-liu/mail)
