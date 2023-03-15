---
title: Guide
pcx_content_type: get-started
---

# Get started guide

{{<Aside type="note">}}

Pub/Sub is currently in private beta. You can [sign up for the waitlist](https://www.cloudflare.com/cloudflare-pub-sub-lightweight-messaging-private-beta/) to register your interest.

{{</Aside>}}

Pub/Sub is a flexible, scalable messaging service built on top of the MQTT messaging standard, allowing you to publish messages from tens of thousands of devices (or more), deploy code to filter, aggregate and transform messages using Cloudflare Workers, and/or subscribe to topics for fan-out messaging use cases.

This guide will:

- Instruct you through creating your first Pub/Sub Broker using the Cloudflare API.
- Create a `<broker>.<namespace>.cloudflarepubsub.com` endpoint ready to publish and subscribe to using any MQTT v5.0 compatible client.
- Help you send your first message to the Pub/Sub Broker.

Before you begin, you should be familiar with using the command line and running basic terminal commands.


## Prerequisite: Create a Cloudflare account

In order to use Pub/Sub, you need a [Cloudflare account](/fundamentals/account-and-billing/account-setup/). If you already have an account, you can skip this step.

## 1. Enable Pub/Sub

During the Private Beta, your account will need to be explicitly granted access. If you have not, sign up for the waitlist, and we will contact you when you are granted access.

## 2. Install Wrangler (Cloudflare CLI)

{{<Aside type="note">}}

Pub/Sub support in Wrangler requires wrangler `2.0.16` or above. If you're using an older version of Wrangler, ensure you [update the installed version](/workers/wrangler/install-and-update/#update-wrangler).

{{</Aside>}}

Installing `wrangler`, the Workers command-line interface (CLI), allows you to [`init`](/workers/wrangler/commands/#init), [`dev`](/workers/wrangler/commands/#dev), and [`publish`](/workers/wrangler/commands/#publish) your Workers projects.

To install [`wrangler`](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler), ensure you have [`npm` installed](https://docs.npmjs.com/getting-started), preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to easily change Node.js versions. Then run:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

Validate that you have a version of `wrangler` that supports Pub/Sub:

```sh
$ wrangler --version
2.0.16 # should show 2.0.16 or greater - e.g. 2.0.17 or 2.1.0
```

With `wrangler` installed, we can now create a Pub/Sub API token for `wrangler` to use.

## 3. Fetch your credentials

To use Wrangler with Pub/Sub, you'll need an API Token that has permissions to both read and write for Pub/Sub. The `wrangler login` flow does not issue you an API Token with valid Pub/Sub permissions.

{{<Aside type="note">}}

This API token requirement will be lifted prior to Pub/Sub becoming Generally Available.

{{</Aside>}}

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

With this environmental variable configured, you can now create your first Pub/Sub Broker!

## 4. Create your first namespace

A namespace represents a collection of Pub/Sub Brokers, and they can be used to separate different environments (production vs. staging), infrastructure teams, and in the future, permissions.

Before you begin, consider the following:

- **Choose your namespace carefully**. Although it can be changed later, it will be used as part of the hostname for your Brokers. You should not use secrets or other data that cannot be exposed on the Internet.
- Namespace names are global; they are globally unique.
- Namespaces must be valid DNS names per RFC 1035. In most cases, this means only a-z, 0-9, and hyphens are allowed. Names are case-insensitive.

For example, a namespace of `my-namespace` and a broker of `staging` would create a hostname of `staging.my-namespace.cloudflarepubsub.com` for clients to connect to.

With this in mind, create a new namespace. This example will use `my-namespace` as a placeholder:

```sh
$ wrangler pubsub namespace create my-namespace 
```

You should receive a success response that resembles the following:

```json
{
  "id": "817170399d784d4ea8b6b90ae558c611",
  "name": "my-namespace",
  "description": "",
  "created_on": "2022-05-11T23:13:08.383232Z",
  "modified_on": "2022-05-11T23:13:08.383232Z"
}
```

If you receive an HTTP 403 (Forbidden) response, check that your credentials are correct and that you have not pasted erroneous spaces or characters.

## 5. Create a broker

A broker, in MQTT terms, is a collection of connected clients that publish messages to topics, and clients that subscribe to those topics and receive messages. The broker acts as a relay, and with Cloudflare Pub/Sub, a Cloudflare Worker can be configured to act on every message published to it.

This broker will be configured to accept `TOKEN` authentication. In MQTT terms, this is typically defined as username:password authentication. Pub/Sub uses JSON Web Tokens (JWT) that are unique to each client, and that can be revoked, to make authentication more secure.

Broker names must be:

- Chosen carefully. Although it can be changed later, the name will be used as part of the hostname for your brokers. Do not use secrets or other data that cannot be exposed on the Internet.
- Valid DNS names (per RFC 1035). In most cases, this means only `a-z`, `0-9` and hyphens are allowed. Names are case-insensitive.
- Unique per namespace.

To create a new MQTT Broker called `example-broker` in the `my-namespace` namespace from the example above:


```sh
$ wrangler pubsub broker create example-broker --namespace=my-namespace
```

You should receive a success response that resembles the following example:

```json
{
  "id": "4c63fa30ee13414ba95be5b56d896fea",
  "name": "example-broker",
  "authType": "TOKEN",
  "created_on": "2022-05-11T23:19:24.356324Z",
  "modified_on": "2022-05-11T23:19:24.356324Z",
  "expiration": null,
  "endpoint": "mqtts://example-broker.namespace.cloudflarepubsub.com:8883"
}
```

In the example above, a broker is created with an endpoint of `mqtts://example-broker.my-namespace.cloudflarepubsub.com`. This means:

* Our Pub/Sub (MQTT) Broker is reachable over MQTTS (MQTT over TLS) - port 8883
* The hostname is `example-broker.my-namespace.cloudflarepubsub.com`
* [Token authentication](/pub-sub/platform/authentication-authorization/) is required to clients to connect.

## 6. Create credentials for your broker

In order to connect to a Pub/Sub Broker, you need to securely authenticate. Credentials are scoped to each broker and credentials issued for `broker-a` cannot be used to connect to `broker-b`.

Note that:

- You can generate multiple credentials at once (up to 100 per API call), which can be useful when configuring multiple clients (such as IoT devices).
- Credentials are associated with a specific Client ID and encoded as a signed JSON Web Token (JWT).
- Each token has a unique identifier (a `jti` - or `JWT ID`) that you can use to revoke a specific token.
- Tokens are prefixed with the broker name they are associate with (for example, `my-broker`) to make identifying tokens across multiple Pub/Sub brokers easier.

{{<Aside type="note">}}

Ensure you do not commit your credentials to source control, such as GitHub. A valid token allows anyone to connect to your broker and publish or subscribe to messages. Treat credentials as secrets.

{{</Aside>}}

To generate two tokens for a broker called `example-broker` with a 48 hour expiry:

```sh
$ wrangler pubsub broker issue example-broker --namespace=NAMESPACE_NAME --number=2 --expiration=48h
```

You should receive a success response that resembles the example below, which is a map of Client IDs and their associated tokens.

```json
{
  "01G3A5GBJE5P3GPXJZ72X4X8SA": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.
  not-a-real-token.ZZL7PNittVwJOeMpFMn2CnVTgIz4AcaWXP9NqMQK0D_iavcRv_p2DVshg6FPe5xCdlhIzbatT6gMyjMrOA2wBg",
  "01G3A5GBJECX5DX47P9RV1C5TV": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.also-not-a-real-token.WrhK-VTs_IzOEALB-T958OojHK5AjYBC5ZT9xiI_6ekdQrKz2kSPGnvZdUXUsTVFDf9Kce1Smh-mw1sF2rSQAQ",
}
```

Each token allows you to publish or subscribe to the associated broker. 

## 7. Subscribe and publish messages to a topic

Your broker is now created and ready to accept messages from authenticated clients. Because Pub/Sub is based on the MQTT protocol, there are client libraries for most popular programming languages. Refer to the list of [recommended client libraries](/pub-sub/learning/client-libraries/).

{{<Aside type="note">}}
You can view a live demo available at [demo.mqtt.dev](http://demo.mqtt.dev) that allows you to use your own Pub/Sub Broker and a valid token to subscribe to a topic and publish messages to it. The `JWT` field in the demo accepts a valid token from your Broker.
{{</Aside>}}

The example below uses [MQTT.js](https://github.com/mqttjs/MQTT.js) with Node.js to subscribe to a topic on a broker and publish a very basic "hello world" style message. You will need to have a [supported Node.js](https://nodejs.org/en/download/current/) version installed.

```sh
# Check that Node.js is installed
$ which node
# Install MQTT.js
$ npm i mqtt --save
```

Generate a credential and store it in the `BROKER_TOKEN` environmental variable so the MQTT client can access it.

```sh
export BROKER_TOKEN=$(curl -s -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pubsub/namespaces/${DEFAULT_NAMESPACE}/brokers/${BROKER_NAME}/credentials?number=2&type=TOKEN&topicAcl=#" | jq '.result | to_entries | .[0].value')
```

Create a file called `index.js ` and make sure to update the `brokerEndpoint` with the address of your Pub/Sub broker.

```js
const mqtt = require('mqtt')

const brokerEndpoint = "mqtts://my-broker.my-namespace.cloudflarepubsub.com"
const options = {
  port: 8883,
  password: process.env.BROKER_TOKEN,
  protocolVersion: 5, // MQTT 5
}

const client = mqtt.connect(brokerEndpoint, options)

client.subscribe("example-topic")
client.publish("example-topic", `message from ${client.options.clientId}: hello at ${Date.now()}`)
client.on("message", function (topic, message) {
  console.log(`received message on ${topic}: ${message}`)
})
```

Run the example. You should see the output written to your terminal (stdout).

```sh
$ node index.js
> received message on example-topic: hello from 01G2MFECWBR5WD8WSBE3AMMVVY at 1652102228
```

Your client ID and timestamp will be different from above, but you should see a very similar message. You can also try subscribing to multiple topics and publishing to them by passing the same topic name to `client.publish`. Provided they have permission to, clients can publish to multiple topics at once or as needed.

If you do not see the message you published, or you are receiving error messages, ensure that:

- The `BROKER_TOKEN` environmental variable is not empty. Try echo `$BROKER_TOKEN`  in your terminal.
- You updated the `brokerEndpoint` to match the broker you created. The **Endpoint** field of your broker will show this address and port.
- You correctly [installed MQTT.js](https://github.com/mqttjs/MQTT.js#install).

## Next Steps

What's next?

- [Connect a worker to your broker](/pub-sub/learning/integrate-workers/) to programmatically read, parse, and filter messages as they are published to a broker
- [Learn how PubSub and the MQTT protocol work](/pub-sub/learning/how-pubsub-works)
- [See example client code](/pub-sub/examples) for publishing or subscribing to a PubSub broker
