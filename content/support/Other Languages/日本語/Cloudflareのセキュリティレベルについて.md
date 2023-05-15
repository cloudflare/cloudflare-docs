---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200170056-Cloudflare%E3%81%AE%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E3%83%AC%E3%83%99%E3%83%AB%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
title: Cloudflareのセキュリティレベルについて
---

# Cloudflareのセキュリティレベルについて

## Cloudflareのセキュリティレベルについて

_Cloudflareのセキュリティレベルが、実績の悪いIPアドレスからのリクエストに対するCHPTCHAチャレンジを操作する方法を説明します。_

___

## 概要

**セキュリティレベル**は、訪問者のIP実績を用いて、CHPTCHAチャレンジページを提示するかどうかを決定します。訪問者が正しいCAPTCHAを入力すると、適切なWebサイトリソースを受信します。IP実績は、[Project Honeypot](https://www.projecthoneypot.org/)から収集します。

-   _本質的にOFF_**:** 最低実績のIPアドレスにだけチャレンジを使います。
-   _低_**:** 最も脅威的な訪問者だけにチャレンジを使います。
-   _標準_**:** 中程度の脅威を持つ訪問者と最も脅威的な訪問者の両方にチャレンジを使います。
-   _高_**:** 14日以内に脅威的な行動を示した訪問者全てにチャレンジを使います。
-   _攻撃を受けています!_**:** Webサイトが現在DDoS攻撃を受けている場合のみ使います。

Cloudflareは、デフォルトで**セキュリティレベル**を_標準_に設定します。**「設定」**タブ下のCloudflare**ファイアウォール**アプリ経由で**セキュリティ設定**を変更します。

ボットIPがWebサイトを攻撃するのを防ぐために、新しいWebサイト所有者は、**セキュリティレベル**を_標準_、または_高_にセットし、[**リトライの経過時間を**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e)_5_分から_30_分に低くして、Cloudflareが継続的にサイトを保護するようにしてください。あるいは、経験豊かなWebサイト管理者でセキュリティ設定に自信がある場合は、**セキュリティレベル**を_本質的にOFF_か_低_に設定する一方で、高めの[**リトライの経過時間**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e)で、一週間、ひと月、または一年に設定してあまり目立たない訪問者体験を提供してもいいでしょう。

WebサイトがDDoS攻撃を受けている最中は、[**攻撃を受けています!**](https://support.cloudflare.com/hc/articles/200170076) モードだけにします。**攻撃を受けています!**モードは、APIトラフィックなどドメインにおけるアクションに影響を与える可能性があります。サイトのトラフィックにおけるその部分に対する[**Page Rule**](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-PageRule-)を作成して、ドメインのAPIまたはその他のカスタム**セキュリティレベル**を設定してください。

___

## 関連リソース

-   [Cloudflare CHAPTCHAについて](https://support.cloudflare.com/hc/articles/200170136)
-   [Cloudflare 攻撃下モードについて](https://support.cloudflare.com/hc/articles/200170076)
-   [DDoS攻撃への対応](/ddos-protection/best-practices/respond-to-ddos-attacks/)
