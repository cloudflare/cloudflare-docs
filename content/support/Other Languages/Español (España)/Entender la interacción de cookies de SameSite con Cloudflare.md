---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360038470312-Entender-la-interacci%C3%B3n-de-cookies-de-SameSite-con-Cloudflare
title: Entender la interacción de cookies de SameSite con Cloudflare
---

# Entender la interacción de cookies de SameSite con Cloudflare



## Información general

[La cookie SameSite de Google Chrome](https://www.chromium.org/updates/same-site) cambia el modo en el que Google Chrome gestiona el control de SameSite.  Google fuerza a SameSite a proteger ante las cookies de marketing que rastrean a los usuarios y la Falsificación de solicitud en sitios cruzados (CSRF), que permite a los atacantes robar o manipular tus cookies.  

La cookie SameSite tiene 3 modos diferentes:

-   **Estricto**: las cookies las crea la propia parte (el dominio visitado). Por ejemplo, Cloudflare establece una cookie propia al visitar Cloudflare.com.
-   **Laxo**: las cookies solo se envían al vértice del dominio (p. ej. _\*.foo.com_).  Por ejemplo, si alguien (_blog.naughty.com_) vinculó directamente una imagen (_img.foo.com/bar.png_), el cliente no envía una cookie a _img.foo.com_, ya que no es ni propia ni un contexto de vértice.
-   **Ninguno**: las cookies se envían con todas las solicitudes.

La configuración de SameSite para las [cookies de Cloudflare](https://support.cloudflare.com/hc/articles/200170156) incluyen:

| Cookie de Cloudflare | Configuración de SameSite | Solo HTTP |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | No |
| \_\_cf\_bm | SameSite=None; Secure | Sí |
| cf\_clearance | SameSite=None; Secure | Sí |
| \_\_cfruid | SameSite=None; Secure | Sí |
| \_\_cflb | SameSite=Lax | No |

___

## Problemas conocidos con las cookies SameSite y cf\_clearance

Cuando un [CAPTCHA de Cloudflare](https://support.cloudflare.com/hc/articles/200170136) o un desafío de JavaScript se resuelve como una [**Regla de firewall**](https://support.cloudflare.com/hc/articles/360016473712) o una [**Regla de acceso IP**](https://support.cloudflare.com/hc/articles/217074967), se configura una cookie de **cf\_clearance** en el navegador del cliente. La cookie _cf\_clearance_ tiene una vida predeterminada de 30 minutos, pero se configura mediante la [**Duración del acceso autorizado**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) en la pestaña **Configuración** de la aplicación **Firewall** de Cloudflare .

Cloudflare utiliza **SameSite**\=_None_, ya que la cookie **cf\_clearance**, de modo que las solicitudes de los visitantes de diferentes nombres de host no se cumplan con desafíos o errores posteriores. Cuando se usa **SameSite**\=_None_, debe configurarse junto con la marca _Secure_.

El uso de la marca _Secure_ requiere el envío de la cookie mediante una conexión HTTP.  La cookie **cf\_clearance** se establece por defecto a **SameSite**\=_Lax_ si se utiliza HTTP en cualquier parte de tu sitio web y puede causar problems en el sitio web.

Si usas HTTP en cualquier parte de tu sitio web, la cookie **cf\_clearance** se establece por defecto a **SameSite**\=_Lax_, que podría hacer que tu sitio web no funcionarar correctamente. Para resolver el problema, traslada el tráfico de tu sitio web a HTTPS.  Cloudflare ofrece dos funciones para ayudar: 

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647), y 
-   [**Usar siempre HTTPS**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156).

___

## Recursos relacionados

-   [Más información sobre la cookie SameSite](https://web.dev/samesite-cookies-explained/) 
-   [Cómo funcionan las cookies de Cloudflare](https://support.cloudflare.com/hc/articles/200170156)
-   [Preguntas frecuentes sobre Cloudflare SSL](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Cómo comprender Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647)
