---
order: 6
---

# Secure the Server

<Aside type='note' header='Before you start'>

Make sure you follow our [guide](/connections/connect-apps/install-and-setup/tunnel-guide) to create, configure, and run a tunnel.

</Aside>

Once you can successfully run a tunnel to proxy incoming traffic to any number of services running locally on your origin, you can lock down your origin to block out potentially malicious incoming traffic. By disallowing all ingress traffic and allowing only egress traffic, you can avoid “poking holes” on your server's firewall while exposing only the services you specified in the tunnel's `config.yml` to the outside world.

## Cloud VM instance-level firewall
If you host your services on a Virtual Machine (VM) instance by a Cloud provider such as Google Cloud Platform (GCP), you may set up instance-level firewall rules to disallow all ingress traffic and allow only egress traffic. For example, on GCP, you may delete all ingress rules, leaving only the relevant egress rules. This is because GCP's firewall defaults to “Block” unless a rule explicitly allows certain traffic.

![GCP firewall](../../../static/documentation/connections/gcp-firewall.png)

## OS-level firewall
Alternatively, you may also use operating system (OS)-level firewall rules to disallow all ingress traffic and allow only egress traffic. For example, if your server runs on Linux, you may use `iptables` to set up firewall rules. Most Linux distributions are pre-installed with `iptables`. Note that in the example below, not all ingress traffic is blocked, just in case that the server is hosted on the Cloud and there would be no way to SSH back into the system again if the settings were configured wrongly.

1. Check your current firewall rules.
```sh
$ sudo iptables -L
```

2. Allow `localhost` to communicate with itself.
```sh
$ sudo iptables -A INPUT -i lo -j ACCEPT
```

3. Allow already established connection and related traffic.
```sh
$ sudo iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
```

4. Allow new SSH connections.
```sh
$ sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
```

5. Drop all other ingress traffic.

<Aside header='Warning:'>
Be very careful with the following command because if you didn't preserve the current SSH connection or allow new SSH connections, you would be logged out and unable to SSH back into the system again.
</Aside>

```sh
$ sudo iptables -A INPUT -j DROP
```

6. After setting the firewall rules, use this command to check the current `iptables` settings:
```sh
$ sudo iptables -L
```

Run your tunnel and check that all the services specified in `config.yml` should still be accessible to the outside world via the tunnel, but not via the external IP address of the server. 

You can also:
* [Secure your application with Cloudflare Access](/applications/configure-apps/self-hosted-apps)
