---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200170566-Fehlersuche-und-behebung-bez%C3%BCglich-SSL-Fehler
title: Fehlersuche und -behebung bezüglich SSL-Fehler 
---

# Fehlersuche und -behebung bezüglich SSL-Fehler 



## Überblick

Bis Cloudflare ein SSL-Zertifikat für Ihre Domain bereitstellt, werden die folgenden Fehler in verschiedenen Browsern für HTTPS-Verkehr angezeigt:

**Firefox**

     _ssl\_error\_bad\_cert\_domain_    _Diese Verbindung ist nicht vertrauenswürdig_

**Chrome**

     _Ihre Verbindung ist nicht privat_

**Safari**

     _Safari kann die Identität der Website nicht überprüfen_

**Edge / Internet Explorer**

     _Es gibt ein Problem mit dem Sicherheitszertifikat dieser Website_

Selbst mit einem für Ihre Domain bereitgestellten Cloudflare-SSL-Zertifikat zeigen ältere Browser Fehler zu nicht vertrauenswürdigen SSL-Zertifikaten an, da sie das von Cloudflare Universal SSL-Zertifikaten verwendete SNI-Protokoll [nicht unterstützen](https://en.wikipedia.org/wiki/Server_Name_Indication#Support).

Wenn andernfalls bei Verwendung eines neueren Browsers SSL-Fehler auftreten, überprüfen Sie die folgenden häufigen Ursachen für SSL-Fehler:

-   [Umleitungsschleifenfehler oder HTTP 525- oder 526-Fehler](https://support.cloudflare.com/hc/de/articles/200170566-Fehlersuche-und-behebung-bez%C3%BCglich-SSL-Fehler#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [Nur einige Ihrer Subdomains geben SSL-Fehler zurück](https://support.cloudflare.com/hc/de/articles/200170566-Fehlersuche-und-behebung-bez%C3%BCglich-SSL-Fehler#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [Ihr Cloudflare Universal SSL-Zertifikat ist nicht aktiv](https://support.cloudflare.com/hc/de/articles/200170566-Fehlersuche-und-behebung-bez%C3%BCglich-SSL-Fehler#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [OCSP-Antwortfehler](https://support.cloudflare.com/hc/de/articles/200170566-Fehlersuche-und-behebung-bez%C3%BCglich-SSL-Fehler#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [SSL abgelaufen oder SSL-Fehler](https://support.cloudflare.com/hc/de/articles/200170566-Fehlersuche-und-behebung-bez%C3%BCglich-SSL-Fehler#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### Umleitungsschleifenfehler oder HTTP 525- oder 526-Fehler

**Symptom**

Besucher beobachten beim Browsen zu Ihrer Domain [Umleitungsschleifenfehler](https://support.cloudflare.com/hc/articles/115000219871) oder HTTP-[525-](https://support.cloudflare.com/hc/articles/115003011431#525error) oder [\-526-Fehler](https://support.cloudflare.com/hc/articles/115003011431#526error). Diese Fehler treten auf, wenn die aktuelle Cloudflare-SSL-Option in der Cloudflare-App **SSL/TLS** nicht mit der Konfiguration Ihres Ursprungswebservers kompatibel ist.

**Lösung**

Informationen zu Umleitungsschleifenfehlern finden Sie in unserer Anleitung zur [Fehlerbehebung von Umleitungsschleifen](https://support.cloudflare.com/hc/articles/115000219871).

Informationen zum Beheben von HTTP-[525-](https://support.cloudflare.com/hc/articles/115003011431#525error) oder [526](https://support.cloudflare.com/hc/articles/115003011431#526error)\-Fehlern finden Sie in den unten angegebenen empfohlenen SSL-Konfigurationen. Zum Beispiel, wenn Ihr Ursprungswebserver ...

-   entweder ein gültiges Zertifikat von einer Zertifizierungsstelle oder ein [Ursprungs-CA-Zertifikat](https://support.cloudflare.com/hc/articles/115000479507) von Cloudflare hat, dann verwenden Sie entweder die _[vollständige](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_ oder _[vollständige (strenge)](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_ **SSL**\-Option

-   selbstsignierte SSL-Zertifikate hat, verwenden Sie die [_vollständige_ **SSL**\-Option](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)

-   kein installiertes SSL-Zertifikat hat, verwenden Sie die [_flexible_ **SSL**\-Option](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef).

___

### Nur einige Ihrer Subdomains geben SSL-Fehler zurück

**Symptom**[Cloudflare Universal SSL-Zertifikate](https://support.cloudflare.com/hc/articles/204151138) und reguläre [dedizierte SSL-Zertifikate](https://support.cloudflare.com/hc/articles/228009108) decken nur die Root-Domain (_example.com_) und eine Ebene von Subdomains (_\*.example.com_) ab. Wenn Besucher Ihrer Domain Fehler beim Zugriff auf eine zweite Ebene von Subdomains in ihrem Browser feststellen (z. B. _dev.www.example.com_), jedoch nicht auf die erste Ebene von Subdomains (z. B. _www.example.com)_, beheben Sie das Problem mit einer der folgenden Methoden.

**Lösung**

-   Stellen Sie sicher, dass sich die Domain mindestens in einem Business-Plan befindet, und laden Sie ein [benutzerdefiniertes SSL-Zertifikat](https://support.cloudflare.com/hc/articles/200170466) hoch, das _dev.www.example.com_ abdeckt; oder
-   kaufen Sie ein [dediziertes SSL-Zertifikat mit benutzerdefinierten Hostnamen](https://support.cloudflare.com/hc/articles/228009108), das _dev.www.example.com_ abdeckt; oder
-   wenn Sie ein gültiges Zertifikat für die Subdomains der zweiten Ebene auf Ihrem Ursprungswebserver haben, klicken Sie auf das orangefarbene Wolkensymbol neben dem Hostnamen _dev.www_ in der Cloudflare-App **DNS** für _example.com_.

___

### Ihr Cloudflare Universal SSL-Zertifikat ist nicht aktiv

**Symptom**

Alle aktiven Cloudflare-Domains erhalten ein universelles [SSL-Zertifikat](https://support.cloudflare.com/hc/articles/204151138). Wenn Sie SSL-Fehler beobachten und kein Zertifikat des **Typs** _Universal_ im Abschnitt **Edge-Zertifikate** der Cloudflare-App **SSL/TLS** für Ihre Domain haben, dann wurde das universelle SSL-Zertifikat noch nicht bereitgestellt.

{{<Aside type="note">}}
Cloudflare-SSL-Zertifikate gelten nur für Datenverkehr, der über
Cloudflare übertragen wird. Wenn SSL-Fehler nur für Hostnamen auftreten,
die nicht an Cloudflare weitergeleitet werden, geben Sie diese Hostnamen
über Cloudflare weiter:

-   Klicken Sie für Domains mit vollständigen DNS-Setups in Ihrer
    Cloudflare-App **DNS** auf das graue Wolkensymbol neben dem
    DNS-Hostnamen, bis das Symbol zu einer orangefarbenen Wolke wird.
-   Informationen zu Domains in CNAME-Setups finden Sie in unserem
    Handbuch zum [Hinzufügen von DNS-Einträgen zu einem
    CNAME-Setup](https://support.cloudflare.com/hc/articles/360020615111#h_836723523521544131668686).
{{</Aside>}}

Unsere SSL-Anbieter überprüfen jede SSL-Zertifikatanfrage, bevor Cloudflare ein Zertifikat für einen Domainnamen ausstellen kann. Dieser Vorgang kann zwischen 15 Minuten und 24 Stunden dauern. Unsere SSL-Zertifikatanbieter kennzeichnen manchmal einen Domainnamen zur weiteren Überprüfung.

**Lösung**

Wenn sich Ihre Domain in einem [CNAME-Setup](https://support.cloudflare.com/hc/articles/360020348832) befindet:

Bestätigen Sie, ob Sie CAA DNS-Einträge bei Ihrem aktuellen Hosting-Anbieter aktiviert haben. Wenn ja, stellen Sie sicher, dass Sie [die Zertifizierungsstellen angeben, die Cloudflare](https://support.cloudflare.com/hc/articles/115000310832#h_645975761191543365946939) verwendet, um Zertifikate für Ihre Domain bereitzustellen.

Wenn [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) in Ihrer Domain im Abschnitt **Universal SSL deaktivieren** in der Cloudflare-App **SSL/TLS** deaktiviert ist:

-   Aktivieren Sie Universal SSL in der Cloudflare-App **SSL/TLS**, oder
-   kaufen Sie ein [dediziertes SSL](https://support.cloudflare.com/hc/articles/228009108)\-Zertifikat, oder
-   laden Sie ein [benutzerdefiniertes SSL-Zertifikat](https://support.cloudflare.com/hc/articles/200170466) in Cloudflare hoch.

Wenn Ihr Cloudflare-SSL-Zertifikat nicht innerhalb von 24 Stunden nach Aktivierung der Cloudflare-Domain ausgestellt wird:

-   Wenn Ihr Ursprungswebserver über ein gültiges SSL-Zertifikat verfügt, halten Sie [Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753) vorübergehend an, und
-   [öffnen Sie ein Support-Ticket](https://support.cloudflare.com/hc/en-us/requests/new), um die folgenden Informationen bereitzustellen:  
    -   den betroffenen Domainnamen und
    -   einen Screenshot der festgestellten Fehler.

Wenn Sie Cloudflare vorübergehend anhalten, wird der HTTPS-Verkehr von Ihrem Ursprungswebserver ordnungsgemäß bereitgestellt, während das Supportteam das Problem untersucht.

{{<Aside type="tip">}}
Befindet sich Ihre Domain in einem [CNAME-Setup
(teilweise)](https://support.cloudflare.com/hc/articles/360020348832),
lesen Sie unseren Leitfaden zur [Bereitstellung von Cloudflare Universal
SSL in einem
CNAME-Setup](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509).
{{</Aside>}}

___

### OCSP-Antwortfehler

**Symptom**Besucher Ihrer Website beobachten einen OCSP-Antwortfehler.

**Lösung  
**  
Dieser Fehler wird entweder durch die Browserversion oder durch ein Problem verursacht, das von einem der SSL-Anbieter von Cloudflare behoben werden muss. Zur ordnungsgemäßen Diagnose öffnen Sie [ein Support-Ticket](https://support.cloudflare.com/hc/en-us/requests/new) mit den folgenden Informationen, die der Besucher zur Beobachtung des Browserfehlers bereitgestellt hat:

1.  Die Ausgabe von _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_
2.  Die Ausgabe von _https://example.com/cdn-cgi/trace_ vom Browser des Besuchers. Ersetzen Sie _example.com_ durch den Domainnamen Ihrer Website.

___

### SSL abgelaufen oder SSL-Fehler

**Symptom  
**  
Besucher beobachten Fehlermeldungen in ihrem Browser bezüglich des SSL-Ablaufs oder der Nichtübereinstimmung.

**Lösung**

-   den betroffenen Domainnamen und
-   einen Screenshot der festgestellten Fehler.

___

## Verwandte Ressourcen

-   [Umleitungsschleifenfehler](https://support.cloudflare.com/hc/articles/115000219871)
-   [Behebung von Fehlern durch „gemischten Inhalt“](https://support.cloudflare.com/hc/articles/200170476)
