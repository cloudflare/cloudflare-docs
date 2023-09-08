---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360038470312-Die-Interaktion-von-SameSite-Cookies-mit-Cloudflare-verstehen
title: Die Interaktion von SameSite-Cookies mit Cloudflare verstehen 
---

# Die Interaktion von SameSite-Cookies mit Cloudflare verstehen 



## Überblick

[Das SameSite-Cookie von Google Chrome](https://www.chromium.org/updates/same-site) ändert die Art und Weise, wie Google Chrome mit der SameSite-Kontrolle umgeht.  Google erzwingt SameSite zu Schutz vor Marketing-Cookies, die Benutzer verfolgen, und Cross-Site-Request-Forgery (CSRF), das Angreifern erlaubt, Ihre Cookies zu stehlen oder zu manipulieren.  

Das SameSite-Cookie verfügt über drei verschiedene Modi:

-   **Strict**: Cookies werden vom Erstanbieter (der besuchten Domain) erstellt. Beispielsweise wird von Cloudflare beim Besuch von Cloudflare.com ein Erstanbieter-Cookie gesetzt.
-   **Lax** : Cookies werden nur an den Domain-Apex gesendet (z. B. _\*.foo.com_).  Zum Beispiel, wenn jemand (_blog.naughty.com_) ein Bild (_img.foo.com/bar.png_) mit einem Hotlink verknüpft hat, sendet der Client kein Cookie an _img.foo.com_, da es weder um den Erstanbieter noch um Apex-Kontext handelt.
-   **None** : Cookies werden mit allen Anfragen gesendet.

Die SameSite-Einstellungen für [Cloudflare-Cookies](https://support.cloudflare.com/hc/articles/200170156) umfassen:

| Cloudflare-Cookie | SameSite-Einstellung | Nur HTTPS |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | Nein |
| \_\_cf\_bm | SameSite=None; Secure | Ja |
| cf\_clearance | SameSite=None; Secure | Ja |
| \_\_cfruid | SameSite=None; Secure | Ja |
| \_\_cflb | SameSite=Lax | Nein |

___

## Bekannte Probleme mit SameSite- und cf\_clearance-Cookies

Wenn eine [Cloudflare CAPTCHA](https://support.cloudflare.com/hc/articles/200170136) oder JavaScript-Challenge gelöst wird, z. B. für eine [**Firewall Rule**](https://support.cloudflare.com/hc/articles/360016473712) oder eine [**IP Access Rule**](https://support.cloudflare.com/hc/articles/217074967), wird im Client-Browser ein **cf\_clearance**\-Cookie gesetzt. Das _cf\_clearance_\-Cookie hat eine Standardlebensdauer von 30 Minuten, wird jedoch über [**Challenge-Zeitfenster**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) auf der Registerkarte **Einstellungen** in der Cloudflare **Firewall**\-App konfiguriert. 

Cloudflare verwendet **SameSite**\=_None_ seit dem **cf\_clearance**\-Cookie, sodass Besucheranfragen von verschiedenen Hostnamen nicht mit nachfolgenden Challenges oder Fehlern beantwortet werden. Wenn **SameSite**\=_None_ verwendet wird, muss dies in Verbindung mit dem _Secure_\-Flag gesetzt werden.

Für die Verwendung des _Secure_\-Flags muss das Cookie über eine HTTPS-Verbindung gesendet werden.  Das **cf\_clearance**\-Cookie wird standardmäßig auf **SameSite**\=_Lax_ gesetzt, wenn Sie HTTP auf irgendeinem Teil Ihrer Website verwenden, was Probleme mit der Website verursachen kann.

Wenn Sie auf irgendeinem Teil Ihrer Website HTTP verwenden, wird das **cf\_clearance**\-Cookie standardmäßig auf **SameSite**\=_Lax_ gesetzt, was dazu führen kann, dass Ihre Website nicht richtig funktioniert. Um das Problem zu beheben, verlagern Sie Ihren Website-Traffic auf HTTPS.  Cloudflare bietet zwei Features zur Unterstützung an: 

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647) und 
-   [**Always Use HTTPS**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156).

___

## Verwandte Ressourcen

-   [Weitere Informationen zum SameSite-Cookie](https://web.dev/samesite-cookies-explained/) 
-   [Die Cloudflare-Cookies verstehen](https://support.cloudflare.com/hc/articles/200170156)
-   [Häufig gestellte Fragen zu Cloudflare SSL](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Grundlegendes zu automatischen HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647)
