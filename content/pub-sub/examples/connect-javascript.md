---
title: Connect with JavaScript (Node.js)
pcx_content_type: reference
type: example
summary: Use MQTT.js with the token authentication mode configured on a broker.
---

# Connect with JavaScript

Below is an example using [MQTT.js](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) with the TOKEN authentication mode configured on a broker. The example assumes you have [Node.js](https://nodejs.org/en/) v16 or higher installed on your system.

Make sure to set the `BROKER_URI` (e.g. `mqtts://YOUR-BROKER.YOUR-NAMESPACE.cloudflarepubsub.com`), `BROKER_TOKEN` (a valid auth token), and `BROKER_TOPIC` environmental variables before running the example program.

```javascript
# Pre-requisite: install MQTT.js
npm install mqtt --save
```

Copy the following example as `example.js` and run it with `node example.js`. 

```javascript
const mqtt = require("mqtt");

// Specify MQTT broker URI: mqtts://<broker name>.<namespace>.cloudflarepubsub.com
const uri = check_env(process.env.BROKER_URI);

// Any username and your token from the /brokers/YOUR_BROKER/credentials endpoint
// The token should be the base64-encoded JWT issued by the Pub/Sub API
const username = "anything";
const password = check_env(process.env.BROKER_TOKEN);

// Specify a topic name to subscribe to and publish on
let topic = check_env(process.env.BROKER_TOPIC);

// Configure and create the MQTT client
const client = mqtt.connect(uri, {
  protocolVersion: 5,
  port: 8883,
  clean: true,
  connectTimeout: 2000, // 2 seconds
  clientId: "",
  username,
  password,
});

// Emit errors and exit
client.on("error", function (err) {
  console.log(`⚠️  error: ${err}`);
  client.end();
  process.exit();
});

// Connect to your broker
client.on("connect", function () {
  console.log(`🌎 connected to ${process.env.BROKER_URI}!`);
  // Subscribe to a topic
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log(`✅ subscribed to ${topic}`);
      // Publish a message!
      client.publish(topic, "My first MQTT message");
    }
  });
});

// Start waiting for messages
client.on("message", async function (topic, message) {
  console.log(`received a message: ${message.toString()}`);

  // Goodbye!
  client.end();
  process.exit();
});

// Return variable or throw error
function check_env(env) {
  if (!env) {
    throw "BROKER_URI, BROKER_TOKEN and BROKER_TOPIC must be set.";
  }

  return env;
}
```
