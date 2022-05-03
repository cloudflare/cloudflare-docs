---
title: Connect with JavaScript
pcx-content-type: reference
type: example
summary: Use MQTT.js with the token authentication mode configured on a broker.
---

# Connect with JavaScript

Below is an example using [MQTT.js](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) with the TOKEN authentication mode configured on a broker.

```javascript
const brokerEndpoint = "mqtts://my-broker.my-namespace.pubsub.dev"
const options = {
  port: 8443,
  password: process.env.BROKER_TOKEN, // Make sure to set `export BROKER_TOKEN="VALID_JWT_FROM_API"` here
  protocolVersion: 5, // MQTT 5
}
 
const client = mqtt.connect(brokerEndpoint, options)
 
client.subscribe("example-topic")
client.publish("example-topic", `message from ${client.options.clientId}: hello at ${Date.now()`)
client.on("message", function (topic, message) {
  console.log(`received message on ${topic}: ${message}`)
})
```
