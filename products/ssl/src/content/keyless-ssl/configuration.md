---
title: Get started
order: 0
pcx-content-type: get-started
---

# Get started with Keyless SSL

--------

## Before you begin

### Supported platforms

Keyless has been tested on `amd64` and `arm` architectures. The key server binary will likely run on all architectures that Go supports. Code support may exist for other CPUs too, but these other architectures have not been tested.

In addition to running on bare metal, the key server should run without issue in a virtualized or containerized environment. Care will need to be taken to configure ingress access to the appropriate TCP port and file system access to private keys (if using filesystem storage).

### Supported operating systems

You will need to be running a supported operating system (OS) to run Keyless. Supported operating systems include:

* Ubuntu 12.04.5 LTS, 14.04 LTS, 15.10, 16.04, 17.10
* Debian 7, 8, 9
* RHEL and CentOS 6, 7
* Amazon Linux 1, 2

We strongly recommend that you use an operating system still supported by the vendor (still receiving security updates) as your key server will have access to your private keys.

---

## Step 1 — Create a public DNS record

You need to create a public DNS record for your key server. If you are using Cloudflare, this record **cannot be proxied (orange clouded)**. As a security measure, you should hide the hostname of your key server.

1. Use `openssl rand -hex 24` to generate a long, random hostname such as `11aa40b4a5db06d4889e48e2f738950ddfa50b7349d09b5f.example.com`.
1. Add this record via your DNS provider’s interface as an **A** or **AAAA** record pointing to the IP address of your Keyless SSL server.
1. Use this hostname as the server hostname during initialization of your Keyless SSL server.

--------

## Step 2 — Upload “Keyless” SSL Certificates

Before your key servers can be configured, you must next upload the corresponding SSL certificates to Cloudflare’s edge. During TLS termination, Cloudflare will present these certificates to connecting browsers and then (for non-resumed sessions) communicate with the specified key server to complete the handshake.

Upload certificates to Cloudflare with only SANs that you wish to use with Cloudflare Keyless SSL. All Keyless SSL hostnames must be proxied on Cloudflare (orange clouded).

For each certificate you wish to use with Keyless SSL:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your zone.
1. Navigate to **SSL/TLS** > **Edge Certificates**.
1. Click **Upload Keyless SSL Certificate**.
1. Fill in the upload modal with the certificate and other details and click **Add**.

  Label | Description | Example Values
  ------|-------------|---------------
  Key server label|Any unique identifier for your key server|“test-keyless”, “production-keyless-1”
  Key server hostname|The hostname of your key server that holds the key for this certificate (such as the random hostname generated earlier).|11aa40b4a5db06d4889e48e2f738950ddfa50b7349d09b5f.example.com
  Key server port|Set to 2407 unless you have changed this on the key server.|2407
  SSL Certificate|The valid X509v3 SSL certificate (in PEM form) for which you hold the private key.| (PEM bytes)
  Bundle method|This should almost always be **Compatible**. Refer to [Uploading Custom Certificates](/edge-certificates/custom-certificates/bundling-methodologies) for more details.|Compatible

--------

## Step 3 — Set up and activate key server

Finally, you need to install the key server on your infrastructure, populate it with the SSL keys of the certificates you wish to use to terminate TLS at Cloudflare’s edge, and activate the key server so it can be mutually authenticated.

<Aside type="note">

If you plan to run Keyless SSL in a [high availability setup](../reference/high-availability), you may need to set up additional infrastructure (load balancing and health checks).

</Aside>

### Install

1. Add the Cloudflare Package Repository as per https://pkg.cloudflare.com/.
1. Amazon Linux customers need to manually set the yum `$releasever` value:
  1. Amazon Linux 1: `sudo sed -i 's/$releasever/6/' /etc/yum.repos.d/cloudflare.repo`
  1. Amazon Linux 2: `sudo sed -i 's/$releasever/7/' /etc/yum.repos.d/cloudflare.repo`
1. Update your OS’ package listings, e.g., `apt-get update` or `yum makecache`.
1. Install the gokeyless server (min version used should be 1.5.3):
  1. Debian/Ubuntu: `sudo apt-get install gokeyless`
  1. RHEL/CentOS: `sudo yum install gokeyless`
  1. Amazon Linux: `sudo yum install rsyslog shadow-utils && sudo yum install gokeyless`

### Configure

Add your Cloudflare account details to the configuration file located at `/etc/keyless/gokeyless.yaml`:

1. Set the hostname of the key server, for example, `11aa40b4a5db06d4889e48e2f.example.com`.
1. Set the Zone ID (found on **Overview** tab of the Cloudflare dashboard).
1. [Set the Origin CA API key](https://dash.cloudflare.com/profile).

### Populate keys

Install your private keys in `/etc/keyless/keys/` and set the user and group to keyless with 400 permissions. Keys must be in PEM or DER format and have an extension of `.key`:

```bash
$ ls -l /etc/keyless/keys
-r-------- 1 keyless keyless 1675 Nov 18 16:44 example.com.key
```

When running multiple key servers, make sure all required keys are distributed to each key server. Customers typically will either use a configuration management tool such as Salt or Puppet to distribute keys or mount `/etc/keyless/keys` to a network location accessible only by your key servers. Keys are read on boot into memory, so a network path must be accessible during the gokeyless process start/restart.

### Activate

To activate, restart your keyless instance:

* systemd: `sudo service gokeyless restart`
* upstart/sysvinit: `sudo /etc/init.d/gokeyless restart`

If this command fails, try troubleshooting by [checking the logs](/keyless-ssl/troubleshooting/).

### Allow incoming connections from Cloudflare

During TLS handshakes, Cloudflare’s keyless client will initiate connections to the key server hostname or IP address you specify during certificate upload. By default, the keyless client will use a destination TCP port of 2407, but this can be changed during certificate upload or by editing the certificate details after upload.

Create firewall rules that allow your key server to accept connections from only Cloudflare. We publish our IPv4 and IPv6 addresses via our API.
