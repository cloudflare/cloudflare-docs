---
updated: 2023-05-23
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Connect FastAPI with Cloudflare Zero Trust
---

# Connect FastAPI with Cloudflare Zero Trust

This tutorial covers how to connect Cloudflare and Fast API. A requirement is that you have FastAPI installed.

**Time to complete:** 15 minutes

## 1. Create a validator

1. Create a new file in your Fast API to validate the request, with the following code:
```python
from fastapi import Request, HTTPException

# Your policies audience tag
POLICY_AUD = "XXXXX"

# Your CF Access team domain
TEAM_DOMAIN = "https://XXXXX.cloudflareaccess.com"
CERTS_URL = "{}/cdn-cgi/access/certs".format(TEAM_DOMAIN)

async def validate_cloudflare(request: Request):
    """
    Validate the request is authenticated by Cloudflare Access.
    """
    if verify_token(request) != True:
        raise HTTPException(status_code=400, detail="Not authenticated properly!")


def _get_public_keys():
    """
    Returns:
        List of RSA public keys usable by PyJWT.
    """
    r = requests.get(CERTS_URL)
    public_keys = []
    jwk_set = r.json()
    for key_dict in jwk_set["keys"]:
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key_dict))
        public_keys.append(public_key)
    return public_keys


def verify_token(request):
    """
    Verify the token in the request.
    """
    token = ""

    if "CF_Authorization" in request.cookies:
        token = request.cookies["CF_Authorization"]
    else:
        raise HTTPException(status_code=400, detail="missing required cf authorization token"!")

    keys = _get_public_keys()

    # Loop through the keys since we can't pass the key set to the decoder
    valid_token = False
    for key in keys:
        try:
            # decode returns the claims that has the email when needed
            jwt.decode(token, key=key, audience=POLICY_AUD, algorithms=["RS256"])
            valid_token = True
            break
        except:
            return responses.return_403("Error decoding token")
    if not valid_token:
        return responses.return_403("Invalid token")

    return True

```

## 2. Use the Fast API depedancy to validate the JWT
```python
router.include_router(
    portal.router,
    prefix="/",
    dependencies=[Depends(cloudflare.validate_cloudflare)]
)
```

In your router, you can see import the functions you have created called `validate_cloudflare` and use it as a dependency in FastAPI. An example can be found on the official  [website of FastAPI](https://fastapi.tiangolo.com/tutorial/bigger-applications/#another-module-with-apirouter). 
