---
order: 9
---

# DNS over TLS

This is the change

By default, DNS is sent over a plaintext connection. DNS over TLS is one way to send DNS queries over an encrypted connection. Cloudflare supports DNS over TLS on standard port 853 and is compliant with [RFC7858](https://tools.ietf.org/html/rfc7858).

## Configuration

Cloudflare supports DNS over TLS on 1.1.1.1 and 1.0.0.1 on port 853. The certificate presented is for cloudflare-dns.com.

## How it works

A stub resolver (the DNS client on a device that talks to the DNS resolver) connects to the resolver over a TLS connection:

 * Before the connection the DNS stub resolver has stored a base64 encoded SHA256 hash of cloudflare-dns.com's TLS certificate (called SPKI)
 * DNS stub resolver establishes a TCP connection with cloudflare-dns.com:853
 * DNS stub resolver initiates a TLS handshake
 * In the TLS handshake, cloudflare-dns.com presents its TLS certificate.
 * Once the TLS connection is established, the DNS stub resolver can send DNS over an encrypted connection, preventing eavesdropping and tampering.
 * All DNS queries sent over the TLS connection must comply with specifications of [sending DNS over TCP](https://tools.ietf.org/html/rfc1035#section-4.2.2).

## Example

    $ kdig -d @1.1.1.1 +tls-ca +tls-host=cloudflare-dns.com  example.com
    ;; DEBUG: Querying for owner(example.com.), class(1), type(1), server(1.1.1.1), port(853), protocol(TCP)
    ;; DEBUG: TLS, imported 170 system certificates
    ;; DEBUG: TLS, received certificate hierarchy:
    ;; DEBUG:  #1, C=US,ST=CA,L=San Francisco,O=Cloudflare\, Inc.,CN=\*.cloudflare-dns.com
    ;; DEBUG:      SHA-256 PIN: yioEpqeR4WtDwE9YxNVnCEkTxIjx6EEIwFSQW+lJsbc=
    ;; DEBUG:  #2, C=US,O=DigiCert Inc,CN=DigiCert ECC Secure Server CA
    ;; DEBUG:      SHA-256 PIN: PZXN3lRAy+8tBKk2Ox6F7jIlnzr2Yzmwqc3JnyfXoCw=
    ;; DEBUG: TLS, skipping certificate PIN check
    ;; DEBUG: TLS, The certificate is trusted.
    ;; TLS session (TLS1.3)-(ECDHE-SECP256R1)-(ECDSA-SECP256R1-SHA256)-(AES-256-GC
    ;; ->>HEADER<<- opcode: QUERY; status: NOERROR; id: 58548
    ;; Flags: qr rd ra; QUERY: 1; ANSWER: 1; AUTHORITY: 0; ADDITIONAL: 1

    ;; EDNS PSEUDOSECTION:
    ;; Version: 0; flags: ; UDP size: 1536 B; ext-rcode: NOERROR
    ;; PADDING: 408 B

    ;; QUESTION SECTION:
    ;; example.com.        		IN	A

    ;; ANSWER SECTION:
    example.com.        	2347	IN	A	93.184.216.34

    ;; Received 468 B
    ;; Time 2018-03-31 15:20:57 PDT
    ;; From 1.1.1.1@853(TCP) in 12.6 ms

## Supported TLS versions

Cloudflare's DNS over TLS supports TLS 1.3 and TLS 1.2.
