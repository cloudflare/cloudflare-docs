---
title: Using Wrangler (Command Line Interface)
pcx_content_type: reference
type: example
summary: How to manage Pub/Sub with Wrangler, the Cloudflare CLI.
---

# What is Wrangler?

Wrangler is a command-line tool for building and managing Cloudflare's Developer Platform, including [Cloudflare Workers](https://workers.cloudflare.com/), [R2 Storage](/r2/) and [Cloudflare Pub/Sub](/pub-sub/).

{{<Aside type="note">}}

Pub/Sub support in Wrangler requires wrangler `2.0.16` or above. If you're using an older version of Wrangler, ensure you [update the installed version](/workers/wrangler/install-and-update/#update-wrangler).

{{</Aside>}}

## Authenticating Wrangler

To use Wrangler with Pub/Sub, you'll need an API Token that has permissions to both read and write for Pub/Sub. The `wrangler login` flow does not issue you an API Token with valid Pub/Sub permissions.

{{<Aside type="note">}}

This API token requirement will be lifted prior to Pub/Sub becoming Generally Available.

{{</Aside>}}

To create an API Token that Wrangler can use:

1. From the [Cloudflare dashboard](https://dash.cloudflare.com), click on the profile icon and select **My Profile**.
2. Under **My Profile**, click **API Tokens**.
3. On the [**API Tokens**](https://dash.cloudflare.com/profile/api-tokens) page, click **Create Token**
4. Choose **Get Started** next to **Create Custom Token** 
5. Name the token - e.g. "Pub/Sub Write Access"
6. Under the **Permissions** heading, choose **Account**, select **Pub/Sub** from the first drop-down, and **Edit** as the permission.
7. Click **Continue to Summary** at the bottom of the page, where you should see _All accounts - Pub/Sub:Edit_ as the permission
8. Click **Create Token**, and copy the token value.

In your terminal, configure a `CLOUDFLARE_API_TOKEN` environmental variable with your Pub/Sub token. When this variable is set, `wrangler` will use it to authenticate against the Cloudflare API.

```sh
$ export CLOUDFLARE_API_TOKEN="pasteyourtokenhere"
```

{{<Aside type="warning" header="Warning">}}

This token should be kept secret and not committed to source code or placed in any client-side code.

{{</Aside>}}

## Pub/Sub Commands

Wrangler exposes two groups of commands for managing your Pub/Sub configurations:

1. `wrangler pubsub namespace`, which manages the [namespaces](/pub-sub/learning/how-pubsub-works/#brokers-and-namespaces) your brokers are grouped into.
2. `wrangler pubsub broker` for managing your individual brokers, issuing and revoking credentials, and updating your [Worker integrations](/pub-sub/learning/integrate-workers/).

The available `wrangler pubsub namespace` sub-commands include:

```sh
$ wrangler pubsub namespace --help

Manage your Pub/Sub Namespaces

Commands:
  wrangler pubsub namespace create <name>    Create a new Pub/Sub Namespace
  wrangler pubsub namespace list             List your existing Pub/Sub Namespaces
  wrangler pubsub namespace delete <name>    Delete a Pub/Sub Namespace
  wrangler pubsub namespace describe <name>  Describe a Pub/Sub Namespace
```

The available `wrangler pubsub broker` sub-commands include:

```sh
$ wrangler pubsub broker --help

Interact with your Pub/Sub Brokers

Commands:
  wrangler pubsub broker create <name>            Create a new Pub/Sub Broker
  wrangler pubsub broker update <name>            Update an existing Pub/Sub Broker's configuration.
  wrangler pubsub broker list                     List the Pub/Sub Brokers within a Namespace
  wrangler pubsub broker delete <name>            Delete an existing Pub/Sub Broker
  wrangler pubsub broker describe <name>          Describe an existing Pub/Sub Broker.
  wrangler pubsub broker issue <name>             Issue new client credentials for a specific Pub/Sub Broker.
  wrangler pubsub broker revoke <name>            Revoke a set of active client credentials associated with the given Broker
  wrangler pubsub broker unrevoke <name>          Restore access to a set of previously revoked client credentials.
  wrangler pubsub broker show-revocations <name>  Show all previously revoked client credentials.
  wrangler pubsub broker public-keys <name>       Show the public keys used for verifying on-publish hooks and credentials for a Broker.
```

### Create a Namespace

To create a [Namespace](/pub-sub/learning/how-pubsub-works/#brokers-and-namespaces):

```sh
$ wrangler pubsub namespace create NAMESPACE_NAME
```

### Create a Broker

To create a [Broker](/pub-sub/learning/how-pubsub-works/#brokers-and-namespaces) within a Namespace:

```sh
$ wrangler pubsub broker create BROKER_NAME --namespace=NAMESPACE_NAME
```

### Issue an Auth Token

You can issue client credentials for a Pub/Sub Broker directly via Wrangler. Note that:

* Tokens are scoped per Broker
* You can issue multiple tokens at once
* Tokens currently allow a client to publish and/or subscribe to _any_ topic on the Broker.

To issue a single token:

```sh
$ wrangler pubsub broker issue BROKER_NAME --namespace=NAMESPACE_NAME 
```

You can use `--number=<NUM>` to issue multiple tokens at once, and `--expiration=<DURATION>` to set an expiry (e.g. `4h` or `30d`) on the issued tokens. 

### Revoke a Token

To revoke one or more tokens—which will immediately prevent that token from being used to authenticate—use the `revoke` sub-command and pass the unique token ID (or `JTI`):

```sh
$ wrangler pubsub broker revoke BROKER_NAME --namespace=NAMESPACE_NAME --jti=JTI_ONE --jti=JTI_TWO
```

## Filing Bugs

If you've found a bug with one of the `wrangler pubsub [...]` commands, please [file a bug on GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose), and include the version of `wrangler` you're using with `wrangler --version`.
