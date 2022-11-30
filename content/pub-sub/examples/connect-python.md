---
title: Connect with Python
pcx_content_type: reference
type: example
summary: Connect to a Broker using Python 3
---

# Connect with Python

Below is an example using the [paho.mqtt.python](https://github.com/eclipse/paho.mqtt.python) package with the TOKEN authentication mode configured on a Broker. 

The example below creates a simple subscriber, sends a message to the configured topic, and waits until the message is received before exiting.

Make sure to set environmental variables for the following before running the example:

* `BROKER_FQDN` - e.g. `YOUR-BROKER.YOUR-NAMESPACE.cloudflarepubsub.com` without the port or `mqtts://` scheme
* `BROKER_TOKEN` (a valid auth token)
* `BROKER_TOPIC` - e.g. `test/topic` or `hello/world`

The example below uses Python 3.8, but should run on Python 3.6 and above.

```sh
# Ensure you have paho-mqtt installed
$ pip3 install paho-mqtt
```

Create a file called `pubsub.py` with the following content, and use `python3 pubsub.py` to run the example:

```python
# Install the library via: pip install paho-mqtt

import os
import paho.mqtt.client as mqtt
import sys


# Making sure all environment variables are set
def check_env(env):
    if env is None:
        sys.exit("BROKER_FQDN, BROKER_TOKEN and BROKER_TOPIC must be set.")
    return env


# The callback for when the client receives a CONNACK response from the server.
def on_connect(ctx, userdata, flags, rc, properties):
    print("connected to {}".format(ctx._host))
    ctx.subscribe(topic)
    client.publish(topic, "Hello from Python and Pub/Sub!")


# The callback for when a PUBLISH message is received from the server.
def on_message(ctx, userdata, msg):
    print("{}: {}".format(msg.topic, msg.payload))
    # Good-Bye
    client.disconnect()


# Specify MQTT broker FQDN: <broker name>.<namespace>.cloudflarepubsub.com
fqdn = check_env(os.environ.get("BROKER_FQDN"))

# Any username and your token from the /brokers/YOUR_BROKER/credentials endpoint
# The token should be the base64-encoded JWT issued by the Pub/Sub API
username = "anything"
password = check_env(os.environ.get("BROKER_TOKEN")).strip("\"")

# Specify a topic name to subscribe to and publish on
topic = check_env(os.environ.get("BROKER_TOPIC"))

# Create the MQTT client
client = mqtt.Client(client_id="", protocol=mqtt.MQTTv5)

# Set username & password
client.username_pw_set(username, password)

# Enable TLS
client.tls_set()

# Connect to your broker and register callback functions
client.connect(fqdn, 8883)
client.on_connect = on_connect
client.on_message = on_message

# Wait until we have received our message
client.loop_forever()
```
