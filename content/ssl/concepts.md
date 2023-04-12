---
pcx_content_type: concept
title: Concepts
weight: 2
meta: 
    title: SSL concepts 
---

# Concepts

This page defines and articulates key concepts that are relevant to Cloudflare SSL/TLS and are used in this documentation. For more concepts and broader descriptions, check out the [Cloudflare Learning Center](https://www.cloudflare.com/learning/ssl/what-is-ssl/).

## Edge certificate

Keeping in mind that [Cloudflare's global network](https://www.cloudflare.com/network/) is at the core of several products and services that Cloudflare offers, what this implies in terms of SSL is that, "in every request", there are"can be" actually two SSL certificates involved: an edge certificate and an origin certificate.

The [edge certificates](/ssl/edge-certificates/) are the ones that Cloudflare presents to your visitors and that you manage through the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates).

## Origin certificate

[Origin certificates](/ssl/origin-configuration) are complementary to edge certificates in the sense that they guarantee the security and authentication "on the other side of the network", between Cloudflare and the origin server of your website or application.

The [SSL/TLS encryption modes](/ssl/origin-configuration/ssl-modes/) control how Cloudflare will work with both these ceritifcates. You can choose between different modes on the [SSL/TLS overview page](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls).

## Validity period

## Validation method

## Certificate authority

## Origin pull

## Cipher suites

## Backup certificate

## Trust store
