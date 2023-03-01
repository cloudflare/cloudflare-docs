---
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115000224192-Argo%E3%81%AE%E8%AB%8B%E6%B1%82
title: Argoの請求
---

# Argoの請求

## Argoの請求

_Argoの課金方法を説明します。_

___

## 概要

Argoは、ドメインの読み込み速度を向上させるために、Webトラフィックの経路決定を分析して最適化します。

Argoでは各ドメインが課金されるため、CloudflareとArgoを使用する各ドメインの訪問者との間で転送されたデータの量（アップロードとダウンロードの両方の帯域幅）に対して請求されます。


___

Argoの請求金額には、キャッシュヒットおよびCloudflareネットワーク間のリクエスト／レスポンスについての請求が含まれます。

CloudflareダッシュボードでArgoを有効にするとUSD $5.00の月額料金が発生します。Cloudflareと訪問者の間で最初の1 GBのトラフィックを転送した後については、1 GBあたりUSD $0.10が追加で請求されます。

ダッシュボードの**Traffic**アプリを介してArgoのオン・オフを切り替えても複数の料金は発生しません。

ただし、 **「請求（Billing）」** タブの _「サブスクリプション（Subscriptions）」_タブでArgoのサブスクリプションをキャンセルしてから再度有効にすると、複数回請求されます。

以下は予想されるトラフィック量に基づいて試算した料金を示したものです。

<table><tbody><tr><td><p><strong>予想されるトラフィック</strong></p></td><td><p><strong>予想金額（ドメインあたり）</strong></p></td></tr><tr><td><p>&lt; 1 GB</p></td><td><p>$5</p></td></tr><tr><td><p>10 GB</p></td><td><p>$5.90</p></td></tr><tr><td><p>100 GB</p></td><td><p>$14.90</p></td></tr><tr><td><p>1 TB（1000 GB）</p></td><td><p>$104.90</p></td></tr><tr><td><p>10 Tb</p></td><td><p>$1,004.90</p></td></tr></tbody></table>
