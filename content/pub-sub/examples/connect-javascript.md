---
title: Connect with JavaScript
pcx-content-type: reference
type: example
summary: Use MQTT.js with the token authentication mode configured on a broker.
---

# Connect with JavaScript

Below is an example using [MQTT.js](https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options) with the TOKEN authentication mode configured on a broker.

Make sure to set the `BROKER_URI` (e.g. `mqtts://YOUR-BROKER.YOUR-NAMESPACE.cloudflarepubsub.com`), `BROKER_TOKEN` (a valid auth token), and `BROKER_TOPIC` environmental variables before running the example program.

```javascript
# install MQTT.js
npm install mqtt --save

const mqtt = require('mqtt')
 
// Specify MQTT broker hostname: "mqtts://<broker name>.<namespace>.cloudflarepubsub.com"
const uri = check_env(process.env.BROKER_URI);
 
// Any username and your JWT
const username = 'anything'
const password = check_env(process.env.BROKER_TOKEN);
 
// Specify a topic name
let topic = check_env(process.env.BROKER_TOPIC);
 
// Configure and create the MQTT client
const client  = mqtt.connect(uri, {
    protocolVersion: 5,
    clean: true,
    clientId: '',
    username,
    password,
})
 
// Connect to your broker
client.on('connect', function () {
    // Subscribe to a topic
    client.subscribe(topic, function (err) {
        if (!err) {
            // Publish a message!
            client.publish(topic, 'My first MQTT message');
        }
    })
})
 
// Start waiting for messages
client.on('message', async function (topic, message) {
    console.log(message.toString());
 
    // Good-Bye
    client.end();
})
 
// Return variable or throw error
function check_env(env) {
    if (!env) {
        throw 'BROKER_URI, BROKER_TOKEN and BROKER_TOPIC must be set.';
    }
 
    return env;
}
```
