---
order: 2
---

# Google Chrome

Google has begun supporting HTTP/3 in nightly builds. Chrome Canary is an official experimental channel that provides binaries to allow you to test new features such as HTTP/3. Nightly builds may have some stability issues that you should keep in mind when testing.

HTTP/3 is not enabled by default. Chrome must be launched with the `--enable-quic --quic-version=h3-27` flags to work.

## Installation

Only Chrome canaries currently support HTTP/3. To install the latest, [download](https://www.google.com/chrome/canary/) the installer and run it.

## Running on Windows

If installed in the default location, starting Chrome with the correct flags is done by running the following commands in a command prompt:

```txt
cd C:\Users\$USER\AppData\Local\Google\Chrome SxS\Application
chrome.exe --enable-quic --quic-version=h3-27
```

(Replace $USER with the name of your account on Windows.)

## Running on MacOS X

If installed in the default location, starting Chrome with the correct flags is done by running the following command in a terminal:

```txt
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-quic --quic-version=h3-27
```
