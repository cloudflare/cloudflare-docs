---
pcx-content-type: how-to
title: HTTP
weight: 1
---

#  Enable Gateway proxy with PAC file

{{<Aside type="note">}}

This feature is only available to Enterprise customers.

{{</Aside>}}

You can apply Gateway HTTP policies at the browser level by configuring a Proxy Auto-Configuration (PAC) file. The PAC file contains a Javascript function which instructs a browser to forward traffic to a proxy server instead of directly to the destination server. When end users visit a website, their browser will send the request to a Cloudflare proxy server associated with your account, to be filtered by Gateway.

## 1. Generate a proxy server

Proxy endpoints are generated using the Cloudflare API.

1. Run the following command:

    ```bash
    curl --request POST \
    --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/gateway/proxy_endpoints \
    --header 'X-Auth-Email: <EMAIL>' \
    --header 'X-Auth-Key: <API_KEY>' \
    --data '{"name": "any_name", "ips": ["<PUBLIC_IP>"]}'
    ```

    Replace `<ACCOUNT_ID>`, `<EMAIL>`, and `<API_KEY>` with your [account credentials](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

    Replace `<PUBLIC_IP>` with the source IP address of your device in CIDR notation. For example,
    - **IPv4**: `90.90.241.229/32` (be sure to include the `/32`)
    - **IPv6**: `2601:645:4500:9c0:a945:f47c:23e9:a35b/128` (be sure to include the `/128`)

    You should see an output similar to

    ```bash
    {
    "result": {
        "id": "d969d7bf-ec28-4291-9af0-86825f472c21",
        "name": "test",
        "created_at": "2022-03-02T10:57:18.094789Z",
        "updated_at": "2022-03-02T10:57:18.094789Z",
        "ips": [
        "90.90.241.229/32"
        ],
        "subdomain": "3ele0ss56t"
    },
    "success": true,
    "errors": [],
    "messages": []
    }
    ```

2. Note the `subdomain` value returned by the API. Your Cloudflare proxy server domain is of the form:

    ```txt
    <SUBDOMAIN>.proxy.cloudflare-gateway.com
    ```

    In the example above, the subdomain is `3ele0ss56t` and the proxy server domain is `3ele0ss56t.proxy.cloudflare-gateway.com`.

## 2. Test your proxy server

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), create an [HTTP policy](/cloudflare-one/policies/filtering/http-policies/) for testing purposes. For example,
    | Selector      | Operator  | Value              | Action |
    | --------------| ----------| -------------------| ------ |
    | Domain        | in        | `example.com`      | Block  |

2. Verify that nothing is returned by a `curl` command:

    ```bash
    $ curl -4 -p -x https://3ele0ss56t.proxy.cloudflare-gateway.com https://example.com
    $
    ```

{{<Aside type="note">}}
If curl returns a `401` code, it means the public IP of your device does not match the one used to generate the proxy server. Make sure that Warp is turned off on your device and double check that curl is not using IPv6 (force the option `-4`).
{{</Aside>}}

## 3. Create a PAC file

A PAC file is a text file that specifies which traffic should redirect to the proxy server. You can use the default PAC file or create your own.

### Default PAC file

When you create a proxy server, Cloudflare automatically generates a PAC file on Cloudflare Workers. The default PAC file will redirect all traffic to Cloudflare except for internal traffic. The file is hosted at:

 ```txt
 https://proxy-pac.cflr.workers.dev/<your_proxy_subdomain>.pac
 ```

You can use this URL when configuring your browser settings, for example `https://proxy-pac.cflr.workers.dev/3ele0ss56t.pac`.

### Custom PAC file

Below is the default PAC file. You can [customize the file](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file) and host it somewhere your browser can access, such as on an internal web server or on [Cloudflare Workers](/workers/).

```js
function FindProxyForURL(url,host)
{
    // No proxy for private (RFC 1918) IP addresses (intranet sites)
    if (isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
         return "DIRECT";
    }
 
    // No proxy for localhost
    if (isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")) {
        return "DIRECT";
    }
 
    // Proxy all
    return "HTTPS 3ele0ss56t.proxy.cloudflare-gateway.com:443";
}
```

{{<Aside type="note">}}

- Make sure the directive used for the endpoint is `HTTPS` and not `PROXY`.
- You must use a PAC file instead of configuring the endpoint directly in the proxy configuration of the browser. This is because modern browsers still do not support HTTPS proxies without PAC files.
- Use a proper text editor such as VSCode to avoid added characters.
{{</Aside>}}

## 4. Configure your browser

All major browsers support PAC files. You can configure individual browsers, or you can configure system settings that apply to all browsers on the device.

The following example demonstrates the setup procedure for Firefox.

1. In Firefox, open the **Settings** menu and scroll down to **Network Settings**.

![Navigating to Network Settings menu in Firefox](/cloudflare-one/static/documentation/connections/firefox-network-settings.png)

2. Click **Settings**.
3. Select **Automatic proxy configuration URL**.
4. Input the URL where your PAC file is hosted, for example `https://proxy-pac.cflr.workers.dev/3ele0ss56t.pac`.

![Input PAC file URL into Firefox](/cloudflare-one/static/documentation/connections/firefox-pac-file.png)

5. Click **OK**. HTTP traffic from Firefox is now being filtered by Gateway.

## 5. Test your HTTP policy

You can test any [supported HTTP policy](#limitations), such as the example policy created in [Step 2](#2-test-the-proxy-server). When you go to `https://example.com` in your browser, you should see the Gateway block page.

## Limitations

Currently, the agentless HTTP proxy does not support:

- [Identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/)
- mTLS authentication
- Browser isolation policies. Until PAC support is added, you can use the [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/clientless-browser-isolation/) URL to open websites in a remote browser.
