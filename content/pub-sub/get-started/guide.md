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

- **Choose your namespace carefully**. Although it can be changed later, it will be used as part of the hostname for your Brokers. You should not use secrets or other data that cannot be exposed on the Internet.
- Namespace names are global; they are globally unique.
- Namespaces must be valid DNS names per RFC1035. In most cases, this means only a-z, 0-9, and hyphens are allowed. Names are case-insensitive.

For example, a namespace of `my-namespace` and a broker of `staging` would create a hostname of `staging.my-namespace.cloudflarepubsub.com` for clients to connect to.

With this in mind, create a new namespace. This example will use `my-namespace` as a placeholder:

```bash
$ curl -s -H "X-Auth-Email: ${CF_API_EMAIL}" -H "X-Auth-Key: ${CF_API_KEY}" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pubsub/namespaces" --data '{"name": "my-namespace" }'
```

You should receive a HTTP 200 response that resembles the following:

```json
{
  "result": {
    "id": "817170399d784d4ea8b6b90ae558c611",
    "name": "my-namespace",
    "description": "",
    "created_on": "2022-05-11T23:13:08.383232Z",
    "modified_on": "2022-05-11T23:13:08.383232Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

If you receive an HTTP 403 (Forbidden) response, check that your credentials are correct and that you have not pasted erroneous spaces or characters.

If you receive an HTTP 400 (Bad Request), make sure you have correctly quoted the `data` payload and that you are not missing any quotes.

## 4. Create a broker

A broker, in MQTT terms, is a collection of connected clients that publish messages to topics, and clients that subscribe to those topics and receive messages. The broker acts as a relay, and with Cloudflare Pub/Sub, a Cloudflare Worker can be configured to act on every message published to it.

This broker will be configured to accept `TOKEN` authentication. In MQTT terms, this is typically defined as username:password authentication. Pub/Sub uses JSON Web Tokens (JWT) that are unique to each client, and that can be revoked, to make authentication more secure.

Broker names must be:

- Chosen carefully. Although it can be changed later, the name will be used as part of the hostname for your brokers. Do not use secrets or other data that cannot be exposed on the Internet.
- Valid DNS names (per RFC1035). In most cases, this means only `a-z`, `0-9` and hyphens are allowed. Names are case-insensitive.
- Unique per namespace.

To create a new MQTT Broker called `example-broker` in the `my-namespace` namespace from the example above:

```bash
# Set the $DEFAULT_NAMESPACE env var to make our lives easier (make sure to set this to the name you chose)
export DEFAULT_NAMESPACE="my-namespace"

# Create the Broker
$ curl -s -H "X-Auth-Email: ${CF_API_EMAIL}" -H "X-Auth-Key: ${CF_API_KEY}" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pubsub/namespaces/${DEFAULT_NAMESPACE}/brokers" --data '{"name": "example-broker", "authType": "TOKEN" }'
```

You should receive an HTTP 200 response that resembles the following:

```json
{
  "result": {
    "id": "4c63fa30ee13414ba95be5b56d896fea",
    "name": "example-broker",
    "authType": "TOKEN",
    "created_on": "2022-05-11T23:19:24.356324Z",
    "modified_on": "2022-05-11T23:19:24.356324Z",
    "expiration": null,
    "endpoint": "mqtts://example-broker.namespace.cloudflarepubsub.com:8883"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

In the example above, a broker is created with an endpoint of `mqtts://example-broker.my-namespace.cloudflarepubsub.com`. This means:

* Our Pub/Sub (MQTT) Broker is reachable over MQTTS (MQTT over TLS) - port 8883
* The hostname is `example-broker.my-namespace.cloudflarepubsub.com`
* [Token authentication](https://developers.cloudflare.com/pub-sub/platform/authentication-authorization/) is required to clients to connect.

## 5. Create credentials for your broker

In order to connect to a Pub/Sub Broker, you need to securely authenticate. Credentials are scoped to each broker and credentials issued for `broker-a` cannot be used to connect to `broker-b`.

Note that:

- You can generate multiple credentials at once (up to 100 per API call), which can be useful when configuring multiple clients (such as IoT devices).
- Credentials are associated with a specific Client ID and encoded as a signed JSON Web Token (JWT).
- Each token has a unique identifier (a `jti` - or `JWT ID`) that you can use to revoke a specific token.
- Tokens are prefixed with the broker name they are associate with (for example, `my-broker`) to make identifying tokens across multiple Pub/Sub brokers easier.

{{<Aside type="note">}}

Ensure you do not commit your credentials to source control, such as GitHub. A valid token allows anyone to connect to your broker and publish or subscribe to messages. Treat credentials as secrets.

{{</Aside>}}

To generate two tokens for your broker:

```bash
# Set the $BROKER_NAME env var to make our lives easier (make sure to set this to the name you chose)
export BROKER_NAME="example-broker"

$ curl -s -H "X-Auth-Email: ${CF_API_EMAIL}" -H "X-Auth-Key: ${CF_API_KEY}" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pubsub/namespaces/${DEFAULT_NAMESPACE}/brokers/${BROKER_NAME}/credentials?number=2&type=TOKEN&topicAcl=#"
```

You should receive a HTTP 200 response that resembles the example below, which is a map of Client IDs and their associated tokens.

```json
{
  "result": {
    "my-broker01G3A5GBJE5P3GPXJZ72X4X8SA": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.
    not-a-real-token.ZZL7PNittVwJOeMpFMn2CnVTgIz4AcaWXP9NqMQK0D_iavcRv_p2DVshg6FPe5xCdlhIzbatT6gMyjMrOA2wBg",
    "my-broker01G3A5GBJECX5DX47P9RV1C5TV": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.also-not-a-real-token.WrhK-VTs_IzOEALB-T958OojHK5AjYBC5ZT9xiI_6ekdQrKz2kSPGnvZdUXUsTVFDf9Kce1Smh-mw1sF2rSQAQ",
  },
  "success": true,
  "errors": [],
  "messages": []
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
export BROKER_TOKEN=$(curl -s -H "X-Auth-Email: ${CF_API_EMAIL}" -H "X-Auth-Key: ${CF_API_KEY}" -H "Content-Type: application/json" "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pubsub/namespaces/${DEFAULT_NAMESPACE}/brokers/${BROKER_NAME}/credentials?number=2&type=TOKEN&topicAcl=#" | jq '.result | to_entries | .[0].value')
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
