---
pcx_content_type: configuration
title: List Railgun details
weight: 3
---

# List Railgun details

{{<render file="_railgun-deprecation-notice.md">}}

The following API calls can be used to determine details and the status of one or more Railguns assigned to an account. These calls are sometimes needed to determine the unique `rtkn` or `id` values assigned to a Railgun.

## POST user\_get\_all

`POST /api/v2/railgun/user_get_all`

Assign a Railgun to a domain.

### Form parameters

*   `email` – User account email
*   `tkn` – User API token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/user_get_all HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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
        "act": "railgun_user_get_all",
        "railguns": {
            "count": 5,
            "objs": [
                {
                    "cdate": "2012-10-27 16:34:37.718746-07",
                    "edate": "2012-11-06 13:02:16.153332-08",
                    "props": {
                        "build": "2012-10-27-1257",
                        "number": "2.6.0",
                        "revision": "ff3f8f25f5238de327cf34059659de0738399176"
                    },
                    "railgun_activated_on": "2012-11-06 13:02:16.122355-08",
                    "railgun_api_key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp",
                    "railgun_deleted_on": null,
                    "railgun_host_id": null,
                    "railgun_id": "1",
                    "railgun_ip": null,
                    "railgun_mode": "1",
                    "railgun_name": "RG_100f5777999990edb60d2db56627f9",
                    "railgun_port": "2408",
                    "railgun_pubname": "Railgun for example.com",
                    "railgun_rec_id": "100",
                    "railgun_rec_name": "rg-d65dfffff666a75fd3dea2a7cfeede90.port2408.net",
                    "railgun_status": "V",
                    "railgun_tag": "a18bbbbc555f4g6h2i8j222l711n",
                    "railgun_type": "user",
                    "railgun_user_id": "1000"
                },
                {
                    "cdate": "2012-11-02 00:03:33.17205-07",
                    "edate": "2012-11-02 00:03:33.17205-07",
                    "props": {
                        "build": null,
                        "number": null,
                        "revision": null
                    },
                    "railgun_activated_on": null,
                    "railgun_api_key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp",
                    "railgun_deleted_on": null,
                    "railgun_host_id": null,
                    "railgun_id": "178",
                    "railgun_ip": null,
                    "railgun_mode": "0",
                    "railgun_name": "RG_000f7777999690edb60d2db56627f9",
                    "railgun_port": "2408",
                    "railgun_pubname": "Railgun for mydomain.com",
                    "railgun_rec_id": null,
                    "railgun_rec_name": null,
                    "railgun_status": "INI",
                    "railgun_tag": "d18bbbbc555f4g6h2i8j222l711n",
                    "railgun_type": "user",
                    "railgun_user_id": "1000"
                }
            ]
        }
    },
    "result": "success"
}
```

</div>
</details>

## GET user\_get\_all

`GET /api/v2/railgun/user_get_all`

Assign a Railgun to a domain.

### Query parameters

*   `email` – User account email
*   `tkn` – User API token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/user_get_all?email=&tkn= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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
        "act": "railgun_user_get_all",
        "railguns": {
            "count": 5,
            "objs": [
                {
                    "cdate": "2012-10-27 16:34:37.718746-07",
                    "edate": "2012-11-06 13:02:16.153332-08",
                    "props": {
                        "build": "2012-10-27-1257",
                        "number": "2.6.0",
                        "revision": "ff3f8f25f5238de327cf34059659de0738399176"
                    },
                    "railgun_activated_on": "2012-11-06 13:02:16.122355-08",
                    "railgun_api_key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp",
                    "railgun_deleted_on": null,
                    "railgun_host_id": null,
                    "railgun_id": "1",
                    "railgun_ip": null,
                    "railgun_mode": "1",
                    "railgun_name": "RG_100f5777999990edb60d2db56627f9",
                    "railgun_port": "2408",
                    "railgun_pubname": "Railgun for example.com",
                    "railgun_rec_id": "100",
                    "railgun_rec_name": "rg-d65dfffff666a75fd3dea2a7cfeede90.port2408.net",
                    "railgun_status": "V",
                    "railgun_tag": "a18bbbbc555f4g6h2i8j222l711n",
                    "railgun_type": "user",
                    "railgun_user_id": "1000"
                },
                {
                    "cdate": "2012-11-02 00:03:33.17205-07",
                    "edate": "2012-11-02 00:03:33.17205-07",
                    "props": {
                        "build": null,
                        "number": null,
                        "revision": null
                    },
                    "railgun_activated_on": null,
                    "railgun_api_key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp",
                    "railgun_deleted_on": null,
                    "railgun_host_id": null,
                    "railgun_id": "178",
                    "railgun_ip": null,
                    "railgun_mode": "0",
                    "railgun_name": "RG_000f7777999690edb60d2db56627f9",
                    "railgun_port": "2408",
                    "railgun_pubname": "Railgun for mydomain.com",
                    "railgun_rec_id": null,
                    "railgun_rec_name": null,
                    "railgun_status": "INI",
                    "railgun_tag": "d18bbbbc555f4g6h2i8j222l711n",
                    "railgun_type": "user",
                    "railgun_user_id": "1000"
                }
            ]
        }
    },
    "result": "success"
}
```

</div>
</details>

## POST zone\_conn\_get\_active

`POST /api/v2/railgun/zone_conn_get_active`

List all active Railgun connections for a domain.

### Form parameters

*   `email` – User account email
*   `tkn` – User API token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/zone_conn_get_active HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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
        "act": "railgun_zone_conn_get_active",
        "railgun_conn": {
            "obj": {
                    "railgun_conn_id": "2",
                    "railgun_id": "123",
                    "railgun_conn_status": "V",
                    "railgun_conn_mode": "1",
                    "railgun_enabled": "t",
                }
        }
    },
    "result": "success"
}
```

</div>
</details>

## GET zone\_conn\_get\_active

`GET /api/v2/railgun/zone_conn_get_active`

List all active Railgun connections for a domain.

### Form parameters

*   `email` – User account email
*   `tkn` – User API token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/zone_conn_get_active?email=&tkn=&z= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
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
        "act": "railgun_zone_conn_get_active",
        "railgun_conn": {
            "obj": {
                    "railgun_conn_id": "2",
                    "railgun_id": "123",
                    "railgun_conn_status": "V",
                    "railgun_conn_mode": "1",
                    "railgun_enabled": "t",
                }
        }
    },
    "result": "success"
}
```

</div>
</details>
