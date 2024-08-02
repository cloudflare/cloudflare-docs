---
title: Manage secrets
pcx_content_type: tutorial
weight: 2
meta:
  title: Manage secrets
---

# Manage secrets with Pulumi ESC

In this tutorial, you will be guided through step-by-step instructions on using Pulumi ESC (Environments, Secrets, and Configuration), a robust and secure secrets management solution, to retrieve Cloudflare credentials and other secrets for any Wrangler command. You'll become familiar with the secrets management lifecycle. In particular, you will manage your `CLOUDFLARE_API_TOKEN` to log in to your Cloudflare account, programmatically load your `.dev.vars` file, and pass ESC-stored secrets to Workers.

{{<Aside type="note">}}
You will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.
{{</Aside>}}

{{<tutorial>}}
{{<tutorial-prereqs>}}

Ensure you have:

* A Cloudflare account. If you need to, sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
* A Pulumi Cloud account. You can sign up for an [always-free, individual tier](https://app.pulumi.com/signup).
* The [Pulumi ESC CLI](https://www.pulumi.com/docs/install/esc/) installed.
* A Wrangler project. Follow the [Create a new Worker project step](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project) to create one.

{{</tutorial-prereqs>}}
{{<tutorial-step title="Set up a new Environment">}}

A [Pulumi ESC Environment](https://www.pulumi.com/docs/esc/environments/) or Environment, for short, is a YAML file containing configurations and secrets for your application and infrastructure. These can be accessed in several ways, including via shell commands. All ESC Environments reside in your Pulumi Cloud account.

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

### c. Add your Cloudflare credentials

Because we'll run `wrangler` in non-interactive mode, it requires a Cloudflare API token and account ID for authentication. This is particularly useful in CI/CD settings. Ensure you have:

* Your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/), and
* A valid Cloudflare API [token](/fundamentals/api/get-started/create-token/).

Replace the placeholder `123abc` with your corresponding values:

```sh
$ esc env set $ESC_ENV environmentVariables.CLOUDFLARE_ACCOUNT_ID 123abc
$ esc env set $ESC_ENV environmentVariables.CLOUDFLARE_API_TOKEN  123abc --secret 
```

{{<Aside type="note">}}
The API token is declared as a secret. Once the Environment is saved, Pulumi will encrypt its value and replace it with ciphertext.
{{</Aside>}}

### d. (Optional) Review your Environment

```sh
$ esc env get $ESC_ENV

   Value 
  
    {
      "environmentVariables": {
        "CLOUDFLARE_ACCOUNT_ID": "789xyz",
        "CLOUDFLARE_API_TOKEN": "[secret]"
      }
    }
  
   Definition 
  
    values:
      environmentVariables:
        CLOUDFLARE_ACCOUNT_ID: 789xyz
        CLOUDFLARE_API_TOKEN:
          fn::secret:
            ciphertext: ZXNjeAAAAAEAAAEAXUm8w8SoPRcM1a/2kTb+UBliFHjadgQoh3FHolhrDZjwrORYVJk=
```

{{</tutorial-step>}}
{{<tutorial-step title="Login to Cloudflare">}}

Now that the Pulumi ESC Environment is created, it can be consumed in a variety of ways, such as running other shell commands without having to set the environment variables locally first. The `esc run` command opens the Environment you previously created, sets the specified environment variables into a temporary environment, and then uses those environment variables in the context of the `wrangler` commands.

Log into your Cloudflare account without needing to manage the credentials directly in your shell:

{{</tutorial-step>}}
{{<tutorial-step title="Load `.dev.vars`">}}

<!-- TODO -->

{{</tutorial-step>}}
{{<tutorial-step title="Add Worker secrets">}}

<!-- TODO -->

{{</tutorial-step>}}
{{<tutorial-step title="Next steps">}}

You have defined Pulumi ESC Environments to load secrets and configurations for Wrangler commands.  Follow the [Hello World tutorial](/pulumi/tutorial/hello-world/) to deploy a serverless app with Pulumi.

{{</tutorial-step>}}
{{</tutorial>}}
