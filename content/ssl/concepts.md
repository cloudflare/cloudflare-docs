---
pcx_content_type: concept
title: Concepts
weight: 2
meta: 
    title: SSL concepts 
---

# Concepts

This page defines and articulates key concepts that are relevant to Cloudflare SSL/TLS and are used in this documentation. For more concepts and broader descriptions, check out the [Cloudflare Learning Center](https://www.cloudflare.com/learning/ssl/what-is-ssl/).

## SSL/TLS certificate



## Edge certificate

Keeping in mind that [Cloudflare's global network](https://www.cloudflare.com/network/) is at the core of several products and services that Cloudflare offers, what this implies in terms of SSL is that, "in every request", there are"can be" actually two SSL certificates involved: an edge certificate and an origin certificate.

The [edge certificates](/ssl/edge-certificates/) are the ones that Cloudflare presents to your visitors and that you manage through the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates).

## Origin certificate

[Origin certificates](/ssl/origin-configuration) are complementary to edge certificates in the sense that they guarantee the security and authentication "on the other side of the network", between Cloudflare and the origin server of your website or application.

[SSL/TLS encryption modes](/ssl/origin-configuration/ssl-modes/) control how Cloudflare will work with both these ceritifcates and you can choose between different modes on the [SSL/TLS overview page](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls).

## Validity period

One common aspect of every SSL certificate is that they must have a fixed expiration date. If a certificate is expired, clients - such as your visitor's browser - will consider that a secure connection cannot be established, resulting in warnings or errors.

Different [certificate authorities (CAs)](#certificate-authority) support different validity periods and Cloudlfare works with them to guarantee that both [Universal](/ssl/edge-certificates/universal-ssl/) and [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) edge certificates are always renewed.

## Certificate authority (CA)

A [certificate authority (CA)](/ssl/reference/certificate-authorities/) is a trusted third party that generates and gives out SSL certificates. The CA digitally signs the certificates with their own private key, allowing client devices - such as your visitor's browser - to verify that the certificate is trustworthy.

This means that, besides not being expired, an SSL certificate should be issued by a certificate authority (CA) in order to avoid warnings or errors.

## Validation level

SSL certificates also vary in terms of the level to which a CA has validated them. As explained in the article about [types of certificates](https://www.cloudflare.com/learning/ssl/types-of-ssl-certificates/), SSL certificates can be DV (Domain Validated), OV (Organization Validated) or EV (Extended Validation).

Whereas certificates issued by Cloudflare - [Universal](/ssl/edge-certificates/universal-ssl/), [Advanced](/ssl/edge-certificates/advanced-certificate-manager/), and [Custom Hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) - are Domain Validated (DV) certificates, you can [upload a custom certificate](/ssl/edge-certificates/custom-certificates/) if your organization needs OV or EV.

## Origin pull

## Cipher suites

## Backup certificate

## Trust store
