---
order: 4
---

# Microsoft Edge

Microsoft Edge Preview (based on Chromium) supports HTTP/3 in the Canary release channel. The experimental Canary channel builds are more regularly updated but may have some stability issues that you should keep in mind when testing. You can install both versions side-by-side; the Canary installer can be found [here](https://www.microsoftedgeinsider.com/en-us/download).

## Running

Edge's HTTP/3 support is not typically enabled by default. Therefore it's best to explicitly enable it by launching with the flags `--enable-quic --quic-version=h3-29`.

### Running on Windows

If installed in the default location, starting Edge Canary with the correct flags is done by running the following commands in a command prompt:

```txt
"C:\Users\$USER\AppData\Local\Microsoft\Edge SxS\Application\msedge.exe" --enable-quic --quic-version=h3-29
```

(Replace $USER with the name of your account on Windows.)

### Running on MacOS X

If installed in the default location, starting Edge Canary with the correct flags is done by running the following command in a terminal:

```txt
/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary --enable-quic --quic-version=h3-29
```
