---
updated: 2024-06-17
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Send form submissions using Astro and Resend
products: [Workers]
tags: [Forms, Resend, Astro]
languages: [TypeScript]
spotlight:
  author: Cody Walsh
  author_bio_link: https://www.linkedin.com/in/cody-walsh-616a979/
  author_bio_source: LinkedIn
---

# Send form submissions using Astro and Resend

{{<tutorial-date-info>}}

{{<spotlight-author>}}

This tutorial will instruct you on how to send emails from [Astro](https://astro.build/) and Cloudflare Workers (via Cloudflare SSR Adapter) using [Resend](https://resend.com/).

## Prerequisites

Make sure you have the following set up before proceeding with this tutorial:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages)
- Installed [npm](https://docs.npmjs.com/getting-started).
- A [Resend account](https://resend.com/signup).

## 1. Create a new Astro project and install Cloudflare Adapter:

Open your terminal and run the below command:

```bash
---
header: Create Astro project
---
npm create cloudflare@latest my-astro-app -- --framework=astro
```

Follow the prompts to configure your project, selecting your preferred options for TypeScript usage, TypeScript strictness, version control, and deployment.

After the initial installation change into the newly created project directory `my-astro-app` and run the following to add the Cloudflare adapter:

```bash
---
header: Install Cloudflare Adapter
---
npm run astro add cloudflare
```

The [`@astrojs/cloudflare` adapter](https://github.com/withastro/adapters/tree/main/packages/cloudflare#readme) allows Astro's Server-Side Rendered (SSR) sites and components to work on Cloudflare Pages and converts Astro's endpoints into Cloudflare Workers endpoints.

## 2. Add your domain to Resend

{{<Aside type="note">}}

If you do not have a domain and just want to test you can skip to step 4 of this section.

{{</Aside>}}

1. **Add Your Domain from Cloudflare to Resend:**
    - After signing up for Resend, navigate to the side menu and click `Domains`.
    - Look for the button to add a new domain and click it.
    - A pop-up will appear where you can type in your domain. Do so, then choose a region and click the `add` button.
    - After clicking the add button Resend will provide you with a list of DNS records (DKIM, SPF, and DMARC).
2. **Copy DNS Records from Resend to Cloudflare:**
    - Go back to your Cloudflare dashboard.
    - Select the domain you want to use and find the "DNS" section.
    - Copy and paste the DNS records from Resend to Cloudflare.
3. **Verify Your Domain:**
    - Return to Resend and click on the "Verify DNS Records" button.
    - If everything is set up correctly, your domain status will change to "Verified."
4. **Create an API Key:**
    - In Resend, find the "API Keys" option in the side menu and click it.
    - Create a new API key with a descriptive name and give Full Access permission.
5. **Save the API key for Local Development and Deployed Worker**
	- For local development, create an .env in the root folder of your Astro project and save the API key as RESEND_API_KEY='Api key here' (no quotes).
	- For a deployed Worker, run the following in your CLI and follow the instructions.
```bash
$ npx wrangler secret put RESEND_API_KEY
```

## 3. Create an Astro endpoint

In the `src/pages` directory, create a new folder called `api`. Inside the `api` folder, create a new file called `sendEmail.json.ts`. This will create an endpoint at `/api/sendEmail.json`.

Copy the following code into the `sendEmail.json.ts` file. This code sets up a POST route that handles form submissions, and validates the form data.

```ts
---
filename: src/pages/api/sendEmail.json.ts
---
export const prerender = false; //This will not work without this line

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {

  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  // Validate the data - making sure values are not empty
  if (!name || !email || !message) {

    return new Response(null, {
      status: 404,
      statusText: "Did not provide the right data",
    });

  }
}

```

## 4. Send emails using Resend

Next you will need to install the Resend SDK.

```bash
---
header: Install Resend's SDK
---
$ npm i resend
```

Once the SDK is installed you can add in the rest of the code that sends an email using the Resend's API, and conditionally checks if the Resend response was successful or not.

```ts
---
filename: src/pages/api/sendEmail.json.ts
---
export const prerender = false; //This will not work without this line

import type { APIRoute } from "astro"
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {

  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  // Validate the data - making sure values are not empty
  if (!name || !email || !message) {

    return new Response(
      JSON.stringify({
        message: `Fill out all fields.`,
      }),
      {
        status: 404,
        statusText: "Did not provide the right data",
      }
    );
  }

  // Sending information to Resend
  const sendResend = await resend.emails.send({
    from: 'support@resend.dev',
    to: 'delivered@resend.dev',
    subject: `Sumbission from ${name}`,
    html: `<p>Hi ${name},</p><p>Your message was received.</p>`,
  });

  // If the message was sent successfully, return a 200 response
  if (sendResend.data) {
    return new Response(
      JSON.stringify({
        message: `Message successfully sent!`,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );

  // If there was an error sending the message, return a 500 response
  } else {
    return new Response(
      JSON.stringify({
        message: `Message failed to send: ${sendCustom.error}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${sendCustom.error}`,
      }
    );
  }
};

```

{{<Aside type="note">}}

Make sure to change the 'to' property in 'resend.emails.send' function, if you set up your own domain in step 2. If you skipped that step, keep the value 'delivered@resend.dev'; otherwise, Resend will throw an error.

{{</Aside>}}
## 5. Create an Astro Form Component

In the `src` directory, create a new folder called `components`. Inside the `components` folder, create a new file `AstroForm.astro` and copy the provided code into it.

```Typescript
---
filename: src/components/AstroForm.astro
---


---
export const prerender = false;

type formData = {
  name: string;
  email: string;
  message: string;
};

if (Astro.request.method === "POST") {
  try {
    const formData = await Astro.request.formData();
    const response = await fetch(Astro.url + "/api/sendEmail.json", {
      method: "POST",
      body: formData,
    });

    const data: formData = await response.json();

    if (response.status === 200) {
      console.log(data.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    }
  }
}
---

<form method="POST">
    <label>
        Name
        <input type="text" id="name" name="name" required />
    </label>
    <label>
        Email
        <input type="email" id="email" name="email" required />
    </label>
    <label>
        Message
        <textarea id="message" name="message" required />
    </label>
    <button>Send</button>
</form>

```

This code creates an Astro component that renders a form and handles the form submission. When the form is submitted, the component will send a POST request to the `/api/sendEmail.json` endpoint created in the previous step with the form data.

{{<Aside type="warning" header="File Extension">}}

Astro requires an absolute URL, which is why you should use `Astro.url + "/api/sendEmail.json`. If you use a relative path the post request will fail.

{{</Aside>}}

Additionally, adding the `export const prerender = false;` will enable SSR; otherwise, the component will be static and unable to send a post request. If you don't enable it inside the component then you will need to enable SSR via the [template directive](https://docs.astro.build/en/reference/directives-reference/).

After creating the `AstroForm` component, add the component to your main index file located in the `src/pages` directory. Below is an example of how the main index file should look with the `AstroForm` component added.

```Typescript
---
filename: src/pages/index.astro
---

---
import AstroForm from '../components/AstroForm.astro'
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <AstroForm />
  </body>
</html>

```
## 6. Conclusion
You now have an Astro form component that sends emails via Resend and Cloudflare Workers. You can view your project locally via `npm run preview`, or you can deploy it live via `npm run deploy`.
