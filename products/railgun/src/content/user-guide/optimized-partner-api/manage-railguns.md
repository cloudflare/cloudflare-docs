---
order: 15
pcx-content-type: configuration
---
# Manage Railguns

Creating and activating a Railgun requires two API calls. First, a Railgun must be initialized and then activated using the `init` and `activate` calls respectively. The activation API call is made by Railgun when the daemon is started and does not need to be made by a user.

The response body of the `init` API call will contain the activation token (`rtkn`) required activation. Set `activation.token` within the Railgun configuration file to the value of `rtkn` from the API call response.

## POST init

`POST /api/v2/railgun/init`

Create a Railgun. If request is successful, a new Railgun is added to a host account and placed in initializing status (`INI`).

### Form parameters
 	
* **host_key** – Host API key
* **name** – Name of Railgun (optional)
* **pubname** – Name of Railgun shown to users (optional)

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/init HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
name=my-railgun
pubname=My%20Railgun
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
         "act": "railgun_init",
         "railgun_id": "1",
         "railgun_name": "RG_a1b2c3d4e5f6g7h8i9j0k1",
         "railgun_status": "INI",
         "rtkn": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp"
     },
     "result": "success"
}
```

</div>
</details>

## GET init

`GET /api/v2/railgun/init`

Create a Railgun. If request is successful, a new Railgun is added to a host account and placed in initializing status (`INI`).

### Query parameters
 	
* **host_key** – Host API key
* **name** – Name of Railgun (optional)
* **pubname** – Name of Railgun shown to users (optional)

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/init?host_key=&pubname=&name= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
name=my-railgun
pubname=My%20Railgun
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
         "act": "railgun_init",
         "railgun_id": "1",
         "railgun_name": "RG_a1b2c3d4e5f6g7h8i9j0k1",
         "railgun_status": "INI",
         "rtkn": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5pp"
     },
     "result": "success"
}
```

</div>
</details>

## POST delete

`POST /api/v2/railgun/delete`

Delete a Railgun. If request is successful, the Railgun with a token matching `rtkn` is removed from the account and set to deleted status (`D`).

### Form parameters
 	
* **host_key** – Host API key
* **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
POST /api/v2/railgun/delete HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example form parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
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
         "act": "railgun_delete",
         "railgun_id": "1",
     },
     "result": "success"
}
```

</div>
</details>

## GET delete

`GET /api/v2/railgun/delete`

Delete a Railgun. If request is successful, the Railgun with a token matching `rtkn` is removed from the account and set to deleted status (`D`).

### Query parameters
 	
* **host_key** – Host API key
* **rtkn** – Railgun token

<details>
<summary>Example request</summary>
<div>

```txt
GET /api/v2/railgun/delete?host_key=&rtkn= HTTP/1.1
Host: www.cloudflare.com
Accept: */*
Content-Type: application/x-www-form-urlencoded

Example query string parameters:

host_key=e111dff66d1fddfda6a888c9992d4366
rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l
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
         "act": "railgun_delete",
         "railgun_id": "1",
     },
     "result": "success"
}
```

</div>
</details>