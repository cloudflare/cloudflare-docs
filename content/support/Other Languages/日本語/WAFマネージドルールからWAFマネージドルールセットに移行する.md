---
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/5995821690637-WAF%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%89%E3%83%AB%E3%83%BC%E3%83%AB%E3%81%8B%E3%82%89WAF%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%89%E3%83%AB%E3%83%BC%E3%83%AB%E3%82%BB%E3%83%83%E3%83%88%E3%81%AB%E7%A7%BB%E8%A1%8C%E3%81%99%E3%82%8B
title: WAFマネージドルールからWAFマネージドルールセットに移行する
---

# WAFマネージドルールからWAFマネージドルールセットに移行する

## WAFマネージドルールからWAFマネージドルールセットに移行する

_Cloudflareはお客様がWAFマネージドルールから新しいWAFマネージドルールセットへゾーンの移行を開始するのを許可します。_

___

## 概要

2022年5月4日に、Cloudflareは[WAFマネージドルール](https://support.cloudflare.com/hc/articles/200172016)から新しい[WAFマネージドルールセット](https://developers.cloudflare.com/waf/managed-rulesets/)へのWAF移行のフェーズ1を開始します。対象ゾーンの移行プロセスはCloudflareダッシュボードで開始できます。 WAFマネージドルールセットは次のようなメリットを提供します。

-   検出パフォーマンスの改善
-   構成の自由度をアップする(カスタムWAFフィルターの定義、グローバルルールセットオーバーライドの構成)
-   より良いユーザー体験
-   [資格情報の流出チェック](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)へのアクセス

現在、この移行プロセスは、いつでもCloudflareダッシュボードでお客様によって開始されます。**この移行は不可逆的です**—新しいWAFマネージドルールセットに移行後は、WAFマネージドルールの使用に戻ることはできません。 ゾーンを新しいWAFマネージドルールセットに移行した後は、Cloudflareダッシュボードの**マネージドルール** タブ(**セキュリティ** > **WAF** > **マネージドルール**の順で利用可能)は、新しいインターフェースを表示し、 WAFマネージドルールAPIは機能しなくなります。

___

## 移行の影響

お客様の現在のマネージドルールの構成はWAFマネージドルールセットの構成に移行し、新しいWAFへの移行時に同じ保護がお客様のゾーンに適用されます。

Cloudflareはお客様が移行後にファイアウォール分析の[**アクティビティログ**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log)で、WAFマネージドルールセットにより正当なリクエストがブロックされているかを確認することをお勧めしています。誤ってブロックされたリクエストを見つけた場合は、対応する_ログ_へのWAFルールアクションを調整することができます。マネージドルールセットルールのアクションの変更に関する情報については、WAFドキュメントの[マネージドルールセットで1つのルールを構成する](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset)をご参照ください。

### Cloudflareダッシュボードの変化

移行が完了すると、Cloudflareダッシュボードで新しいWAFマネージドルールセットのインターフェースが、**セキュリティ** > **WAF** > **マネージドルール**に表示されます。そこから、マネージドルールセットをデプロイし、構成を調整できます。

![WAFマネージドルールセットへの移行後、Cloudflareダッシュボードでは新しいインターフェースが表示され、そこからマネージドルールセットをお客様のゾーンにデプロイできます。](/support/static/waf-migration-dashboard-differences.png)

WAFマネージドルールとは異なり、新しいインターフェースでWAFを有効化するグローバルなオン/オフボタンはありません。代わりに、各WAFマネージドルールセットを個別にお客様のゾーンにデプロイします。

WAFマネージドルールセットをダッシュボードで構成することに関する詳細情報については、開発者ドキュメントの[ダッシュボードでマネージドルールセットをゾーンにデプロイする](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/)をご参照ください。

### APIの変化

移行後、WAFマネージドルールとやりとりするAPIは**機能しなくなります**。該当するAPIは下記のとおりです:

-   [WAFルールパケージ](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [WAFルールグループ](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [WAFルール](https://api.cloudflare.com/#waf-rules-properties)

WAFマネージドルールセットとやりとりするには、[ルールセット API](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/)を使用する必要があります。API経由でWAFマネージドルールセットをデプロイすることに関する詳細情報は、開発者ドキュメントの[API経由でルールセットをデプロイする](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/)をご覧ください。

___

## 対象となるゾーン(フェーズ1)

移行は数段階のフェーズで行われます。2022年5月4日から、移行は一部の対象ゾーンで利用可能になり、段階的にすべての対象ゾーンで利用可能になります。

フェーズ1の期間中は、下記の条件を満たすゾーンを移行することができます:

-   ゾーンの条件:
    -   WAFが無効化されている、または
    -   WAFが有効化されており、Cloudflareマネージドルールセットのみが有効化されている(OWASP ModSecurity Core Rule Set は無効化されている必要があります)。
-   ゾーンには、WAFマネージドルールをバイパスする、有効化する、無効化する[ファイアウォールルール](https://developers.cloudflare.com/firewall/cf-dashboard/)または[Page Rules](https://support.cloudflare.com/hc/articles/218411427)がない:
    -   ファイアウォールルールは、_Bypass_ > _WAF マネージドルール_で設定されている。
    -   Page Rulesは、_セキュリティの無効化_で設定されている。
    -   Page Rulesは、_Webアプリケーションファイアウォール: オフ_ または _Webアプリケーションファイアウォール: オン_で設定されている。
-   ゾーンに、[URI制御のWAFオーバーライド](https://api.cloudflare.com/#waf-overrides-properties) がない(API経由でのみ利用可)。

これらの要件を満たさないゾーンはフェーズ1の期間中に移行できません。


___

## 移行の開始

1\. [Cloudflareダッシュボード](https://dash.cloudflare.com/)にログインして、アカウントとゾーンを選択します。

2\. **セキュリティ** > **WAF** \> **マネージドルール**の順に進みます。

![WAF > マネージドルールに表示される移行バナーは、対象ゾーンに利用可能で、バナーを使用するとマネージドルールからWAFマネージドルールセットに更新されます。](/support/static/waf-migration-banner.png)

3\. 更新バナーで、**今すぐ更新**をクリックします。このバナーは対象となるゾーンのみに表示されます。

4\. ポップアップダイアログで、**更新**をクリックし、WAFマネージドルールからWAFマネージドルールセットへの移行を希望していることを確認します。この移行は**不可逆的**です。

操作の確認後、移行が開始されます。

移行プロセスは数分かかる場合があります。移行が終了すると、ダッシュボードで新しいWAFマネージドルールセットのインターフェースが、**セキュリティ** > **WAF** > **マネージドルール**に表示されます。移行が終了したかを確認するには、ダッシュボードを更新してください。
