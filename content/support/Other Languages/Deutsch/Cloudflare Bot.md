---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360035387431-Cloudflare-Bot-Produkte-FAQs
title: Cloudflare Bot-Produkte FAQs 
---

# Cloudflare Bot-Produkte FAQs 



## Überblick


Weitere Informationen zu diesen Bot-Lösungen und deren Einrichtung finden Sie in der [Entwicklerdokumentation](https://developers.cloudflare.com/bots/).

___

## Wie erkennt Cloudflare Bots?

Cloudflare verwendet mehrere Methoden zur Erkennung von Bots. Diese varrieren je nach Plan. Weitere Details finden Sie unter [Bot-Produkte von Cloudflare](https://developers.cloudflare.com/bots/about/plans).

___

## Woher weiß ich, was in meinem Plan enthalten ist?

Lesen Sie in unserer [Entwicklerdokumentation](https://developers.cloudflare.com/bots/about/plans) nach, was alles in Ihrem Plan enthalten ist.

___

## Wie richte ich mein Bot-Produkt ein?

Wie Sie Ihr Bot-Produkt einrichten, erfahren Sie in unserer [Entwicklerdokumentation](https://developers.cloudflare.com/bots/get-started).

___

## Yandex-Bot wird unerwartet von der WAF-verwalteten Regel mit der ID 100203 blockiert

Yandex aktualisiert seine Bots sehr häufig. Daher kann es zu mehr falsch-positiven Ergebnissen kommen, während diese Änderungen verteilt werden. Neue und kürzlich aktualisierte Bots werden gelegentlich von der Cloudflare WAF-verwalteten Regel mit der ID 100203 blockiert, da die IP-Liste der Yandex-Bots noch nicht mit den jüngsten Änderungen von Yandex synchronisiert wurde.

**Übergangslösungen:**

-   oder erstellen Sie eine Firewall-Regel mit der Aktion _Bypass_, um WAF-verwaltete Regeln zu umgehen, wenn eine Anfrage von der **Yandex-IP** kommt und der Nutzer-Agent **Yandex** enthält.Weitere Informationen finden Sie in unserer [Entwicklerdokumentation](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions).

**Lösung:**

Sobald die neue Yandex-IP in unserem System verteilt wurde, werden die Anfragen nicht mehr blockiert. Dies kann bis zu 48 Stunden dauern. Wenn Yandex-Bots nach 48 Stunden immer noch blockiert werden, ohne dass sich der Bot geändert hat, kontaktieren Sie bitte den [Cloudflare-Support](https://support.cloudflare.com/hc/de/articles/200172476-Contacting-Cloudflare-Support).

___

## Wie funktioniert maschinelles Lernen?


Beim Bot-Management und im „Super Bot Fight“-Modus sind die X-Variablen Eigenschaften der Anfrage, die Y-Variable stellt die Wahrscheinlichkeit dar, ein Captcha zu lösen, basierend auf den X-Werten.

Cloudflare verwendet Daten aus Millionen von Anfragen und trainiert das System in regelmäßigen Abständen neu. Sie können diese Daten aus Ihren eigenen Anfrageprotokollen wie Cloudflare Logpull und Logpush sowie der Firewall-API entnehmen.

___

## Warum sehe ich eine Aktion „Verwaltete Herausforderung“ für Firewall-Regeln?

Wenn Sie verschiedene Bot-Kategorien mit dem „Bot Fight“-Modus oder dem „Super Bot Fight“-Modus herausfordern, werden Firewall-Ereignisse angezeigt, bei denen die **Durchgeführte Aktion** eine **Verwaltete Herausforderung** ist.

Sie können „Verwaltete Herausforderung“ auch als Ergebnis einer [Firewall-Regel](https://support.cloudflare.com/hc/articles/200170136#managed-challenge) sehen.

___

## Was ist der Unterschied zwischen dem Bedrohungswert und dem Bot-Management-Wert?

Der Unterschied ist erheblich:

-   Der Bedrohungswert (_cf.threat\_score_) wird von Cloudflare zur Bestimmung der IP-Reputation verwendet. Er beginnt bei 0 (gut) und endet bei 100 (schlecht).
-   Der Bot-Management-Wert (_cf.bot\_management.score)_ ist der Wert, mit dem Cloudflare im Bot-Management misst, ob die Anfrage von einem Menschen oder einem Skript stammt**.** Die Werte reichen von 1 (Bot) bis 99 (Mensch). Niedrige Werte zeigen an, dass die Anfrage von einem Skript, einem API-Dienst oder einem automatischen Agenten stammt. Höhere Werte zeigen an, dass die Anfrage von einem Menschen mit einem Standard-Desktop oder einem mobilen Webbrowser stammt.

Diese Felder sind über die [Cloudflare Firewall Rules](https://developers.cloudflare.com/firewall/cf-firewall-rules) verfügbar.

___

## Was ist cf.bot\_management.verified\_bot?

Der _cf.bot\_management.verified\_bot_\-Wert einer Anfrage ist ein Boolescher Wert, der angibt, ob diese Anfrage von einem von Cloudflare genehmigten Bot stammt.

Cloudflare hat eine Genehmigungsliste mit guten, automatisierten Bots erstellt, z. B. Google-Suchmaschine, Pingdom und mehr.

Diese Genehmigungsliste ist lang und basiert auf einer Reverse-DNS-Verifizierung. Das bedeutet, dass die IPs, die wir genehmigen, tatsächlich zum anfragenden Dienst passen. Darüber hinaus verwendet Cloudflare mehrere Überprüfungsmethoden wie ASN-Blöcke und öffentliche Listen. Wenn keiner dieser Überprüfungstypen für einen Kunden verfügbar ist, identifizieren wir legitime IP-Adressen von guten Bots mithilfe interner Cloudflare-Daten und maschinellem Lernen.

Mit dem Feld [Verifizierter Bot](https://developers.cloudflare.com/ruleset-engine/rules-language/fields#dynamic-fields) in Ihrer Firewall-Regel können Sie Traffic von guten Bots genehmigen.

___

## Ich betreibe einen guten Bot und möchte, dass er in die Genehmigungsliste (cf.bot\_management.verified\_bot) aufgenommen wird. Was sollte ich tun?

Cloudflare führt eine Beispielliste von verifizierten Bots in [Cloudflare Radar](https://radar.cloudflare.com/verified-bots).

Damit Ihr Bot von Cloudflare als bestätigter Bot gelistet wird, muss Ihr Bot unseren [öffentlichen Richtlinien für bestätigte Bots](https://developers.cloudflare.com/bots/reference/verified-bots-policy/) entsprechen. Wenn Ihr Bot diese Kriterien erfüllt, reichen Sie bitte diese [Online-Anmeldung](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link) ein.

___

## Welche Informationen benötige ich zur Fehlerbehebung bei meinen Bot-Problemen?

Wenn bei Ihrer Bot-Lösung Fehler auftreten und Sie eine Support-Anfrage stellen möchten, geben Sie bitte die folgenden Informationen an:

-   RayIDs
-   IP-Adressen
-   Firewall-Regel-IDs, Regelausdruck, CAPTCHA-Lösungsraten
-   Häufige User Agents unter falsch-positiven Ergebnissen
-   Häufige ASNs unter falsch-positiven Ergebnissen
-   Screenshots ungewöhnlicher Aktivitäten aus der Firewall, z. B. eine scharfe Spitze herausgeforderten Traffics im Diagramm
-   Problematische URIs oder Pfade
-   Grobe Beschreibung darüber, wie Ihre Domain konfiguriert ist.
    -   Ist eine Zone „SSL für SaaS“ und die anderen nicht?
    -   Wird der meiste API-Traffic an einen bestimmten URI gesendet?
    -   Wie viel mobilen Traffic erwarten Sie?

___

## Was sollte ich tun, wenn ich falsch-positive Ergebnisse erhalte, die durch den Bot Fight Mode (BFM) oder Super Bot Fight Mode (SBFM) verursacht werden?

**Wie kann ich das BFM****/SBFM-Feature deaktivieren?**

Bei Problemen mit dem BFM/SBFM-Feature (z. B. falsch-positive Ergebnisse) können Sie es unter **Sicherheit** > **Bots** deaktivieren.

-   Für **Free**\-Plan-Kunden: Stellen Sie den **„Bot Fight“-Modus** auf **Aus**
-   Für **Pro**\-Plan-Kunden: Klicken Sie auf den Link **„Super Bot Fight“-Modus konfigurieren** und stellen Sie die Features **Eindeutig automatisiert** und **Verifizierter Bot** auf **Genehmigen**, stellen Sie die Optionen **Schutz statischer Ressourcen** sowie **JavaScript-Erkennung** auf **Aus**
-   Für **Business**\- und **Enterprise**\-Plan-Kunden (ohne Bot Management-Add-on): Klicken Sie auf den Link **„Super Bot Fight“-Modus konfigurieren** und stellen Sie die Features **Eindeutig automatisiert**, **Wahrscheinlich automatisiert** und **Verifizierter Bot** auf **Genehmigen**, stellen Sie die Optionen **Schutz statischer Ressourcen** sowie **JavaScript-Erkennung** auf **Aus**

___

## Das Feature Super Bot Fight Mode (SBFM) blockiert Anfragen, obwohl es ausgeschaltet ist – warum?

Das Problem ist uns bekannt und das Bots-Team arbeitet an einer zeitnahen Lösung. Bis dahin gibt es eine Übergangslösung. Sie müssen den folgenden API-Befehl ausführen, um den SBFM-Regelsatz zu überprüfen und zu entfernen:



{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2\. Suchen Sie anhand der Ausgabe in Schritt 1 die Regelsatz-ID, die mit der SBFM-Konfiguration der Zone verknüpft ist. Sie sollten für den Regelsatz Folgendes sehen können `"kind": "zone"` und `"phase": "http_request_sbfm"`.

3\. Verwenden Sie die gefundene Regelsatz-ID zum Löschen des SBFM-Regelsatzes


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Beachten Sie, dass Sie <key> durch Ihren eigenen API-Schlüssel ersetzen müssen. Diesen erhalten Sie über [API-Tokens](https://dash.cloudflare.com/profile/api-tokens).

___

## Verwandte Ressourcen

-   [Cloudflare Bot-Management](https://developers.cloudflare.com/bots/) (Dokumentation für Entwickler)
-   [Cloudflare Firewall-Regeln](https://developers.cloudflare.com/firewall/cf-firewall-rules/) (Dokumentation für Entwickler)
-   [Cloudflare Bot-Management: Maschinelles Lernen und mehr](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/) (Cloudflare-Blog)
-   [Bots stoppen: Praktische Lektionen im maschinellen Lernen](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/) (Cloudflare-Blog)
