---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/229666767-Cloudflare%E3%81%AEIPv6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B
title: CloudflareのIPv6サポートを理解した上で設定する
---

# CloudflareのIPv6サポートを理解した上で設定する

## CloudflareのIPv6サポートを理解した上で設定する

_CloudflareがIPv6トラフィックをどのようにサポートするか、あなたのオリジンWebサーバーやアプリケーションソフトがIPv6トラフィックをサポートしない場合にCloudflareがおすすめする機能について説明します。_

### 本記事の内容

-   [IPv6サポートの概要](https://support.cloudflare.com/hc/ja/articles/229666767-Cloudflare%E3%81%AEIPv6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#h_a843bd18-988d-41ff-8df6-81b0b2a31f3d)
-   [IPv6の互換性を設定する](https://support.cloudflare.com/hc/ja/articles/229666767-Cloudflare%E3%81%AEIPv6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#h_2fa0b554-3fd2-44a3-9a77-ee116c31b8c3)
-   [Pseudo IPv4を有効にする](https://support.cloudflare.com/hc/ja/articles/229666767-Cloudflare%E3%81%AEIPv6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#h_877db671-916a-4085-9676-8eb27eaa2a91)
-   [IPv6ネットワーク問題をトラブルシューティングする](https://support.cloudflare.com/hc/ja/articles/229666767-Cloudflare%E3%81%AEIPv6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#h_117db6c9-d54c-4d44-8445-271ebbb2b240)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/229666767-Cloudflare%E3%81%AEIPv6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B#h_079b79ff-4034-4f4a-b687-22dfd7be544e)

___

Cloudflareは全てのドメインに対してIPv6サポートを無料で提供しており、追加の設定やハードウェアは必要ありません。

お使いのオリジンWebサーバーがIPv6と互換性がない場合、Cloudflareは**IPv6互換性**を_Off_に切り替えます。

また、クライアントがIPv6経由でCloudflareがプロキシしたあなたのドメインに接続したもののオリジンWebサーバー が古いソフトウェアを使用しているためにIPv4形式のIPアドレスしか理解できない場合、Cloudflareの**Pseudo IPv4**機能を使ってください。

___

## IPv6の互換性を設定する

ホスティングプロバイダーが、あなたのオリジンWebサーバーにIPv6をサポートしない場合、 _AAAA_ DNSレコードをプロキシする際にCloudflareのIPv6の互換性を使うと、Cloudflareのグローバルネットワークを介して、IPv6接続ができます。

Enterpriseプランのドメインは、CloudflareのダッシュボードないでIPv6の互換性を切り替えることができます:

1.  Cloudflareアカウントにログインします。
2.  適切なドメインを選択します。
3.  **Network**（ネットワーク）アプリをクリックします。
4.  **IPv6の互換性**を_Off_または_On_に切り替えます。

IPv6が無効になっている時でも、ドメインはTorネットワークを経由してIPv6トラフィックを受信することに留意してください。全てのIPv6トラフィックを完全に無効にするために：

-   Cloudflareの **SSL/TLS** アプリにある**Edge 証明書**タブを介して、**オニオンルーティング**を無効にしてください。[Cloudflare Torサポートとオニオンルーティングについて](https://support.cloudflare.com/hc/articles/203306930)を読んでください。
-   `ip.src in {::/0}`フィルターを使用して、_0:0:0:0:0:0:0:0/0_をブロックするファイアウォールルールを使ってください。[Cloudflareでファイアウォールルール](/firewall/cf-dashboard/create-edit-delete-rules/)を作成する方法を説明します。

___

## Pseudo IPv4を有効にする

古いオリジンサーバー分析と不正検出ソフトウェアの中には、IPv4形式のIPアドレスを想定しているのでIPv6アドレスをサポートしないものもあります。

IPv6への移行をサポートするために、Cloudflareの**Pseudo IPv4** では、Cloudflareのドメイン全てにIPv6からIPv4への移行サービスを提供しています。

**Pseudo IPv4**では、クラスE IPv4 アドレススペースを使って、IPv6アドレスに対応する一意のIPv4アドレスをできるだけ多く提供しています。

-   例）　クラスE IPv4 アドレス: `240.16.0.1`
-   例） IPv6 アドレス: `2400:cb00:f00d:dead:beef:1111:2222:3333`

**Pseudo IPv4** 設定には三つのオプションがあります:

-   _Off_ \- これはデフォルト値です。
-   _ヘッダーの追加_ \-Cloudflareは、自動的に`Cf-Pseudo-IPv4` をオリジナルIPv6アドレスからハッシュされたクラスE IPv4アドレスと一緒に追加します。
-   _ヘッダーの上書き_ -  Cloudflareは、`Cf-Connecting-IPv6` ヘッダーにある実際のIPv6アドレスを保存しつつ、`既存のCf-Connecting-IP` と`X-Forwarded-For` ヘッダーをpseudo IPv4 アドレスとともに上書きします。

___

## IPv6ネットワーク問題をトラブルシューティングする

IPv6接続で問題が発生したら、以下の情報を[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)に提供してください:

-   IPv6接続の問題を示す[traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   IPv6問題が発生した際にあなたのリクエストに対応したCloudflareデータ
-   [IPv6互換性](https://support.cloudflare.com/hc/articles/229666767#h_2fa0b554-3fd2-44a3-9a77-ee116c31b8c3)の無効がこの問題の解決になったかどうかの確認 

___

## 関連リソース

-   [サイトの問題をトラブルシューティングするために情報を収集する](https://support.cloudflare.com/hc/articles/203118044)
-   [Cloudflareサポートに問い合わせる](https://support.cloudflare.com/hc/articles/200172476)
