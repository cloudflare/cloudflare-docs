---
title: 1 –  Hello World with Pulumi
pcx_content_type: tutorial
weight: 2
meta:
  title: Hello World with Pulumi
---

# Deploy a Hello World web application using Cloudflare Workers and Pulumi

In this tutorial, you will go through step-by-step instructions to deploy a Hello World web application using Cloudflare Workers and Pulumi so that you can become familiar with the resource management lifecycle. In particular, you will create a worker, add a route, and add a DNS record to access the application before cleaning up all the resources.

![alt_text](/images/pulumi/hello-world-tutorial/sn2.png "Running Cloudflare Workers application deployed with Pulumi")

{{<Aside type="note">}}

This tutorial will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.

{{</Aside>}}

{{<Aside type="note" header="Link to the full solution">}}

The full solution of this tutorial can be found under [this Pulumi repo and branch](https://github.com/pulumi/tutorials/tree/cloudflare-typescript-hello-world-end). To deploy the final version, run:
```sh
$ pulumi new https://github.com/pulumi/tutorials/tree/cloudflare-typescript-hello-world-end
```

{{</Aside>}}

{{<tutorial>}}

{{<tutorial-prereqs>}}

Before you start, make sure you have:

* A Cloudflare account and API Token with permissions to edit the resources in this tutorial. If you need to, sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
* A Pulumi Cloud account. You can sign up for an [always-free, individual tier](https://app.pulumi.com/signup).
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and  the [Pulumi CLI](https://developers.cloudflare.com/pulumi/installing/) installed on your machine.

{{</tutorial-prereqs>}}

{{<tutorial-step title="Initialize Pulumi">}}

<!-- ## Step 1: Initialize Pulumi -->

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

### c. Create a project

Complete the prompts with defaults where possible and provide all the Cloudflare details. You will need your [account and zone id](/fundamentals/setup/find-account-and-zone-ids/), a [domain](/fundamentals/setup/account-setup/add-site/), and your API [token](/fundamentals/api/get-started/create-token/).

```sh
$ pulumi new  https://github.com/pulumi/tutorials/tree/cloudflare-typescript-hello-world-begin

This command will walk you through creating a new Pulumi project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

project name (serverless-cloudflare):  <ENTER>
project description (A TypeScript program to deploy a serverless application on Cloudflare.):  <ENTER>
Created project 'serverless-cloudflare'

Please enter your desired stack name.
To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. `acmecorp/dev`).
stack name (dev):  <ENTER>
Created stack 'dev'

cloudflare:apiToken: A Cloudflare API Token with permissions to edit the resources in this tutorial: ***
accountId: A valid Cloudflare Account ID: abc
domain: A valid, configured Cloudflare-controlled domain: example.com
zoneId: A valid Cloudflare Zone ID: xyz
Saved config

Installing dependencies...

added 195 packages, and audited 196 packages in 7s

65 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Finished installing dependencies

Your new project is ready to go! ✨

To perform an initial deployment, run `pulumi up`

```

### d. Create a stack

At the prompt, Select `yes` with the arrow keys and press the Enter key

```sh
$ pulumi up

Previewing update (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/....

     Type                 Name                       Plan
 +   pulumi:pulumi:Stack  serverless-cloudflare-dev  create

Outputs:
    myFirstOutput: "accountId: 24725f46259aa3c2a1d7810649cd7428, zoneId:10417f0f3cdfae4db9c951209933f4e0, domain: atxyall.com"

Resources:
    + 1 to create

info: There are no resources in your stack (other than the stack resource).

Do you want to perform this update?  [Use arrows to move, type to filter]
>  yes
  no
  details

~~~~~~~

Do you want to perform this update? yes
Updating (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/..../serverless-cloudflare/dev/updates/1

     Type                 Name                       Status
 +   pulumi:pulumi:Stack  serverless-cloudflare-dev  created (0.80s)

Outputs:
    myFirstOutput: "accountId: 24725f46259aa3c2a1d7810649cd7428, zoneId:10417f0f3cdfae4db9c951209933f4e0, domain: atxyall.com"

Resources:
    + 1 created

Duration: 2s

```

After the above command completes, review the value of `myFirstOutput` for correctness.

### e. (Optional) Review the stack

From the output above, follow **your** _View in Browser_ link to get familiar with the Pulumi stack.


{{<Aside type="note">}}

You have not yet created any Cloudflare resources but you have defined a variable, `myFirstOutput` and the Pulumi stack itself.

{{</Aside>}}

Example:

```sh
View in Browser (Ctrl+O):
https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/updates/1
```

![alt_text](/images/pulumi/hello-world-tutorial/sn3.png "Pulumi Cloud stack")

{{</tutorial-step>}}

{{<tutorial-step title="Deploy a 'Hello World' script">}}

<!-- ## Step 2: Deploy a "Hello World" script -->
You will now add a Cloudflare Worker to the Pulumi stack, `dev`.

### a. Add Cloudflare Worker to index.ts

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

### b. Install the Pulumi Cloudflare provider

```sh
$ npm install @pulumi/cloudflare
```

### c. Apply the changes

At the prompt, Select `yes` with the arrow keys and press the Enter key

```sh
$ pulumi up

Previewing update (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/previews/772ab3d6-23f7-4925-b810-1e3ec7f5658f

     Type                              Name                       Plan
     pulumi:pulumi:Stack               serverless-cloudflare-dev
 +   └─ cloudflare:index:WorkerScript  hello-world-script         create

Outputs:
  - myFirstOutput: "accountId: 24725f46259aa3c2a1d7810649cd7428, zoneId:10417f0f3cdfae4db9c951209933f4e0, domain: atxyall.com"
  + script       : {
      + accountId              : "24725f46259aa3c2a1d7810649cd7428"
      + analyticsEngineBindings: output<string>
      + compatibilityDate      : output<string>
      + compatibilityFlags     : output<string>
      + content                : "addEventListener(\"fetch\", event => {\n  event.respondWith(handleRequest(event.request))\n});\n\nasync function handleRequest(request) {\n  let date = new Date();\n  let html = `<!DOCTYPE html>\n  <html>\n    <head>\n      <title>  Hello World </title>\n    </head>\n    <body>\n      <h1>Serverless with Pulumi</h1>\n      <p>The current time is: <span id=\"date\">${date}</span>.</p>\n    </body>\n  </html>`;\n\n  return new Response(html, {\n    status: 200,\n    headers: {\n      \"content-type\": \"text/html;charset=UTF-8\",\n    },\n   });\n}"
      + id                     : output<string>
      + kvNamespaceBindings    : output<string>
      + logpush                : output<string>
      + module                 : output<string>
      + name                   : "hello-world"
      + plainTextBindings      : output<string>
      + queueBindings          : output<string>
      + r2BucketBindings       : output<string>
      + secretTextBindings     : output<string>
      + serviceBindings        : output<string>
      + urn                    : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerScript:WorkerScript::hello-world-script"
      + webassemblyBindings    : output<string>
    }

Resources:
    + 1 to create
    1 unchanged

Do you want to perform this update?  [Use arrows to move, type to filter]
> yes
  no
  details

~~~~~~~

Do you want to perform this update? yes
Updating (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/updates/3

     Type                              Name                       Status
     pulumi:pulumi:Stack               serverless-cloudflare-dev
 +   └─ cloudflare:index:WorkerScript  hello-world-script         created (1s)

Outputs:
  - myFirstOutput: "accountId: 24725f46259aa3c2a1d7810649cd7428, zoneId:10417f0f3cdfae4db9c951209933f4e0, domain: atxyall.com"
  + script       : {
      + accountId         : "24725f46259aa3c2a1d7810649cd7428"
      + compatibilityFlags: []
      + content           : "addEventListener(\"fetch\", event => {\n  event.respondWith(handleRequest(event.request))\n});\n\nasync function handleRequest(request) {\n  let date = new Date();\n  let html = `<!DOCTYPE html>\n  <html>\n    <head>\n      <title>  Hello World </title>\n    </head>\n    <body>\n      <h1>Serverless with Pulumi</h1>\n      <p>The current time is: <span id=\"date\">${date}</span>.</p>\n    </body>\n  </html>`;\n\n  return new Response(html, {\n    status: 200,\n    headers: {\n      \"content-type\": \"text/html;charset=UTF-8\",\n    },\n   });\n}"
      + id                : "hello-world"
      + name              : "hello-world"
      + urn               : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerScript:WorkerScript::hello-world-script"
    }

Resources:
    + 1 created
    1 unchanged

Duration: 5s
```

### d. (Optional) View the Cloudflare Worker in the dashboard

You can view your Cloudflare resource directly in the Cloudflare Dashboard to validate its existence.

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Workers & Pages**.
4. Open the "hello-world" application. Example:
![alt_text](/images/pulumi/hello-world-tutorial/sn4.png )

{{</tutorial-step>}}

{{<tutorial-step title="Add a Worker route">}}
<!-- ## Step 3:  Add a Worker route -->

You will now add a Worker Route to the Pulumi stack, `dev` so the script can have an endpoint.

### a. Add Worker Route to index.ts

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

At the prompt, Select `yes` with the arrow keys and press the Enter key
```sh
$ pulumi up
Previewing update (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/previews/b01145e2-1d84-4884-a9d1-ef07c1634536

     Type                             Name                       Plan
     pulumi:pulumi:Stack              serverless-cloudflare-dev
 +   └─ cloudflare:index:WorkerRoute  hello-world-route          create

Outputs:
  + route: {
      + id        : output<string>
      + pattern   : "hello-world.atxyall.com"
      + scriptName: "hello-world"
      + urn       : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerRoute:WorkerRoute::hello-world-route"
      + zoneId    : "10417f0f3cdfae4db9c951209933f4e0"
    }

Resources:
    + 1 to create
    2 unchanged

Do you want to perform this update?  [Use arrows to move, type to filter]
> yes
  no
  details

~~~~~~~

Do you want to perform this update? yes
Updating (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/updates/4

     Type                             Name                       Status
     pulumi:pulumi:Stack              serverless-cloudflare-dev
 +   └─ cloudflare:index:WorkerRoute  hello-world-route          created (0.83s)

Outputs:
  + route : {
      + id        : "0c328b6bb1f54ae79c1cf60a7ec3673a"
      + pattern   : "hello-world.atxyall.com"
      + scriptName: "hello-world"
      + urn       : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerRoute:WorkerRoute::hello-world-route"
      + zoneId    : "10417f0f3cdfae4db9c951209933f4e0"
    }
    script: {
        accountId         : "24725f46259aa3c2a1d7810649cd7428"
        compatibilityFlags: []
        content           : "addEventListener(\"fetch\", event => {\n  event.respondWith(handleRequest(event.request))\n});\n\nasync function handleRequest(request) {\n  let date = new Date();\n  let html = `<!DOCTYPE html>\n  <html>\n    <head>\n      <title>  Hello World </title>\n    </head>\n    <body>\n      <h1>Serverless with Pulumi</h1>\n      <p>The current time is: <span id=\"date\">${date}</span>.</p>\n    </body>\n  </html>`;\n\n  return new Response(html, {\n    status: 200,\n    headers: {\n      \"content-type\": \"text/html;charset=UTF-8\",\n    },\n   });\n}"
        id                : "hello-world"
        name              : "hello-world"
        urn               : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerScript:WorkerScript::hello-world-script"
    }

Resources:
    + 1 created
    2 unchanged

Duration: 4s
```

### c. (Optional) View the Cloudflare Worker route in the dashboard

In the Cloudflare Dashboard, you'll notice the Worker application now contains the previously defined Worker Route.

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Workers & Pages**.
4. Select your application.
5. For **Routes**, select **View** to verify the Worker Route details match your definition.
![alt_text](/images/pulumi/hello-world-tutorial/sn4.png "Cloudflare Dashboard - Worker Route")

{{</tutorial-step>}}

{{<tutorial-step title="Add a DNS record">}}

<!-- ## Step 4  - Add a DNS record -->

You will now add a DNS record to your domain so the previously configured route can be accessed via a URL.

### a. Add DNS record to index.ts

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

At the prompt, Select `yes` with the arrow keys and press the Enter key

```sh
$ pulumi up

Previewing update (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/previews/ea145b56-efd9-419b-91c7-1f0268619e0a

     Type                        Name                       Plan
     pulumi:pulumi:Stack         serverless-cloudflare-dev
 +   └─ cloudflare:index:Record  hello-world-record         create

Outputs:
  + record: {
      + allowOverwrite: false
      + comment       : output<string>
      + createdOn     : output<string>
      + data          : output<string>
      + hostname      : output<string>
      + id            : output<string>
      + metadata      : output<string>
      + modifiedOn    : output<string>
      + name          : "hello-world"
      + priority      : output<string>
      + proxiable     : output<string>
      + proxied       : true
      + tags          : output<string>
      + ttl           : output<string>
      + type          : "A"
      + urn           : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/record:Record::hello-world-record"
      + value         : "192.0.2.1"
      + zoneId        : "10417f0f3cdfae4db9c951209933f4e0"
    }
  + url   : "hello-world.atxyall.com"

Resources:
    + 1 to create
    3 unchanged

Do you want to perform this update?  [Use arrows to move, type to filter]
> yes
  no
  details

~~~~~~~

Do you want to perform this update? yes
Updating (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/updates/5

     Type                        Name                       Status
     pulumi:pulumi:Stack         serverless-cloudflare-dev
 +   └─ cloudflare:index:Record  hello-world-record         created (1s)

Outputs:
  + record: {
      + allowOverwrite: false
      + comment       : ""
      + createdOn     : "2023-10-05T21:50:05.308505Z"
      + data          : <null>
      + hostname      : "hello-world.atxyall.com"
      + id            : "f43933a4b0872abfce51e5c9f739a061"
      + metadata      : {
          + auto_added            : "false"
          + managed_by_apps       : "false"
          + managed_by_argo_tunnel: "false"
          + source                : "primary"
        }
      + modifiedOn    : "2023-10-05T21:50:05.308505Z"
      + name          : "hello-world"
      + proxiable     : true
      + proxied       : true
      + tags          : []
      + ttl           : 1
      + type          : "A"
      + urn           : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/record:Record::hello-world-record"
      + value         : "192.0.2.1"
      + zoneId        : "10417f0f3cdfae4db9c951209933f4e0"
    }
    route : {
        id        : "0c328b6bb1f54ae79c1cf60a7ec3673a"
        pattern   : "hello-world.atxyall.com"
        scriptName: "hello-world"
        urn       : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerRoute:WorkerRoute::hello-world-route"
        zoneId    : "10417f0f3cdfae4db9c951209933f4e0"
    }
    script: {
        accountId         : "24725f46259aa3c2a1d7810649cd7428"
        compatibilityFlags: []
        content           : "addEventListener(\"fetch\", event => {\n  event.respondWith(handleRequest(event.request))\n});\n\nasync function handleRequest(request) {\n  let date = new Date();\n  let html = `<!DOCTYPE html>\n  <html>\n    <head>\n      <title>  Hello World </title>\n    </head>\n    <body>\n      <h1>Serverless with Pulumi</h1>\n      <p>The current time is: <span id=\"date\">${date}</span>.</p>\n    </body>\n  </html>`;\n\n  return new Response(html, {\n    status: 200,\n    headers: {\n      \"content-type\": \"text/html;charset=UTF-8\",\n    },\n   });\n}"
        id                : "hello-world"
        name              : "hello-world"
        urn               : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerScript:WorkerScript::hello-world-script"
    }
  + url   : "hello-world.atxyall.com"

Resources:
    + 1 created
    3 unchanged

Duration: 4s

```

### c. (Optional) View all the resources in Pulumi Cloud

1. In your browser, open your [Pulumi Cloud](https://app.pulumi.com/)
2. Navigate to your stack, `serverless-cloudflare/dev`.
3. Confirm all the defined resources are created and healthy. Example:

![alt_text](/images/pulumi/hello-world-tutorial/sn6.png "Pulumi Cloud stack")

{{</tutorial-step>}}

{{<tutorial-step title="Test the app">}}

<!-- ## Step 5: Test the app -->

At this point you have incrementally added all the Cloudflare resources needed to run and access your Hello World application. This was done by defining the resources in TypeScript and letting Pulumi handle the rest.

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
  </html>%
```
{{<Aside type="note">}}

You may need to use "http" instead, depending on your domain settings.

{{</Aside>}}

* In your browser, open `hello-world.YOUR_DOMAIN.com`

Example:

![alt_text](/images/pulumi/hello-world-tutorial/sn2.png "Hello World app browser screenshot")

{{</tutorial-step>}}

{{<tutorial-step title="Clean up">}}

<!-- ## Step 6: Clean up -->

In this last step, you will run a couple of commands to clean up the resources and stack you used throughout the tutorial.

### a. Delete the Cloudflare resources

```sh
$ pulumi destroy
Previewing destroy (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/previews/043f4126-eb8b-4b78-bfd1-bd5c7a38b48e

     Type                              Name                       Plan
 -   pulumi:pulumi:Stack               serverless-cloudflare-dev  delete
 -   ├─ cloudflare:index:WorkerRoute   hello-world-route          delete
 -   ├─ cloudflare:index:Record        hello-world-record         delete
 -   └─ cloudflare:index:WorkerScript  hello-world-script         delete

Outputs:
  - record: {
      - allowOverwrite: false
      - comment       : ""
      - createdOn     : "2023-10-05T21:50:05.308505Z"
      - data          : <null>
      - hostname      : "hello-world.atxyall.com"
      - id            : "f43933a4b0872abfce51e5c9f739a061"
      - metadata      : {
          - auto_added            : "false"
          - managed_by_apps       : "false"
          - managed_by_argo_tunnel: "false"
          - source                : "primary"
        }
      - modifiedOn    : "2023-10-05T21:50:05.308505Z"
      - name          : "hello-world"
      - proxiable     : true
      - proxied       : true
      - tags          : []
      - ttl           : 1
      - type          : "A"
      - urn           : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/record:Record::hello-world-record"
      - value         : "192.0.2.1"
      - zoneId        : "10417f0f3cdfae4db9c951209933f4e0"
    }
  - route : {
      - id        : "0c328b6bb1f54ae79c1cf60a7ec3673a"
      - pattern   : "hello-world.atxyall.com"
      - scriptName: "hello-world"
      - urn       : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerRoute:WorkerRoute::hello-world-route"
      - zoneId    : "10417f0f3cdfae4db9c951209933f4e0"
    }
  - script: {
      - accountId         : "24725f46259aa3c2a1d7810649cd7428"
      - compatibilityFlags: []
      - content           : "addEventListener(\"fetch\", event => {\n  event.respondWith(handleRequest(event.request))\n});\n\nasync function handleRequest(request) {\n  let date = new Date();\n  let html = `<!DOCTYPE html>\n  <html>\n    <head>\n      <title>  Hello World </title>\n    </head>\n    <body>\n      <h1>Serverless with Pulumi</h1>\n      <p>The current time is: <span id=\"date\">${date}</span>.</p>\n    </body>\n  </html>`;\n\n  return new Response(html, {\n    status: 200,\n    headers: {\n      \"content-type\": \"text/html;charset=UTF-8\",\n    },\n   });\n}"
      - id                : "hello-world"
      - name              : "hello-world"
      - urn               : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerScript:WorkerScript::hello-world-script"
    }
  - url   : "hello-world.atxyall.com"

Resources:
    - 4 to delete

Do you want to perform this destroy?  [Use arrows to move, type to filter]
> yes
  no
  details

~~~~~~

Do you want to perform this destroy? yes
Destroying (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/diana-pulumi-corp/serverless-cloudflare/dev/updates/6

     Type                              Name                       Status
 -   pulumi:pulumi:Stack               serverless-cloudflare-dev  deleted
 -   ├─ cloudflare:index:WorkerRoute   hello-world-route          deleted (1s)
 -   ├─ cloudflare:index:Record        hello-world-record         deleted (0.99s)
 -   └─ cloudflare:index:WorkerScript  hello-world-script         deleted (0.75s)

Outputs:
  - record: {
      - allowOverwrite: false
      - comment       : ""
      - createdOn     : "2023-10-05T21:50:05.308505Z"
      - data          : <null>
      - hostname      : "hello-world.atxyall.com"
      - id            : "f43933a4b0872abfce51e5c9f739a061"
      - metadata      : {
          - auto_added            : "false"
          - managed_by_apps       : "false"
          - managed_by_argo_tunnel: "false"
          - source                : "primary"
        }
      - modifiedOn    : "2023-10-05T21:50:05.308505Z"
      - name          : "hello-world"
      - proxiable     : true
      - proxied       : true
      - tags          : []
      - ttl           : 1
      - type          : "A"
      - urn           : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/record:Record::hello-world-record"
      - value         : "192.0.2.1"
      - zoneId        : "10417f0f3cdfae4db9c951209933f4e0"
    }
  - route : {
      - id        : "0c328b6bb1f54ae79c1cf60a7ec3673a"
      - pattern   : "hello-world.atxyall.com"
      - scriptName: "hello-world"
      - urn       : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerRoute:WorkerRoute::hello-world-route"
      - zoneId    : "10417f0f3cdfae4db9c951209933f4e0"
    }
  - script: {
      - accountId         : "24725f46259aa3c2a1d7810649cd7428"
      - compatibilityFlags: []
      - content           : "addEventListener(\"fetch\", event => {\n  event.respondWith(handleRequest(event.request))\n});\n\nasync function handleRequest(request) {\n  let date = new Date();\n  let html = `<!DOCTYPE html>\n  <html>\n    <head>\n      <title>  Hello World </title>\n    </head>\n    <body>\n      <h1>Serverless with Pulumi</h1>\n      <p>The current time is: <span id=\"date\">${date}</span>.</p>\n    </body>\n  </html>`;\n\n  return new Response(html, {\n    status: 200,\n    headers: {\n      \"content-type\": \"text/html;charset=UTF-8\",\n    },\n   });\n}"
      - id                : "hello-world"
      - name              : "hello-world"
      - urn               : "urn:pulumi:dev::serverless-cloudflare::cloudflare:index/workerScript:WorkerScript::hello-world-script"
    }
  - url   : "hello-world.atxyall.com"

Resources:
    - 4 deleted

Duration: 4s

The resources in the stack have been deleted, but the history and configuration associated with the stack are still maintained.
If you want to remove the stack completely, run `pulumi stack rm dev`.
```

### b. Remove the Pulumi stack

```sh
$ pulumi stack rm dev
This will permanently remove the 'dev' stack!
Please confirm that this is what you'd like to do by typing `dev`: dev
Stack 'dev' has been removed!
```

<!-- Next steps will be added when the next tutorial is available -->
{{</tutorial-step>}}
{{</tutorial>}}