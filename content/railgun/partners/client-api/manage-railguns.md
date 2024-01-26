---
pcx_content_type: configuration
title: Manage Railguns
weight: 2
---

# Manage Railguns

{{<render file="_railgun-deprecation-notice.md">}}

Creating and activating a Railgun requires two API calls. First, a Railgun must be initialized using the `init` call. The activation API call is made by Railgun when the daemon is started and does not need to be made by a user.

## POST init

`POST /api/v2/railgun/init`

Creates a Railgun. If the request is successful, a new Railgun is added to a user account and placed in initializing status (`INI`).

### Form parameters

* `email` – User account email
* `tkn` – User API token
* `name` – Name of Railgun
* `pubname` – Name of Railgun shown to users

{{<details header="Example request">}}

```txt
POST /api/v2/railgun/init HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
pubname=My%20Railgun
name=my-railgun
```

{{</details>}}

{{<details header="Example response">}}

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_init",
         "railgun_id": "1",
         "railgun_name": "RG_a1b2c3d4e5f6g7h8i9j0k1",
         "railgun_status": "INI",
         "rtkn": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp"
     },
     "result": "success"
}
```

{{</details>}}

## GET init

`GET /api/v2/railgun/init`

Creates a Railgun. If the request is successful, a new Railgun is added to a user account and placed in initializing status (`INI`).

### Query parameters

* `email` – User account email
* `tkn` – User API token
* `name` – Name of Railgun
* `pubname` – Name of Railgun shown to users

{{<details header="Example request">}}

```txt
GET /api/v2/railgun/init?email=&tkn=&pubname=&name= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
pubname=My%20Railgun
name=my-railgun
```

{{</details>}}

{{<details header="Example response">}}

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_init",
         "railgun_id": "1",
         "railgun_name": "RG_a1b2c3d4e5f6g7h8i9j0k1",
         "railgun_status": "INI",
         "rtkn": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp"
     },
     "result": "success"
}
```

{{</details>}}

## POST delete

`POST /api/v2/railgun/delete`

Deletes a Railgun. If the request is successful, the Railgun with a token matching `rtkn` is removed from the account and set to deleted status (`D`).

### Form parameters

* `email` – User account email
* `tkn` – User API token
* `rtkn` – Railgun token

{{<details header="Example request">}}

```txt
POST /api/v2/railgun/delete HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
```

{{</details>}}

{{<details header="Example response">}}

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_delete",
         "railgun_id": "1",
     },
     "result": "success"
}
```

{{</details>}}

## GET delete

`GET /api/v2/railgun/delete`

Deletes a Railgun. If the request is successful, the Railgun with a token matching `rtkn` is removed from the account and set to deleted status (`D`).

### Query parameters

* `email` – User account email
* `tkn` – User API token
* `rtkn` – Railgun token

{{<details header="Example request">}}

```txt
GET /api/v2/railgun/delete?email=&tkn=&rtkn= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

email=user%40cloudflare.com
tkn=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
```

{{</details>}}

{{<details header="Example response">}}

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
     "msg": null,
     "response": {
         "act": "railgun_delete",
         "railgun_id": "1",
     },
     "result": "success"
}
```

{{</details>}}
