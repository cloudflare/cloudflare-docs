---
title: 2 –  Deploy a Hello World app
pcx_content_type: tutorial
weight: 2
meta:
  title:  Deploy a Hello World app
---

# Deploy a Hello World app using Cloudflare Workers and Pulumi

In this tutorial, you will go through step-by-step instructions to deploy a Hello World web application using Cloudflare Workers and Pulumi Infrastructure as Code (IaC) so that you can become familiar with the resource management lifecycle. In particular, you will create a Worker, a Route, and a DNS Record to access the application before cleaning up all the resources.

![alt_text](/images/pulumi/hello-world-tutorial/sn2.png "Running Cloudflare Workers application deployed with Pulumi")

{{<Aside type="note">}}

You will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.

{{</Aside>}}

{{<tutorial>}}

{{<tutorial-prereqs>}}

Ensure you have:

* A Cloudflare account and API Token with permission to edit the resources in this tutorial. If you need to, sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
* A Pulumi Cloud account. You can sign up for an [always-free, individual tier](https://app.pulumi.com/signup).
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and the [Pulumi CLI](/pulumi/installing/) installed on your machine.
* A Cloudflare Zone. Complete the [Add a Site tutorial](/pulumi/tutorial/add-site/) to create one. 

{{</tutorial-prereqs>}}

{{<Aside type="note" header="Link to the full solution">}}

You can find the complete solution of this tutorial under [this Pulumi repo and branch](https://github.com/pulumi/tutorials/tree/cloudflare-typescript-hello-world-end). To deploy the final version, run the following:

```sh
$ mkdir serverless-cloudflare && cd serverless-cloudflare 
$ pulumi new https://github.com/pulumi/tutorials/tree/cloudflare-typescript-hello-world-end
$ npm install
$ pulumi up --yes
```

{{</Aside>}}

{{<tutorial-step title="Initialize Pulumi">}}

### a. Create a directory

You'll use a new and empty directory for this tutorial.

```sh
$ mkdir serverless-cloudflare
$ cd serverless-cloudflare
```

### b. Login

At the prompt, press Enter to log into your Pulumi Cloud account via the browser. Alternatively, you may provide a [Pulumi Cloud access token](https://www.pulumi.com/docs/pulumi-cloud/access-management/access-tokens/).

```sh
$ pulumi login
```

### c. Create a program

{{<Aside type="note">}}

A Pulumi program is code written in a [supported programming language](https://www.pulumi.com/docs/languages-sdks/) that defines infrastructure resources. We'll use TypeScript.

{{</Aside>}}

To create a program, run:

```sh
$ pulumi new https://github.com/pulumi/tutorials/tree/cloudflare-typescript-hello-world-begin
```

Complete the prompts with defaults where available; otherwise, provide the requested information. You will need:

- Your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/).
- Your Cloudflare [Zone ID](/fundamentals/setup/find-account-and-zone-ids/).
- A registered domain. For instance, `example.com`
- A valid Cloudflare API [token](/fundamentals/api/get-started/create-token/).

### d. Create a stack

{{<Aside type="note">}}

A Pulumi stack is an instance of a Pulumi program. Stacks are independently configurable and may represent different environments (development, staging, production) or feature branches.

{{</Aside>}}

To create a stack, run:

```sh
$ pulumi up --yes
```

After the above command completes, review the value of `myFirstOutput` for correctness.

### e. (Optional) Review the stack

From the output above, follow **your** _View in Browser_ link to get familiar with the Pulumi stack.

{{<Aside type="note">}}

You have not yet created any Cloudflare resources but have defined a variable, `myFirstOutput`, and the Pulumi stack.

{{</Aside>}}

Example:

```bash
View in Browser (Ctrl+O):
https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/updates/1
```

![alt_text](/images/pulumi/hello-world-tutorial/sn3.png "Pulumi Cloud stack")

{{</tutorial-step>}}

{{<tutorial-step title="Add a Worker">}}

You will now add a Cloudflare Worker to the Pulumi stack, `dev`.

### a. Add Cloudflare Worker to index.ts

Replace the contents of your `index.ts` file with the following:

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";

const config = new pulumi.Config();
const accountId = config.require("accountId");

// A Worker script to invoke
export const script = new cloudflare.WorkerScript("hello-world-script", {
  accountId: accountId,
  name: "hello-world",
  // Read the content of the worker from a file
  content: fs.readFileSync("./app/worker.ts", "utf8"),
});
```

### b. Install dependencies

```sh
$ npm install @pulumi/cloudflare
```

### c. Apply the changes

```sh
$ pulumi up --yes
```

### d. (Optional) View the Cloudflare Dashboard

You can view your Cloudflare resource directly in the Cloudflare Dashboard to validate its existence.

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Workers & Pages**.
4. Open the "hello-world" application. Example:
![alt_text](/images/pulumi/hello-world-tutorial/sn4.png )

{{</tutorial-step>}}

{{<tutorial-step title="Add a Worker route">}}

You will now add a Worker Route to the Pulumi stack, `dev` so the script can have an endpoint.

### a. Add Worker Route to index.ts

Replace the contents of your `index.ts` file with the following:

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");
const domain = config.require("domain")

// A Worker script to invoke
export const script = new cloudflare.WorkerScript("hello-world-script", {
  accountId: accountId,
  name: "hello-world",
  // Read the content of the worker from a file
  content: fs.readFileSync("./app/worker.ts", "utf8"),
});

// A Worker route to serve requests and the Worker script
export const route = new cloudflare.WorkerRoute("hello-world-route", {
  zoneId: zoneId,
  pattern: "hello-world." + domain,
  scriptName: script.name,
});
```

### b. Apply changes

```sh
$ pulumi up --yes
```

### c. (Optional) View the Cloudflare Worker route in the dashboard

In the Cloudflare Dashboard, the Worker application now contains the previously defined Worker Route.

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Workers & Pages**.
4. Select your application.
5. For **Routes**, select **View** to verify the Worker Route details match your definition.
![alt_text](/images/pulumi/hello-world-tutorial/sn5.png "Cloudflare Dashboard - Worker Route")

{{</tutorial-step>}}

{{<tutorial-step title="Add a DNS record">}}

You will now add a DNS record to your domain so the previously configured route can be accessed via a URL.

### a. Add DNS Record to index.ts

Replace the contents of your `index.ts` file with the following:

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const zoneId = config.require("zoneId");
const domain = config.require("domain")

// A Worker script to invoke
export const script = new cloudflare.WorkerScript("hello-world-script", {
  accountId: accountId,
  name: "hello-world",
  // Read the content of the worker from a file
  content: fs.readFileSync("./app/worker.ts", "utf8"),
});

// A Worker route to serve requests and the Worker script
export const route = new cloudflare.WorkerRoute("hello-world-route", {
  zoneId: zoneId,
  pattern: "hello-world." + domain,
  scriptName: script.name,
});

// A DNS record to access the route from the domain
export const record = new cloudflare.Record("hello-world-record", {
  zoneId: zoneId,
  name: script.name,
  value: "192.0.2.1",
  type: "A",
  proxied: true
});

export const url = route.pattern
```

{{<Aside type="note">}}

The last line in the code will create an output with the endpoint for the Hello World app.

{{</Aside>}}

### b. Apply the changes

```sh
$ pulumi up --yes
```

### c. (Optional) View all the resources in Pulumi Cloud

1. In your browser, open your [Pulumi Cloud](https://app.pulumi.com/)
2. Navigate to your stack, `serverless-cloudflare/dev`.
3. Confirm all the defined resources are created and healthy. Example:

![alt_text](/images/pulumi/hello-world-tutorial/sn6.png "Pulumi Cloud stack")

{{</tutorial-step>}}

{{<tutorial-step title="Test the app">}}

You have incrementally added all the Cloudflare resources needed to run and access your Hello World application. This was done by defining the resources in TypeScript and letting Pulumi handle the rest.

You can test your application via the terminal or browser.

* In the terminal

```sh
$ pulumi stack output url
hello-world.atxyall.com
$ curl "https://$(pulumi stack output url)"
<!DOCTYPE html>
  <html>
    <head>
      <title>  Hello World </title>
    </head>
    <body>
      <h1>Serverless with Pulumi</h1>
      <p>The current time is: <span id="date">Thu Oct 05 2023 22:02:17 GMT+0000 (Coordinated Universal Time)</span>.</p>
    <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v8b253dfea2ab4077af8c6f58422dfbfd1689876627854" integrity="sha512-bjgnUKX4azu3dLTVtie9u6TKqgx29RBwfj3QXYt5EKfWM/9hPSAI/4qcV5NACjwAo8UtTeWefx6Zq5PHcMm7Tg==" data-cf-beacon='{"rayId":"8118f2b5ddb5eb02","version":"2023.8.0","r":1,"b":1,"token":"240f365d9d42457597f861e6e46c6ce9","si":100}' crossorigin="anonymous"></script>
</body>
  </html>
```
{{<Aside type="note">}}

Depending on your domain settings, you may need to use "http" instead.

{{</Aside>}}

* In your browser, open `hello-world.YOUR_DOMAIN.com`

Example:

![alt_text](/images/pulumi/hello-world-tutorial/sn2.png "Hello World app browser screenshot")

{{</tutorial-step>}}

{{<tutorial-step title="Clean up">}}

In this last step, you will run a couple of commands to clean up the resources and stack you used throughout the tutorial.

### a. Delete the Cloudflare resources

```sh
$ pulumi destroy
```

### b. Remove the Pulumi stack

```sh
$ pulumi stack rm dev
```

{{</tutorial-step>}}
{{</tutorial>}}