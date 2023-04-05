---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115001992652-Cloudflare%E3%81%A7%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%91%E3%82%B9%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B
title: Cloudflareでプライバシーパスを利用する
---

# Cloudflareでプライバシーパスを利用する

## Cloudflareでプライバシーパスを利用する

_Cloudflareを利用しつつ、プライバシーパスがどのように訪問者のCHPTCHAの頻度を減らすか、どのように有効化するかについて説明します。_

___

## 概要

プライバシーパスは、ChromeとFirefoxのブラウザ拡張機能であり、Cloudflareで保護されたWebサイトでの訪問者エクスペリエンスの向上をさせます。例えば、実績の悪い訪問者IPアドレスがCloudflareに保護されたWebサイトへのアクセスする前にCloudflareキャプチャページを受け取ることがあります。CHPTCHAページが一つ解決された後に、プライバシーパスがCloudflareのWebサイトで使用するためのトークンを生成し、頻度の高いCHPTCHAを防ぎます。プライバシーパスで解決される各CHPTCHAに30のトークンが生成されます。

プライバシーパスは、さらに実績が悪いIPを持つ傾向がある共有ネットワーク、VPN、Torからの訪問者にとって役に立つものです。「**設定**」タブで、Cloudflare**ファイアウォール** アプリを経由して**プライバシーパスサポート**を有効化します。Google ChromeまたはFirefoxのプライバシーパス拡張機能をダウンロードします:

-   Chrome: [https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi](https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi)
-   Firefox: [https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/](https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/)

一般的なプライバシーパスの問題を[privacy-pass-support@cloudflare.com](mailto:A0privacy-pass-support@cloudflare.com)までご報告ください。プライバシーパスコードは、[GitHub](https://github.com/privacypass/challenge-bypass-extension)が利用でき、これにより問題報告も可能になります。
