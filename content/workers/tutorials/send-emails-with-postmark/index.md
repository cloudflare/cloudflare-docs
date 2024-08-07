---
updated: 2024-05-02
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Send Emails With Postmark
tags: [Email]
languages: [JavaScript]
---

# Send Emails With Postmark

{{<tutorial-date-info>}}

In this tutorial, you will learn how to send transactional emails from Workers using [Postmark](https://postmarkapp.com/). At the end of this tutorial, you’ll be able to:

- Create a Worker to send emails.
- Sign up and add a Cloudflare domain to Postmark.
- Send emails from your Worker using Postmark.
- Store API keys securely with secrets.

## Prerequisites

To continue with this tutorial, you’ll need:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages), if you don’t already have one.
- A [registered](/registrar/get-started/register-domain/) domain.
- Installed [npm](https://docs.npmjs.com/getting-started).
- A [Postmark account](https://account.postmarkapp.com/sign_up).

## Create a Worker project

Start by using [C3](/pages/get-started/c3/) to create a Worker project in the command line, then, answer the prompts:

```sh
$ npm create cloudflare@latest
```

Alternatively, you can use CLI arguments to speed things up:

```sh
$ npm create cloudflare@latest email-with-postmark -- --type=hello-world --ts=false --git=true --deploy=false
```

This creates a simple hello-world Worker having the following content:

```js
---
filename: src/index.js
---
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};

```

## Add your domain to Postmark

If you don’t already have a Postmark account, you can sign up for a [free account here](https://account.postmarkapp.com/sign_up). After signing up, check your inbox for a link to confirm your sender signature. This verifies and enables you to send emails from your registered email address.

To enable email sending from other addresses on your domain, navigate to `Sender Signatures` on the Postmark dashboard, `Add Domain or Signature` > `Add Domain`, then type in your domain and click on `Verify Domain`.

Next, you’re presented with a list of DNS records to add to your Cloudflare domain. On your Cloudflare dashboard, select the domain you entered earlier and navigate to `DNS` > `Records`. Copy/paste the DNS records (DKIM, and Return-Path) from Postmark to your Cloudflare domain.

![Image of adding DNS records to a Cloudflare domain](/images/workers/tutorials/postmarkapp/add_dns_records.png)

{{<Aside type="note">}}
If you need more help adding DNS records in Cloudflare, refer to [Manage DNS records](/dns/manage-dns-records/how-to/create-dns-records/).

{{</Aside>}}

When that’s done, head back to Postmark and click on the `Verify` buttons. If all records are properly configured, your domain status should be updated to `Verified`.

![Image of domain verification on the Postmark dashboard](/images/workers/tutorials/postmarkapp/verified_domain.png)

To grab your API token, navigate to the `Servers` tab, then `My First Server` > `API Tokens`, then copy your API key to a safe place.

## Send emails from your Worker

The final step is putting it all together in a Worker. In your Worker, make a post request with `fetch` to Postmark’s email API and include your token and message body:

{{<Aside type="note">}}
[Postmark’s JavaScript library](https://www.npmjs.com/package/postmark) is currently not supported on Workers. Use the [email API](https://postmarkapp.com/developer/user-guide/send-email-with-api) instead.

{{</Aside>}}

```jsx
---
filename: src/index.js
---
export default {
	async fetch(request, env, ctx) {
		return await fetch('https://api.postmarkapp.com/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Postmark-Server-Token': 'your_postmark_api_token_here',
			},
			body: JSON.stringify({
				From: 'hello@example.com',
				To: 'someone@example.com',
				Subject: 'Hello World',
				HtmlBody: '<p>Hello from Workers</p>',
			}),
		});
	},
};
```

To test your code locally, run the following command and navigate to [http://localhost:8787/](http://localhost:8787/) in a browser:

```sh
$ npm start
```

Deploy your Worker with `npm run deploy`.

## Move API token to Secrets

Sensitive information such as API keys and token should always be stored in secrets. All secrets are encrypted to add an extra layer of protection. That said, it’s a good idea to move your API token to a secret and access it from the environment of your Worker.

To add secrets for local development, create a `.dev.vars` file which works exactly like a `.env` file:

```txt
---
filename: .dev.vars
---
POSTMARK_API_TOKEN=your_postmark_api_token_here
```

Also ensure the secret is added to your deployed worker by running:

```sh
---
header: Add secret to deployed Worker
---
$ npx wrangler secret put POSTMARK_API_TOKEN
```

The added secret can be accessed on via the `env` parameter passed to your Worker’s fetch event handler:

```jsx
---
filename: src/index.js
---
export default {
	async fetch(request, env, ctx) {
		return await fetch('https://api.postmarkapp.com/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Postmark-Server-Token': env.POSTMARK_API_TOKEN,
			},
			body: JSON.stringify({
				From: 'hello@example.com',
				To: 'someone@example.com',
				Subject: 'Hello World',
				HtmlBody: '<p>Hello from Workers</p>',
			}),
		});
	},
};
```

And finally, deploy this update with `npm run deploy`.

## Related resources

- [Storing API keys and tokens with Secrets](/workers/configuration/secrets/).
- [Transferring your domain to Cloudflare](/registrar/get-started/transfer-domain-to-cloudflare/).
- [Send emails from Workers](/email-routing/email-workers/send-email-workers/)
