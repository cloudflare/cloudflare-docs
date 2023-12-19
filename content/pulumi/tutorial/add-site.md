---
title: 1 –  Add a site
pcx_content_type: tutorial
weight: 1
meta:
  title: Add a site
---

# Add a site to Cloudflare with Pulumi IaC

In this tutorial, you will go through step-by-step instructions to bring an existing site to Cloudflare using Pulumi Infrastructure as Code (IaC) so that you can become familiar with the resource management lifecycle. In particular, you will create a Zone and add a DNS record to resolve your newly added site. This tutorial adopts the IaC principle to complete the steps listed in the [Add a Site tutorial](https://developers.cloudflare.com/fundamentals/setup/account-setup/add-site/). 

{{<Aside type="note">}}

This tutorial will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.

{{</Aside>}}

{{<tutorial>}}

{{<tutorial-prereqs>}}

Ensure you have:

* A Cloudflare account and API Token with permission to edit the resources in this tutorial. If you need to, sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
* A Pulumi Cloud account. You can sign up for an [always-free, individual tier](https://app.pulumi.com/signup).
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and the [Pulumi CLI](https://developers.cloudflare.com/pulumi/installing/) installed on your machine.
* A registered domain name.

{{</tutorial-prereqs>}}

{{<Aside type="note" header="Link to the full solution">}}

You can find the complete solution of this tutorial under [this Pulumi repo and branch](https://github.com/pulumi/tutorials/tree/cloudflare-typescript-add-site-end). To deploy the final version, run the following:

```sh
$ mkdir addsite-cloudflare && cd addsite-cloudflare 
$ pulumi new https://github.com/pulumi/tutorials/tree/cloudflare-typescript-add-site-end
$ npm install
$ pulumi up --yes
```

{{</Aside>}}

{{<tutorial-step title="Initialize Pulumi">}}

### a. Create a directory

You'll use a new and empty directory for this tutorial.

```sh
$ mkdir addsite-cloudflare
$ cd addsite-cloudflare
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
$ pulumi new https://github.com/pulumi/tutorials/tree/cloudflare-typescript-add-site-begin
```

Complete the prompts with defaults where available; otherwise, provide the requested information. You will need:

- Your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/).
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

### d. (Optional) Verify the stack creation

Review the value of `myTestOutput` to confirm the stack creation.

```sh
$ pulumi stack output myTestOutput
Hurray!
```

{{</tutorial-step>}}

{{<tutorial-step title="Add a Zone">}}

You will now add a Cloudflare Zone to the Pulumi stack. A domain is known as a Zone in Cloudflare.

### a. Add a Cloudflare Zone

Replace the contents of your `index.ts` file with the following:

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain")

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free", 
    jumpStart: true,
});

// Export the zone ID 
export const zoneId = zone.id;
```

### b. Install the Pulumi Cloudflare provider

```sh
$ npm install @pulumi/cloudflare
```

### c. Apply the changes

To apply the stack changes, run:

```sh
$ pulumi up --yes
```

### c. (Optional) Review the Zone ID

Review the value of `zoneId` to confirm the Zone creation.

```sh
$ pulumi stack output zoneId
d8fcb6d731fe1c2d75e2e8d6ad63fad5
```

{{</tutorial-step>}}

{{<tutorial-step title="Update your nameservers">}}

Once you have added a domain (also known as a zone) to Cloudflare, that domain will receive two assigned authoritative nameservers. 

{{<Aside type="note">}}

This process makes Cloudflare your authoritative DNS provider, allowing your DNS queries and web traffic to be served from and protected by our network. 

[Learn more about pending domains](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/)
{{</Aside>}}

### a. Update the program 

At the end of your `index.ts` file, add the following:

```typescript
export const nameservers = zone.nameServers;
export const status = zone.status;
```

### b. Apply the changes

To apply the stack changes, run:

```sh
$ pulumi up --yes
```

### c. Retrieve the nameservers

Review the value of `nameservers` to retrieve the assigned nameservers:

```sh
$ pulumi stack output nameservers
["emerie.ns.cloudflare.com","miguel.ns.cloudflare.com"]
```

### d. Update your registrar

Update the nameservers at your registrar to activate Cloudflare services for your domain. Instructions are registrar-specific. You may be able to find guidance under [this consolidated list of common registrars](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#update-your-registrar).

{{<Aside type="warning">}}

Registrars take up to 24 hours to process nameserver changes.

{{</Aside>}}

### e. Check your domain status

Once successfully registered, your domain status will change to `active`. 

```sh
$ pulumi stack output status
active
```

{{</tutorial-step>}}

{{<tutorial-step title="Add a DNS record">}}

You will now add a DNS record to your domain.

### a. Add a DNS record

Replace the contents of your `index.ts` file with the following:

```typescript
---
filename: index.ts
---
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config();
const accountId = config.require("accountId");
const domain = config.require("domain")

// Create a Cloudflare resource (Zone)
const zone = new cloudflare.Zone("my-zone", {
    zone: domain,
    accountId: accountId,
    plan: "free", // Choose the desired plan, e.g., "free", "pro", "business", etc.
    jumpStart: true,
});

// Export the zone ID 
export const zoneId = zone.id;

// Export the Cloudflare-assigned nameservers.
export const nameservers = zone.nameServers;

// Export the status
export const status = zone.status;

// Set up a Record for your site
const record = new cloudflare.Record("my-record", {
    zoneId: zoneId,
    name: domain,
    value: "192.0.2.1",
    type: "A",
    proxied: true,
});

```

### b. Apply the stack changes

To apply the stack changes, run:

```sh
$ pulumi up --yes
```

{{</tutorial-step>}}

{{<tutorial-step title="Verify setup">}}

To test your site, run:

```sh
$ nslookup $(pulumi config get domain)
```

{{</tutorial-step>}}

{{<tutorial-step title="Clean up">}}

In this last step, you will remove the resources and stack used throughout the tutorial.

### a. Delete the resources

```sh
$ pulumi destroy
```

### b. Remove the stack

```sh
$ pulumi stack rm dev
```

{{</tutorial-step>}}

<!-- TODO -->
<!-- You have incrementally defined Cloudflare resources needed to add a site to Cloudflare. After each new resource, you apply the changes to your stack via the `pulumi up` command. The resources were defined TypeScript and letting Pulumi handle the rest. -->
{{</tutorial>}}