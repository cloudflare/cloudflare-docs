---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360050483011-%E4%BA%86%E8%A7%A3-Cloudflare-gRPC-%E6%94%AF%E6%8C%81
title: 了解 Cloudflare gRPC 支持
---

# 了解 Cloudflare gRPC 支持

## 了解 Cloudflare gRPC 支持

_了解 Cloudflare gRPC 支持如何保护您的 API 流量。_

___

## 概述

gRPC 协议是 Google 于 2015 年开发的，目的是使用较小的有效负载构建高效的 API，以减少带宽使用量，降低延迟并加快实施速度。Cloudflare 为 gRPC 提供支持，以保护您在任何橙色云 gRPC 端点上的 API。

在 Cloudflare 上运行 gRPC 流量与大多数 Cloudflare 产品支持，如 WAF、Bot Management 和 Page Rules。所有 Cloudflare 计划均提供 gRPC 支持，无额外费用。但是，在 Argo Smart Routing、WAF 和 Bot Management 之类的附加服务产品上，gRPC 流量可能会产生费用。gRPC 支持已经过广泛测试，并已认定为稳定，但仍然可能存在错误。意外行为可报告给 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)。

___

## 要求

-   您的 gRPC 端点必须侦听端口 443。
-   您的 gRPC 端点必须支持 TLS 和 HTTP/2。
-   HTTP/2 必须通过 ALPN 播发。
-   将 _application/grpc_ 或 _application/grpc+<message type_（例如 _application/grpc+proto_）用于 gRPC 请求的 **Content-Type** 标头。

___

## 局限性

以下产品对 gRPC 请求的功能有限：

-   **Argo Tunnel** 目前不支持 gRPC。
-   **Cloudflare Access** 不支持通过 Cloudflare 的反向代理发送的 gRPC 流量。如果在 Cloudflare 中启用了 gRPC，则 Access 将忽略 gRPC 流量。建议对 Access 所保护的任何敏感源站服务器禁用 gRPC，或启用其他方法来验证与源站服务器之间的 gRPC 通信。

___

按照以下说明来启用 gRPC：

1.  登录您的 Cloudflare 帐户。
2.  选择适当的域。
3.  单击 **Network** 应用。
4.  打开 **gRPC** 开关。
