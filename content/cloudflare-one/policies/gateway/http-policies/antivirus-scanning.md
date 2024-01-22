---
pcx_content_type: concept
title: AV scanning
weight: 8
---

# AV scanning

Cloudflare Gateway protects users as they browse the Internet. When users download or upload a file to an origin on the Internet, that file could potentially contain malicious code that may cause their device to perform undesired behavior.

To prevent this, Cloudflare Gateway allows admins to enable **Anti-Virus (AV) scanning** of files that are uploaded or downloaded by users as the file passes through Gateway.

AV scanning of files requires organizations to go to **Settings** > **Network** > **Firewall** and enable **AV inspection**.

## Enable AV scanning

To enable AV scanning:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. In **Firewall**, enable **AV inspection**.
3. Choose whether to scan files for malicious payloads during uploads, downloads, or both. You can also block requests containing [non-scannable files](#non-scannable-files).

When a request is blocked due to the presence of malware, Gateway will log the match as a Block decision in your [HTTP logs](/cloudflare-one/insights/logs/gateway-logs/#http-logs).

## How Gateway determines if a file should be scanned

If AV scanning is enabled, Gateway will use the following to determine whether a file is present in a request or response, and whether to scan that file (first match will result in the file being scanned):

- If the Content-Disposition HTTP header is `Attachment`

- If the byte signature of the body of the request matches a signature we identify as one of the following file type categories:

  - **Executable** (e.g., `.exe`, `.bat`, `.dll`, `.wasm`)
  - **Documents** (e.g., `.doc`, `.docx`, `.pdf`, `.ppt`, `.xls`)
  - **Compressed** (e.g., `.7z`, `.gz`, `.zip`, `.rar`)

- If the file name in the Content-Disposition header contains a file extension that indicates it is one of the file type categories above

If none of the above conditions trigger a file to be scanned, Gateway will use the origin's Content-Type header to determine whether or not to scan the file. Additionally, Gateway will not scan files it determines to be in the Image, Video, or Audio file type categories.

If a file does not trigger a scan based on the three methods above but also does not match criteria to be exempted from scanning, Gateway will default to scanning the file for malware.

## Non-scannable files

Not all files are able to be scanned. For example, this is the case for password protected files that cannot be opened due to encryption. Admins can choose whether to **fail open** (allow the file to pass through unscanned) or to **fail closed** (deny the file transfer).

The following files cannot be scanned and will be blocked or allowed based on whether the admin configured Gateway to fail open or closed:

- Files larger than 15MB cannot be scanned.
- Password protected archives
- Archives with more than 3 recursion levels
- Archives with more than 300 files
- PGP encrypted files

## Opt content out from scanning

When an admin enables AV scanning for uploads and/or downloads, Gateway will scan every supported file. Admins can selectively choose to disable scanning by leveraging the HTTP rules. All [HTTP selectors](/cloudflare-one/policies/gateway/http-policies/#selectors) can be used to opt HTTP traffic out from AV scanning using the Do Not Scan action. For example, to prevent AV scanning of files uploaded to or downloaded from `example.com`, an admin would configure the following rule:

| Selector | Operator      | Value         | Action      |
| -------- | ------------- | ------------- | ----------- |
| Hostname | matches regex | `example.com` | Do Not Scan |

Opting out of AV scanning applies to both uploads and downloads of files (i.e., it matches the global AV scanning setting). If an admin has chosen, for example, to only globally scan uploads, then opting out of AV scanning only applies to uploads.

When traffic matches a Do Not Scan rule, nothing is scanned, regardless of file size or whether the file type is supported or not.

## Supported compressed file types

In addition to standard object files like PDFs, Zero Trust supports AV scanning for the following archive types:

- ZIP
- GZIP compressed files
- TAR
- RAR
- 7-Zip
- LZH/LHA
- ISO 9660
- ACE
- BZ2
- ARJ
- ZOO
- XZ file format
- BINHEX (Mac)
- NSIS Nullsoft Installer
- MIME base64
- Microsoft CAB
- Smart Install Maker
- CPIO SVR4
- RPM
- CHM Help Files
- AutoIt
- Inno Setup
- eXtensible ARchive format (XAR)
- Windows Imaging File (WIM)
- Self-extracting ZIP
- Self-extracting RAR
- Self-extracting ARJ
- Self-extracting LZH/LHA
- Microsoft TNEF
- MSCOMPRESS
- Self-extracting CA
- ACE SFX
- 7-Zip SFX
- AutoHotkey
- SAPCar
- Indigo Rose Setup Factory
- XE compressed files (UUE and XXE)
- PGP signed message, document, etc.
- Java ARchive
- MacBinary
- BASE64
- Office Legacy XML
- Chrome Extension (CRX) Package Format
