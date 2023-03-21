---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360021357131-Delegaci%C3%B3n-de-subdominios-fuera-de-Cloudflare
title: Delegación de subdominios fuera de Cloudflare
---

# Delegación de subdominios fuera de Cloudflare



## Información general

La delegación de subdominios permite que diferentes individuos, equipos u organizaciones gestionen los distintos subdominios de un sitio.

{{<Aside type="note">}}
La delegación de DNS no es posible para los dominios de Cloudflare con
una [configuración
CNAME](https://support.cloudflare.com/hc/articles/360020348832).
{{</Aside>}}

Por ejemplo, considera a _ejemplo.com_ como un subdominio de Cloudflare con _www.ejemplo.com_ gestionado en la aplicación **DNS** de Cloudflare por un lado y, por el otro, _interno.ejemplo.com_ delegado a servidores de nombres fuera de Cloudflare. En este ejemplo, a _interno.ejemplo.com_ lo pueden gestionar individuos sin acceso a las credenciales de Cloudflare para el dominio _ejemplo.com_.

{{<Aside type="warning">}}
La CDN y los servicios de seguridad de Cloudflare no se aplican a los
subdominios delegados.
{{</Aside>}}

___

## Delegación de subdominios

Para delegar un subdominio como _interno.ejemplo.com_, indica a los solucionadores DNS dónde encontrar el archivo de zona:

1.  Inicia sesión en el panel de control de Cloudflare.
2.  Haz clic en la cuenta de Cloudflare adecuada.
3.  Selecciona el dominio que contiene el subdominio que se delegará.
4.  Haz clic en la aplicación **DNS**.
5.  Crea _registros NS_ para el subdominio. Por ejemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">interno.ejemplo.com NS ns1.hostexterno.cominterno.ejemplo.com NS ns2.hostexterno.cominterno.ejemplo.com NS ns3.hostexterno.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Los *registros A* para el subdominio solo son necesarios como registros
de adherencia para servidores de nombres ubicados en el subdominio de la
zona actual que se delega.
{{</Aside>}}

6.  (Opcional) Si el servidor de nombres delegado tiene DNSSEC habilitado, añade el _registro DS_ en la aplicación **DNS** de Cloudflare.

___

## Recursos relacionados

-   [Gestión de registros DNS en Cloudflare](https://support.cloudflare.com/hc/articles/360019093151)
-   [Comprensión de una configuración CNAME](https://support.cloudflare.com/hc/articles/360020348832)
-   [Registros de adherencia](https://www.ietf.org/rfc/rfc1912.txt) (RFC 1912 Sección 2.3)
