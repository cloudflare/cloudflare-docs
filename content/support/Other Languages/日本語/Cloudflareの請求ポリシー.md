---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360025829831-Cloudflare%E3%81%AE%E8%AB%8B%E6%B1%82%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC
title: Cloudflareの請求ポリシー
---

# Cloudflareの請求ポリシー

## Cloudflareの請求ポリシー

_Cloudflareの請求ポリシーが、アカウントに関連付けられているドメイン、プラン、アドオンサービスにどのように適用されるかについて説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/360025829831-Cloudflare%E3%81%AE%E8%AB%8B%E6%B1%82%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC#12345679)
-   [Cloudflareの有料プランをアップグレードする、またはダウングレードする](https://support.cloudflare.com/hc/ja/articles/360025829831-Cloudflare%E3%81%AE%E8%AB%8B%E6%B1%82%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC#12345680)
-   [Enterprise Planの請求 & お支払い](https://support.cloudflare.com/hc/ja/articles/360025829831-Cloudflare%E3%81%AE%E8%AB%8B%E6%B1%82%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC#12345682)
-   [お支払方法](https://support.cloudflare.com/hc/ja/articles/360025829831-Cloudflare%E3%81%AE%E8%AB%8B%E6%B1%82%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC#12345683)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/360025829831-Cloudflare%E3%81%AE%E8%AB%8B%E6%B1%82%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC#12345684)

___

## 概要

Cloudflareのプランとアドオンサービスは、アカウントの各ドメインに対して30日ごとに請求されます。

また、Cloudflareは現地の法律に基づいて消費税を徴収します。消費税はCloudflareアカウントに登録されている送付先住所または請求先住所のいずれかの9桁の郵便番号に基づいて計算されます（該当する場合）。

Cloudflareは、Cloudflareアカウントに追加されたドメインごとに、プランとサブスクリプション（またはアドオンサービス）の個別の請求書を発行します。

たとえば、 test1.comとtest2.comは、同じCloudflareアカウントに追加されてPro Planにアップグレードされたため、2件の$20の請求金額が記載された1枚の請求書を受け取ることになります。 blog.test1.comやblog.test2.com などのサブドメインは請求対象のドメインにはあたりません。 

有料プランまたはアドオンサービスを有効にした日付が、請求期間の開始日と [請求日](https://support.cloudflare.com/hc/articles/205610698)になります。たとえば、1月10日にプランをアップグレードした場合、すべての今後のプラン料金は毎月10日に請求されることになります。

有料プラン、サブスクリプション、またはアドオンサービスの注文時に、以下に同意する必要があります：

_「有効にする（Enable）」をクリックすることにより、翌月の請求期間が始まる_ _**前に**_ _アカウントのダッシュボードを通じてサブスクリプションをキャンセルしない限り、お客様は自動的に更新される月額定額制のサブスクリプションを購入することと、選択したサブスクリプションプランレベルの料金が定期的な請求金額として指定した支払方法に毎月請求が発生することに同意するものとします。_

_**ご解約された月は、定額通りのお支払いが発生します。払い戻しはありません。 サブスクリプションを購入することにより、お客様は最低1か月の購入義務に同意されたものとします。**_

___

有料プラン（Pro Planなど）のドメインである場合、上位のプラン（Business Planなど）にアップグレードできます。

-   請求サイクルの終了時に、上位プランの日割り計算された料金が請求書に表示されます。
-   請求サイクルの終了時に、Cloudflareは下位プランの日割り計算された料金を返金します。
-   次の請求サイクルの開始時に、上位プランの月額が請求書に表示されます。

たとえば、請求日が1月1日で、Pro PlanからBusiness Planに1月15日にアップグレードした場合は次のようになります：

-   使用期間の 1月15日から1月30日までの期間について日割り計算されたBusiness Planの料金（$100）が請求書に表示されます。
-   Cloudflareは、 1月1日から1月15日までの期間について日割り計算されたProプランの料金（$10）を返金します。
-   1月1日～1月30日の請求期間に対する請求書に表示される$110が、1月31日にCloudflareダッシュボードに表示されます。

有料プラン（Businessプランなど）のドメインであり、下位のプラン（Proプランなど）にダウングレードする場合は次のようになります：

-   ご利用中のプランと上位のCloudflareプランの機能は、現在のご請求サービス期間の終了時にダウングレードされます。 
-   下位プランと機能別料金が次回の請求期間から請求されます。

たとえば、請求日が2月1日であり、Pro PlanからBusiness Planに2月15日にダウングレードした場合は次のようになります：

-   3月1日まで、Business Planの機能とサービスにアクセスいただけます。
-   3月のプラン料金が、$20に減額されます。

___

## Enterprise Planの請求 & お支払い

Enterprise Planのお客様については、Cloudflareのアカウントチームがニーズに最も適したプランとサービス契約をカスタイマイズするお手伝いをいたします。Cloudflareのアカウンティングチームが、Enterprise Planの料金を受領・処理します。

Enterprise Planのアカウント所有者は、 Cloudflareのアカウンティングチームから請求書を直接受け取ります。

___

## お支払方法

Cloudflareでは、VISA、MasterCard、American Express、Discover、およびPaypalをお支払い方法としてご利用いただけます。現時点では、それ以外の支払方法（Union PayやMaestroなど）はご利用いただけません。

プランタイプを変更する前またはサブスクリプションを有効にする前に、有効な支払方法を使用していることを確認してください。

___

## 関連リソース

-   [Cloudflareのセルフサーブサブスクリプション契約](https://www.cloudflare.com/terms/)
-   [Cloudflareの請求書について理解する](https://support.cloudflare.com/hc/en-us/articles/205610698-Understanding-Cloudflare-Invoices)
-   [Cloudflareの売上税について理解する](https://support.cloudflare.com/hc/en-us/articles/360026135951-Understanding-Cloudflare-sales-tax)
