---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360000841472-C%C3%B3mo-a%C3%B1adir-varios-sitios-en-Cloudflare-mediante-automatizaci%C3%B3n
title: Cómo añadir varios sitios en Cloudflare mediante automatización
---

# Cómo añadir varios sitios en Cloudflare mediante automatización



## Información general

Si deseas añadir simultáneamente varios sitios (más de 10) a Cloudflare, puedes hacerlo mediante la API de Cloudflare. Este enfoque puede ser útil si se cumplen las siguientes condiciones:

{{<Aside type="note">}}
Si intentas añadir más de 50 dominios a la vez, cualquier dominio
adicional se bloqueará hasta que se procesen.
{{</Aside>}}

-   Tienes varios dominios que se asignan a un único dominio canónico, p. ej., dominios de diferentes países (.com.au, .co.uk, etc.) que deseas proteger con Cloudflare.
-   Eres una agencia o un consultor de TI y gestionas varios dominios en nombre de tus clientes (nota: nuestro [Programa de socios](https://www.cloudflare.com/partners/) podría interesarte).
-   Estás trasladando un conjunto de sitios existentes a Cloudflare.

Con la API, podrás añadir varios sitios de forma rápida y eficiente, especialmente si ya conoces [cómo cambiar tus servidores de nombres](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup) o [añadir un registro DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records).

___

## Requisitos previos

{{<Aside type="note">}}
No puedes tener más sitios pendientes que sitios activos asociados con
tu cuenta de Cloudflare. Recomendamos esperar hasta que los sitios
pendientes se hayan procesado antes de añadir dominios adicionales.
{{</Aside>}}

Para añadir varios sitios en Cloudflare mediante automatización, necesitarás:

-   Una cuenta en Cloudflare ([regístrate](https://www.cloudflare.com/a/signup) / [inicia sesión](https://www.cloudflare.com/a/login)).
-   Conocimientos básicos de la línea de comandos.
-   curl instalada (de forma predeterminada en macOS y Linux).
-   Tu [clave de API de Cloudflare a mano](https://support.cloudflare.com/hc/es-es/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-).
-   Una lista de dominios que desees añadir, cada uno en una línea separada (nueva línea separada), p. ej. “domains.txt”.

___

## Cómo incorporar dominios mediante la API

Cloudflare dispone de una API con todas las funciones ([documentación](https://api.cloudflare.com/)) que te permiten automatizar la creación de nuevos dominios, además de configurar registros DNS, reglas de página y distintas configuraciones de seguridad. Utilizaremos esta API para automatizar la incorporación de varios dominios de una sola vez.

Abre tu aplicación Terminal (p. ej. Terminal o Terminal.app) y configura tu clave de API y correo electrónico:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

A continuación, escribiremos un bucle de muestra "for" que utiliza el nombre de cada dominio. 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do \  curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \  -H &quot;Content-Type: application/json&quot; \  &quot;https://api.cloudflare.com/client/v4/zones&quot; \  --data '{&quot;account&quot;: {&quot;id&quot;: &quot;id_of_that_account&quot;}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

La clave "jump\_start" hará que Cloudflare intente detectar automáticamente los registros DNS comunes, p. ej. "www", "mail", "blog" y muchos otros, para que no tengas que configurarlos a mano (aun así, debes confirmar que hemos encontrado todos).  _id\_of\_that\_account_ se encuentra en la aplicación **Descripción general** de Cloudflare, en **ID de cuenta**.

La API devolverá una respuesta, incluidos los [servidores de nombres que deberás cambiar](https://support.cloudflare.com/hc/es-es/articles/206455647-How-do-I-change-my-domain-nameservers-) en el registrador (en el que has registrado el dominio).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;ejemplo.com&quot;, &quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;, &quot;lucy.ns.cloudflare.com&quot; ], &quot;original_name_servers&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;, &quot;ns-cloud-e2.googledomains.com&quot;, &quot;ns-cloud-e3.googledomains.com&quot;, &quot;ns-cloud-e4.googledomains.com&quot; ], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

Ten en cuenta la clave “name\_servers” en la respuesta. Será el mismo par único para todos los sitios que añadas con tu cuenta, p. ej.:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;chad.ns.cloudflare.com&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;lucy.ns.cloudflare.com&quot; ]</span></div></span></span></span></code></pre>{{</raw>}}

Copia los valores (¡no los de arriba!) y [actualiza los servidores de nombres](https://support.cloudflare.com/hc/es-es/articles/206455647-How-do-I-change-my-domain-nameservers-) en el registrador.

___

## Cómo añadir dominios mediante flarectl (herramienta CLI de Cloudflare)

También puedes añadir dominios con flarectl, la CLI oficial de Cloudflare. Puedes descargar [un paquete previamente generado](https://github.com/cloudflare/cloudflare-go/releases) para el sistema operativo (Windows, macOS/Darwin, Linux) y crear dominios con este.

Deberás configurar tus credenciales de API primero:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

y, a continuación, ejecutar el siguiente comando en flarectl:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

Ahora puedes obtener los mismos servidores de nombres para cada dominio mediante la “lista de zona flarectl”:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Si necesitas ayuda o asesoramiento, consulta la [Comunidad Cloudflare](https://community.cloudflare.com/).

___

## Problemas frecuentes

En el caso de que se hayan mostrado errores en este proceso, es posible que no se haya registrado el dominio (o que se acabe de registrar), que sea un subdominio o que no sea válido. Los siguientes artículos incluyen los casos más comunes:

-   [¿Por qué no puedo añadir mi dominio a Cloudflare?](https://support.cloudflare.com/hc/es-es/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [Sitio prohibido](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
