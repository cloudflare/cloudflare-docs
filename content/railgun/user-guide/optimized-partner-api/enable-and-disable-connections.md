---
pcx-content-type: configuration
title: Enable and disable connections
weight: 18
---

# Enable and disable connections

After a Railgun has been activated, it can be exposed to a particular domain with the [suggestion\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-suggestion_set) API call. [suggestion\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-suggestion_set) also accepts the `auto_enabled` parameter to assign and enable Railgun for the domain globally in a single API call. If `auto_enabled` is not set to `1`, then the connection needed to enable Railgun for the domain must be made manually using the [conn\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_set) method. [conn\_setmode\_enabled](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_setmode_enabled) and [conn\_setmode\_disabled](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_setmode_disabled) can be used to toggle Railgun on or off for the domain globally. [zone\_conn\_get\_active](/railgun/user-guide/optimized-partner-api/list-railgun-details/#post-zone_conn_get_active) can be used to view active Railgun connections.

## POST suggestion\_set

`POST /api/v2/railgun/suggestion_set`

Expose a verified Railgun to a domain via the Cloudflare Settings user-interface. This method allows an end-user to select and enable the specified Railgun within the Cloudflare Settings user-interface. If `auto_enabled` is set to `0`, it is also necessary to perform a [conn\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_set) for the Railgun in order to setup a connection with the domain.

### Form parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token
*   **auto\_enabled** – Railgun operation mode, `1` for active `0` for inactive

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/suggestion_set HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
auto_enabled=0
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
        "act": "railgun_suggest",
        "railgun_id": "1",
    },
    "result": "success"
}
```

</div>
</details>

## GET suggestion\_set

`GET /api/v2/railgun/suggestion_set`

Expose a verified Railgun to a domain via the Cloudflare Settings user-interface. This method allows an end-user to select and enable the specified Railgun within the Cloudflare Settings user-interface. If `auto_enabled` is set to `0`, it is also necessary to perform a [conn\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_set) for the Railgun in order to setup a connection with the domain.

### Query parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token
*   **auto\_enabled** – Railgun operation mode, `1` for active `0` for inactive

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/suggestion_set?host_key=&rtkn=&z=&mode= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
auto_enabled=0
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
        "act": "railgun_suggest",
        "railgun_id": "1",
    },
    "result": "success"
}
```

</div>
</details>

## POST conn\_set

`POST /api/v2/railgun/conn_set`

Establish a connection between a domain and a Railgun without requiring the domain’s user to utilize the Cloudflare Settings user-interface to change or deactivate it. The `mode` parameter can be set to `1` in order to enable the Railgun globally if `conn_set` succeeds.

### Form parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token
*   **mode** – Railgun operation mode, `1` for active `0` for inactive

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_set HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
mode=0
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
        "act": "railgun_conn_set",
        "railgun_conn_id": "1",
        "railgun_rec_name": "rg-d65dfffff666a77fd3dea2a7cfeede90.port2408.net"
    },
    "result": "success"
}
```

</div>
</details>

## GET conn\_set

`GET /api/v2/railgun/conn_set`

Establish a connection between a domain and a Railgun without requiring the domain’s user to utilize the Cloudflare Settings user-interface to change or deactivate it. The `mode` parameter can be set to `1` in order to enable the Railgun globally if `conn_set` succeeds.

### Query parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token
*   **mode** – Railgun operation mode, `1` for active `0` for inactive

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_set?host_key=&rtkn=&z=&mode= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
mode=0
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
        "act": "railgun_conn_set",
        "railgun_conn_id": "1",
        "railgun_rec_name": "rg-d65dfffff666a77fd3dea2a7cfeede90.port2408.net"
    },
    "result": "success"
}
```

</div>
</details>

## POST conn\_setmode\_enabled

`POST /api/v2/railgun/conn_setmode_enabled`

Enable a Railgun. If request is successful, the specified Railgun will be enabled and traffic for the specified domain will be proxied through Railgun.

### Form parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_setmode_enabled HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_conn_setmode_enabled",
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>

## GET conn\_setmode\_enabled

`GET /api/v2/railgun/conn_setmode_enabled`

Enable a Railgun. If request is successful, the specified Railgun will be enabled and traffic for the specified domain will be proxied through Railgun.

### Query parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_setmode_enabled?host_key=&rtkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_conn_setmode_enabled",
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>

## POST conn\_setmode\_disabled

`POST /api/v2/railgun/conn_setmode_disabled`

Disable a Railgun. If request is successful, the specified Railgun will be disabled and traffic for the specified domain will no longer use Railgun.

### Form parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_setmode_disabled HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_conn_setmode_disabled",
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>

## GET conn\_setmode\_disabled

`GET /api/v2/railgun/conn_setmode_disabled`

Disable a Railgun. If request is successful, the specified Railgun will be disabled and traffic for the specified domain will no longer use Railgun.

### Query parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_setmode_disabled?host_key=&rtkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_conn_setmode_disabled",
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>

## POST conn\_delete

`POST /api/v2/railgun/conn_delete`

Remove a connection between a domain and a Railgun. This API call will allow a connected Railgun to be assigned to a different domain. Removing the connection of an enabled Railgun and domain will disable Railgun for the domain until a new connection is made with [conn\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_set).

### Form parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_delete HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_conn_delete",
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>

## GET conn\_delete

`GET /api/v2/railgun/conn_delete`

Remove a connection between a domain and a Railgun. This API call will allow a connected Railgun to be assigned to a different domain. Removing the connection of an enabled Railgun and domain will disable Railgun for the domain until a new connection is made with [conn\_set](/railgun/user-guide/optimized-partner-api/enable-and-disable-connections/#post-conn_set).

### Query parameters

*   **host\_key** – Host API key
*   **z** – Domain name
*   **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_delete?host_key=&rtkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
z=example.com
```

</div>
</details>

<details>
<summary>Example response</summary>
<div>

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_conn_delete",
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>
