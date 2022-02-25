---
pcx-content-type: configuration
title: Using cURL with the API
weight: 20
---

# Using cURL with the API

Here is how to create, activate, assign, and enable a Railgun using cURL and the Optimized Partner API.

1.  Look up the `user_key` for the domain to add a Railgun to. This can be done using the [user\_lookup](http://www.cloudflare.com/docs/host-api.html#s3.2.3) Host API method and the user’s email address or unique ID:

```json
$ curl -s 'https://api.cloudflare.com/host-gw.html?act=user_lookup&host_key=YOUR_HOST_API_KEY&cloudflare_email=user@example.com'

{
    "msg": null,
    "request": {
        "act": "user_lookup",
        "cloudflare_email": "user@example.com"
    },
    "response": {
        "cloudflare_email": "user@example.com",
        "hosted_zones": [
            "example.com"
        ],
        "unique_id": "UNIQUE_ID (CAN BE USED IN PLACE OF USER'S EMAIL)",
        "user_api_key": "USER_API_KEY (NOT USED FOR RAILGUN)",
        "user_authed": true,
        "user_exists": true,
        "user_key": "UNIQUE_USER_KEY_OF_32_CHARACTERS"
    },
    "result": "success"
}
```

2.  Next, call the `init` API method to create a new Railgun using the `host_key` and `user_key`:

```json
$ curl 'https://www.cloudflare.com/api/v2/railgun/init?host_key=YOUR_HOST_API_KEY&pubname=My%20Railgun'

{
    "msg": null,
    "response": {
        "act": "railgun_init",
        "railgun_id": "1",
        "railgun_name": "GENERATED_OR_SPECIFIED_RG_NAME",
        "railgun_status": "INI",
        "rtkn": "30_CHARACTER_RTKN"
    },
    "result": "success"
}
```

3.  The Railgun daemon should then be started so that it may complete the activation process, which should be logged via syslog after startup:

```sh
$  tail -f /var/log/messages
Oct 27 22:29:41 www railgun[Activation]: Activation POST completed.
Oct 27 22:29:41 www railgun[Activation]: Assigned Railgun ID: 1
Oct 27 22:29:41 www railgun[Activation]: Acquired cert from server
```

4.  Next, the `suggestion_set` method is called with `auto_enabled` set to `0` in order to expose the Railgun to the domain. Setting `auto_enabled` to `0` will not enable Railgun for the domain, it will only expose the Railgun instance to the domain within Cloudflare Settings. To expose, associate, and enable Railgun in a single API call, set `auto_enabled` to `1`.

```sh
$ curl 'https://www.cloudflare.com/api/v2/railgun/suggestion_set?host_key=YOUR_HOST_API_KEY&z=example.com&rtkn=30_CHARACTER_RTKN&auto_enabled=0'

{
    "msg": null,
    "response": {
        "act": "railgun_suggest",
        "railgun_id": "1",
    },
    "result": "success"
}
```

5.  The user should now be able to see the Railgun configuration dropdown menu within their Cloudflare Settings panel. The user can now test and enable Railgun themselves. If `auto_enabled` had been set to `1`, the following `conn_set` call is not necessary and would’ve been performed automatically.

6.  Finally, the `conn_set` method is called to associate the Railgun with the domain and create the necessary port2408.net DNS records and SSL certificate. It is possible to test Railgun without enabling it using a special HTTP header. More details on testing with the port2408.net hostname (`railgun_rec_name`) in the installation documentation.

<!---->

    $ curl 'https://www.cloudflare.com/api/v2/railgun/conn_set?host_key=YOUR_HOST_API_KEY&z=example.com&rtkn=30_CHARACTER_RTKN&mode=0'

    {
        "msg": null,
        "response": {
            "act": "railgun_conn_set",
            "railgun_conn_id": "2",
            "railgun_rec_name": "rg-ffffffff1111111111111111.port2408.net"
        },
        "result": "success"
    }
