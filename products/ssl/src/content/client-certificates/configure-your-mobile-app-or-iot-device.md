---
order: 3
---

# Configure your mobile app or IoT device

To configure your Internet-of-things (IoT) device and mobile application to use client certificates with [API Shield™](/firewall/cf-firewall-rules/api-shield), do the following:

* [Create Cloudflare-issued certificates](#create-cloudflare-issued-certificates).
* [Enable mutual Transport Layer Security (mTLS)](#enable-mtls).
* [Configure API Shield](#configure-api-shield-to-require-client-certificates) to require the use of Cloudflare-issued certificates.
* [Embed the certificate in your mobile app](#embed-the-client-certificate-in-your-mobile-app).
* [Embed the certificate on your IoT device](#embed-the-client-certificate-on-your-iot-device).

Consider, for example, a device that captures temperature readings and transmits them by sending a POST request to a Cloudflare-protected API. A mobile application built in Swift for iOS can then retrieve those readings and display them.

To keep this example simple, the API is implemented as a Cloudflare Worker (borrowing code from the [To-Do List tutorial on building a jamstack app](https://developers.cloudflare.com/workers/tutorials/build-a-jamstack-app)).

Temperatures are stored in [Workers KV](https://developers.cloudflare.com/workers/learning/how-kv-works) using the source IP address as a key, but you can easily use a [value from the client certificate](https://developers.cloudflare.com/access/service-auth/mtls-headers/), such as the fingerprint.

The example API code below saves a temperature and timestamp into KV when a POST is made, and returns the most recent 5 temperatures when a GET request is made.

```js
const defaultData = { temperatures: [] }

const getCache = key => TEMPERATURES.get(key)
const setCache = (key, data) => TEMPERATURES.put(key, data)

async function addTemperature(request) {

    // Pull previously recorded temperatures for this client.
    const ip = request.headers.get('CF-Connecting-IP')
    const cacheKey = `data-${ip}`
    let data
    const cache = await getCache(cacheKey)
    if (!cache) {
        await setCache(cacheKey, JSON.stringify(defaultData))
        data = defaultData
    } else {
        data = JSON.parse(cache)
    }

    // Append the recorded temperatures with the submitted reading (assuming it has both temperature and a timestamp).
    try {
        const body = await request.text()
        const val = JSON.parse(body)

        if (val.temperature && val.time) {
            data.temperatures.push(val)
            await setCache(cacheKey, JSON.stringify(data))
            return new Response("", { status: 201 })
        } else {
            return new Response("Unable to parse temperature and/or timestamp from JSON POST body", { status: 400 })
        }
    } catch (err) {
        return new Response(err, { status: 500 })
    }
}

function compareTimestamps(a,b) {
    return -1 * (Date.parse(a.time) - Date.parse(b.time))
}

// Return the 5 most recent temperature measurements.
async function getTemperatures(request) {
    const ip = request.headers.get('CF-Connecting-IP')
    const cacheKey = `data-${ip}`

    const cache = await getCache(cacheKey)
    if (!cache) {
        return new Response(JSON.stringify(defaultData), { status: 200, headers: { 'content-type': 'application/json' } })
    } else {
        data = JSON.parse(cache)
        const retval = JSON.stringify(data.temperatures.sort(compareTimestamps).splice(0,5))
        return new Response(retval, { status: 200, headers: { 'content-type': 'application/json' } })
    }
}

async function handleRequest(request) {

    if (request.method === 'POST') {
        return addTemperature(request)
    } else {
        return getTemperatures(request)
    }

}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

--------

## Validate API

### POST sample data to API

To validate the API before adding mTLS authentication, POST a random temperature reading:

```bash
$ TEMPERATURE=$(echo $((361 + RANDOM %11)) | awk '{printf("%.2f",$1/10.0)}')
$ TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

$ echo -e "$TEMPERATURE\n$TIMESTAMP"
36.70
2020-09-28T02:54:56Z

$ curl -v -H "Content-Type: application/json" -d '{"temperature":'''$TEMPERATURE''', "time": "'''$TIMESTAMP'''"}' https://shield.upinatoms.com/temps 2>&1 | grep "< HTTP/2"
< HTTP/2 201

```

### GET sample data from API

A GET request to the `temps` endpoint returns the most recent readings, including the one submitted in the example above:

```json
$ curl -s https://shield.upinatoms.com/temps | jq .
[
  {
    "temperature": 36.3,
    "time": "2020-09-28T02:57:49Z"
  },
  {
    "temperature": 36.7,
    "time": "2020-09-28T02:54:56Z"
  },
  {
    "temperature": 36.2,
    "time": "2020-09-28T02:33:08Z"
  }
]
```

--------

## Create Cloudflare-issued certificates

Before you can use API Shield to protect your API or web application, you must create Cloudflare-issued client certificates.

You can [create a client certificate in the Cloudflare dashboard](/client-certificates/create-client-certificate).

However, since most developers working at scale generate their own private keys and certificate signing requests via API, this example uses the Cloudflare API to create client certificates.

<Aside>

You can only use API Shield with a certificate authority (CA) that is fully managed by Cloudflare. Cloudflare generates a unique CA for each zone.

If you need to use a different CA, contact a Cloudflare customer success manager.

</Aside>

To create a bootstrap certificate for the iOS application and the IoT device, this example uses [Cloudflare’s public key infrastructure toolkit, CFSSL](https://github.com/cloudflare/cfssl):

```bash
# Generate a private key and CSR for the iOS device.

$ cat <<'EOF' | tee -a csr.json
{
    "hosts": [
        "ios-bootstrap.devices.upinatoms.com"
    ],
    "CN": "ios-bootstrap.devices.upinatoms.com",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [{
        "C": "US",
        "L": "Austin",
        "O": "Temperature Testers, Inc.",
        "OU": "Tech Operations",
        "ST": "Texas"
    }]
}
EOF

$ cfssl genkey csr.json | cfssljson -bare certificate
2020/09/27 21:28:46 [INFO] generate received request
2020/09/27 21:28:46 [INFO] received CSR
2020/09/27 21:28:46 [INFO] generating key: rsa-2048
2020/09/27 21:28:47 [INFO] encoded CSR

$ mv certificate-key.pem ios-key.pem
$ mv certificate.csr ios.csr

# Do the same for the IoT sensor.

$ sed -i.bak 's/ios-bootstrap/sensor-001/g' csr.json
$ cfssl genkey csr.json | cfssljson -bare certificate
...
$ mv certificate-key.pem sensor-key.pem
$ mv certificate.csr sensor.csr

// now ask that these CSRs be signed by the private CA issued for your zone
// we need to replace actual newlines in the CSR with ‘\n’ before POST’ing
$ CSR=$(cat ios.csr | perl -pe 's/\n/\\n/g')
$ request_body=$(< <(cat <<EOF
{
  "validity_days": 3650,
  "csr":"$CSR"
}
EOF
))

// save the response so we can view it and then extra the certificate
$ curl -H 'X-Auth-Email: YOUR_EMAIL' -H 'X-Auth-Key: YOUR_API_KEY' -H 'Content-Type: application/json' -d “$request_body” https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/client_certificates > response.json

$ cat response.json | jq .
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "7bf7f70c-7600-42e1-81c4-e4c0da9aa515",
    "certificate_authority": {
      "id": "8f5606d9-5133-4e53-b062-a2e5da51be5e",
      "name": "Cloudflare Managed CA for account 11cbe197c050c9e422aaa103cfe30ed8"
    },
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIEkzCCA...\n-----END CERTIFICATE-----\n",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIIDITCCA...\n-----END CERTIFICATE REQUEST-----\n",
    "ski": "eb2a48a19802a705c0e8a39489a71bd586638fdf",
    "serial_number": "133270673305904147240315902291726509220894288063",
    "signature": "SHA256WithRSA",
    "common_name": "ios-bootstrap.devices.upinatoms.com",
    "organization": "Temperature Testers, Inc.",
    "organizational_unit": "Tech Operations",
    "country": "US",
    "state": "Texas",
    "location": "Austin",
    "expires_on": "2030-09-26T02:41:00Z",
    "issued_on": "2020-09-28T02:41:00Z",
    "fingerprint_sha256": "84b045d498f53a59bef53358441a3957de81261211fc9b6d46b0bf5880bdaf25",
    "validity_days": 3650
  }
}

$ cat response.json | jq .result.certificate | perl -npe 's/\\n/\n/g; s/"//g' > ios.pem

# Now ask that the second client certificate signing request be signed.

$ CSR=$(cat sensor.csr | perl -pe 's/\n/\\n/g')
$ request_body=$(< <(cat <<EOF
{
  "validity_days": 3650,
  "csr":"$CSR"
}
EOF
))

$ curl -H 'X-Auth-Email: YOUR_EMAIL' -H 'X-Auth-Key: YOUR_API_KEY' -H 'Content-Type: application/json' -d "$request_body" https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/client_certificates | perl -npe 's/\\n/\n/g; s/"//g' > sensor.pem

```

--------

## Enable mTLS

Having created Cloudflare-issued certificates, the next step is to enable mTLS for the hosts you want to protect with API Shield.

For instructions, see [_Enable mutual Transport Layer Security_](/client-certificates/enable-mtls).

--------

## Configure API Shield to require client certificates

To configure API Shield to require client certificates, [create an API Shield rule](/firewall/cf-dashboard/create-api-shield-rule):

![create api shield clip](../static/create-api-shield-clip-1.gif)

--------

## Embed the client certificate in your mobile app

To configure the mobile app to securely request temperature data submitted by the IoT device, embed the client certificate in the mobile app.

For simplicity, this example embeds a “bootstrap” certificate and key in the application bundle as a PKCS#12-formatted file.

In a real-world deployment, a bootstrap certificate should only be used in conjunction with users’ credentials to authenticate with an API endpoint that can return a unique user certificate. Corporate users will want to use mobile device management (MDM) to distribute certificates.

```bash
$ openssl pkcs12 -export -out bootstrap-cert.pfx -inkey ios-key.pem -in ios.pem
Enter Export Password:
Verifying - Enter Export Password:
```

--------

## Embed the client certificate on your IoT device

To prepare the IoT device for secure communication with the API endpoint, embed the certificate on the device and configure the device to use the certificate when making POST requests.

This example assumes the certificate and the private key are securely copied to `/etc/ssl/private/sensor-key.pem` and `/etc/ssl/certs/sensor.pem`.

The sample script is modified to point to these files:

```python
import requests
import json
from datetime import datetime

def readSensor():

    # Takes a reading from a temperature sensor and store it to temp_measurement 

    dateTimeObj = datetime.now()
    timestampStr = dateTimeObj.strftime(‘%Y-%m-%dT%H:%M:%SZ’)

    measurement = {'temperature':str(temp_measurement),'time':timestampStr}
    return measurement

def main():

    print("Cloudflare API Shield [IoT device demonstration]")

    temperature = readSensor()
    payload = json.dumps(temperature)
    
    url = 'https://shield.upinatoms.com/temps'
    json_headers = {'Content-Type': 'application/json'}
    cert_file = ('/etc/ssl/certs/sensor.pem', '/etc/ssl/private/sensor-key.pem')
    
    r = requests.post(url, headers = json_headers, data = payload, cert = cert_file)
    
    print("Request body: ", r.request.body)
    print("Response status code: %d" % r.status_code)
```

When the script attempts to connect to `https://shield.upinatoms.com/temps`, Cloudflare requests that a client certificate is sent, and the script sends the contents of `$CERT_FILE` and then, as required to complete the SSL/TLS handshake, demonstrates it has possession of `$KEY_FILE`.

Without the client certificate, the Cloudflare rejects the request:

```bash
Cloudflare API Shield [IoT device demonstration]
Request body:  {"temperature": "36.5", "time": "2020-09-28T15:52:19Z"}
Response status code: 403
```

When the IoT device presents a valid client certificate, the POST request succeeds and the temperature reading is recorded:

```bash
Cloudflare API Shield [IoT device demonstration]
Request body:  {"temperature": "36.5", "time": "2020-09-28T15:56:45Z"}
Response status code: 201
```
