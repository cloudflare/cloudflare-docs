---
pcx_content_type: troubleshooting
title: Troubleshooting
weight: 7
---

# Troubleshooting

If you are experiencing difficulties with your Magic WAN Connector, refer to the following tips to troubleshoot what might be happening.

## I have set up a site, but my Connector is not working

Make sure that you have [activated your Connector](/magic-wan/configuration/connector/configure-hardware-connector/#device-activation). Cloudflare ships the Magic WAN Connector deactivated, and the Connector will only establish a connection to the Cloudflare network when it is activated.

## I have tried to activate Magic WAN Connector, but it is still not working

Check if your Magic WAN Connector is connected to the Internet via a port that can serve DHCP. This is required the first time a Connector boots up so that it can reach the Cloudflare global network and download the required configurations that you set up in the Site configuration step. Refer to [Device activation](/magic-wan/configuration/connector/configure-hardware-connector/#device-activation) for more details.

If you have a firewall deployed upstream of the Magic WAN Connector, [check your firewall settings](/magic-wan/configuration/connector/configure-hardware-connector/#firewall-settings-required). You might need to configure your firewall to allow traffic in specific ports for the Connector to work properly.

## I can access Magic WAN Connector's health checks, but there is no traffic

If you have a firewall deployed upstream of the Magic WAN Connector, make sure you review your [firewall settings](/magic-wan/configuration/connector/configure-hardware-connector/#firewall-settings-required). You might need to configure your firewall to allow traffic in specific ports for the Connector to work properly.

## Devices I have behind Connector cannot connect to the Internet

If you have other routing appliances behind Magic WAN Connector, make sure you create policy-based routing policies to send traffic from your devices through Connector, instead of these other routing devices.

## How do I know if my device is contacting Cloudflare?

Magic WAN Connector sends a heartbeat periodically to Cloudflare. You can [access the Magic WAN dashboard](/magic-wan/configuration/connector/reference/#heartbeat), and check for the heartbeat status of your Connector device.