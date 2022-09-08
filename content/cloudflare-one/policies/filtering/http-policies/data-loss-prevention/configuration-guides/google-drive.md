---
pcx_content_type: how-to
title: Google Drive
weight: 1
layout: single
---

# DLP for Google Drive

Cloudflare Data Loss Prevention can inspect upload and download traffic to and from Google Drive.

## Configuring for compatibility

### Browsers

DLP for Google Drive is compatible with all popular browsers.

To inspect Google Drive traffic in Chrome, you will need to [disable QUIC in Chrome](/cloudflare-one/policies/filtering/http-policies/incompatible-traffic/#disable-quic-in-google-chrome).

### Desktop app

To use Cloudflare DLP with the Google Drive desktop app, you will need to [configure Google Drive for desktop](https://support.google.com/a/answer/7644837) to trust the Cloudflare root certificate.  This can be done with a device manager.

### Mobile apps

You can perform DLP scanning on the Google Drive mobile app for iOS.

Android is not supported because the app uses [certificate pinning](/cloudflare-one/glossary/#certificate-pinning). We recommend creating a [Do Not Inspect policy](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) so that the Google Drive app can continue to function on Android. To exempt the Google Drive Android app from Gateway inspection:

1. Set up an [OS version device posture check](/cloudflare-one/identity/devices/warp-client-checks/os-version/) that checks for the Android operating system.

2. Create the following HTTP policy in Gateway:
    | Selector | Operator | Value |
    | - | - | - | - |
    | Passed Device Posture Checks | in | `OS Version Android` |
    | Application  | in | `Google Drive (Do Not Inspect)` |

Android users can now use the Google Drive app, but the app traffic will bypass DLP inspection.

## Supported file types

DLP for Google Drive supports the same file types as all other DLP scans. Supported formats include:

- Office documents (DOCX and XLSX)
- ZIP file containing plain text
- ZIP file containing office documents

### Limitations

Google Drive breaks large upload and download requests into multiple requests of size ≤ 280 MB. If your file is being transmitted as a ZIP and is broken into multiple requests, DLP cannot scan the internal files.
