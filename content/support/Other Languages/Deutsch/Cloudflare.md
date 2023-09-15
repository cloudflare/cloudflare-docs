---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115001635128-Cloudflare-Durchsatzbegrenzung-konfigurieren
title: Cloudflare-Durchsatzbegrenzung konfigurieren 
---

# Cloudflare-Durchsatzbegrenzung konfigurieren 



## Überblick

Mit der **Durchsatzbegrenzung** von Cloudflare werden übermäßige Anfrageraten für bestimmte URLs oder für eine gesamte Domain automatisch identifiziert und bekämpft. Anfrageraten werden lokal für einzelne Cloudflare-Rechenzentren berechnet. Die häufigsten Verwendungszwecke für die **Durchsatzbegrenzung** sind [DDoS-Schutz](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/), [Schutz vor Brute-Force-Angriffen](https://www.cloudflare.com/learning/bots/brute-force-attack/) und die Begrenzung des Zugriffs auf Forensuchen, API-Aufrufe oder Ressourcen, die zu datenbankintensiven Operationen an Ihrem Ursprung führen.

Sobald eine einzelne IPv4-Adresse oder ein IPv6 /64-IP-Bereich den Schwellenwert einer Regel überschreitet, werden weitere Anfragen an den Ursprungs-Webserver mit einer HTTP 429-Antwort blockiert. Dazu gehört auch ein **Retry-After**\-Header, der dem Client angibt, wann er wieder Anfragen senden kann.

{{<Aside type="note">}}
Für Kunden, die die ältere Version der Durchsatzbegrenzungsregeln
verwenden (dokumentiert in Cloudflares Support KB), sind
Cache-Ressourcen und bekannte Suchmaschinen-Crawler von Ihren
Durchsatzbegrenzungsregeln ausgenommen. Daher haben sie keinen Einfluss
auf das
[SEO-Ranking](/fundamentals/get-started/task-guides/improve-seo/)
Ihrer Website. Wenn Sie jedoch die [neue Version der
Durchsatzbegrenzungsregeln](/waf/rate-limiting-rules/)
verwenden (dokumentiert in der Entwicklerdokumentation), sollten Sie
darauf achten, dass Ihre Durchsatzbegrenzungsregeln keine bekannten
guten Bots betreffen. Dies könnte sonst das SEO-Ranking Ihrer Website
beeinträchtigen. Weitere Informationen finden Sie unter [SEO
verbessern](/fundamentals/get-started/task-guides/improve-seo/).
{{</Aside>}}

{{<Aside type="note">}}
Versuchen Sie, die Durchsatzbegrenzung zu aktivieren?
[Durchsatzbegrenzung
aktivieren](https://dash.cloudflare.com/?to=/:account/:zone/firewall/tools).
{{</Aside>}}

___

## Analytics

Sehen Sie sich die Durchsatzbegrenzungs-Analytics unter **Analytics** > **Sicherheit** an. Die Analytics der Durchsatzbegrenzung zeigen Traffic, der mit simulierten Anfragen übereinstimmt, anhand von durchgezogenen Linien und tatsächlich blockierte Anfragen anhand von gepunkteten Linien. Die von einer Durchsatzbegrenzungsregel erzeugten Protokolle sind nur für Enterprise-Kunden über [Cloudflare-Protokolle](/logs/) sichtbar. 

Cloudflare gibt bei blockierten Anfragen einen HTTP-429-Fehler zurück.  Details zu blockierten Anfragen pro Standort finden Enterprise-Kunden unter **Statuscodes** im Analytics-Dashboard, das unter **Analytics** > **Traffic** verfügbar ist. 

{{<Aside type="note">}}
HTTP 429 umfasst auch 429-Antworten, die vom Ursprung zurückgegeben
werden, wenn der Ursprungs-Webserver zusätzich seine eigene
Durchsatzbegrenzung anwendet.
{{</Aside>}}

___

## Durchsatzbegrenzungsmöglichkeiten je nach Tarif

{{<Aside type="note">}}
**Durchsatzbegrenzung** ist ein Zusatzdienst für alle Kundentarife. Sie
finden ihn unter **Sicherheit** \> **WAF** \> **Regeln zur
Durchsatzbegrenzung**.
{{</Aside>}}

Die Anzahl der erlaubten Durchsatzbegrenzungsregeln hängt vom Tarif der Domain ab:

| Tarif | Anzahl Regeln | Aktionen | Dauer der Aktion | Zeitraum der Anfrage |
| --- | --- | --- | --- | --- |
| Free | 1 | Blockierung | 1 Minute oder 1 Stunde | 10 Sekunden oder 1 Minute |
| Pro | 10 | Blockieren, Legacy-CAPTCHA, JS-Challenge, Managed Challenge oder Protokollieren | 1 Minute oder 1 Stunde | 10 Sekunden oder 1 Minute |
| Business | 15 | Blockieren, Legacy-CAPTCHA, JS-Challenge, Managed Challenge oder Protokollieren | 1 Minute, 1 Stunde oder 24 Stunden | 10 Sekunden, 1 Minute oder 10 Minuten |
| Enterprise | 100 | Blockieren, Legacy-CAPTCHA, JS-Challenge, Managed Challenge oder Protokollieren | Beliebige eingegebene Dauer zwischen 10 und 86.400 Sekunden (24 Stunden) | Jeder eingegebene Wert zwischen 10 und 3.600 Sekunden (1 Stunde). |

Die Durchsatzbegrenzung von Cloudflare unterstützt mehrere Ebenen der Konfigurationssteuerung, abhängig vom Cloudflare-Tarif der Domain.  Die folgende Tabelle zeigt, was Sie auf der Grundlage Ihres Tarifs tun können:

| 
Anzahl

 | 

Aufgabe

 | 

Verfügbar unter

 |
| --- | --- | --- |
| 

1

 | 

Eine einfache Durchsatzbegrenzungsregel konfigurieren

 | 

Alle Pläne

 |
| 

2

 | 

Erweiterte Kriterien konfigurieren

 | 

Business und Enterprise Plan

 |
| 

3

 | 

Erweiterte Antwort konfigurieren

 | 

Business und Enterprise Plan

 |
| 

4

 | 

Bypass-Option konfigurieren

 | 

Enterprise Plan

 |

___

## Bestandteile einer Regel für die Durchsatzbegrenzung

Eine Durchsatzbegrenzungsregel besteht aus drei verschiedenen Komponenten.  Klicken Sie unten auf eine Komponente, um weitere Details einzublenden:

Eingehende Anfragen werden anhand folgender Kriterien abgeglichen:

#### **des Anforderungspfades**

Zum Beispiel:

-   http://example.com/example
-   http://example.com/example/\*

Beim Anfragepfad wird die Groß-/Kleinschreibung beachtet.  Muster können keine Inhalte nach Abfragezeichenfolgen (_?_) oder Ankern (_#_) abgleichen.  Ein Stern (_\*_) entspricht einer beliebigen Zeichenfolge, einschließlich einer leeren Zeichenfolge. Zum Beispiel:

-   \*.example.com/\* gleicht jeden Pfad auf einer Subdomain von example.com ab
-   \*example.com/example.html gleicht example.html auf example.com oder einer beliebigen Subdomain von example.com ab
-   \* gleicht jede Seite Ihrer Website ab

Eine Anfrage nach _example.com/path_ stimmt nicht mit _example.com/path/_ überein.  Die einzige Ausnahme von dieser Regel ist die Homepage, _example.com_ entspricht _example.com/_.

#### **des Anforderungsschemas**

_HTTP_ oder _HTTPS_. Wenn keins angegeben ist, werden beide abgeglichen und die Regel listet _\_ALL\__ auf.

#### **der Anfragemethode**

_POST_ oder _GET_. Wenn keine angegeben ist, werden alle Methoden abgeglichen und die Regel listet _\_ALL\__ auf.

#### **(optional) Der Origin Response Code**

So soll z. B. eine **Durchsatzbegrenzungsregel** nur abgeglichen werden, wenn ein HTTP 401 oder 403 vom Ursprungs-Webserver zurückgegeben wird.  Eine ausgelöste Regel, die den Antwortcodekriterien entspricht, blockiert nachfolgende Anfragen von diesem Client unabhängig vom Origin Response Code. 

Eine Regel kann auf die Anzahl und den Zeitraum aller Anfragen, die vom selben Client stammen, überprüfen:

#### **Anzahl der Anfragen**

Geben Sie mindestens zwei Anfragen an.  Um einzelne Anfragen zu blockieren, machen Sie den Pfad unerreichbar, z. B. indem Sie Ihren Ursprungs-Webserver so konfigurieren, dass er 403 zurückgibt.

#### **Zeitraum der Anfrage**

Eine Regel löst eine Aktion aus, sobald die Anfragen eines Kunden den Schwellenwert für die angegebene Dauer überschreiten.

 

Die Abwehrmaßnahmen durch die Regel bestehen aus:

#### **Abwehraktion**

Aktionen der Durchsatzbegrenzung basieren auf dem Tarif der Domain, wie oben unter **Durchsatzbegrenzungsmöglichkeiten je nach Tarif** erwähnt:

-   **Blockieren****:** Cloudflare gibt einen HTTP-429-Fehler aus, wenn der Schwellenwert überschritten wird.
-   **Legacy-CAPTCHA** **–** Der Besucher muss eine Captcha-Herausforderung bestehen.  Wenn er besteht, lässt Cloudflare die Anfrage durch.
-   **JS Challenge** **–** Der Besucher muss eine Cloudflare JavaScript Challenge bestehen. Wenn er besteht, lässt Cloudflare die Anfrage durch.
-   **Protokollieren -** Anfragen werden in [Cloudflare-Protokollen](https://support.cloudflare.com/hc/articles/216672448) aufgezeichnet. Damit kann die Regel getestet werden, bevor sie produktiv eingesetzt wird.

#### **Dauer der Sperre**

Wenn Sie einen Timeout einstellen, der kürzer als der Schwellenwert ist, erhöht die API den Timeout automatisch auf den Schwellenwert. 

Besucher, die von der **Durchsatzbegrenzung** betroffen sind, erhalten eine Standard-HTML-Seite, wenn keine [benutzerdefinierte Fehlerseite](https://support.cloudflare.com/hc/articles/200172706) angegeben wurde.  Darüber hinaus können Business- und Enterprise-Kunden eine Antwort in der Regel selbst angeben, siehe unter _Aufgabe 3: Erweiterte Antwort konfigurieren_.

___

## Schwellenwerte für die Durchsatzbegrenzung identifizieren

Um einen allgemeinen Schwellenwert für die Cloudflare-**Durchsatzbegrenzung** zu ermitteln, teilen Sie 24 Stunden nicht gecachter Website-Anfragen durch die eindeutigen Besucher für dieselben 24 Stunden. Teilen Sie dann durch die geschätzte Durchschnittsdauer eines Besuchs in Minuten.  Multiplizieren Sie schließlich mit 4 (oder größer), um für Ihre Website einen geschätzten Schwellenwert pro Minute zu ermitteln. Ein Wert größer als 4 ist in Ordnung, da die meisten Angriffe eine Größenordnung über den typischen Traffic-Raten liegen.

Um URL-Durchsatzbegrenzung für bestimmte URLs zu ermitteln, verwenden Sie nicht gecachte Anfragen von 24 Stunden und eindeutige Besucher für die spezifische URL. Passen Sie die Schwellenwerte dann basierend auf Nutzerberichten und Ihrer eigenen Überwachung an.

___

## Aufgabe 1: Eine einfache Durchsatzbegrenzungsregel konfigurieren

Unten können Sie Details zur Erstellung der beiden gängigen Arten von Cloudflare-**Durchsatzbegrenzungsregeln** einblenden.

In unserer **Durchsatzbegrenzung** finden Sie das Ein-Klick-Tool „**Schützen Sie Ihren Login**“. Es erstellt eine Regel, die den Client für 15 Minuten blockiert, wenn innerhalb von 5 Minuten mehr als 5 POST-Anfragen gesendet werden. Zum Blockieren der meisten Brute-Force-Versuche reicht das aus.

1.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
2.  Wählen Sie die zu schützende Domain aus.
3.  Gehen Sie zu **Sicherheit > WAF > Regeln zur Durchsatzbegrenzung**.
4.  Klicken Sie unter **Durchsatzbegrenzung** auf **Schützen Sie Ihren Login**.
5.  Geben Sie den **Regelnamen** und **Ihre Anmelde-URL** in das Dialogfeld **„Schützen Sie Ihren Login“** ein.
6.  Klicken Sie auf **Speichern**.
7.  Der **Regelname** erscheint in Ihrer Liste der **Durchsatzbegrenzungsregeln**.

1\. Melden Sie sich beim Cloudflare-Dashboard an.

2\. Wählen Sie die entsprechende Domain aus.

3\. Gehen Sie zu **Sicherheit** > **WAF** > **Regeln zur Durchsatzbegrenzung**.

4\. Klicken Sie auf **Benutzerdefinierte Durchsatzbegrenzungsregel erstellen**.  Legen Sie im Dialogfeld die Einzelheiten Ihrer neuen Regel fest.

![Erstellen Sie ein Popup-Dialogfenster für Durchsatzbegrenzungsregeln mit einer Beispielkonfiguration der Regel. Die Regel blockiert eine Stunde lang Anfragen von IP-Adressen, die 150 Anfragen pro Minute überschreiten.](/images/support/previous-rate-limiting-create-rule.png)

5\. Geben Sie einen beschreibenden **Regelnamen** ein.

6\. Für **Wenn Traffic mit der URL übereinstimmt** wählen Sie ein HTTP-Schema aus der Dropdown-Liste sowie eine URL aus.

7\. In **von der gleichen IP-Adresse überschreitet** geben Sie eine ganze Zahl größer als 1 ein, um die Anzahl der Anfragen in einer Stichprobenzeitraum darzustellen.

8\. Wählen Sie unter **Anfragen pro** den Stichprobenzeitraum (der Zeitraum, in dem Anfragen gezählt werden). Für Domains auf dem Enterprise Plan kann manuell eine beliebige Dauer zwischen 10 und 3.600 Sekunden (1 Stunde) angegeben werden.

9\. Wählen Sie für das Dropdown-Menü **Dann** eine der verfügbaren Aktionen basierend auf Ihrem Plan aus.  Mehr Informationen erhalten Sie im Abschnitt _Regelabwehr_ unter _Bestandteile einer Durchsatzbegrenzungsregel_ weiter oben.

10\. Wenn Sie _Blockieren_ oder _Protokollieren_ für den **übereinstimmenden Traffic dieses Besuchers** ausgewählt haben, wählen Sie aus, wie lange die Option angewendet werden soll, nachdem ein Threshold ausgelöst wurde. Für Domains auf dem Enterprise Plan kann ein beliebiger Wert zwischen 10 und 86.400 Sekunden (24 Stunden) angegeben werden.

11\. Um Ihre neue Regel zu aktivieren, klicken Sie auf **Speichern und Bereitstellen**.

Die neue Regel erscheint in der Liste der Regeln zur Durchsatzbegrenzung.

{{<Aside type="note">}}
Jede Änderung an der **Durchsatzbegrenzungsregel** löscht die aktuell
ausgelösten Aktionen dieser Regel. Seien Sie also vorsichtig, wenn Sie
**Durchsatzbegrenzungsregeln** zur Abwehr eines laufenden Angriffs
bearbeiten.
{{</Aside>}}

Wenn ein niedrigerer Schwellenwert festgelegt wird, gilt im Allgemeinen:

1.  Lassen Sie vorhandene Regeln so wie sie sind und fügen Sie eine neue Regel mit dem niedrigeren Schwellenwert hinzu.
2.  Sobald die neue Regel eingerichtet ist, löschen Sie die alte Regel erst, wenn die Aktionsdauer der alten Regel abgelaufen ist.

Wenn Sie einen höheren Schwellenwert einstellen (wenn legitime Clients blockiert werden), erhöhen Sie den Schwellenwert innerhalb der bestehenden Regel.

___

## Aufgabe 2: Erweiterte Kriterien konfigurieren (nur Business und Enterprise Plan)

Mit der Option **Erweiterte Kriterien** werden die HTTP-Methoden, Header-Antworten und Origin Response Codes konfiguriert, für die Ihre Durchsatzbegrenzungsregel gelten soll.

Zur Konfiguration erweiterter Kriterien für eine neue oder vorhandene Regel gehen Sie so vor:

1\. Öffnen Sie **Erweiterte Kriterien**.

![Verfügbare Felder bei der Konfiguration der erweiterten Kriterien für eine Durchsatzbegrenzungsregel.](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. Wählen Sie einen Wert aus der Dropdown-Liste **„Methode(n)“** aus. _ANY_ ist ein Standardwert, der auf alle HTTP-Methoden passt.

3\. Filtern Sie nach **HTTP Antwort-Header(n)**. Klicken Sie auf **Header-Antwortfeld hinzufügen**, um die von Ihrem Ursprungs-Webserver zurückgegebenen Header einzuschließen.

Der Header **CF-Cache-Status** wird standardmäßig angezeigt, damit Cloudflare zwischengespeicherte Ressourcen bedienen kann, anstatt diese Ressourcen über die Durchsatzbegrenzung zu begrenzen. Um auch die Durchsatzbegrenzung für gecachte Ressourcen zu aktivieren, entfernen Sie diesen Header, indem Sie auf die Schaltfläche **X** klicken, oder aktivieren Sie „**Durchsatzbegrenzung auch auf gecachte Assets anwenden**“.

Wenn Sie mehr als einen Header unter **HTTP-Antwort-Header** eintragen, gilt eine boolesche _UND_\-Logik. Um einen Header auszuschließen, verwenden Sie die Option _„Ungleich“_. Bei jedem Header wird die Groß-/Kleinschreibung beachtet.

4\. Geben Sie unter **Origin Response code(s)** den numerischen Wert jedes abzugleichenden HTTP-Antwortcodes ein.  Trennen Sie zwei oder mehr HTTP-Codes durch ein Komma, zum Beispiel: `401,  403` 

5\. (Optional) Konfigurieren Sie zusätzliche Features zur Durchsatzbegrenzung, die auf Ihrem Tarif basieren.

6. Klicken Sie auf **Speichern und bereitstellen**.

___

## Aufgabe 3: Erweiterte Antwort konfigurieren (nur Business und Enterprise Plan)

Mit der Option **Erweiterte Antwort** wird das Informationsformat konfiguriert, das Cloudflare zurückgibt, wenn der Threshold einer Regel überschritten wird. Verwenden Sie die Option **Erweiterte Antwort**, wenn Sie statischen Klartext oder JSON-Inhalt zurückgeben möchten.

So konfigurieren Sie eine Klartext- oder JSON-Antwort:

1\. Öffnen Sie **Erweiterte Antwort**.

![Verfügbare Felder bei der Konfiguration der Erweiterten Reaktion für eine Durchsatzbegrenzungsregel.](/images/support/previous-rate-limiting-advanced-response.png)

2\. Wählen Sie einen anderen **Reaktionstyp** als den Standard: _Benutzerdefiniertes JSON_ oder _Benutzerdefiniertes TEXT_.

3\. Geben Sie die Klartext- oder JSON-Antwort ein, die Sie zurückgeben möchten. Die maximale Antwortgröße beträgt 32 KB.

4\. (Optional) Konfigurieren Sie zusätzliche Features zur Durchsatzbegrenzung, die auf Ihrem Tarif basieren.

5\. Klicken Sie auf **Speichern und bereitstellen**.

### Eine benutzerdefinierte HTML-Seite oder eine Umleitung verwenden

Wenn Sie eine benutzerdefinierte HTML-Seite anzeigen möchten, konfigurieren Sie im Dashboard eine benutzerdefinierte Seite für HTTP-429-Fehler („Zu viele Anfragen“). Cloudflare zeigt diese Seite an, wenn Sie „Standardseite für Cloudflare-Durchsatzbegrenzung“ im **Antworttyp** auswählen (der Standardwert für das Feld).

Mit dieser Methode können Sie einen Client mit Durchsatzbegrenzung zu einer bestimmten URL umleiten:

1\. Erstellen Sie eine HTML-Seite auf Ihrem Server, die auf die endgültige URL der Seite umleitet, die Sie anzeigen möchten. Fügen Sie einen [Meta-Refresh](https://www.w3.org/TR/WCAG20-TECHS/H76.html)\-Tag in den Seiteninhalt ein, wie im folgenden Beispiel:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!doctype html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;title&gt;Custom RL-Seite&lt;/title&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

Notieren Sie sich die öffentliche URL der erstellten Seite.

2\. Gehen Sie im Cloudflare-Dashboard zu **Kontostartseite** > **Konfiguration** > **Benutzerdefinierte Seiten**.

3\. Klicken Sie unter **429-Fehler** auf **Benutzerdefinierte Seiten**.

4\. Geben Sie die URL der Seite ein, die Sie auf Ihrem Server erstellt haben – die Seite mit dem Meta-Refresh-Tag – und klicken Sie auf **Veröffentlichen**.

Gehen Sie genauso vor, wenn Sie Klartext- oder JSON-Inhalte zurückgeben möchten, die Antwort aber größer als 32 KB ist. In diesem Fall wäre die Umleitungs-URL die URL der Klartext- oder JSON-Ressource, die Sie anzeigen möchten.

**Hinweise:**

-   Ihre Regel zur Durchsatzbegrenzung darf nicht mit der Umleitungs-URL übereinstimmen, die Sie in die benutzerdefinierte HTML-Seite für 429-Fehler aufgenommen haben.
-   Zum Schutz vor Denial-of-Service-Angriffen sollte die Seite für die Umleitung nur Ressourcen enthalten, die von Cloudflare zwischengespeichert werden.

___

## Aufgabe 4: Bypass-Option konfigurieren (nur Enterprise Plan)

**Bypass** erstellt eine Genehmigungsliste oder Ausnahme, damit auf bestimmte URLs keine Aktionen angewendet werden, auch wenn die Durchsatzbegrenzung erreicht wird. Konfigurieren Sie einen **Bypass** in folgenden Schritten:

1\. Öffnen Sie **Bypass**.

2\. Geben Sie bei **Regel für diese URLs umgehen** die URL(s) ein, die von der Durchsatzbegrenzungsregel ausgenommen werden sollen. Geben Sie jede URL in einer eigenen Zeile ein. Ein „HTTP“ oder „HTTPS“, das in der URL angegeben ist, wird beim Speichern der Regel automatisch entfernt. Sie gilt stattdessen sowohl für HTTP als auch für HTTPS.

![Konfigurieren Sie zwei URLs, die für eine Durchsatzbegrenzungsregel umgangen werden sollen (eine pro Zeile).](/images/support/previous-rate-limiting-bypass.png)

3\. (Optional) Konfigurieren Sie zusätzliche Features zur Durchsatzbegrenzung, die auf Ihrem Tarif basieren.

4\. Klicken Sie auf **Speichern und bereitstellen**.

___

## Reihenfolge der Regelausführung

**Anwendungsfall 1**: Wenn eine Anfrage beide folgenden Regeln erfüllt,

-   Regel 1: Übereinstimmung mit _test.example.com_
-   Regel 2: Übereinstimmung mit _\*.example.com\*_

oder

-   Regel 1: Übereinstimmung mit _\*.example.com\*_
-   Regel 2: Übereinstimmung mit _test.example.com_

Regel 2 wird immer zuerst ausgelöst, da sie zuletzt erstellt wurde.

**Anwendungsfall 2:** Das Entfernen des Sternchens (\*) am Ende der Domain führt dazu, dass die Regelausführung davon abhängt, welche Regel zuletzt erstellt wurde**.**

-   Regel 1: Übereinstimmung mit _test.example.com_
-   Regel 2: Übereinstimmung mit _\*.example.com\*_

Die obige Regel 2 wird zuerst ausgelöst, wenn eine Anfrage mit beiden Regeln übereinstimmt.

-   Regel 1: Übereinstimmung mit _\*.example.com\*_
-   Regel 2: Übereinstimmung mit _test.example.com_

Die obige Regel 2 wird zuerst ausgelöst, wenn eine Anfrage mit beiden Regeln übereinstimmt.

___

## Verwandte Ressourcen

-   [Wie wird die Durchsatzbegrenzung in ELS (Enterprise Log Share) gemeldet?](/logs/reference/log-fields)
-   [Fehlerbehebung bei der Durchsatzbegrenzung von Cloudflare](https://support.cloudflare.com/hc/articles/115000546328)
-   [Durchsatzbegrenzung über die Cloudflare-API konfigurieren](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
