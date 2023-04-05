---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 6
meta:
  title: Troubleshooting Keyless SSL
  description: Review how to troubleshoot issues when using Cloudflare Keyless SSL.
---

# Troubleshooting Keyless SSL

## Check the logs

To check logs, use a command similar to the following.

- systemd: `sudo journalctl -f -u gokeyless`
- upstart/sysvinit: `sudo tail -f /var/log/gokeyless.log`

## Enable debug logging

To enable debug logging, use a command similar to the following.

```sh
$ cd /etc/keyless
$ sudo -u keyless gokeyless --loglevel 0
```

## Browsers are seeing a TLS connection failure after trying to connect

1.  Make sure your key server is accessible from outside your network (tcp/2407).
2.  Provide a packet capture:
    `$ sudo tcpdump -nni <interface> -s 0 -w keyless-$(date +%s).pcap port 2407`

## Clients are connecting, but immediately aborting

If you run `gokeyless` with debug logging enabled, and you see logs like this:

```txt
[DEBUG] connection 162.158.57.220:37490: reading half closed by client
[DEBUG] connection 162.158.57.220:37490: server closing connection
[DEBUG] connection 162.158.57.220:37490 removed
[DEBUG] spawning new connection: 162.158.57.220:37862
[DEBUG] connection 162.158.57.220:37862: reading half closed by client
[DEBUG] connection 162.158.57.220:37862: server closing connection
[DEBUG] connection 162.158.57.220:37862 removed
```

These logs likely indicate that the key server is not using an appropriate server or pem file and the client is aborting the connection after the certificate exchange. The certificate must be signed by the keyless CA and the SANs must include the hostname of the keyless server. Here is a valid example for a keyless server located at `11aa40b4a5db06d4889e48e2f.example.com` (note the Subject Alternative Name and Authority Key Identifier):

```bash
$ openssl x509 -in server.pem -noout -text -certopt no_subject,no_header,no_version,no_serial,no_signame,no_validity,no_subject,no_issuer,no_pubkey,no_sigdump,no_aux | sed -e 's/^        //'

X509v3 extensions:
    X509v3 Key Usage: critical
        Digital Signature, Key Encipherment
    X509v3 Extended Key Usage:
        TLS Web Server Authentication
    X509v3 Basic Constraints: critical
        CA:FALSE
    X509v3 Subject Key Identifier:
        DD:24:97:F1:A9:F1:4C:73:D9:1B:44:EC:A1:C3:10:E9:F0:41:98:BB
    X509v3 Authority Key Identifier:
        keyid:29:CE:8F:F1:9D:4C:BA:DE:55:78:D7:A6:29:E9:C5:FD:1D:9D:21:48

    X509v3 Subject Alternative Name:
        DNS:11aa40b4a5db06d4889e48e2f.example.com
    X509v3 CRL Distribution Points:

        Full Name:
          URI:http://ca.cfdata.org/api/v1/crl/key_server
```

## The gokeyless binary cannot load the CA file

Ensure permissions are correct on all keys and certificates installed on the server.

## Keyless is affecting to unanticipated hosts

You will need to either provide a certificate for only those hosts or change the priority of the certificate in the **SSL/TLS** app of your Cloudflare dashboard.

## Key servers on Windows

We currently only provide packages for the supported GNU/Linux distributions as per https://pkg.cloudflare.com/.

However, the key server is open source so you may attempt to build and deploy a binary, but running on Windows is not a supported configuration so you may experience problems that we will not be able to help with.

## Key server multi-domain support

You can use the same key server for multiple domains.

 However, if you do, you will need to add the hostname and the Zone ID of the new domain to the `gokeyless.yaml` file.

## Additional questions

Contact your account team or [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476).
