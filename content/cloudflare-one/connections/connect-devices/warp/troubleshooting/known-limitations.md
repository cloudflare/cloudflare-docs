---
pcx_content_type: reference
title: Known limitations
weight: 9
---

# Known limitations

Below, you will find information on devices, software, and configurations that are incompatible with Cloudflare WARP.

## Windows Server

The WARP client does not run on Windows Server. Refer to the [downloads page](/cloudflare-one/connections/connect-devices/warp/download-warp/) for a list of supported operating systems.

## Managed network on legacy Windows Server

[Managed network detection](/cloudflare-one/connections/connect-devices/warp/configure-warp/managed-networks/) will not work when the TLS certificate is served from IIS 8.5 on Windows Server 2012 R2. To work around the limitation, move the certificate to a different host.

## Multi-user support on Windows

The WARP client does not support multiple users on a single Windows device. WARP uses hard-coded global paths to store settings and keys and does not save information on a per-user basis. Therefore, after one user logs into WARP, their settings will apply to all traffic from the device.

## 4G/5G embedded modules

Because of how the WARP client instantiates the local DNS Proxy, it is incompatible with 4G/5G cellular adaptors which have IPv6 enabled.  To run WARP on these devices, you will need to disable IPv6 on the system.

## Comcast DNS servers

Comcast DNS traffic to `75.75.75.75` and `75.75.76.76` cannot be proxied through WARP. This is because Comcast rejects DNS traffic that is not sent directly from the user's device.

To work around the issue, you can either:

- Create a [Split Tunnel rule](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) that excludes `75.75.75.75/32` and `75.75.76.76/32` from WARP.
- Configure your device or router to use a public DNS server such as [`1.1.1.1`](https://1.1.1.1/dns/).

## HP Velocity

The HP Velocity driver has a bug which will cause a blue screen error on devices running WARP. HP recommends [uninstalling this driver](https://support.hp.com/gb-en/document/c06266198).

## Cisco Meraki

Cisco Meraki devices have a bug where WARP traffic can sometimes be identified as [`Statistical-P2P`](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_nbar/prot_lib/config_library/pp4600/nbar-prot-pack4600/s.html#wp1488575851) and de-prioritised or dropped entirely. To resolve the issue, disable `Statistical-P2P` on the Cisco Meraki device.

## Windows Teredo

The [Windows Teredo](https://learn.microsoft.com/en-us/windows/win32/teredo/about-teredo) interface conflicts with the WARP client. Since Teredo and WARP will fight for control over IPv6 traffic routing, you must disable Terado on your Windows device. This allows the WARP client to provide IPv6 connectivity on the device.

## Docker on Linux with bridged networking

Currently [Docker](https://www.docker.com/products/container-runtime/) on Linux does not perform the underlying network tunnel MTU changes required by WARP. This can cause connectivity issues inside of a Docker container when WARP is enabled on the host machine. For example, `curl -v https://cloudflare.com > /dev/null` will fail if run from a Docker container that is using the default bridge network driver.

Until Docker changes this behaviour, WARP + Docker users on Linux can manually reconfigure the MTU on Docker's network interface. You can either modify `/etc/docker/daemon.json` to include:

```json
  {
      "mtu":1420
  }
```

or create a Docker network with a working MTU value:

```sh
$ docker network create -o "com.docker.network.driver.mtu=1420" my-docker-network
```

The MTU value should be set to the MTU of your host's default interface minus 80 bytes for the WARP protocol overhead. Most MTUs are 1500, therefore 1420 should work for most people.



