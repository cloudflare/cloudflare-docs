---
title: Manage secrets
pcx_content_type: tutorial
weight: 2
meta:
  title: Manage secrets
---

# Manage secrets with Pulumi ESC

In this tutorial, you will receive step-by-step instructions on using Pulumi ESC (Environments, Secrets, and Configuration), which is a secure and robust secrets management solution. The tutorial will walk you through how to develop with Wrangler while following security best practices. Specifically, you will learn how to manage your `CLOUDFLARE_API_TOKEN` for logging in to your Cloudflare account, pass ESC-stored secrets to Workers, and programmatically load your `.dev.vars` file.

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

By externally and securely storing your `CLOUDFLARE_API_TOKEN`, you can control access and rotate the token value. We'll run `wrangler` in a non-interactive mode, thus, a Cloudflare API token and account ID are required. Ensure you have:

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

When you use the `esc run` command, it opens the Environment and sets the specified Environment variables into a temporary environment. After that, it uses those variables in the context of the `wrangler` command. This is especially helpful when running `wrangler` commands in a CI/CD environment but wanting to avoid storing credentials directly in your pipeline.

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

By using an external secrets management solution, commonly used Worker secrets can be stored in a single shared Environment that is accessed by the relevant Workers. You can use shell commands with `esc` to incorporate scripting and integrate them into deployment pipelines or `make` commands. Use `esc [command] --help` for more information about the various commands available in the CLI.

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

As `.dev.vars` files may often contain secrets, they should not be committed to source control. Keeping these externally ensures easy loading to a new development environment without any loss.

{{</tutorial-step>}}

{{<tutorial-step title="Next steps">}}

You have configured Pulumi ESC Environments to load secrets for Wrangler commands, enhancing security during development with Wrangler. The externalized secrets are now reusable across Workers. [Learn more about Pulumi ESC features and integrations](https://www.pulumi.com/docs/esc/) or follow the [Deploy a Worker with Pulumi](/pulumi/tutorial/hello-world/) tutorial.

{{</tutorial-step>}}
{{</tutorial>}}
