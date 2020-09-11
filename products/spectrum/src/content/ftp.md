# FTP

Enabling Spectrum for FTP is not straightforward due to the implementation of the protocol. This guide gives an overview of the intricacies of FTP and under which circumstances you can enable Spectrum for your FTP service.

<Aside>

This feature requires an Enterprise plan.  If you would like to upgrade, please contact your customer success manager or the <a href="mailto:success@cloudflare.com">Customer Success Team</a>.

</Aside>

--------------------------------

## How FTP Operates

FTP leverages two different sockets, one for issuing commands and the other for actual data transfer. The control socket takes care of users logging in and sending commands, the data socket is where directory listings and files actually get transferred.

There are two ways in which client and server can establish a data socket: active and passive. In active mode, the server connects _back_ to the client on a port that they have specified. This often runs into issues where clients are behind a NAT. The alternative is passive mode, where the server opens an extra port that the client then connects to. See [this site](http://slacksite.com/other/ftp.html) for a more comprehensive overview of active versus passive.

In passive mode, the FTP server communicates a port that the client should connect to. This is done on the control socket via a PASV command. By default, the FTP server responds with the IP address that it is listening on. This is fine for servers running directly on a public-facing IP but runs into issues when a server is behind a NAT, firewall or Cloudflare Spectrum.

Alternatively, more modern FTP server software supports [FTP extensions](https://tools.ietf.org/html/rfc2428), which introduces the EPSV command that omits the IP address that the client should connect on. Instead, the client connects to the same IP that it connected to for the control pane.

--------------------------------

## What Does and Does Not Work

Spectrum is able to protect servers serving FTP traffic in *passive mode only*. Active mode is not supported due to the fact that the origin server sees the Spectrum IP as being the client instead of the actual client IP. When the client issues a PORT command with their own IP, the FTP server rejects because the two addresses do not match.

Passive mode in combination with EPSV works out of the box with no origin-side configuration required. Note that the client must also support EPSV for this to work. Traditional passive mode with PASV is possible with minimal origin-side configuration (see below, Protecting an FTP server with Spectrum)

--------------------------------

## Protecting an FTP Server with Spectrum

Configuring Spectrum to protect your FTP server requires creating a set of Spectrum applications that point to your origin and some configuration on the FTP server.

### Protecting the Control Port

The control plane runs on port 21 by default. There is nothing special that needs to be configured to protect this part an FTP server. Simply create a Spectrum app for port 21 and point it to the origin:

![Control plane port](./img/ftp/ftp-control-plane-app.png)

(Replace 198.51.100.1 with the IP of the origin server).

This will proxy incoming connections to the origin. However, if clients issue a PASV command they will still receive the IP of the actual origin for the data connection. This is not preferred, as this exposes the origin's IP to the client instead of being masked behind Spectrum. Steps to prevent this are documented in sections below.

### Protecting Data Ports

Most FTP servers allow configuration of the port range that the server will use to open data connections. It is recommended to specify a port range so as to not accidentally expose other ports on the server. For each port in the range, create a corresponding Spectrum application that maps to that port.

Additionally, the FTP server needs to be configured to expose the correct IP when the client issues a PASV command. This IP should match the IP of the Spectrum app.

Some FTP servers also allow dynamic resolving of hostnames. In this case, it is recommended to use the Spectrum app URL instead of the IP.

Example configuration for [vsftpd](https://security.appspot.com/vsftpd.html):

> ```bash
> ---
> filename: /etc/vsftpd.conf
> ---
> pasv_min_port=20000
> pasv_max_port=20020
>
> pasv_enable=YES
> pasv_address=ftp.example.com
> pasv_addr_resolve=YES
> pasv_promiscuous=YES
> ```

--------------------------------

## Related

- [IIS configuration](https://docs.microsoft.com/en-us/iis/publish/using-the-ftp-service/configuring-ftp-firewall-settings-in-iis-7#step-1-configure-the-passive-port-range-for-the-ftp-service)
