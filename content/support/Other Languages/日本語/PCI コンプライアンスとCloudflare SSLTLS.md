---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/205043158-PCI-%E3%82%B3%E3%83%B3%E3%83%97%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%82%B9%E3%81%A8Cloudflare-SSL-TLS
title: PCI コンプライアンスとCloudflare SSLTLS
---

# PCI コンプライアンスとCloudflare SSL/TLS

## PCI コンプライアンスとCloudflare SSL/TLS

_PCIスキャン要件を満たすようにCloudflareを設定する方法と、CloudflareがTLS/SSLの初期バージョンに対してどのような軽減策を実施するかを説明します。_

___

## 概要

TLS 1.0もTLS 1.1も既知の脆弱性のため、情報保護には不十分です。Cloudflareのお客様の場合、PCIの主たる影響を受けるのは、トラフィックが関連する支払いカードを保証するのに、TLS 1.0とTLS 1.1では不十分だということです。

PCI標準では、TLS 1.2以降の使用を推奨しています。

TLS 1.0とTLS 1.1の[脆弱性に対してCloudflareが実装する軽減策](https://support.cloudflare.com/hc/en-us/articles/205043158#h_1TWWDdoBc31LFYj9kVNwlu)がどのようなものかについてもご確認ください。

___

## TLSの最小バージョンを1.2に設定する

TLS 1.2以降を使用する接続のみを許可するためにCloudflareドメインを設定するには：

1\. Cloudflareダッシュボードにログインします。

2\. 該当するCloudflareアカウントとアプリケーションをクリックします。

4\. **SSL/TLS** \> **エッジ証明書**の順に移動します。

5\. **TLSの最小バージョン**は、**TLS 1.2**以降を選択します。

___

1.2以前のTLSバージョンの既知の脆弱性に対して、Cloudflareが実施する軽減策がいくつかあります。例えば、Cloudflareは以下をサポートしません。

1.  TLSのヘッダー圧縮
2.  SPDY 3.1のヘッダー圧縮
3.  RC4
4.  SSL 3.0
5.  クライアントとの再ネゴシエーション
6.  DHE 暗号スイート
7.  輸出グレード 暗号

Cloudflare軽減策は、次のような攻撃から保護します。

-   CRIME攻撃
-   BREACH攻撃
-   POODLE攻撃
-   RC4 暗号の弱点
-   SSL 再ネゴシエーション攻撃
-   プロトコルダウングレード攻撃
-   FREAK
-   LogJam
-   3DESは、TLS1.1と1.2で完全に無効になり、CloudflareがTLS 1.0の軽減策を講じます。

Cloudflareの追加軽減策の対象：

-   Heartbleed
-   Lucky Thirteen
-   CCS injection 脆弱性

Cloudflareは、脆弱性対策としてすべてのサーバーにパッチを適用しました。また、Heartbleed（ハートブリード）やShellShock（シェルショック）を含む、脆弱性のいくつかを軽減するCloudflare WAFマネージドルールもあります。

### Return Of Bleichenbacher's Oracle Threat (ROBOT)

ROBOTの存在を確認するセキュリティスキャンですが、Cloudflare上では誤検知です。Cloudflareは、リアルタイムでパディングをチェックし、パディングが正しくなければ、セッションキーを無作為にスワップします。

### Sweet32 (CVE-2016-2183)

Transport Layer Security(TLS)プロトコルのTriple DES (3DES)暗号化アルゴリズムの使用における脆弱性です。Sweet32は、現在a proof of concept（概念実証型）攻撃であり、一般的に知られている例はありません。 Cloudflareは、次の方法を用いてTLS 1.0の脆弱性を手動で軽減しています。

-   攻撃者は単一のTLSセッションから32GBデータを収集しなければなりません。
-   Cloudflareは、32GBのデータが収集されるずっと以前に、影響を受ける3DES暗号に新規のTLS 1.0 セッションキーを強制します。
