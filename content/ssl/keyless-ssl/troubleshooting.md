---
title: Troubleshooting
pcx-content-type: faq
weight: 6
meta:
  title: Troubleshooting Keyless SSL
---

# Troubleshooting Keyless SSL

## Check the logs

To check logs, use a command similar to the following.

- systemd: `sudo journalctl -f -u gokeyless`
- upstart/sysvinit: `sudo tail -f /var/log/gokeyless.log`

## Enable debug logging

To enable debug logging, use a command similar to the following.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">cd</span><span class="CodeBlock--token-plain"> /etc/keyless</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> -u keyless gokeyless --loglevel </span><span class="CodeBlock--token-number">0</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Browsers are seeing a TLS connection failure after trying to connect

1.  Make sure your key server is accessible from outside your network (tcp/2407).
2.  Provide a packet capture:
    `$ sudo tcpdump -nni <interface> -s 0 -w keyless-$(date +%s).pcap port 2407`

## Clients are connecting, but immediately aborting

If you run `gokeyless` with debug logging enabled, and you see logs like this:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] connection 162.158.57.220:37490: reading half closed by client</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] connection 162.158.57.220:37490: server closing connection</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] connection 162.158.57.220:37490 removed</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] spawning new connection: 162.158.57.220:37862</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] connection 162.158.57.220:37862: reading half closed by client</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] connection 162.158.57.220:37862: server closing connection</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[DEBUG] connection 162.158.57.220:37862 removed</span></div></span></span></span></code></pre>{{</raw>}}

These logs likely indicate that the key server is not using an appropriate server or pem file and the client is aborting the connection after the certificate exchange. The certificate must be signed by the keyless CA and the SANs must include the hostname of the keyless server. Here is a valid example for a keyless server located at `11aa40b4a5db06d4889e48e2f.example.com` (note the Subject Alternative Name and Authority Key Identifier):
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ openssl x509 -in server.pem -noout -text -certopt no_subject,no_header,no_version,no_serial,no_signame,no_validity,no_subject,no_issuer,no_pubkey,no_sigdump,no_aux </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">sed</span><span class="CodeBlock--token-plain"> -e </span><span class="CodeBlock--token-string">'s/^        //'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">X509v3 extensions:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 Key Usage: critical</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        Digital Signature, Key Encipherment</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 Extended Key Usage:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        TLS Web Server Authentication</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 Basic Constraints: critical</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        CA:FALSE</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 Subject Key Identifier:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        DD:24:97:F1:A9:F1:4C:73:D9:1B:44:EC:A1:C3:10:E9:F0:41:98:BB</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 Authority Key Identifier:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        keyid:29:CE:8F:F1:9D:4C:BA:DE:55:78:D7:A6:29:E9:C5:FD:1D:9D:21:48</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 Subject Alternative Name:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        DNS:11aa40b4a5db06d4889e48e2f.example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    X509v3 CRL Distribution Points:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        Full Name:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">          URI:http://ca.cfdata.org/api/v1/crl/key_server</span></div></span></span></span></code></pre>{{</raw>}}

## The gokeyless binary cannot load the CA file

Ensure permissions are correct on all keys and certificates installed on the server.

## Keyless is affecting to unanticipated hosts

You will need to either provide a certificate for only those hosts or change the priority of the certificate in the **SSL/TLS** app of your Cloudflare dashboard.

## Key servers on Windows

We currently only provide packages for the supported GNU/Linux distributions as per https://pkg.cloudflare.com/.

However, the key server is open source so you may attempt to build and deploy a binary, but running on Windows is not a supported configuration so you may experience problems that we will not be able to help with.

## Additional questions

Contact your account team or [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476).
