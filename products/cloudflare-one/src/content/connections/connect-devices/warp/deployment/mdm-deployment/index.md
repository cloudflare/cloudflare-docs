---
order: 1
pcx-content-type: how-to
---

# Managed deployment

Bigger organizations with MDM tools like Intune or JAMF can deploy WARP to their entire fleet of devices from a single operation.

---

## Scripted deployment

The WARP client for Windows allows for an automated install via any management tool that can execute a `.msi` file.

* Example command line to **install** the client:

 ```
 Cloudflare_WARP_Release-x64.msi /quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com"
 ```
 See the [deployment parameters](/connections/connect-devices/warp/deployment/parameters) for a description of each argument.

* Example command line to **uninstall** the client:

 ```
 msiexec /x Cloudflare_WARP_Release-x64.msi /quiet
 ```