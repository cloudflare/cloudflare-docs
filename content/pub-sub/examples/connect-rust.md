---
title: Connect with Rust
pcx_content_type: reference
type: example
summary: Connect to a Broker using a Rust-based MQTT client.
---

# Connect with Rust

Below is an example using the [paho.mqtt.rust](https://github.com/eclipse/paho.mqtt.rust) crate with the TOKEN authentication mode configured on a Broker. 

The example below creates a simple subscriber, sends a message to the configured topic, and waits until the message is received before exiting.

Make sure to set the `BROKER_URI` (e.g. `mqtts://YOUR-BROKER.YOUR-NAMESPACE.cloudflarepubsub.com`), `BROKER_TOKEN` (a valid auth token), and `BROKER_TOPIC` environmental variables before running the example program.

```toml
# in your Cargo.toml
paho-mqtt = "0.11.1"
```

Create a file called `example.rs` with the following content, and use `cargo run` to build and run the example:

```rust
use paho_mqtt::*;
use std::thread;
 
fn main() {
    // Specify MQTT broker hostname: <broker name>.<namespace>.cloudflarepubsub.com
    let uri = std::env::var("BROKER_URI").expect("URI must be set");
 
    // Your JWT token
    let jwt = std::env::var("BROKER_TOKEN").expect("JWT must be set");
 
    // Specify a topic name
    let topic = std::env::var("BROKER_TOPIC").expect("Topic must be set");
 
    // Configure the MQTT client
    let client_opts = CreateOptionsBuilder::new()
        .mqtt_version(MQTT_VERSION_5)
        .server_uri(uri)
        .finalize();
 
    // Connect options
    let options = ConnectOptionsBuilder::new()
        .ssl_options(SslOptions::default())
        .clean_start(true)
        .password(jwt)
        .finalize();
 
    // Create the MQTT client
    let cli = Client::new(client_opts).expect("Error creating client");
 
    // Connect to your broker
    cli.connect(options).expect("Error connecting to broker");
 
    // Message receiver
    let rx = cli.start_consuming();
 
    // Subscribe to a topic
    cli.subscribe(&topic, 0)
        .expect("Error subscribing to topic");
 
    // Start waiting for messages
    let reader = thread::spawn(move || match rx.recv().expect("Error receiving message") {
        Some(message) => {
            println!("{:?}", message);
        }
        None => {}
    });
 
    // Publish a message!
    cli.publish(Message::new(topic, "My first MQTT message", 0))
        .expect("Error publishing");
 
    // Wait until we have received our message
    let _ = reader.join();
 
    // Good-Bye
    cli.disconnect(DisconnectOptions::default())
        .expect("Error disconnecting");
}  
```
