---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

Finally, you need to install the key server on your infrastructure, populate it with the SSL keys of the certificates you wish to use to terminate TLS at Cloudflare’s edge, and activate the key server so it can be mutually authenticated.

{{<Aside type="note">}}

If you plan to run Keyless SSL in a [high availability setup](/ssl/keyless-ssl/reference/high-availability/), you may need to set up additional infrastructure (load balancing and health checks).

{{</Aside>}}

### Install

These steps are also at [pkg.cloudflare.com](https://pkg.cloudflare.com/index.html).

#### Debian/Ubuntu packages

```sh
---
header: Debian or Ubuntu
---
$ sudo mkdir -p --mode=0755 /usr/share/keyrings
$ curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add this repo to your apt repositories
$ echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless buster main' | sudo tee /etc/apt/sources.list.d/cloudflare.list

# install gokeyless
$ sudo apt-get update && sudo apt-get install gokeyless
```

#### RHEL/CentOS packages
    
Use either of the following examples to install the `gokeyless` package for RHEL or CentOS.

**Option 1**

```sh
---
header: RHEL or CentOS (version lower than 8)
---
$ sudo yum makecache
$ sudo yum-config-manager --add-repo https://pkg.cloudflare.com/gokeyless.repo && sudo yum-config-manager --setopt=gokeyless-stable.gpgkey=https://pkg.cloudflare.com/cloudflare-ascii-pubkey.gpg --save
$ sudo yum install gokeyless
```

**Option 2**

```sh
---
header: RHEL or CentOS (version 8 or higher)
---
$ dnf install dnf-plugins-core && dnf clean all
$ dnf config-manager --add-repo https://pkg.cloudflare.com/gokeyless.repo
$ dnf install gokeyless
```

{{<Aside type="note">}}

Amazon Linux customers may need to update their final installation command to be something similar to `sudo yum install rsyslog shadow-utils && sudo yum install gokeyless`.

{{</Aside>}}

### Configure

Add your Cloudflare account details to the configuration file located at `/etc/keyless/gokeyless.yaml`:

1.  Set the hostname of the key server, for example, `$1`. This is also the value you entered when you uploaded your keyless certificate and is the hostname of your key server that holds the key for this certificate.
2.  Set the Zone ID (found on **Overview** tab of the Cloudflare dashboard).
3.  [Set the Origin CA API key](/fundamentals/api/get-started/ca-keys).

### Populate keys

Install your private keys in `/etc/keyless/keys/` and set the user and group to keyless with 400 permissions. Keys must be in PEM or DER format and have an extension of `.key`:

```sh
$ ls -l /etc/keyless/keys
-r-------- 1 keyless keyless 1675 Nov 18 16:44 example.com.key
```

When running multiple key servers, make sure all required keys are distributed to each key server. Customers typically will either use a configuration management tool such as Salt or Puppet to distribute keys or mount `/etc/keyless/keys` to a network location accessible only by your key servers. Keys are read on boot into memory, so a network path must be accessible during the gokeyless process start/restart.

### Activate

To activate, restart your keyless instance:

- systemd: `sudo service gokeyless restart`
- upstart/sysvinit: `sudo /etc/init.d/gokeyless restart`

If this command fails, try troubleshooting by [checking the logs](/ssl/keyless-ssl/troubleshooting/).
