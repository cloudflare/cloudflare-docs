---
title: Manage secrets
pcx_content_type: tutorial
weight: 2
meta:
  title: Manage secrets
---

# Manage secrets with Pulumi ESC

In this tutorial, you will be given step-by-step instructions on using Pulumi ESC (Environments, Secrets, and Configuration), which is a secure and robust secrets management solution. The tutorial will guide you on retrieving Cloudflare credentials and other secrets for Wrangler commands. Specifically, you will learn how to manage your `CLOUDFLARE_API_TOKEN` for logging in to your Cloudflare account, pass ESC-stored secrets to Workers, and programmatically load your `.dev.vars` file.

{{<Aside type="note">}}
You will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.
{{</Aside>}}

{{<tutorial>}}
{{<tutorial-prereqs>}}

Ensure you have:

* A Cloudflare account. [Sign up for a Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages).
* A Pulumi Cloud account. [Sign up for a Pulumi Cloud](https://app.pulumi.com/signup).
* The [Pulumi ESC CLI](https://www.pulumi.com/docs/install/esc/) installed.
* A Wrangler project. To create one, follow the [Create a New Worker project step](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project).

{{</tutorial-prereqs>}}
{{<tutorial-step title="Set up a new Environment">}}

A [Pulumi ESC Environment](https://www.pulumi.com/docs/esc/environments/), or Environment, is a YAML file containing configurations and secrets for your application and infrastructure. These can be accessed in several ways, including shell commands. All ESC Environments reside in your Pulumi Cloud account.

### a. Log in to Pulumi Cloud

Use the Pulumi ESC CLI to log into your Pulumi Cloud account.

```sh
$ esc login
Logged in to pulumi.com as  ....
```

### b. Create a new Environment

{{<Aside type="info">}}
Environment names must be unique within a Pulumi organization and may only contain alphanumeric characters, hyphens, underscores, and periods.
{{</Aside>}}

```sh
$ ESC_ENV=my-dev-environment
$ esc env init $ESC_ENV
Environment created.
```

{{</tutorial-step>}}
{{<tutorial-step title="Login to Cloudflare">}}

Now that the Pulumi ESC Environment has been created, it can be consumed in various ways. For instance, to log into your Cloudflare account without needing to predefine credentials in your shell:

### a. Add your credentials

Because `wrangler` will run in a non-interactive mode, a Cloudflare API token and account ID are required. Ensure you have:

* Your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/), and
* A valid Cloudflare API [token](/fundamentals/api/get-started/create-token/).

Replace the placeholder `123abc` with your corresponding values:

```sh
$ esc env set $ESC_ENV environmentVariables.CLOUDFLARE_ACCOUNT_ID 123abc
$ esc env set $ESC_ENV environmentVariables.CLOUDFLARE_API_TOKEN  123abc --secret
```

{{<Aside type="note">}}
The API token is declared as a `secret`. Once the Environment is saved, Pulumi will encrypt its value and replace it with ciphertext.
{{</Aside>}}

### a. Log out

Ensure you're not currently logged in to your Cloudflare account.

```sh
$ npx wrangler logout
Not logged in, exiting...
```

### a. Log in

Pass ESC-stored Cloudflare credentials to Wrangler.

```sh
$ esc run ${ESC_ENV} npx wrangler whoami
...
Getting User settings...
👋 You are logged in with an API Token.
```

The `esc run` command opens the Environment, sets the specified Environment variables into a temporary environment, and then uses those in the context of the `wrangler` command.

{{</tutorial-step>}}
{{<tutorial-step title="Add Worker secrets">}}

Pulumi ESC centralizes secrets, and Wrangler can be used to pass them on to Workers and other Cloudflare resources. Let's do this with the `wrangler secret put` command.

#### a. Add a secret

```sh
$ esc env set ${ESC_ENV} environementVariables.TOP_SECRET "aliens are real" --secret
```

#### b. Pass the secret to your Worker

```sh
$ esc run -i ${ESC_ENV} -- sh -c 'echo "$TOP_SECRET" | npx wrangler secret put TOP_SECRET'
```

{{</tutorial-step>}}
{{<tutorial-step title="Load `.dev.vars`">}}

In this step, you'll configure an Environment to load your `.dev.vars` file programmatically.

{{<Aside type="info">}}
The `.dev.vars` file is located in the root of your wrangler project to define secrets used when running `wrangler dev`. [Learn more about Local Development with Secrets](https://developers.cloudflare.com/workers/configuration/secrets/#local-development-with-secrets)
{{</Aside>}}

With a dedicated ESC Environment to store all the `.dev.vars` secrets, we can use a `dotenv` export flag.

#### a. Create an Environment

```sh
$ E=my-devvars
$ esc env init $E
Environment created.
```

#### b. Add a secret

```sh
$ esc env set $E environmentVariables.TOP_SECRET  "the moon is made of cheese" --secret
```

#### c. Generate the `.dev.vars` file

```sh
$ esc env open ${E} --format dotenv > .dev.vars
```

{{</tutorial-step>}}

{{<tutorial-step title="Next steps">}}

You have defined Pulumi ESC Environments to load secrets for Wrangler commands. [Learn more about Pulumi ESC features and integrations](https://www.pulumi.com/docs/esc/) or follow the [Deploy a Worker with Pulumi](/pulumi/tutorial/hello-world/) tutorial.

{{</tutorial-step>}}
{{</tutorial>}}
