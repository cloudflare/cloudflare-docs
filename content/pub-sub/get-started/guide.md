---
title: Guide
pcx-content-type: get-started
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

Before you begin, you should be familiar with using the command line and the curl command for making HTTP requests.

In the future, we will be adding support for Pub/Sub to [wrangler](/workers/wrangler/) (our developer CLI) and the Cloudflare dashboard to make creating and managing Pub/Sub Brokers easier.

## Prerequisite: Create a Cloudflare account

In order to use Pub/Sub, you need a [Cloudflare account](/fundamentals/get-started/setup/account-setup/). If you already have an account, you can skip this step.

## 1. Enable Pub/Sub

During the Private Beta, your account will need to be explicitly granted access. If you have not, sign up for the waitlist, and we will contact you when you are granted access.

## 2. Fetch your credentials

To make requests against the Pub/Sub API, retrieve your API key.

1. From the [Cloudflare dashboard](https://dash.cloudflare.com), click on the profile icon and select **My Profile**.
2. Under **My Profile**, click **API Tokens**.
3. On the **API Tokens** under **API Keys**, locate **Global API Key** and click **View**.
4. Copy the key to your clipboard.

In your terminal, configure environmental variables with these keys, so you do not have to type them out in each command:

```bash
$ export CF_API_EMAIL="<you@example.com>"
$ export CF_API_KEY="<YOUR_API_KEY>"
```

These credentials should be kept secret and not committed to source code or placed in any client-side code.

Once you have your credentials, you will also need your [Cloudflare Account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

Back in your terminal, add your Account ID as an environmental variable.

```bash
$ export CF_ACCOUNT_ID="<YOUR_ACCOUNT_ID>"
```

With these three environmental variables set up, you can create your first Pub/Sub Broker.

## 3. Create your first namespace

A namespace represents a collection of Pub/Sub Brokers, and they can be used to separate different environments (production vs. staging), infrastructure teams, and in the future, permissions.

Before you begin, consider the following:

- Choose your namespace carefully. Although it can be changed later, it will be used as part of the hostname for your Brokers. You should not use secrets or other data that cannot be exposed on the Internet.
- Namespace names are global; they are globally unique.
- Namespaces must be valid DNS names per RFC1035. In most cases, this means only a-z, 0-9, and hyphens are allowed. Names are case-insensitive.

For example, a namespace of `my-namespace` and a broker of `staging` would create a hostname of `staging.my-namespace.cloudflarepubsub.com` for clients to connect to.

With this in mind, create a new namespace. This example will use `cloudflare`.

```bash
$ curl -H "X-Auth-Email: $CF_API_EMAIL" -H "X-Auth-Key: $CF_API_KEY" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pubsub/namespaces --data '{"name": "cloudflare" }'
```

You should receive a HTTP 200 response that resembles the following:

```bash
{ "name": "cloudflare", id: "ea0e37e2-7da7-4ed7-8c60-4eb0a7d00dbf", created_at: "2022-04-28T22:24:53+00:00" }
```

If you receive an HTTP 403 (Forbidden) response, check that your credentials are correct and that you have not pasted erroneous spaces or characters.

If you receive an HTTP 400 (Bad Request), make sure you have correctly quoted the `data` payload and that you are not missing any quotes.

## 4. Create a broker

A broker, in MQTT terms, is a collection of connected clients that publish messages to topics, and clients that subscribe to those topics and receive messages. The broker acts as a relay, and with Cloudflare Pub/Sub, a Cloudflare Worker can be configured to act on every message published to it.

This broker will be configured to accept `token` authentication. In MQTT terms, this is typically defined as username:password authentication. Pub/Sub uses JSON Web Tokens (JWT) that are unique to each client, and that can be revoked, to make authentication more secure.

Broker names must be:

- Chosen carefully. Although it can be changed later, the name will be used as part of the hostname for your brokers. Do not use secrets or other data that cannot be exposed on the Internet.
- Valid DNS names (per RFC1035). In most cases, this means only `a-z`, `0-9` and hyphens are allowed. Names are case-insensitive.
- Unique per namespace.

To create a new MQTT Broker called `example-broker` in the `cloudflare` namespace from the example above:

```bash
$ curl -H "X-Auth-Email: <$CF_API_EMAIL>" -H "X-Auth-Key: <$CF_API_KEY>" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/<$CF_ACCOUNT_ID>/pubsub/namespaces/<YOUR_NAMESPACE_NAME>/brokers --data '{"name": "example-broker", "authType": "TOKEN" }'
```

You should receive an HTTP 200 response that resembles the following:

```bash
{ "name": "my-broker", id: "35f112c9-92f9-4971-8ca5-7744460a9a9a", created_at: "2022-04-28T22:29:07+00:00", authType: "TOKEN" }
```

In the example above, a broker is created with a hostname of `my-broker.cloudflare.cloudflarepubsub.com`.

## 5. Create credentials for your broker

In order to connect to a Pub/Sub Broker, you need to securely authenticate. Credentials are scoped to each broker and credentials issued for `broker-a` cannot be used to connect to `broker-b`.

Note that:

- You can generate multiple credentials at once (up to 100 per API call), which can be useful when configuring multiple clients (such as IoT devices).
- Credentials are associated with a specific Client ID and encoded as a signed JSON Web Token (JWT).
- Each token has a unique identifier (a `jti` - or `JWT ID`) that you can use to revoke a specific token.

To generate a token for your broker:

```bash
# GET /accounts/:account_id/brokers/namespaces/:namespace_name/brokers/:broker_name/credentials
$ curl -H "X-Auth-Email: $CF_API_EMAIL" -H "X-Auth-Key: $CF_API_KEY" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/brokers/namespaces/YOUR_NAMESPACE_NAME/brokers/example-broker/credentials?number=5&type=TOKEN&topicAcl="#"
```

You should receive a HTTP 200 response that resembles the example below, which is a map of Client IDs and their associated tokens:

```bash
{
  "01G1VF9E9989T6DXG3SVG1WQRA": <base-64-encoded-JWT>,
  "01G1VFAS393REE4WRRE4NHAV96": <base-64-encoded-JWT>,
   <...>
}
```

Each token allows you to publish or subscribe to the associated broker.

## 6. Subscribe and publish messages to a topic

Your broker is now created and ready to accept messages from authenticated clients. Because Pub/Sub is based on the MQTT protocol, there are client libraries for most popular programming languages. Refer to the list of [recommended client libraries](/pub-sub/learning/client-libraries/).

The example below uses [MQTT.js](https://github.com/mqttjs/MQTT.js) with Node.js to subscribe to a topic on a broker and publish a very basic "hello world" style message. You will need to have a [supported Node.js](https://nodejs.org/en/download/current/) version installed.

```bash
# Check that Node.js is installed
$ which node
# Install MQTT.js
$ npm i mqtt --save
```

Generate a credential and store it in the `BROKER_TOKEN` environmental variable so the MQTT client can access it.

```bash
export BROKER_TOKEN=$(curl -H "X-Auth-Email: $CF_API_EMAIL" -H "X-Auth-Key: $CF_API_KEY" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/brokers/namespaces/YOUR_NAMESPACE_NAME/brokers/YOUR_BROKER_NAME/credentials?number=1&type=TOKEN&topicAcl="#" | jq '.result[1]')
```

Create a file called `index.js ` and make sure to update the `brokerEndpoint` with the address of your Pub/Sub broker.

```js
const mqtt = require('mqtt')

const brokerEndpoint = "mqtts://my-broker.my-namespace.cloudflarepubsub.com"
const options = {
  port: 8443,
  password: process.env.BROKER_TOKEN,
  protocolVersion: 5, // MQTT 5
}

const client = mqtt.connect(brokerEndpoint, options)

client.subscribe("example-topic")
client.publish("example-topic", `message from ${client.options.clientId}: hello at ${Date.now()`)
client.on("message", function (topic, message) {
  console.log(`received message on ${topic}: ${message}`)
})
```

Run the example. You should see the output written to your terminal (stdout).

```bash
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
