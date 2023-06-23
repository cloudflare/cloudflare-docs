---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/205893698-Configuraci%C3%B3n-de-Cloudflare-y-Heroku-a-trav%C3%A9s-de-HTTPS
title: Configuración de Cloudflare y Heroku a través de HTTPS
---

# Configuración de Cloudflare y Heroku a través de HTTPS

Heroku es una PaaS en la nube que admite varios lenguajes de programación previamente configurados. Heroku se ocupa de toda su infraestructura para que pueda centrarse en su aplicación sin tener que trabajar en la línea de comandos.

En este artículo, se describe cómo configurar Heroku con Cloudflare para gestionar su tráfico a través de HTTPS. En este artículo, asumiremos que tiene un [dominio activo en Cloudflare](https://support.cloudflare.com/hc/en-us/sections/200820158-CloudFlare-101), así como una aplicación de Heroku en ejecución.

## Añada un dominio personalizado a su aplicación de Heroku

1.  Regístrese en Heroku, seleccione su aplicación y vaya a **Configuración.**
2.  Desplácese a **Dominios y certificados** y haga clic en **Añadir dominio** para añadir su dominio.

Si gestiona Heroku a través de CLI, puede añadir un dominio con este comando:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">heroku domain:add [example.com]</span></div></span></span></span></code></pre>{{</raw>}}

## Configure su DNS de Cloudflare

**IMPORTANTE:** Ignore el CNAME de Heroku recomendado que se haya creado en el paso anterior (example.com.herokudns.com). Las funciones de seguridad y velocidad de Cloudflare no se pueden utilizar con este registro. En su lugar, utilice el nombre de dominio de Heroku predeterminado que se facilita para la aplicación (generalmente, el formato es como este: _cf-solutions.herokuapp.com_).

## Añada un subdominio

Para comenzar, inicie sesión en su cuenta de Cloudflare, vaya a la aplicación **DNS** y añada la entrada _CNAME_ para la aplicación de Heroku.

![Screen_Shot_2018-01-23_at_2.58.16_PM.png](/images/support/Screen_Shot_2018-01-23_at_2.58.16_PM.png)

## Añada su dominio raíz

Para añadir un dominio raíz o vértice en Heroku, se requiere utilizar un registro CNAME que se dirija desde su raíz. No puede utilizar los registros A en Heroku porque no hay direcciones IP expuestas para que utilicen los usuarios de Heroku.

Afortunadamente, Cloudflare ofrece [CNAME flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root) para resolver solicitudes de su dominio raíz. Simplemente, añada un registro CNAME para su raíz (por ejemplo, kingkong.com) y apúntelo al mismo nombre de servidor (cf-solutions.kerokuapp.com). 

## Confirme que su dominio se enrute a través de Cloudflare

La forma más sencilla de confirmar que Cloudflare funciona en su dominio es emitir un comando cURL.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤  curl -I www.kingkong.solutionsHTTP/1.1 200 OKFecha: martes, 23 de enero de 2018 a las 18:51:30 GMTTipo de contenido: text/html; charset=UTF-8Conexión: keep-aliveConfiguración de cookie: __cfduid=daeef1c4f83da8dd3ae5745d5e869b78e1516733490; expires=Wed, 23-Jan-19 18:51:30 GMT; path=/; domain=.www.kingkong.solutions; HttpOnlyControl de memoria caché: public, max-age=0Última modificación: lunes, 31 de diciembre de 1979 04:08:00 GMTX con tecnología de: ExpressServidor: cloudflareCF-RAY: 3e1cf1d936f28c52-SFO-DOG</span></div></span></span></span></code></pre>{{</raw>}}

Puede identificar las solicitudes con proxy de Cloudflare mediante la cookie _\_\_cfuid_ o el encabezado de respuesta _CF-Ray_. Si alguno de estos dos se encuentra presente, entonces Cloudflare redirige sus solicitudes por proxy en consecuencia.

Puede repetir el comando cURL anterior para cualquiera de los subdominios que haya establecido en su configuración de DNS.

## Configure su dominio para SSL

1.  Cloudflare ofrece un certificado comodín de SAN en todos los planes de pago, y un certificado comodín de SNI con el plan gratuito. Puede encontrar aquí información detallada sobre SSL[](https://www.cloudflare.com/ssl).
2.  Si no sabe lo que esto significa, simplemente vaya a la aplicación **Crypto** del panel de Cloudflare. Seleccione el modo _Flexible_ para gestionar su sitio a través de HTTPS para todos los visitantes públicos:

Una vez que el estado del certificado cambie a **• Certificado activo**, se gestionará el tráfico entrante a su sitio a través de HTTPS (es decir, los visitantes verán HHTTPS con el prefijo de su nombre de dominio en la barra del navegador).  

## Fuerce todo el tráfico a través de HTTPS.

Para forzar todo el tráfico a través de HTTPS, utilice la aplicación **Page Rules** que se encuentra en el panel de Cloudflare:

Una vez que vaya a la aplicación Page Rules, puede empezar a añadir nuevas reglas que abarquen el dominio en su totalidad:

![Capto_Capture_2018-01-23_03-17-19_PM.png](/images/support/Capto_Capture_2018-01-23_03-17-19_PM.png)

Escriba su page rule (p. ej., «http://\*example.com/\*») y haga clic en **Save and Deploy**.

A continuación, puede utilizar un comando cURL similar al anterior para verificar que todas las solicitudes se están forzando a través de HTTPS.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤  curl -I -L kingkong.solutionsHTTP/1.1 301 Moved PermanentlyFecha: martes, 23 de enero de 2018 a las 23:17:44 GMTConexión: keep-aliveControl de memoria caché: max-age=3600Caducidad: miércoles, 24 de enero de 2018 a las 00:17:44 GMTUbicación: https://kingkong.solutions/Servidor: cloudflareCF-RAY: 3e1e77d5c42b8c52-SFO-DOG</span></div></span></span></span></code></pre>{{</raw>}}

Si el SSL no funciona en su dominio (p. ej., aún no se ha emitido su certificado SSL), aparecerá una respuesta HTTP [525](https://support.cloudflare.com/hc/en-us/articles/200278659-Error-525-SSL-handshake-failed) o [526](https://support.cloudflare.com/hc/en-us/articles/200721975-Error-526-Invalid-SSL-certificate) después del redireccionamiento.

Tenga en cuenta que la emisión del certificado SSL universal generalmente tarda un máximo de 24 horas. Nuestros certificados SSL de pago se emiten en un periodo de 10 a 15 minutos.
