---
order: 4
---

# Microsoft Edge

Microsoft Edge Preview (based on Chromium) has begun supporting HTTP/3 in Canary Channel builds. Canary Channel is an official experimental channel that provides binaries to allow you to test new features such as HTTP/3. Canary Channel builds may have some stability issues that you should keep in mind when testing.

HTTP/3 is not enabled by default. Edge Canary must be launched with the `--enable-quic --quic-version=h3-27` flags to work.

## Installation

Only Edge Canary currently support HTTP/3. To install the latest, [download](https://www.microsoftedgeinsider.com/en-us/download) the installer and run it.

## Running on Windows

If installed in the default location, starting Edge Canary with the correct flags is done by running the following commands in a command prompt:

```txt
"C:\Users\$USER\AppData\Local\Microsoft\Edge SxS\Application\msedge.exe" --enable-quic --quic-version=h3-27
```

(Replace $USER with the name of your account on Windows.)

## Running on MacOS X

If installed in the default location, starting Edge Canary with the correct flags is done by running the following command in a terminal:

```txt
/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary --enable-quic --quic-version=h3-27
```
