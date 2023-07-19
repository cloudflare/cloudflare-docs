---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/203020124-Wiederherstellung-einer-gehackten-Website
title: Wiederherstellung einer gehackten Website 
---

# Wiederherstellung einer gehackten Website 



## Überblick

Wenn Ihre Website kürzlich gehackt wurde, empfehlen wir die folgenden Schritte, um die gehackte Website wiederherzustellen und zukünftige Hacks zu verhindern.

### Wiederherstellung nach einem Angriff

-   Fordern Sie bei Ihrem Hosting-Provider Einzelheiten über den Hack an, einschließlich der Art und Weise, wie die Website nach Meinung des Providers gehackt wurde.
-   Bitten Sie Ihren Hosting-Provider, den auf Ihrer Website platzierten böswilligen Inhalt zu entfernen.
-   Beheben Sie Website-Warnungen in [Google Webmaster-Tools](https://www.google.com/webmasters/tools) und reichen Sie Ihre Website zur erneuten Überprüfung durch Google ein, sobald der Hack behoben wurde.

### Verhinderung und Bekämpfung der Risiken eines zukünftigen Hacks

Ergreifen Sie folgende Maßnahmen, um die Wahrscheinlichkeit eines zukünftigen Hacks zu verringern:

#### Aktualisieren Sie immer Ihr Content Management System (CMS)

Wenn Sie beispielsweise WordPress verwenden, stellen Sie sicher, dass Sie die neueste Version von WordPress verwenden. CMS-Plattformen veröffentlichen Updates, um bekannte Schwachstellen zu beheben. Aktualisieren Sie immer auf die neueste Version, wenn diese verfügbar wird.

#### Stellen Sie sicher, dass Ihre Plugins aktualisiert sind

Wenn Sie auf Ihrer Website oder in Ihrem CMS Plugins oder Erweiterungen verwenden, halten Sie diese auf dem neuesten Stand.

#### Aktivieren Sie Cloudflares [Web Application Firewall (WAF)](https://www.cloudflare.com/waf) 

Kunden mit einem kostenpflichtigen Cloudflare-Tarif können die WAF aktivieren, um bekanntes böswilliges Verhalten mit einer Challenge zu konfrontieren oder zu blockieren.

#### Sichern Sie Ihr Administrator-Login

Viele Hacks sind auf Brute-Force-Angriffe auf Anmeldeseiten zurückzuführen. Ziehen Sie Dienste wie [Rublon](https://rublon.com/) oder [Jetpack](https://jetpack.com/features/security/) in Erwägung, um Ihre Website vor Angriffen zu schützen, die auf CMS-Plattformen wie WordPress abzielen.

#### Erstellen Sie ein Backup Ihrer Website

Wenn Ihre Website gehackt wird, vermeiden Sie den Verlust gültiger Inhalte, wenn Sie einen Dienst wie [CodeGuard](https://www.cloudflare.com/apps/codeguard) nutzen, um Ihre Website aus einem Backup wiederherzustellen.

___

## Verwandte Ressourcen

-   [Googles Hilfe für gehackte Websites](http://www.google.com/webmasters/hacked/)
