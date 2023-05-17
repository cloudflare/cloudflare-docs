---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200168076-Cloudflare-HTTP-2%E3%81%A8HTTP-3%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
title: Cloudflare HTTP2とHTTP3のサポートについて
---

# Cloudflare HTTP/2とHTTP/3のサポートについて

## Cloudflare HTTP/2とHTTP/3のサポートについて

_既存のコードベースに変更を加えることなく、お客様のWebサイトをスピードアップさせるために、CloudflareがHTTP/2とHTTP/3をサポートする方法をご説明します。_

___

## 概要

HTTP/2とHTTP/3はページの読み込み速度を上げるもので、すべての[Cloudflareプラン](http://www.cloudflare.com/plans)で無料となっています。HTTP/2は、Cloudflareのエッジネットワークで、デフォルトで有効になっていて、[SSL証明書](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0)が必要です。HTTP/2とHTTP/3の構成は、Cloudflare**ネットワーク**アプリを経由して行います。Freeプランのドメインでは、HTTP/2を無効にできません。

ブラウザとWebサーバーが利用可能な最高位のプロトコルを自動的にネゴシエートします。そのため、HTTP/3はHTTP/2よりも優先されます。

お客様の接続で使うプロトコルを決定するために、Webブラウザ、またはクライアントから_example.com_/cdn-cgi/traceを入力し、ご自分のドメイン名と_example.com_を置き換えます。数行のデータが返されます。結果に_http=h2_が表示されると、HTTP/2上で接続されます。他に使用可能な値は、HTTP/3には_http=http2+quic/99_を、HTTP/1.xには_http=http/1.x_を使うことができます。

___

HTTP/2は、次を経由して、ページのロード時間を改善します：

-   接続の多重化 - 単一のネットワークリクエストで、複数のリソースを取得します。ページレンダリングの速度を落とさないように、リソースが利用可能な時に、レスポンスが送信されます。
-   HTTPヘッダーの圧縮 - ヘッダーを圧縮し、HTTPリクエストを簡素化し、ヘッダーの再送信を回避します。
-   HTTP/2 Server Push - ページの読み込み速度を改善するために、Cloudflareはクライアントが追加リクエストを待たずにキャッシュできるように追加のリソースを提供します。

注：

-   すべてのブラウザがHTTP/2をサポートするわけではなく、代わりにHTTP1.xを使います。
-   接続の多重化は、ドメインごとに行われます。

___

## HTTP/3

HTTP/3は、高速で信頼性があり、安全性の高い接続を実現します。HTTP/3は、QUICと呼ばれるGoogleのプロトコルをデフォルトで使用することで、インターネットトランスポートを暗号化します。Cloudflare**ネットワーク**アプリでHTTP/3を有効化します。

詳細は、当社の[HTTP/3開発者向けドキュメント](/http3/)をお読みください。

___

## Server Push

Server Push機能によって、オリジンWebサーバーは、画像やスタイルシート、JavaScriptなど追加のアセットを参照するために、HTMLを解析するのを待たずに、クライアントまたはWebブラウザにリソースを送信できるようになります。Server Pushは、ページ上のスクリプトまたはスタイルシートすべてで通常のHTTPリクエストとレスポンスサイクルを回避します。Server Pushは、Cloudflareの全プランでご利用いただけます。

まず、**Link**ヘッダーの rel=preload パラメーター内で、URI参照をオリジンサーバーから抽出します。次に、こうした追加のURIがクライアントに提供されます。**Link**ヘッダーを含む例：

`Link: </images/image.png>;rel=preload;`

`Link: </css/main.css>;rel=preload;`

Server Pushの上限は、各ページ50アセットまで、各接続100アセットまでです。

___

## 関連リソース

-   [HTTP/3の過去、現在、未来](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [QUIC（クイック）する](https://blog.cloudflare.com/the-quicening/)
-   [QUICとRustを少しずつ楽しむ](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

ブラウザサポート情報：

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
