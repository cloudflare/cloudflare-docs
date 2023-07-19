---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200169876-Warum-funktioniert-Auto-Minify-nicht-
title: Warum funktioniert Auto Minify nicht 
---

# Warum funktioniert Auto Minify nicht? 

## Warum funktioniert Auto Minify nicht?

Nach der Aktivierung minimiert Cloudflares Auto Minify Ihren HTML-Code und Ihre zwischengespeicherten CSS- und JS-Dateien. Wenn Sie die Quelle Ihrer Dateien in Ihrem Webbrowser oder über ein Befehlszeilentool wie cURL anzeigen und nicht sehen, dass der Code minimiert wird, sollten Sie Folgendes überprüfen:

-   Nur Dateien, die über Ihre mit einer orangefarbenen Woge markierten DNS-Einträge bereitgestellt werden, werden minimiert. Code in Domains von Drittanbietern, die Cloudflare nicht verwenden, wird daher nicht minimiert.
-   Für CSS- und JS-Dateien werden nur Cache-HITs minimiert. Mithilfe [dieser Anleitung](https://support.cloudflare.com/hc/articles/200172516) können Sie den Cache-Status einer einzelnen Datei überprüfen.
-   Diese Feature überspringt absichtlich die Minifikation für .js/.css\-Dateien mit .min im Namen.
-   Wenn Ihr Code schwerwiegende Syntaxfehler aufweist, kann Auto Minify den Code möglicherweise nicht erfolgreich minimieren. Verwenden Sie die Syntaxprüfer unten, um Ihre Dateien zu überprüfen.
-   Wir minimieren kein Inline-JS/-CSS in Ihrem HTML-Code.

Wenn Sie manuell überprüfen möchten, ob Ihre Dateien minimiert werden, können Sie ein Tool wie cURL nutzen, um die Antwort mit und ohne Cloudflare zu vergleichen. Wie das funktioniert, erfahren Sie in [dieser Anleitung](https://support.cloudflare.com/hc/en-us/articles/219304477-How-do-I-check-my-server-s-response-directly-without-Cloudflare-). Alternativ können Sie [den Quellcode](https://www.computerhope.com/issues/ch000746.htm) direkt in Ihrem Browser anzeigen.

Um die Syntax Ihres HTML-Codes bzw. Ihrer CSS- oder JS-Dateien zu überprüfen und nach möglichen Problemen zu suchen, empfehlen wir die Verwendung von Online-Validatoren/-Tools wie den folgenden:

-   HTML: [https://validator.w3.org/](https://validator.w3.org/)
-   CSS: [http://jigsaw.w3.org/css-validator/](http://jigsaw.w3.org/css-validator/)
-   JavaScript: [http://www.javascriptlint.com/online\_lint.php](http://www.javascriptlint.com/online_lint.php)

Wenn Sie feststellen, dass die Minifikation nach Überprüfung dieser Schritte immer noch nicht wirksam ist, wenden Sie sich bitte an den [Cloudflare-Support](https://support.cloudflare.com/hc/en-us/requests/new "Link: https://support.cloudflare.com/anonymous_requests/new"). Sie sollten dabei die URLs der Ressourcen angeben, bei denen Probleme auftreten.

**Hinweis:** CSS- und JS-Minifikation wird nur für zwischengespeicherte CSS- und JS-Dateien ausgeführt. Sobald Cloudflare einen Cache-HIT für die Datei zurückgibt, wird diese in minimierter Form an die Browser zurückgegeben. Dies ermöglicht es uns, ein vollständigeres Minifikationsergebnis zu liefern. Wenn Sie die Minifikation für CSS und JS aktivieren oder deaktivieren möchten, müssen Sie jetzt [Ihren Cloudflare-Cache löschen](https://support.cloudflare.com/hc/en-us/articles/200169246-How-do-I-purge-my-cache-), um die Auswirkungen einer Änderung der Minifikationseinstellungen zu sehen.
