---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/5995821690637-Migration-von-WAF-verwalteten-Regeln-zu-WAF-verwalteten-Regels%C3%A4tzen
title: Migration von WAF-verwalteten Regeln zu WAF-verwalteten Regelsätzen 
---

# Migration von WAF-verwalteten Regeln zu WAF-verwalteten Regelsätzen 



## Überblick

Am 4. Mai 2022 beginnt Cloudflare die Phase 1 der WAF-Migration von [WAF-verwalteten Regeln](https://support.cloudflare.com/hc/articles/200172016) zu den neuen [WAF-verwalteten Regelsätzen](https://developers.cloudflare.com/waf/managed-rulesets/). Sie können den Migrationsprozess für Ihre berechtigten Zonen im Cloudflare-Dashboard beginnen. WAF-verwaltete Regelsätze bringen die folgenden Vorteile:

-   Bessere Erkennungs-Performance
-   Mehr Konfigurationsflexibilität (benutzerdefinierte WAF-Filter, Konfiguration globaler Regelsatz-Überschreibungen)
-   Bessere Nutzererfahrung
-   Zugriff auf [Überprüfung auf offengelegte Anmeldedaten](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)

Zurzeit wird der Migrationsprozess immer von Ihnen im Cloudflare-Dashboard gestartet. **Die Migration kann nicht rückgängig gemacht werden** sobald Sie zu den neuen WAF-verwalteten Regelsätzen migrieren, können Sie nicht zu WAF-verwalteten Regeln zurückkehren. Sobald Sie eine Zone zu den neuen WAF-verwalteten Regelsätzen migrieren, erscheint auf der Registerkarte **Verwaltete Regeln** im Cloudflare-Dashboard (verfügbar unter **Sicherheit** > **WAF** > **Verwaltete Regeln**) ein neues Interface, und die APIs zu WAF-verwalteten Regeln funktionieren nicht mehr.

___

## Auswirkungen der Migration

Ihre gegenwärtige Konfiguration für verwaltete Regeln migriert zu einer Konfiguration für WAF-verwaltete Regelsätze, so dass Ihre Zone denselben Schutz hat, wenn Sie zur neuen WAF übergehen.

Cloudflare empfiehlt, während der auf die Migration folgenden Tage das [**Aktivitätsprotokoll**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log) in Firewall Analytics zu überprüfen, um nach legitimen Anfragen zu suchen, die von den WAF-verwalteten Regelsätzen blockiert werden. Wenn Sie unzurecht blockierte Anfragen finden, können Sie die entsprechende WAF-Regel auf die Maßnahme _Protokollieren_ einstellen. Weitere Informationen zur Änderung der Maßnahme einer Regel eines verwalteten Regelsatzes finden Sie unter [Konfiguration einer einzelnen Regel in einem verwalteten Regelsatz](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset) in der WAF-Dokumentation.

### Änderungen am Cloudflare-Dashboard

Nach erfolgter Migration zeigt das Cloudflare-Dashboard das Interface zu WAF-verwalteten Regeln unter **Sicherheit** > **WAF** > **Verwaltete Regeln** an, wo Sie verwaltete Regelsätze bereitstellen und ihre Konfiguration vornehmen können.

![Nach der Migration zu WAF-verwalteten Regelsätzen zeigt das Cloudflare-Dashboard ein neues Interface an, auf dem Sie verwaltete Regelsätze für Ihre Zone bereitstellen können.](/support/static/waf-migration-dashboard-differences.png)

Anders als bei WAF-verwalteten Regeln gibt es keine globale Ein/Aus-Schaltfläche, um die WAF im neuen Interface zu aktivieren. Statt dessen wird jeder WAF-verwaltete Regelsatz in Ihrer Zone einzeln bereitgestellt.

Weitere Informationen zur Konfiguration von WAF-verwalteten Regeln im Dashboard finden Sie unter [Bereitstellung verwalteter Regelsätze für eine Zone im Dashboard](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/) in der Entwicklerdokumentation.

### API-Änderungen

Nach der Migration funktionieren die APIs zur Interaktion mit WAF-verwalteten Regeln **nicht mehr**. Dabei handelt es sich um folgende APIs:

-   [WAF-Regelpakete](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [WAF-Regelgruppen](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [WAF-Regeln](https://api.cloudflare.com/#waf-rules-properties)

Zur Interaktion mit WAF-verwalteten Regelsätzen müssen Sie die [Regelsätze-API](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/) verwenden. Weitere Informationen zur Bereitstellung von WAF-verwalteten Regelsätzen per API finden Sie unter [Bereitstellung von Regelsätzen per API](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/) in der Entwicklerdokumentation.

___

## Berechtigte Zonen (Phase 1)

Die Migration erfolgt phasenweise. Ab 4. Mai 2022 ist die Migration für eine Untergruppe berechtigter Zonen verfügbar und wird nach und nach für alle berechtigten Zonen verfügbar sein.

Während Phase 1 können Sie Zonen migrieren, die die folgenden Anforderungen erfüllen:

-   In der Zone ist:
    -   WAF deaktiviert oder
    -   WAF aktiviert und nur der verwaltete Cloudflare-Regelsatz aktiviert (der OWASP ModSecurity Core Rule Set muss deaktiviert sein).
-   In der Zone gibt es keine [Firewall-Regeln](https://developers.cloudflare.com/firewall/cf-dashboard/) oder [Page Rules](https://support.cloudflare.com/hc/articles/218411427), die WAF-verwaltete Regeln umgehen, aktivieren oder deaktivieren können:
    -   Firewall-Regeln, die mit _Umgehen_ > _WAF-verwaltete Regeln_ konfiguriert sind.
    -   Page Rules, die mit _Sicherheit deaktivieren_ konfiguriert sind.
    -   Page Rules, die mit _Web Application Firewall: Off_ oder _Web Application Firewall: On_ konfiguriert sind.
-   In der Zone gibt es keine [URL-gesteuerten WAF-Überschreibungen](https://api.cloudflare.com/#waf-overrides-properties) (nur per API verfügbar).

Zonen, die diese Anforderungen nicht erfüllen, können während Phase 1 nicht migrieren.

In Phase 2, die später eintritt, werden alle Zonen migrationsberechtigt sein. Diese Seite wird mit zusätzlichen Informationen aktualisiert, bevor Phase 2 beginnt.

___

## Start der Migration

1\. Melden Sie sich beim [Cloudflare-Dashboard](https://dash.cloudflare.com/) an und wählen Sie Ihr Konto und Ihre Zone.

2\. Navigieren Sie zu **Sicherheit** > **WAF** > **Verwaltete Regeln**.

![Anhand des unter WAF > „Verwaltete Regeln“ dargestellten Migrations-Banners für berechtigte Zonen können Sie von verwalteten Regeln zu WAF-verwalteten Regelsätzen aufrüsten.](/support/static/waf-migration-banner.png)

3\. Klicken Sie im Update-Banner auf **Jetzt aktualisieren**. Dieses Banner wird nur in berechtigten Zonen dargestellt.

4\. Bestätigen Sie im Popup-Dialogfenster, dass Sie die Migration von WAF-verwalteten Regeln zu WAF-verwalteten Regelsätzen beginnen möchten, indem Sie auf **Aktualisieren** klicken. Die Migration kann **nicht rückgängig gemacht** werden.

Nach Bestätigung des Vorgangs beginnt die Migration.

Der Migrationsprozess kann einige Minuten dauern. Wenn die Migration abgeschlossen ist, zeigt das Dashboard das neue Interface für WAF-verwaltete Regelsätze unter **Sicherheit** > **WAF** > **Verwaltete Regeln**. Aktualisieren Sie das Dashboard, um zu überprüfen, ob die Migration abgeschlossen ist.
