---
pcx_content_type: configuration
title: Enable and disable connections
weight: 4
---

# Enable and disable connections

{{<render file="_railgun-deprecation-notice.md">}}

After a Railgun has been activated, it can be assigned to a particular domain with the [`conn_set`](/railgun/partners/client-api/enable-and-disable-connections/#post-conn_set) API call. [`conn_setmode_enabled`](/railgun/partners/client-api/enable-and-disable-connections/#post-conn_setmode_enabled) and [`conn_setmode_disabled`](/railgun/partners/client-api/enable-and-disable-connections/#post-conn_setmode_disabled) can be used to toggle Railgun on or off for the domain. [`conn_set`](/railgun/partners/client-api/enable-and-disable-connections/#post-conn_set) also accepts a mode parameter to assign and enable Railgun in a single API call. [`zone_conn_get_active`](/railgun/partners/client-api/list-railgun-details/#post-zone_conn_get_active) can be used to view active Railgun connections.

## POST conn\_set

`POST /api/v2/railgun/conn_set`

Establish a connection between a domain and a Railgun.

### Form parameters

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token
*   `mode` – Railgun operation mode. `1` for active, `0` for inactive

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_set HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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
         "railgun_id": "1"
     },
     "result": "success"
}
```

</div>
</details>

## GET conn\_set

`GET /api/v2/railgun/conn_set`

Establish a connection between a domain and a Railgun.

### Query parameters

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token
*   `mode` – Railgun operation mode. `1` for active, `0` for inactive

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_set?email=&tkn=&rtkn=&z=&mode= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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
         "railgun_id": "1"
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

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_setmode_enabled HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_setmode_enabled?email=&tkn=&rtkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_setmode_disabled HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p
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

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_setmode_disabled?email=&tkn=&rtkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p
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

Remove a connection between a domain and a Railgun. This API call will allow a connected Railgun to be assigned to a different domain. Removing the connection of an enabled Railgun and domain will disable Railgun for the domain until a new connection is made with [`conn_set`](/railgun/partners/client-api/enable-and-disable-connections/#post-conn_set).

### Form parameters

*   `email` – User account email
*   `tkn` – User API token
*   `z` – Domain name
*   `rtkn` – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/conn_delete HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p
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

Remove a connection between a domain and a Railgun. This API call will allow a connected Railgun to be assigned to a different domain. Removing the connection of an enabled Railgun and domain will disable Railgun for the domain until a new connection is made with [`conn_set`](/railgun/partners/client-api/enable-and-disable-connections/#post-conn_set).

### Query parameters

*   `email` – User account email
*   `tkn` – User API token
*   `z` Domain name
*   `rtkn` – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/conn_delete?email=&tkn=&rtkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p
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
