---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203118044-Gathering-information-for-troubleshooting-sites
title: Gathering information for troubleshooting sites
---

# Gathering information for troubleshooting sites



## Overview

It is important to capture as much information as possible to diagnose an issue and to [provide adequate details to Cloudflare support](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16). This article explains how to gather troubleshooting information commonly requested by Cloudflare Support.

{{<Aside type="note">}}
Cloudflare support cannot make configuration changes on behalf of
customers due to security and liability concerns.
{{</Aside>}}

___

## Generate a HAR file

A HTTP Archive (HAR) records all web browser requests including the request and response headers, the body content, and the page load time.

{{<Aside type="warning">}}
A HAR file can include sensitive details such as passwords, payment
information, and private keys. Manually remove sensitive information
from a HAR file via a text editor before providing to Cloudflare
Support.
{{</Aside>}}

Currently, only Chrome and Firefox can access the HAR feature by default. Other browsers either require a browser extension or cannot generate a HAR. When installing a browser extension, follow the instructions from the extension provider.

1\. In a browser page, right-click anywhere and select **Inspect Element**.

2\. The developer tools either appear at the bottom or left side of the browser. Click the **Network** tab. 

![HAR network tab screenshot from Chrome developer tools](/images/support/gathering_har_file_network.png)

3\. Check **Preserve log**.

4\. Click record.

![HAR record button in chrome dev tools.](/images/support/gathering_har_file_record.png)

5\. Browse to the URL that causes issues. Once the issue is experienced, right click on any of the items within the **Network** tab and select **Save all as HAR with Content**.

![HAR save menu in Chrome developer tools.](/images/support/gathering_har_file_save.png)

 6. Attach the HAR file to your support ticket.

1\. From the application menu, select **Tools** > **Web Developer** > **Network** or press _Ctrl+Shift+I_ (Windows/Linux) or _Cmd+Option+I_ (OS X).

2\. Browse to the URL that causes issues.

3\. After duplicating the issue, right-click and choose **Save All As HAR**.

1\. Navigate to **Developer tools** (use _F12_ as a shortcut) and select the **Network** tab.

2\. Browse to the URL that causes issues.

3\. After duplicating the issue, click on **Export as HAR** followed by **Save As...**.

1\. In Safari, ensure a **Develop** menu appears at the top of the browser window. Otherwise, go to **Safari** > **Preferences** > **Advanced** and select **Show Develop Menu in menu bar**

2\. Navigate to **Develop** > **Show Web Inspector**.

3\. Browse to the URL that causes issues.

4\. Ctrl + click on a resource within Web Inspector and click **Export HAR**.

**For Android:** 

1\. Enable USB Debugging mode on your mobile device.

2\. Go to `chrome://inspect/#devices`.

3\. If debugging mode is enabled, you will see your device listed below “Remote Target” like the example below:

![Where to find the Inspect Devices when in Debug Mode for Android.](/images/support/step_1.jpg)

4\. Type in the URL, select **Open** and **inspect** to open Chrome’s DevTools.

5\. Select the **Network** tab in the DevTools window.

6\. Check **Preserve log**.

7\. Click **record**.

![Where to find the record button in Chrome's dev tools.](/images/support/step_2_-_better.jpg)

8\. Browse to the URL that causes issues. Once the issue is experienced, right-click on any of the items within the **Network** tab and select **Save all as HAR with Content**.

![How to save HAR content. ](/images/support/step_3.png)

9. Attach the HAR file to your support ticket alongside a screen recording from the affected Samsung device. Instructions on how to do this from Samsung devices can be found in [Samsung's documentation here](https://www.samsung.com/au/support/mobile-devices/screen-recorder/).

___

**For iPhone:**

Refer to [Okta](https://support.okta.com/help/s/article/How-to-generate-a-HAR-capture-on-an-iOS-device?language=en_US) or [Apple's](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html#//apple_ref/doc/uid/TP40007874-CH2-SW1) support article on how to generate a HAR file from an iOS device. Attach the HAR file to your support ticket alongside a screen recording from the affected iOS device. Apple devices now have [built-in screen recording functionality](https://support.apple.com/en-us/HT207935).

___

## Export Console Log

In certain situations when request is not issued or cancelled by the browser (for example, due to [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)), we need to get JS console log output, in addition to the HAR file, to identify the root cause.

1.  Go to the **Console** tab from the Developer Tools bar.
2.  Go to the Console Settings and select **Preserve Log**.
3.  Leave the console open and perform the steps that reproduce the issue.
4.  Right click on any of the items within the **Console** tab and select **Save as** log file.
5.  Attach the log file to your support ticket.

![How to find the console tab in Chrome's developer tools.](/images/support/console_snapshot.png)

1.  Go to the **Console** tab from the Web Developer Tools bar.
2.  Go to the Console Settings and select **Persist Log** and **Show Timestamps**.
3.  Leave the console open and perform the steps that reproduce the issue.
4.  Right click, **Select All** messages and **Export Visible Messages to File**.
5.  Attach the log file to your support ticket.

1.  Go to the **Console** tab from the Developer Tools bar.
2.  Go to the Console Settings and select **Preserve Log**.
3.  Leave the console open and perform the steps that reproduce the issue.
4.  Right click on any of the items within the **Console** tab and select **Save as** log file.
5.  Attach the log file to your support ticket.

1.  Go to the **Console** tab from the Web Inspector bar.
2.  Tick the box **Preserve Log**.
3.  Leave the console open and perform the steps that reproduce the issue.
4.  Select all the messages, right click and **Save Selected** to a log file.
5.  Attach the log file to your support ticket.

___

## Identify the Cloudflare data center serving your request

[A map of our data centers](https://www.cloudflare.com/network-map) is listed on the [Cloudflare status page](https://www.cloudflarestatus.com/), sorted by continent. The three-letter code in the data center name is the [IATA code](http://en.wikipedia.org/wiki/IATA_airport_code) of the nearest major international airport. Determine the Cloudflare data center serving requests for your browser by visiting: `http://``_www.example.com_``/cdn-cgi/trace.`

Replace _www.example.com_ with your domain and hostname.  Note the **colo** field from the output.

___

## Troubleshoot requests with cURL

cURL is a command line tool for sending HTTP/HTTPS requests and is useful for troubleshooting:

-   HTTP/HTTPS Performance
-   HTTP Error Responses
-   HTTP Headers
-   APIs
-   Comparing Server/Proxy Responses
-   SSL Certificates

{{<Aside type="note">}}
cURL is not installed by default in Windows and requires an [install
wizard](http://curl.haxx.se/dlwiz/).
{{</Aside>}}

Run the following command to send a standard HTTP GET request to your website (replace _www.example.com_ with your domain and hostname):

```
$ curl -svo /dev/null http://www.example.com/
```

This example cURL command returns output detailing the HTTP response and request headers but discards the page body output. cURL output confirms the HTTP response and whether Cloudflare is currently proxying traffic for the site.

{{<Aside type="note">}}
Review the [cURL command
options](https://curl.haxx.se/docs/manpage.html) for additional
functionality.
{{</Aside>}}

Expand the sections below for tips on troubleshooting HTTP errors, performance, caching, and SSL/TLS certificates:

When troubleshooting HTTP errors in responses from Cloudflare, test whether your origin caused the errors by sending requests directly to your origin web server. To troubleshoot HTTP errors, run a cURL directly to your origin web server IP address (bypassing Cloudflare’s proxy):

```
$ curl -svo /dev/null http://example.com --connect-to ::203.0.113.34
```

{{<Aside type="tip">}}
If you have multiple origin web servers, test each one to ensure there
are no response differences. If you observe the issue when connecting
directly to your origin web server, contact your hosting provider for
assistance.
{{</Aside>}}

cURL measures latency or performance degradation for HTTP/HTTPS requests via the [_\-w_ or _\--write-out_ cURL options](https://curl.haxx.se/docs/manpage.html#-w). The example cURL below measures several performance vectors in the request transaction such as duration of the TLS handshake, DNS lookup, redirects, transfers, etc:

```
curl -svo /dev/null https://example.com/ -w "\nContent Type: %{content_type} \
\nHTTP Code: %{http_code} \
\nHTTP Connect:%{http_connect} \
\nNumber Connects: %{num_connects} \
\nNumber Redirects: %{num_redirects} \
\nRedirect URL: %{redirect_url} \
\nSize Download: %{size_download} \
\nSize Upload: %{size_upload} \
\nSSL Verify: %{ssl_verify_result} \
\nTime Handshake: %{time_appconnect} \
\nTime Connect: %{time_connect} \
\nName Lookup Time: %{time_namelookup} \
\nTime Pretransfer: %{time_pretransfer} \
\nTime Redirect: %{time_redirect} \
\nTime Start Transfer: %{time_starttransfer} \
\nTime Total: %{time_total} \
\nEffective URL: %{url_effective}\n" 2>&1
```

[Explanation of this timing output](https://blog.cloudflare.com/a-question-of-timing/) is found on the Cloudflare blog.

{{<Aside type="tip">}}
As demonstrated in the preceding example, cleaner results are achieved
by denoting a new line with **\\n** before each variable. Otherwise, all
metrics are displayed together on a single line.
{{</Aside>}}

cURL helps review the HTTP response headers that influence caching. In particular, review several HTTP headers when troubleshooting Cloudflare caching:

-   CF-Cache-Status
-   Cache-control/Pragma
-   Expires
-   Last-Modified
-   S-Maxage

{{<Aside type="note">}}
Find specifics on [Cloudflare\'s caching
behavior](https://support.cloudflare.com/hc/articles/202775670) in
Cloudflare's Help Center.
{{</Aside>}}

#### Reviewing Certificates with cURL

The following cURL command shows the SSL certificate served by Cloudflare during an HTTPS request (replace _www.example.com_ with your domain and hostname):

```sh
$ curl -svo /dev/null https://www.example.com/ 2>&1 | egrep -v "^{.*$|^}.*$|^* http.*$"
```

{{<Aside type="tip">}}
2*\>&1 \| egrep -v \"\^{.*\$\|\^}.*\$\|\^* http.\*\$\" \*cleans and
parses the TLS handshake and certificate information.
{{</Aside>}}

To display the origin certificate (assuming one is installed), replace _203.0.113.34_ below with the actual IP address of your origin web server and replace _www.example.com_ with your domain and hostname:

```sh
$ curl -svo /dev/null https://www.example.com --connect-to ::203.0.113.34 2>&1 | egrep -v "^{.*$|^}.*$|^* http.*$"
```

#### Testing TLS Versions

If troubleshooting browser support or confirming what TLS versions are supported, cURL allows you to test a specific TLS version by adding one of the following options to your cURL:

-   \--tlsv1.0
-   \--tlsv1.1
-   \--tlsv1.2
-   \--tlsv1.3

___

## Temporarily pause Cloudflare

For more details, refer to [Pause Cloudflare](/fundamentals/get-started/basic-tasks/manage-domains/pause-cloudflare/).

___

## Perform a traceroute

Traceroute is a network diagnostic tool that measures the route latency of packets across a network. Most operating systems support the _traceroute_ command. If you experience connectivity issues with your Cloudflare-proxied website and [ask Cloudflare Support for assistance](https://support.cloudflare.com/hc/articles/200172476), ensure to provide output from a traceroute.

{{<Aside type="tip">}}
Timeouts are possible for ping results because Cloudflare limits ping
requests.
{{</Aside>}}

Review the instructions below for running traceroute on different operating systems. Replace _www.example.com_ with your domain and hostname in the examples below:

1\. Open the **Start** menu.

2\. Click **Run**.

3\. To open the command line interface, type **cmd** and then click **OK**.

4\. At the command line prompt, type: For IPv4 -

```sh
$ tracert www.example.com
```

For IPv6 -

```sh
$ tracert -6 www.example.com
```

5\. Press **Enter**.

6\. You can copy the results to save in a file or paste in another program.

1\. Open a terminal window.

2\. At the command line prompt, type:

For IPv4 -

```sh
$ traceroute www.example.com
```

For IPv6 -

```sh
$ traceroute -6 www.example.com
```

3\. You can copy the results to save in a file or paste in another program.

1.  Open the **Network Utility** application.
2.  Click the **Traceroute** tab.
3.  Type the _domain_ or _IP address_ in the appropriate input field and press **Trace**.
4.  You can copy the results to save in a file or paste in another program.

Alternatively, follow the same Linux traceroute instructions above when using the Mac OS terminal program.

___

## Add the CF-RAY header to your logs

The **CF-RAY** header traces a website request through Cloudflare's network. Provide the **CF-RAY** of a web request to Cloudflare support when troubleshooting an issue. You can also add **CF-RAY** to your logs by editing your origin web server configuration with the snippet below that corresponds to your brand of web server:

```
LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\" %{CF-Ray}i" cf_custom
```

```
log_format cf_custom '$remote_addr - $remote_user [$time_local] '
'"$request" $status $body_bytes_sent '
'"$http_referer" "$http_user_agent" '
'$http_cf_ray';
```

___

## Perform a MTR

Traceroute (MTR) is a tool that combines traceroute and ping, which is another common method for testing network connectivity and speed. In addition to the hops along the network path, MTR shows constantly updating information about the latency and packet loss along the route to the destination. This helps in troubleshooting network issues by allowing you to see what’s happening along the path in real-time.

MTR works by discovering the network path in a similar manner to traceroute, and then regularly sending packets to continue collecting information to provide an updated view into the network’s health and speed.

Like traceroute, MTR can use ICMP or UDP for outgoing packets but relies on ICMP for return (Type 11: Time Exceeded) packets.

### How do I use MTR to generate network path report?

**Using MTR on \*NIX based machines**

Generally, we'd use MTR as the following:

```sh
mtr -rw <dest_hostname> e.g.: mtr -rw one.one.one.one
```

or with destination IP:

```sh
mtr -rw <dest_IP> e.g.: mtr -rw 1.1.1.1
```

Please refer to this documentation, which explains more about analysing MTR: [How to read MTR](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-mtr/).[](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-mtr/)

___

## Run Packet Captures

**Why and when do you need Packet Captures?**

Issues that happen at the layers 3/4 occur before requests reaching Cloudflare's logging system, so they do not show up in the HTTP logs. Therefore, troubleshooting issues related to connection resets, packet loss or SSL handshake failures can be tricky without a deep investigation at the packet level.

Some HTTP errors generated by Cloudflare, such as [520s](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#520error), [524s](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#524error) and [525s](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#525error), show underlying issues at layers 3/4, and might require a packet capture for further investigation.

**How to Run a Packet Capture**

{{<Aside type="warning">}}
Please be aware, if you transmit any sensitive information while a
packet capture is running, it will be recorded.
{{</Aside>}}

Cloudflare suggests [Wireshark](https://www.wireshark.org/download.html) for running packet captures. For instructions on how to use the _tcpdump_ command line, refer to [this](https://www.wireshark.org/docs/wsug_html_chunked/AppToolstcpdump.html) article.

1.  Close all programs/browser tabs that could be sending data in the background to avoid having to use a lot of display filters later.
2.  Create your Wireshark capture filter (refer to [this](https://wiki.wireshark.org/CaptureFilters) article for more information).
3.  Select the appropriate interface (e.g. Wi-Fi: en0). If you're not sure which interface to use, Wireshark provides an I/O graph of each interface to give you a hint.
4.  Click the blue shark fin icon in the top left-hand corner to start your packet capture. 
5.  Reproduce the issue while running capture.
6.  Click the red square icon in the top left-hand corner to stop your packet capture. 
7.  Save as a pcap file and attach it to your support ticket.

___

## Related resources

-   [Contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476)
-   [Troubleshooting Cloudflare HTTP 5XX errors](https://support.cloudflare.com/hc/articles/115003011431)
-   [Diagnosing network issues with MTR and traceroute](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-mtr/)
-   [cURL command line tool](https://curl.haxx.se/)
