---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/206190798-Verwendung-von-Resolve-Override-in-Page-Rules
title: Verwendung von Resolve Override in Page Rules 
---

# Verwendung von Resolve Override in Page Rules 

## Verwendung von Resolve Override in Page Rules

Es ist jetzt mit Page Rules möglich, die URL oder IP zu überschreiben, zu der eine Anfrage aufgelöst wird. Dieses Feature steht nur Enterprise-Kunden zur Verfügung.

Ein häufiger Anwendungsfall für diese Funktionalität ist, wenn Sie eine Anwendung über den URI bereitstellen (z. B. mydomain.com/app). In diesem Fall befindet sich die „App“ möglicherweise auf einem anderen Server und kann sogar von einer dritten Partei gehostet werden. Anfragen an diesen Endpunkt müssen an den Server für diese Anwendung des Drittanbieters gerichtet werden. Sie können einen CNAME-Host angeben.

**Wichtig: Der CNAME-Eintrag muss innerhalb des Cloudflare-DNS existieren**.

Um sicherzustellen, dass Sie die vollständige Kontrolle über diese Einträge haben, wird empfohlen, das Resolve Override innerhalb desselben Zonennamens zu setzen.

1.  Erstellen Sie den DNS-Eintrag.

-   Im nächsten Schritt gibt es mehrere richtige Wege, um das Gleiche zu erreichen, und Ihr Setup kann sich drastisch unterscheiden. Wenn Sie für diesen Teil zusätzliche Unterstützung benötigen, wenden Sie sich an den Support mit Angabe Ihres Setups und dem gewünschten Endergebnis. In meinem Beispiel habe ich keinen Host in meinem s3-Bucket eingerichtet, also werde ich einfach den generischen s3-Host-Header auflösen, und ich möchte, dass alle Anfragen aus meinem /app-Unterverzeichnis in diesen s3-Bucket gehen. 

![pagerule.png](/images/support/pagerule.png)
