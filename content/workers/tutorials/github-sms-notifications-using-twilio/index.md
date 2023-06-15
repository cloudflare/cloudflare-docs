---
updated: 2023-06-14
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: GitHub SMS notifications using Twilio
layout: single
---

# GitHub SMS notifications using Twilio


{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will learn to build an SMS notification system on Workers to receive updates on a GitHub repository. Your Worker will send you a text update using Twilio when there is new activity on your repository.

You will learn how to:

- Build webhooks using Workers.
- Integrate Workers with GitHub and Twilio.
- Use Worker secrets with Wrangler.

![Animated gif of receiving a text message on your phone after pushing changes to a repository](./media/video-of-receiving-a-text-after-pushing-to-a-repo.gif)

---

## Create a project

Start by using `npx create cloudflare` to create a Worker project in the command line:

```sh
---
header: Create a project
---
$ npm create cloudflare
```

For setup you'll select the following options:
* *Where do you want to create your application?* github-twilio-notifications 
* *What type of application do you want to create?* "Hello World" script
* *Do you want to use TypeScript?* no
* *Do you want to deploy your application?* yes

Make note of the url that your application was deployed to. We'll be using that shortly when we configure our GitHub webhook.

```sh
$ cd github-twilio-notifications
```

Inside of your new `github-sms-notifications` directory, `src/worker.js` represents the entry point to your Cloudflare Workers application. You will configure this file for most of the tutorial.

You will also need a GitHub account and a repository for this tutorial. If you do not have either setup, [create a new GitHub account](https://github.com/join) and [create a new repository](https://docs.github.com/en/get-started/quickstart/create-a-repo) to continue with this tutorial.

First, create a webhook for your repository to post updates to your Worker. Inside of your Worker, you will then parse the updates. Finally, you will send a `POST` request to Twilio to send a text message to you.

You can reference the finished code at this [GitHub repository](https://github.com/rickyrobinett/workers-sdk/tree/main/templates/examples/github-sms-notifications-using-twilio).

---

## Configure GitHub

To start, configure a GitHub webhook to post to your Worker when there is an update to the repository:

1.  Go to your GitHub repository's **Settings** > **Webhooks** > **Add webhook**.

2.  Set the Payload URL to the `/webhook` path on the Worker URL that you made note of when your application was first deployed.

3.  In the **Content type** dropdown, select _application/json_.

4.  In the **Secret** field, input a secret key of your choice.

5.  In **Which events would you like to trigger this webhook?**, select **Let me select individual events**. Select the events you want to get notifications for (such as **Pull requests**, **Pushes**, and **Branch or tag creation**).

6.  Select **Add webhook** to finish configuration.

![Following instructions to set up your webhook in the GitHub webhooks settings dahsboard](./media/github-config-screenshot.png)

---

## Parsing the response

With your local environment set up, we need to parse the repository update with your Worker.

Initially, your generated `worker.js` should look like this:
```js
---
filename: worker.js
---
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!');
  },
};
```

Use the `request.method` property of [`Request`](/workers/runtime-apis/request/) to check if the request coming to your application is a `POST` request, and send an error response if the request is not a `POST` request.

```js
---
filename: worker.js
---
export default {
  async fetch(request, env, ctx) {
    if(request.method !== 'POST') {
      return new Response('Please send a POST request!');
    }
  },
};
```

Next, validate that the request is sent with the right secret key. GitHub attaches a hash signature for [each payload using the secret key](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks). Use a helper function called `checkSignature` on the request to ensure the hash is correct. Then, you can access data from the webhook by parsing the request as JSON.

```js
---
filename: worker.js - fetch()
---
async fetch(request, env, ctx) {
  if(request.method !== 'POST') {
    return new Response('Please send a POST request!');
  }
  try {
    const formData = await request.json();
    const headers = await request.headers;
    const action = headers.get('X-GitHub-Event');
    const repo_name = formData.repository.full_name;
    const sender_name = formData.sender.login;

    if (!checkSignature(formData, headers, env.GITHUB_SECRET_TOKEN)) {
      return new Response("Wrong password, try again", {status: 403});
    }
  } catch (e) {
    return new Response(`Error:  ${e}`);
  }
},
```

The `checkSignature` function will use the crypto library to hash the received payload with your known secret key to ensure it matches the request hash. GitHub uses an HMAC hexdigest to compute the hash in the sha1 format. You'll place this function at the top of your file, before your export.

```js
---
filename: worker.js - checkSignature()
---
const crypto = require('crypto');

async function checkSignature(formData, headers, githubSecretToken) {
  let hmac = crypto.createHmac('sha1', githubSecretToken);
  hmac.update(formData, 'utf-8');
  let expectedSignature = hmac.digest('hex');

  let actualSignature = headers.get('X-Hub-Signature');

  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const actualBuffer = Buffer.from(actualSignature, 'hex');
  return expectedBuffer.byteLength == actualBuffer.byteLength &&
             crypto.timingSafeEqual(expectedBuffer, actualBuffer);
};
```

To make this work, you need to use [`wrangler secret put`](/workers/wrangler/commands/#put-3) to set your `GITHUB_SECRET_TOKEN`. This token is the secret you picked earlier when configuring you GitHub webhook:
```sh
$ npx wrangler secret put GITHUB_SECRET_TOKEN
```

Add the node_compat flag to your `wrangler.toml` file:

```toml
---
filename: "wrangler.toml"
---
node_compat = true
```

---

## Sending a text with Twilio

You will send a text message to you about your repository activity using Twilio. You need a Twilio account and a phone number that can receive text messages. [Refer to the Twilio guide to get set up](https://www.twilio.com/messaging/sms). (If you are new to Twilio, they have [an interactive game](https://www.twilio.com/quest) where you can learn how to use their platform and get some free credits for beginners to the service.)

You can then create a helper function to send text messages by sending a `POST` request to the Twilio API endpoint. [Refer to the Twilio reference](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource) to learn more about this endpoint.

Create a new function called `sendText()` that will handle making the request to Twilio:
```js
---
filename: worker.js - sendText()
---
async function sendText(accountSid, authToken, message) {
  const endpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';

  let encoded = new URLSearchParams();
  encoded.append('To', "%YOUR_PHONE_NUMBER%");
  encoded.append('From', "%YOUR_TWILIO_NUMBER%");
  encoded.append('Body', message);

  let token = btoa(accountSid + ':' + authToken);

  const request = {
    body: encoded,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },}

  let result = await fetch(endpoint, request);
  result = await result.json();

  return new Response(JSON.stringify(result));
};
```

To make this work, you need to set some secrets to hide your `ACCOUNT_SID` and `AUTH_TOKEN` from the source code. You can set secrets with [`wrangler secret put`](/workers/wrangler/commands/#put-3) in your command line.

```sh
$ npx wrangler secret put TWILIO_ACCOUNT_SID
$ npx wrangler secret put TWILIO_AUTH_TOKEN
```

Modify your `githubWebhookHandler` to send a text message using the `sendText` function you just made.

```js
---
filename: worker.js - fetch()
---
async fetch(request, env, ctx) {
  if(request.method !== 'POST') {
      return new Response('Please send a POST request!');
  }
  try {
    const formData = await request.json();
    const headers = await request.headers;
    const action = headers.get('X-GitHub-Event');
    const repo_name = formData.repository.full_name;
    const sender_name = formData.sender.login;

    if (!checkSignature(formData, headers)) {
      return new Response("Wrong password, try again", {status: 403});
    }

    return await sendText(
        env.TWILIO_ACCOUNT_SID,
        env.TWILIO_AUTH_TOKEN,
        `${sender_name} completed ${action} onto your repo ${repo_name}`
    );
  } catch (e) {
    return new Response(`Error:  ${e}`);
  }
},
```

Run the `npx wrangler publish` command to deploy your Workers script:

```sh
$ npx wrangler publish
```

![Video of receiving a text after pushing to a repo](./media/video-of-receiving-a-text-after-pushing-to-a-repo.gif)

Now when you make an update (that you configured in the GitHub **Webhook** settings) to your repository, you will get a text soon after. If you have never used git before, refer to this [quick guide](https://www.datacamp.com/tutorial/git-push-pull) for pushing to your repository.

You can reference the finished code [on GitHub](https://github.com/rickyrobinett/workers-sdk/tree/main/templates/examples/github-sms-notifications-using-twilio).

By completing this tutorial, you have learned how to build webhooks using Workers, integrate Workers with GitHub and Twilio, and use Worker secrets with Wrangler.

## Related resources

<!-- - [Authorize users with Auth0](/workers/tutorials/authorize-users-with-auth0/) -->

- [Build a JAMStack app](/workers/tutorials/build-a-jamstack-app/)
- [Build a QR code generator](/workers/tutorials/build-a-qr-code-generator/)
