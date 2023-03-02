---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4406889048077-FAQs-for-Cryptographic-Attestation-of-Personhood
title: FAQs for Cryptographic Attestation of Personhood
---

# FAQs for Cryptographic Attestation of Personhood



## Overview

Cloudflare recently released an [alternative](https://blog.cloudflare.com/introducing-cryptographic-attestation-of-personhood/) to CAPTCHA authentication, the Cryptographic Attestation of Personhood (CAP).

CAP lets you prove that you are a legitimate website visitor by touching a hardware key, instead of solving a CAPTCHA puzzle.

This article provides answers to common questions about usability and privacy concerns.

You can also test out CAP by going to the [demo site](https://cloudflarechallenge.com/).

___

## Privacy questions

The answer to most privacy concerns are summarized in this table:

| Property | Cloudflare could | Cloudflare does |
| --- | --- | --- |
| Collect biometrics (fingerprints or face pictures) | No | N/A |
| Collect information about your hardware authenticator | Yes, limited to the number of keys in your batch | Yes, when available |

No, Cloudflare cannot collect biometrics. Our CAP process uses the WebAuthn API, which prevents the collection of [biometrics by default](https://www.w3.org/TR/webauthn-2/#sctn-biometric-privacy). When your device asks for a biometric authentication — such as via a fingerprint sensor — it all happens locally. 

As such, we never see your biometric data: that remains on your device. Once your device confirms a match, it sends only a basic attestation message. In effect, your device sends a message proving “yes, someone correctly entered a fingerprint on this trustworthy device” and never sends the fingerprint itself.

Yes, Cloudflare does collect a limited amount of data about your key. We store the manufacturer of your key and batch identifier ([minimum of 100,000](https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-uaf-protocol-v1.1-ps-20170202.html#full-basic-attestation) keys per batch) for verification purposes. From our perspective, your key looks like all other keys in the batch.

Some self-signed keys and keys from certain manufacturers have been found to [not meet this requirement](https://www.chromium.org/security-keys) and should be avoided if you are minimizing your online privacy risk.

___

For more details on how we set up Cryptographic Attestation of Personhood, refer to the [introductory blog post](https://blog.cloudflare.com/introducing-cryptographic-attestation-of-personhood/).

___

## What devices are and are not allowed?

### Allowed devices

CAP supports a wide variety of hardware authenticators:

-   **Roaming (cross-platform) authenticators**:
    -   _Supported_: All security keys found in the [FIDO Metadata Service 3.0](https://fidoalliance.org/metadata/), unless they have been revoked for security reasons.
    -   _Examples_: YubiKeys, HyperFIDO keys, Thetis FIDO U2F keys
-   **Platform authenticators:**
    -   _Examples_: Apple Touch ID and Face ID on iOS mobile devices and MacOS laptops; Android mobile devices with fingerprint readers; Windows Hello

### Known limitations

Most combinations of of web browsers and WebAuthn-capable authenticators will work, but there are some known compatibility issues with WebAuthn attestation that may prevent CAP from working successfully:

-   **Basic CAP**:
    -   _MacOS desktop_: For TouchID, browser must be Safari
    -   _Android_: Browser must be Chrome
-   **CAP with Zero-Knowledge Proof**:
    -   _Apple platform authenticators_ (e.g., iPhone with Touch ID/Face ID) are incompatible with the [zero-knowledge proof system](https://blog.cloudflare.com/introducing-zero-knowledge-proofs-for-private-web-attestation-with-cross-multi-vendor-hardware/). If this fails, you will immediately be redirected to basic CAP route without having to take any further action. Since Apple uses a privacy-preserving [Apple Anonymous Attestation](https://www.w3.org/TR/webauthn/#sctn-apple-anonymous-attestation) to show that an authenticator is valid while blocking tracking, this method maintains a high standard of privacy.

We are updating this list as the ecosystem evolves and as we continue to test different combinations.

___

## Can hackers bypass the Cryptographic Attestation of Personhood?

CAP is one of many techniques to identify and block bots. To date, we have seen some attempts to test CAP’s security system, such as [one thoughtfully-executed, well-documented test](https://betterappsec.com/building-a-webauthn-click-farm-are-captchas-obsolete-bfab07bb798c). The blog post discussing the test specifically calls out that this method does not break the Cloudflare threat model.

This does not mean that CAP is broken, but rather shows that it raises the cost of an attack over the current CAPTCHA model.

___

## What happens if I lose my key?

If you do not have the necessary hardware (such as a Yubikey), you can still solve a regular CAPTCHA challenge (e.g., selecting pictures).

___

## What are the common error codes and what do they mean?

-   **Unsupported\_att\_fmt**:
    -   _Cause_: Your authenticator is using an unsupported attestation format (combination of browser and key). Also occurs when you use _Firefox_ and select the option to "anonymise your key".
    -   _Solution:_ If this error occurs during [zero-knowledge version of CAP](https://blog.cloudflare.com/introducing-zero-knowledge-proofs-for-private-web-attestation-with-cross-multi-vendor-hardware/), you will automatically be redirected to the basic CAP flow. If basic CAP fails, try a different combination of supported hardware device and browser or opt for a CAPTCHA.
-   **Unsupported\_issuer**:
    -   _Cause_: Your key is currently not supported.
    -   _Solution_: Use a [supported key](https://support.cloudflare.com/hc/articles/4406889048077#allowed-devices).

___

## Related resources

-   [https://cloudflarechallenge.com](https://cloudflarechallenge.com/) (demo site)
-   [Introducing Cryptographic Attestation of Personhood](https://blog.cloudflare.com/introducing-cryptographic-attestation-of-personhood/) (blog)
-   [Expanding Crypotgraphic Attestation of Personhood](https://blog.cloudflare.com/cap-expands-support/) (blog)
-   [Introducing Zero-Knowledge Proofs](https://blog.cloudflare.com/introducing-zero-knowledge-proofs-for-private-web-attestation-with-cross-multi-vendor-hardware/) (blog)
