---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/204144518-H%C3%A4ufige-Fragen-zu-SSL
title: Häufige Fragen zu SSL
---

# Häufige Fragen zu SSL



### Ich habe mehrere Cloudflare-Zertifikate. Welches wird verwendet?

Cloudflare-Zertifikate werden nach [Zertifikatstyp](https://support.cloudflare.com/hc/articles/203295200) und auch nach dem spezifischsten Hostnamen priorisiert.  Im Allgemeinen erfolgt die Priorisierung von SSL-Zertifikaten von der höchsten zur niedrigsten Priorität wie folgt:

-   [Benutzerdefinierte SSL](https://support.cloudflare.com/hc/articles/200170466)
-   [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)

Ausnahmen von der allgemeinen Priorisierung erfolgen basierend auf der Spezifität des Hostnamens.  Zertifikate, die einen bestimmten Hostnamen erwähnen, werden Wildcard-Zertifikaten vorgezogen.  Beispielsweise hat ein universelles SSL-Zertifikat, das _www.example.com_ explizit erwähnt, Vorrang vor einem Zertifikat, das mit dem Hostnamen _www_ über eine Wildcard wie _\*.example.com_ übereinstimmt.

___

### Hilft das SSL-Zertifikat von Cloudflare bei der Suchmaschinenoptimierung?

Ja, Google hat angekündigt, dass [HTTPS als Ranking-Signal für SEO](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html) verwendet wird.

Weitere SEO-Verbesserungen finden Sie in unserem Artikel zur [Verbesserung des SEO-Rankings mit Cloudflare](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-).

___

### Unterstützt Cloudflare SSL Internationalized Domain Names (IDN)?

Cloudflare unterstützt Doppelbyte-/IDN-/Punycode-Domains.  Domains mit nicht lateinischen Zeichen erhalten SSL-Zertifikate wie alle anderen zu Cloudflare hinzugefügten Domains.

___

### Wie lange dauert es, bis das SSL-Zertifikat von Cloudflare aktiviert ist?

Wenn Cloudflare Ihr [autoritativer DNS-Anbieter](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver) ist, werden Universal SSL-Zertifikate in der Regel innerhalb von 15 Minuten nach der Domainaktivierung bei Cloudflare ausgestellt und erfordern nach der Domainaktivierung keine weiteren Kundenaktionen.  Wenn Sie alternativ [Cloudflare-Dienste über CNAME-Einträge](https://support.cloudflare.com/hc/articles/360020615111) verwenden, die bei Ihrem autoritativen DNS-Anbieter festgelegt wurden, müssen für die Bereitstellung Ihres Universal SSL-Zertifikats bei Ihrem autorisierenden DNS-Anbieter manuell [DNS-Bestätigungs-Einträge](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509) hinzugefügt werden.  Dedizierte SSL-Zertifikate werden in der Regel auch innerhalb von 15 Minuten ausgestellt.

Wenn die Zertifizierungsstelle eine manuelle Überprüfung der Marken-, Phishing- oder TLD-Anfragen erfordert, kann die Ausstellung eines universellen SSL-Zertifikats länger als 24 Stunden dauern.

___

### Was bedeutet eine ungültige SSL-Markenprüfung?

Einige Domains sind nicht für das universelle SSL berechtigt, wenn sie Wörter enthalten, die mit markenrechtlich geschützten Domains in Konflikt stehen.

Um dieses Problem zu beheben, können Sie entweder:

-   [Ihr eigenes Zertifikat](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) hochladen, wenn sich die Domain in einem Business- oder [Enterprise-Plan](https://www.cloudflare.com/enterprise-service-request) befindet, oder
-   ein [dediziertes Zertifikat](https://support.cloudflare.com/hc/en-us/articles/228009108-Dedicated-SSL-Certificates) kaufen

___

### Wie leite ich alle Besucher zu HTTPS/SSL um?

Um den Datenverkehr für alle Subdomains und Hosts in Ihrer Domain umzuleiten, aktivieren Sie die Funktion **Immer HTTPS verwenden** in der Cloudflare-App **SSL/TLS**.  Wenn Sie nicht möchten, dass Ihre gesamte Website zu HTTPS umgeleitet wird, leiten Sie die Website mithilfe der Cloudflare-App **[Seitenregeln](https://support.cloudflare.com/hc/en-us/articles/218411427)** auf URL-Basis um.

Während Sie Ihre Website über Cloudflare schützen, wird nicht empfohlen, Weiterleitungen auf Ihrem Ursprungswebserver durchzuführen:

-   Weiterleitungen von Seitenregeln werden am Cloudflare-Edge verarbeitet, was zu einer schnelleren Antwort und einer Reduzierung der Anfragen an Ihren Server führt.
-   Ursprungswebserver-Umleitungen können [Umleitungsschleifenfehler](https://support.cloudflare.com/hc/articles/115000219871) verursachen.

Bei der Konfiguration von Seitenregeln ist die Aktion _Immer HTTPS verwenden_ die einfachste Methode, um HTTP-Anfragen an HTTPS umzuleiten.  Sie können auch die Funktion _„Forwarding URL“_ (URL Weiterleiten) mit einem _301_\-Redirect verwenden, wenn Sie neben der Erzwingung von HTTPS noch an eine andere Subdomain umleiten müssen. Zum Beispiel eine Seitenregelübereinstimmung für


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

mit einer _Umleitungs-URL_ von


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com/$1</span></div></span></span></span></code></pre>{{</raw>}}

leitet Anfragen für die Root-Domain von _example.com_ unter Beibehaltung des URL-Verzeichnisses auf die Subdomain _www.example.com_ um.

{{<Aside type="note">}}
Die Aktion *Immer HTTPS verwenden* wird nur angezeigt, wenn in Ihrer
Zone ein Cloudflare-SSL-Zertifikat aktiv ist.
{{</Aside>}}

Erzwingen von HTTPS löst keine Probleme mit [gemischtem Inhalt](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-), da Browser das Protokoll der enthaltenen Ressourcen überprüfen, bevor Sie eine Anfrage senden. Sie müssen nur relative Links oder HTTPS-Links auf Seiten verwenden, die Sie nach HTTPS zwingen. Cloudflare kann einige Links mit gemischtem Inhalt automatisch mit unserer Funktionalität [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-) auflösen.

___

### Funktioniert SSL auch bei Hosting-Partnern?

Für alle neuen Cloudflare-Domains, die über einen Hosting-Partner über CNAME- und Full DNS-Integrationen hinzugefügt wurden, ist ein kostenloses universelles SSL-Zertifikat verfügbar.

{{<Aside type="note">}}
Bei Domains, die vor dem 9. Dezember 2016 zu Cloudflare hinzugefügt
wurden, muss der Hosting-Partner die Domain löschen und erneut zu
Cloudflare hinzufügen, um das SSL-Zertifikat bereitzustellen.
{{</Aside>}}

Stellen Sie über Cloudflare einen Proxy für eine Unterdomain bereit, um das Free Universal SSL-Zertifikat bereitzustellen.

___

### Sind Cloudflare-SSL-Zertifikate freigegeben?

Universelle SSL-Zertifikate werden für mehrere Kunden in mehreren Domains gemeinsam genutzt. Wenn die gemeinsame Nutzung von Zertifikaten ein Problem darstellt, empfiehlt Cloudflare ein [dediziertes oder benutzerdefiniertes SSL-Zertifikat](https://support.cloudflare.com/hc/articles/203295200).

___

### Auf meiner Website ist ein SSL-Zertifikat installiert. Warum wird ein Cloudflare-Zertifikat angezeigt?

Cloudflare muss den Datenverkehr entschlüsseln, um schädlichen Datenverkehr zwischenzuspeichern und zu filtern. Cloudflare verschlüsselt den Datenverkehr neu oder sendet Textdatenverkehr an den Ursprungswebserver, je nachdem, welche [SSL-Option](https://support.cloudflare.com/hc/articles/200170416) in der App **SSL/TLS** ausgewählt wurde.

___

### Ich möchte, dass Cloudflare ein SSL-Zertifikat verwendet, das ich bei einem anderen Anbieter gekauft habe

Domains in Business- und Enterprise-Plänen dürfen ein [benutzerdefiniertes SSL-Zertifikat](https://support.cloudflare.com/hc/articles/200170466) hochladen.

___

### Wie erzwinge ich für meine Website die ausschließliche Verwendung von HTTPS/SSL?

Aktivieren Sie die Funktion „Immer HTTPS verwenden“ in der Cloudflare-App **SSL/TLS** oder [über die App **Seitenregeln**](https://support.cloudflare.com/hc/articles/200170536), um den gesamten Datenverkehr für HTTPS zu erzwingen.

___

### Umfasst Project Galileo die SSL-Unterstützung?

Kunden von Project Galileo können den Datenverkehr auf der Website mit Cloudflares [kostenlosem universellen SSL-Zertifikat](https://www.cloudflare.com/ssl) sichern.

___

### Hat die Aktivierung von Cloudflare Auswirkungen auf die TLS 1.2-Anforderungen von PayPal?

Nein. Da Cloudflare keine direkten Proxy-Verbindungen zu paypal.com herstellt, hat die Aktivierung von Cloudflare für Ihre Domain keinen Einfluss darauf, wie TLS-Verbindungen hergestellt werden.

Um festzustellen, ob Ihr Server oder Browser diese Standards unterstützt, rufen Sie [https://tlstest.paypal.com](https://tlstest.paypal.com/) von einem Client oder Browser aus auf, der PayPal verwendet. Eine Antwort von **PayPal\_Connection\_OK** zeigt an, dass der Client TLS-Standards, die mit PayPal kompatibel sind, bereits unterstützt.

___

### Wie kann ich ein SSL-Zertifikat aus den Rechenzentren von Cloudflare in China bereitstellen?

Cloudflares [universelles SSL-](https://support.cloudflare.com/hc/articles/204151138) und [dediziertes SSL](https://support.cloudflare.com/hc/articles/228009108)\-Zertifikat werden in China nicht bereitgestellt.  Befindet sich Ihre Domain in einem Enterprise-Plan und wurde der Zugriff auf Rechenzentren in China gewährt, wird in den Rechenzentren von Cloudflare in China nur ein SSL-Zertifikat für Ihre Domain unter den folgenden Bedingungen bereitgestellt:

1.  Sie haben ein [benutzerdefiniertes SSL-Zertifikat](https://support.cloudflare.com/hc/articles/200170466) hochgeladen.
2.  **„Private Schlüssel in China zulassen (benutzerdefinierte Zertifikate)“** ist in der Cloudflare-App **SSL/TLS** auf _Ein_ eingestellt.

___

### Unterstützt Cloudflare die TLS-Client-Authentifizierung?

TLS-Client-Authentifizierung überprüft, ob ein von einem Client vorgelegtes Zertifikat vom Root-Zertifizierungsstellenzertifikat des Unternehmens signiert ist.  Durch Überprüfung dieses Zertifikats bei jeder Anfrage kann der Zugriff auf autorisierte Clientverbindungen beschränkt werden.  Informationen zum Aktivieren der TLS-Client-Authentifizierung über Cloudflare finden Sie in unserer Dokumentation zu [Gegenseitige TLS-Authentifizierung](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

___

### Wie aktiviere ich Universal-SSL mit GitHub?

Weitere Informationen zur [Verwendung von Cloudflares Universal SSL mit GitHub-Seiten finden Sie im Cloudflare-Blogbeitrag](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/).
