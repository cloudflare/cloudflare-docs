---
order: 100
hidden: true
---

# Downloads

--------------------------------

## Linux

Downloads are available for amd64, x86 and ARMv6 in several forms:

* Standalone binary
* .deb package for Debian and derivatives (Ubuntu etc.)
* .rpm package for CentOS, RHEL 7, etc.

Type   | amd64 / x86-64 | x86 (32-bit) | ARMv6 | ARM64 |
-------|----------------|--------------|------|------|
Binary | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.tgz) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-386.tgz) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.tgz) | [Download](https://github.com/cloudflare/cloudflared/releases/download/2020.8.2/cloudflared-linux-arm64) |
.deb   | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.deb) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-386.deb) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.deb) | - |
.rpm   | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.rpm) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-386.rpm) | [Download](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.rpm) | - |

You can also download packages from [Cloudflare's package repository](https://pkg.cloudflare.com).

--------------------------------

## macOS

Argo Tunnel can also be installed via [Homebrew](https://brew.sh):

```sh
$ brew install cloudflare/cloudflare/cloudflared
```

Install via Terminal:

```sh
$ curl https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-darwin-amd64.tgz | tar xzC /usr/local/bin
```

--------------------------------

## Windows

Downloads are available in ZIP format for [32-bit](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-windows-386.zip) and [64-bit](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-windows-amd64.zip) versions.

Go to Downloads folder, right-click on the zip folder and select "Extract All" to extract the executable.
Open Powershell and navigate to the Downloads folder

```bash
PS C:\Users\Administrator> cd .\Downloads\
PS C:\Users\Administrator\Downloads> ls


    Directory: C:\Users\Administrator\Downloads


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----         4/2/2018  10:57 PM                cloudflared-stable-windows-amd64
-a----         4/2/2018  10:54 PM        7021519 cloudflared-stable-windows-amd64.zip

PS C:\Users\Administrator\Downloads> cd .\cloudflared-stable-windows-amd64\
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> ls


    Directory: C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
------         4/2/2018   7:04 PM       25781248 cloudflared.exe
```

Run the `cloudflared.exe` executable to ensure that it works properly on your computer:

```bash
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
cloudflared version 2018.4.8 (built 2018-04-26-1817 UTC)
```

To spin up a tunnel, you will first need to log in with your Cloudflare account. Run `.\cloudflared.exe login` to spawn the login page in your web browser:

```bash
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe login
A browser window should have opened at the following URL:

https://www.cloudflare.com/a/warp?callback=https%3A%2F%2Flogin.cloudflarewarp.com%2FP3P3TOWUADVHF6AH43ISGRWZOL257VNO5GLJTPBNCR5JDOMVLN2OTXON2ASJ6J4B

If the browser failed to open, open it yourself and visit the URL above.
```

If the browser fails to open, right-click the login URL and navigate to it in the browser.

--------------------------------

## New releases

Cloudflare frequently updates `cloudflared` with new features and
bug fixes. All releases and release notes are in the GitHub repository for the project.

Check out the latest releases [here](https://github.com/cloudflare/cloudflared/releases).
