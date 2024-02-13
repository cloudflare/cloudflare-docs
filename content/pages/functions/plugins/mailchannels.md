---
pcx_content_type: concept
title: MailChannels
weight: 1
---

# MailChannels Pages Plugin

The MailChannels Pages Plugin intercepts all form submissions made which have the `data-static-form-name` attribute set. Then, it emails these form submissions using the MailChannels API.

{{<Aside type="note">}}
To use the Mailchannels Pages Plugin, you must first add a [Domain Lockdown DNS record](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown-) to the domain you are sending email from. For more information, refer to the [Mailchannels documentation](https://support.mailchannels.com/hc/en-us/articles/4565898358413-Sending-Email-from-Cloudflare-Workers-using-MailChannels-Send-API).

For standard setup with Cloudflare Pages, refer to [Enabling MailChannels for your Account](#enable-mailchannels-for-your-account---domain-lockdown) below.
{{</Aside>}}

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
      to: [{ name: "Some User", email: "someuser@example.com" }],
    },
  ],
  from: {
    name: "ACME Support",
    // The domain of your `from` address must be the same as the domain you set up MailChannels Domain Lockdown for (detailed below)
    email: "support@mydomain.com",
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

## Enable MailChannels for your account - Domain Lockdown

To enable MailChannels to send emails on your behalf through Cloudflare Pages Functions, you have to setup a [Domain Lockdown DNS record](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown-) for the domain you are sending emails from.

For most cases, setting up a Domain Lockdown DNS record involves adding a `TXT` entry to your DNS. Refer to the following steps to set up a Domain Lockdown DNS record.

First, find your account's `workers.dev` subdomain:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** > **Overview**.
3. On the right-hand side of **Overview**, note your `workers.dev` **Subdomain**. It will be similar to `myaccount.workers.dev` and customizable by you.

After you have found your `workers.dev` subdomain, add the MailChannels DNS record:

1. In **Account Home**, select the website you would like to add an SPF record for.
2. Select **DNS** > **Records** > **Add Record**.
3. Add the following TXT DNS record, replacing `myaccount.workers.dev` with your own `workers.dev` subdomain.

{{<example>}}

| Type | Name            | Content                            |
|------|-----------------|------------------------------------|
| TXT  | `_mailchannels` | `v=mc1 cfid=myaccount.workers.dev` |

{{</example>}}

Find more details about the domain lockdown record and more complex use cases in MailChannel's [Domain Lockdown DNS record](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown-) support article.

## SPF support for MailChannels

To use both MailChannels and Cloudflare Email Routing:

1. In **Account Home**, select the website you would like to add an SPF record for.
2. Select **DNS** > **Records** > **Add Record**.
3. Add the following TXT DNS record:

{{<example>}}

| Type | Name | Content                                                                     |
|------|------|-----------------------------------------------------------------------------|
| TXT  | `@`  | `v=spf1 include:_spf.mx.cloudflare.net include:relay.mailchannels.net -all` |

{{</example>}}

{{<Aside type= "note" header="Existing SPF record">}}
If you have an existing SPF record for your domain, add the `include:...` entries to it instead of creating a new one.
{{</Aside>}}

## DKIM support for Mailchannels API

The MailChannels API also allows you add a DomainKeys Identified Mail (DKIM) credential to your DNS records. DKIM is an email authentication standard that helps you to sign email messages from your domain with a digital signature using public-key cryptography. Refer to [Cloudflare DNS DKIM guide](https://www.cloudflare.com/en-ca/learning/dns/dns-records/dns-dkim-record/) to learn more.

{{<Aside type= "note" header="Optional content">}}
Setting up DKIM for use in your MailChannels Pages Plugin is optional, but will improve the deliverability of your emails. Clients will be less likely to mark your emails as spam or junk, because, when configured correctly, DKIM allows clients to verify that you own the domain you are sending from.
{{</Aside>}}

To add a DKIM signature to a message, add the following fields to the `personalization` object for the message:

**`dkim_domain`**: The domain you are sending the email from. For example, if you are sending an email from `support@mydomain.com`, set this to `mydomain.com`.

**`dkim_selector`**: Specifies where to find the associated public key in your DNS records. For example, if you make the DKIM record available at `mailchannels._domainkey.mydomain.com`, set this to `mailchannels`.

**`dkim_private_key`**: The base-64 encoded private key.

## Generate DKIM credentials

You can generate your DKIM credentials using [OpenSSL](https://www.openssl.org/) in the following steps:

1. Generate your private key and DNS record by running the command below in your terminal:

```sh
$ openssl genrsa 2048 | tee private_key.pem | openssl rsa -outform der | openssl base64 -A > private_key.txt
```

{{<Aside type="note" header="Command breakdown">}}

`openssl genrsa 2048` generates a 2048-bit RSA key. The output is passed to `tee private_key.pem`, which writes the key to the `private_key.pem` file, and passes the key to `openssl rsa -outform der | openssl base 64 -A`, which converts the key from PEM format to DER format, then base64 encodes it. Take this output into `> private_key.txt` which saves the contents to `private_key.txt`.

{{</Aside>}}

```sh
$ echo -n "v=DKIM1;p=" > dkim_record.txt && openssl rsa -in private_key.pem -pubout -outform der | openssl base64 -A >> dkim_record.txt
```

This creates a public key from the private key (`openssl rsa -in priv_key.pem -pubout -outform der`), encodes it in base64 (`openssl base 64 -A`), and finally writes it to the `dkim_record.txt` file.


2. Copy the contents of the `private_key.txt` file and add that as an environment variable to your Pages project by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Workers & Pages** > your Pages project > **Settings** > **Environment Variables** > **Add variables**. Set the variable name as `DKIM_PRIVATE_KEY` and the value as the contents of `private_key.txt` file. We recommend adding this variable to both production and preview environments.

3. Create a DNS record with the content of the generated `dkim_record.txt` file content.

Next, look in your generated `dkim_record.txt` file for your DKIM credentials, and add them to your website in the Cloudflare dashboard. Follow the steps below:

1. In Account Home, select the website you would like to add a DKIM record.
2. In the menu on the left select **DNS** > **Records** > **Add Record**.
3. Add the following TXT DNS record:

{{<example>}}

| Type | Name                      | Content                                  |
|------|---------------------------|------------------------------------------|
| TXT  | `mailchannels._domainkey` | Insert the contents of `dkim_record.txt` | 

{{</example>}}

{{<Aside type= "note" header="Use a different selector">}}
You can substitute `mailchannels._domainkey` for any name with the format `<selector_key>._domainkey`. You can choose any value as the selector, as long as it is permitted as a DNS hostname (that is, all lowercase letters, numbers, and hyphens).
{{</Aside>}}

Your record should look like:

![Follow the instructions above to add DKIM credentials to your DNS records](/images/pages/platform/functions/mailchannel_DKIM_DNS_setup.png)

## Add DKIM fields to personalization object

After generating DKIM records, you must add the corresponding fields to the `personalizations` object to use DKIM.

The required fields are `dkim_domain`, `dkim_selector`, `dkim_private_key`. The value of these fields must match the values you generated earlier.

The following code block shows an example of using DKIM with the MailChannels Pages Plugin.

```typescript
---
filename: functions/_middleware.ts
highlight: [7-12]
---
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = (context) => mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "Some User", email: "someuser@example.com" }],
      // This value has to be the domain you added DKIM records to and where you are sending your email from
      "dkim_domain": "mydomain.com", 
      // This value has be the same as the selector you chose for your DKIM record name
      // For example, use "mailchannels" if you used "mailchannels._domainkey" as your record name
      "dkim_selector": "mailchannels", 
      "dkim_private_key": context.env.DKIM_PRIVATE_KEY
    },
  ],
  from: {
    name: "ACME Support",
    // The domain of your `from` address must be the same as the domain you set up MailChannels Domain Lockdown for
    email: "support@mydomain.com",
  },
  respondWith: () => {
    return new Response(
      `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
    );
  },
})(context);
```

### Related resources

- [Adding a DKIM Signature](https://mailchannels.zendesk.com/hc/en-us/articles/7122849237389-Adding-a-DKIM-Signature)
- [How to create a DKIM record with OpenSSL](https://www.mailhardener.com/kb/how-to-create-a-dkim-record-with-openssl)
- [Cloudflare + MailChannels Email Sending with DKIM](https://github.com/maggie-j-liu/mail)
- [MailChannels Domain Lockdown DNS record](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown-)
