---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200169806-C%C3%B3mo-solucionar-errores-de-rastreo
title: Cómo solucionar errores de rastreo
---

# Cómo solucionar errores de rastreo



## Descripción

Cloudflare incluye en lista blanca los rastreadores y bots de los motores de búsqueda. Si observas problemas de rastreo o controles de Cloudflare en el bot o rastreador del motor de búsqueda, [contacta a asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) y brinda la información que has reunido para solucionar los errores de rastreo a través de los métodos que se describen en esta guía.

___

## Ajustar los índices de rastreo de Google y Bing

Para optimizar el funcionamiento de CDN, Google y Bing asignan índices de rastreo especiales a los sitios web que usan los servicios de CDN en orden. Los índices de rastreo especiales no afectan de manera negativa la optimización del motor de búsqueda (SEO) y las páginas de resultados del motor de búsqueda (SERP). Para cambiar los índices de rastreo para Bing y Google, sigue la guía a continuación:

-   Para cambiar el índice de rastreo de Google, [revisa la documentación de Google](https://support.google.com/webmasters/answer/48620?hl=en).
-   Para cambiar el índice de rastreo de Bing, sigue la guía de la documentación de Bing:

-   [Control de rastreo de Bing](https://www.bing.com/webmaster/help/crawl-control-55a30302)
-   [Demora de rastreo y rastreador de Bing](https://blogs.bing.com/webmaster/2009/08/10/crawl-delay-and-the-bing-crawler-msnbot)

___

## Prevenir los errores de rastreo

Revisa las siguientes recomendaciones para prevenir los errores de rastreo:

-   Supervisa el funcionamiento y la disponibilidad de tu sitio web con una herramienta de terceros:
    -   [StatusCake](http://www.statuscake.com/)
    -   [Pingdom](http://www.pingdom.com/)
    -   [Monitor.Us](http://www.monitor.us/)
    -   [Updown](http://beta.updown.io/)

-   No bloquear las direcciones IP del rastreador de Google mediante las **Reglas del Firewall** o las **Reglas de Acceso de IP** en la aplicación del **Firewall** de Cloudflare.

{{<Aside type="tip">}}
Confirmar que la dirección IP corresponda a Google. Para ello, consultar
la documentación de Google en [verificación de direcciones IP de
googlebot](https://support.google.com/webmasters/bin/answer.py?answer=80553).
{{</Aside>}}

-   No bloquear Estados Unidos mediante las **Reglas del Firewall** o las **Reglas de Acceso de IP** en la aplicación del **Firewall**de Cloudflare.
-   No bloquear los agentes-usuarios de [Google](https://support.google.com/webmasters/answer/1061943) o [Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0) en la configuración de tu servidor, .htaccess, [robots.txt](http://support.google.com/webmasters/bin/answer.py?answer=35303) o la aplicación web.

{{<Aside type="tip">}}
Google utiliza una [variedad de
agentes-usuarios](https://support.google.com/webmasters/answer/1061943)
para rastrear tu sitio web. Puedes [probar tus archivos robots.txt a
través de
Google](https://support.google.com/webmasters/answer/6062598?hl=en).
{{</Aside>}}

-   No permitas el rastreo de archivos en el directorio /cdn-cgi/. Cloudflare utiliza esta ruta de forma interna y Google encuentra errores al rastrearla. Anular los rastreos de cdn-cgi mediante archivos robots.txt:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Anular: /cdn-cgi/</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Los errores de cdn-cgi no afectan los posicionamientos del sitio.
{{</Aside>}}

-   Verifica que tus archivos [robots.txt admitan el rastreador de AdSense](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=1061943).
-   [Restablece las direcciones IP original del visitante](https://support.cloudflare.com/hc/articles/200170916) en tus registros de servidor.

___

A continuación se incluyen los pasos para la resolución de los errores de rastreo más habituales.

### Errores de HTTP 4XX

Los [errores de HTTP 4XX](https://support.cloudflare.com/hc/articles/115003014512) son los errores de rastreo más comunes. Cloudflare genera estos errores desde tu servidor web a Google. Estos errores ocurren por varias razones, como una página faltante en tu servidor web o un enlace con el formato incorrecto en tu HTML. La solución dependerá del problema que se encuentre.

### Errores HTTP 5XX

Los [errores HTTP 5XX](https://support.cloudflare.com/hc/articles/115003011431) indican que Cloudflare o tu servidor web de origen han tenido un error interno. Para correlacionar las incidencias de errores de rastreo con las interrupciones del sitio, monitorea el estado de tu servidor web de origen. Monitorea el estado de tu sitio web a través de Cloudflare y a través de la dirección IP de tu servidor web de origen para determinar si los errores ocurrieron debido a Cloudflare o a tu servidor web de origen.

### Errores de DNS

Los pasos para la resolución de problemas varían si tu dominio está en Cloudflare a través de una configuración CNAME o Full. Para verificar qué configuración usa tu dominio, abre una terminal y ejecuta el siguiente comando( reemplaza _www.example.com_ por tu dominio de Cloudflare):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short SOA www.example.com</span></div></span></span></span></code></pre>{{</raw>}}

Para dominios con una configuración CNAME, la respuesta del resultado contiene cdn.cloudflare.net. Por ejemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com.cdn.cloudflare.net.</span></div></span></span></span></code></pre>{{</raw>}}

Para dominios con una configuración Full, la respuesta del resultado contiene el dominio cloudflare.com en los servidores de nombre de la lista. Por ejemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  josh.ns.cloudflare.com. dns.cloudflare.com. 2013050901 10000 2400 604800 3600</span></div></span></span></span></code></pre>{{</raw>}}

Una vez que confirmas cómo está configurado tu dominio con Cloudflare, sigue con los pasos para la resolución de problemas que correspondan para la configuración de tu dominio.

**CNAME**

Contacta a tu proveedor de alojamiento para investigar los errores de DNS y suministra la fecha en la que Google encontró los errores de DNS. Además, revisa la página [Estado del sistema de Cloudflare](http://www.cloudflare.com/system-status) y observa si ha habido interrupciones de red en la fecha en que Google encontró los errores.

**Full**

[Contacta a asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) y suministra la fecha y la hora en que Google encontró los errores.

### Cómo solicitar asistencia para la resolución de problemas

Si los pasos para la resolución de problemas que se mencionan anteriormente no resuelven los errores de rastreo, sigue los pasos a continuación para exportar los errores de rastreo como archivo .csv desde el panel de control de herramientas de Google Webmaster. Incluye este archivo .csv cuando te [contactes con la asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

1.  Inicia sesión en la cuenta de Herramientas de Google Webmaster y ve a la sección **Health** (Estado) del dominio afectado.
2.  Haz clic en **Crawl Errors** (Rastrear errores) en la parte izquierda de la navegación.
3.  Haz clic en **Download** (Descargar) para exportar la lista de errores como archivo .csv.
4.  Proporciona el archivo .csv descargado a asistencia de Cloudflare.

___

## Recursos relacionados

[Documentación de Google sobre errores de rastreo y resolución de problemas](https://support.google.com/webmasters/answer/7440203#not_found_404)
