---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/204144518-Preguntas-frecuentes-sobre-SSL
title: Preguntas frecuentes sobre SSL
---

# Preguntas frecuentes sobre SSL



### Tengo varios certificados de Cloudflare, ¿cuál se usa?

Los certificados de Cloudflare se priorizan según el [tipo de certificado](https://support.cloudflare.com/hc/articles/203295200) y también según el nombre de host más específico.  En general, la priorización de certificado SSL ocurre de la siguiente manera, de prioridad alta a baja:

-   [Custom SSL](https://support.cloudflare.com/hc/articles/200170466)
-   [SSL exclusivo](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)

Las excepciones respecto de la priorización general ocurren en función de la especificidad del nombre de host.  Los certificados que mencionan un nombre de host específico se prefieren a los certificados comodín.  Por ejemplo, un certificado Universal SSL que menciona de manera explícita _www.ejemplo.com_ tiene prioridad por encima de un certificado que coincide con el nombre de host _www_ a través de un comodín como _\*.ejemplo.com._

___

### ¿Tener SSL de Cloudflare ayudará con SEO?

Sí, Google anunció que usa [HTTPS como una señal de clasificación para SEO](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html).

Para más ajustes de SEO, consulta nuestro artículo sobre la [mejora de las clasificaciones SEO con Cloudflare](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-).

___

### ¿SSL de Cloudflare es compatible con el nombre de dominio internacionalizado (IDN)?

Cloudflare es compatible con dominios de doble byte, IDN y Punycode.  Los dominios con caracteres no latinos reciben certificados SSL al igual que cualquier otro dominio añadido a Cloudflare.

___

### ¿Cuánto tiempo toma en activarse SSL de Cloudflare?

Si Cloudflare es tu [proveedor de DNS autoritativo](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver), los certificados Universal SSL suelen emitirse dentro de los 15 minutos desde la activación del dominio en Cloudflare y no requieren más acciones del cliente después de esta.  Como alternativa, si usas los [servicios de Cloudflare a través de registros CNAME](https://support.cloudflare.com/hc/articles/360020615111) configurados en tu proveedor de DNS autoritativo, el suministro de tu certificado Universal SSL requiere la incorporación manual de [registros de verificación DNS](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509) en tu proveedor de DNS autoritativo.  Los certificados SSL exclusivos también suelen emitirse dentro de los 15 minutos.

Si la autoridad de certificación requiere la revisión manual de la marca, phishing o los requisitos TLD, la emisión de un certificado Universal SSL puede tomar más de 24 horas.

___

### ¿Qué significa comprobación de marca no válida de SSL?

Algunos dominios no son elegibles para Universal SSL si contienen palabras que puedan entrar en conflicto con dominios registrados.

Para solucionar este problema, puedes realizar lo siguiente:

-   [cargar tu propio certificado](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) si el dominio es parte del plan Business o [Enterprise](https://www.cloudflare.com/enterprise-service-request), o
-   comprar un [certificado exclusivo](https://support.cloudflare.com/hc/en-us/articles/228009108-Dedicated-SSL-Certificates).

___

### ¿Cómo puedo redirigir a todos los visitantes a HTTPS/SSL?

Para redirigir el tráfico para todos los subdominios y hosts en tu dominio, habilita la función **Siempre usar HTTPS** en la aplicación **SSL/TLS** de Cloudflare.  Si no quieres que se redirija todo el sitio a HTTPS, redirígelo según la dirección URL mediante el uso de la aplicación **[Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427)** de Cloudflare.

Mientras proteges tu sitio con Cloudflare, no es recomendable llevar a cabo redireccionamientos a tu servidor web de origen:

-   Los redireccionamientos Page Rule se procesan en el extremo de Cloudflare, lo cual conlleva una respuesta más rápida y solicitudes reducidas a tu servidor.
-   Los redireccionamientos del servidor web de origen pueden provocar [errores de bucle de redireccionamiento](https://support.cloudflare.com/hc/articles/115000219871).

Al configurar Page Rules, la acción _Usar siempre HTTPS_ es el método más sencillo para redirigir las solicitudes HTTP a HTTPS.  También se puede utilizar la acción _Reenvío de URL_ con un redireccionamiento _301_ en el caso de que se deba redirigir a otro subdominio, además de forzar HTTPS. Por ejemplo, una combinación de Page Rule por


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://ejemplo.com/*</span></div></span></span></span></code></pre>{{</raw>}}

con un _Reenvío de URL_ de


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.ejemplo.com/$1</span></div></span></span></span></code></pre>{{</raw>}}

volverá a dirigir las solicitudes para el dominio raíz _ejemplo.com_ al subdominio _www.ejemplo.com_, todo ello mientras preserva el directorio de URL.

{{<Aside type="note">}}
La acción *Usar siempre HTTPS* solo aparecerá si tu zona tiene un
certificado SSL de Cloudflare activo.
{{</Aside>}}

Forzar HTTPS no resuelve problemas con [contenido mixto](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-), ya que los navegadores verifican el protocolo de los recursos incluidos antes de realizar una solicitud. Deberás utilizar únicamente enlaces relativos o enlaces HTTPS en las páginas que fuerza a HTTPS. Cloudflare puede solucionar automáticamente algunos enlaces de contenido mixto mediante nuestra funcionalidad [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-).

___

### ¿Cómo funciona SSL para socios de alojamiento?

Está disponible un certificado Universal SSL para todos los dominios nuevos de Cloudflare añadidos por un socio de alojamiento a través de integraciones CNAME y DNS completo.

{{<Aside type="note">}}
Para los dominios añadidos antes del 9 de diciembre del 2016, el socio
de alojamiento debe eliminar y volver a añadir el dominio a Cloudflare
para proporcionar el certificado SSL.
{{</Aside>}}

Redirige mediante proxy a través de Cloudflare para proporcionar el certificado Universal SSL gratuito.

___

### ¿Se comparten los certificados SSL de Cloudflare?

Los certificados Universal SSL se comparten en varios dominios para clientes múltiples. Si compartir un certificado te preocupa, Cloudflare recomienda un [certificado SSL exclusivo o personalizado](https://support.cloudflare.com/hc/articles/203295200).

___

### Hay un certificado SSL instalado en mi sitio web, ¿por qué veo un certificado de Cloudflare?

Cloudflare debe descifrar el tráfico para poder almacenar en la caché y filtrar el tráfico malicioso. Cloudflare vuelve a cifrar el tráfico o envía el tráfico de texto sin formato al servidor web de origen, según la [opción SSL](https://support.cloudflare.com/hc/articles/200170416) seleccionada en la aplicación **SSL/TLS**.

___

### Quiero que Cloudflare use un certificado SSL que compré en otro lugar.

Los dominios de los planes Business y Enterprise tienen permitido cargar un [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466).

___

### ¿Cómo obligo a mi sitio para que solo utilice HTTPS/SSL?

Para forzar todo el tráfico a HTTPS, habilita la función “Usar siempre HTTPS” dentro de la aplicación **SSL/TLS** de Cloudflare o [a través de la aplicación **Page Rules**](https://support.cloudflare.com/hc/articles/200170536).

___

### ¿El Proyecto Galileo incluye asistencia SSL?

Los clientes del Proyecto Galileo pueden usar el [Universal SSL gratuito](https://www.cloudflare.com/ssl) de Cloudflare para asegurar el tráfico del sitio.

___

### ¿Habilitar Cloudflare afecta el requisito de TLS 1.2 de PayPal?

No. Debido a que Cloudflare no redirige mediante proxy las conexiones realizadas directamente a paypal.com, habilitar Cloudflare para tu dominio no afecta el modo en que se realizan las conexiones TLS.

Para determinar si tu servidor o navegador es compatible con estos estándares, visita [https://tlstest.paypal.com](https://tlstest.paypal.com/) desde un cliente o navegador que utilice PayPal. Una respuesta de **PayPal\_Connection\_OK** demuestra que el cliente ya admite los estándares TLS compatibles con PayPal.

___

### ¿Cómo puedo servir un certificado SSL desde los centros de datos de Cloudflare en China?

[Universal SSL](https://support.cloudflare.com/hc/articles/204151138) de Cloudflare y los certificados [SSL exclusivos](https://support.cloudflare.com/hc/articles/228009108) no se implementan en China.  Si tu dominio se encuentra en un plan Enterprise y se ha otorgado acceso a los centros de datos de Cloudflare en China, estos solo sirven un certificado SSL para tu dominio bajo las siguientes condiciones:

1.  Has cargado un [certificado SSL personalizado](https://support.cloudflare.com/hc/articles/200170466).
2.  **Permitir claves privadas en China (certificados personalizados)** está _Activado_en la aplicación **SSL/TLS** de Cloudflare.

___

### ¿Cloudflare es compatible con la autenticación de clientes TLS?

La autenticación de clientes TLS valida que un certificado presentado por un cliente esté firmado por el certificado raíz de la autoridad de certificación de la empresa.  Al validar este certificado en cada solicitud, el acceso puede limitarse a conexiones de clientes autorizados.  Para habilitar la autenticación de clientes TLS a través de Cloudflare, consulta nuestra documentación sobre [autenticación de TLS mutua](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

___

### ¿Cómo puedo activar Universal SSL con GitHub?

Consulta la publicación del blog de Cloudflare sobre el [uso de Universal SSL de Cloudflare con páginas de GitHub](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/).
