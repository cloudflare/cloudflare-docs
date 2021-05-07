---
order: 2
---

# Google Chrome

Google supports HTTP/3 in Stable and Chrome Canary release channels. Canary channel builds are more regularly updated but may have some stability issues that you should keep in mind when testing. You can install both versions side-by-side; the Canary installer can be found [here](https://www.google.com/chrome/canary/).

HTTP/3 is not enabled by default. Chrome must be launched with the `--enable-quic --quic-version=h3-29` flags to work.

## Running

Chrome's HTTP/3 support is not typically enabled by default. Therefore it's best to explicitly enable it by launching with the flags `--enable-quic --quic-version=h3-29`.

### Running on Windows

If installed in the default location, starting Chrome with the correct flags is done by running the following commands in a command prompt:

```txt
cd C:\Users\$USER\AppData\Local\Google\Chrome SxS\Application
chrome.exe --enable-quic --quic-version=h3-29
```

(Replace $USER with the name of your account on Windows.)

### Running on MacOS X

If installed in the default location, starting Chrome with the correct flags is done by running the following command in a terminal:

```txt
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-quic --quic-version=h3-29
```
