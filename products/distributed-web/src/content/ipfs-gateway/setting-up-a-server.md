---
order: 2
---

# Setting Up a Server

While all IPFS nodes are created equal, some are better suited for different
purposes depending on their setup. An IPFS node running on your laptop, for
instance, isn't very good for hosting a website because your website will go
down as soon as the computer goes to sleep!

This is why many people choose to use a pinning service like
[Pinata](https://pinata.cloud/), but this guide will walk you through how to
setup your own server. If you want, you can run several servers or use both a
pinning service and your own server for higher availability.

## Prerequisites

- A Linux server that's online as much as possible. A VPS from a provider like
  [DigitalOcean](https://www.digitalocean.com/) is an option, or something like
  a [NUC](https://www.intel.com/content/www/us/en/products/boards-kits/nuc.html)
  or [Raspberry Pi](https://www.raspberrypi.org/) running on your home network
  will work.<br />
  <u>Recommended Minimum Requirements:</u>
  - 2 gigabytes of RAM
  - 10 gigabytes of disk space
  - 1 terabyte of bandwidth per month

## Installing IPFS

The first step is to install the IPFS daemon. Go to the [IPFS
Releases](https://github.com/ipfs/go-ipfs/releases) page and copy the link for
the correct asset for your server from the latest release. For most people, this
is the link that ends in `_linux-amd64.tar.gz`. Now we download that file to our
server, extract the contents, install IPFS, and clean up:

```bash
$ wget -q https://github.com/ipfs/go-ipfs/releases/download/v0.4.21/go-ipfs_v0.4.21_linux-amd64.tar.gz
$ tar xf go-ipfs_v0.4.21_linux-amd64.tar.gz
$ sudo mv go-ipfs/ipfs /usr/local/bin
$ rm -rf go-ipfs go-ipfs_v0.4.21_linux-amd64.tar.gz
```

IPFS also has to do its own setup, so we run this command *logged in as the user
that we'll want to run the IPFS daemon*:

``` bash
$ ipfs init
```

(If you want the daemon to run as root, actually switch to the root user with
`sudo su` first instead of running `sudo ipfs init`.)

## Adding the Service

**systemd** is a software suite that comes with most newer Linux distributions,
that allows the user to create and manage background services. These services
are started automatically when the server boots, restarted if they fail, and
have their output logs persisted to disk. Now that IPFS is installed, we want to
create a service for it so that we get all these benefits.

To do this, we create a *unit file* at `/etc/systemd/system/ipfs.service` with
the contents:

```
[Unit]
Description=IPFS Daemon

[Service]
ExecStart=/usr/local/bin/ipfs daemon
User=root
Restart=always
LimitNOFILE=10240

[Install]
WantedBy=multi-user.target
```

Change the line "User=root" if you're not running the daemon as root, and then
tell systemd about the new service:

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl enable ipfs
$ sudo systemctl start ipfs
```

### Notes on systemd

- See high-level information on how the IPFS daemon is doing:<br />
  `$ systemctl status ipfs`
- Stop the daemon:<br />
  `$ systemctl stop ipfs`
- Start the daemon:<br />
  `$ systemctl start ipfs`
- See all logs from the daemon:<br />
  `$ journalctl -u ipfs`
- See only most recent logs, and show new logs as they're written:<br />
  `$ journalctl -f -u ipfs`

## Opening Up to the Internet

For the best performance, your node will need to be addressable from the public
Internet. If you're using a VPS provider, this is probably already done -- they
would've given your server a public IP when it was created and started allowing
connections to all ports.

If you're hosting your own server, you'll need to first configure your router to
give the machine running the IPFS node an *internal* static IP address. This
address will probably look either like 192.168.x.y or 10.x.y.z, and will be
assigned to this machine every time it boots (unlike other machines which may
get a different IP every time). And once the server has a static IP, you'll need
to setup Port Forwarding on the router, to direct connections on port 4001 to
the router to port 4001 on the server. It's best to restart the server once the
router's updated config has been applied.

## Enabling Unattended Upgrades

If possible, we strongly recommend enabling [unattended
upgrades](https://libre-software.net/ubuntu-automatic-updates/) on your server.
Since it will be exposed to the Internet, this helps make sure that it installs
most security updates in a timely manner and without human intervention.

## You're done!

So far you've taken a barebones Linux server, installed IPFS on it, configured
the server to run IPFS as a service, and made the server Internet addressable.
This makes your server a contributing member of the IPFS network, and any files
you upload to your IPFS daemon will be discoverable by everybody else!
