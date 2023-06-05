---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200170166-Pr%C3%A1cticas-recomendadas-medidas-preventivas-de-DDoS
title: Prácticas recomendadas medidas preventivas de DDoS
---

# Prácticas recomendadas: medidas preventivas de DDoS



## Información general

Después de unirte a Cloudflare, asegúrate de que tu sitio esté completamente preparado ante posibles ataques DDoS mediante las siguientes recomendaciones.

### Redirige mediante proxy tus registros DNS a Cloudflare

Los atacantes intentan identificar tu dirección IP de origen para atacar directamente tu servidor web de origen sin las protecciones de Cloudflare. Oculta su dirección IP de origen del ataque directo con el redireccionamiento mediante proxy del tráfico a Cloudflare.

Configura tus registros DNS para una protección máxima mediante los siguientes pasos:

1.  [Habilita el proxy de Cloudflare (nube-naranja)](https://support.cloudflare.com/hc/articles/200169626)
2.  Elimina los registros DNS utilizados para FTP o SSH y utiliza en su lugar tu IP de origen para llevar a cabo directamente solicitudes FTP o SSH. De forma alternativa, redirige mediante proxy el FTP y SSH con [Cloudflare Spectrum](/spectrum/getting-started/).
3.  [Registros de nube-gris A, AAAA o CNAME correspondientes a tu servidor de correo](https://support.cloudflare.com/hc/articles/200168876)
4.  Elimina los registros comodín en los dominios Free, Pro o Business, ya que revelan tu dirección IP de origen. [Cloudflare solo protege los registros comodín para dominios en planes Enterprise](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries).

### No limites la velocidad ni ahogues las solicitudes de las IP de Cloudflare

Una vez que redirijas mediante proxy el tráfico a Cloudflare, las conexiones a tu servidor web de origen provendrán de las  [direcciones IP de Cloudflare](http://www.cloudflare.com/ips) . Por tanto, es importante que tu servidor web de origen [incluya en la lista blanca las direcciones IP de Cloudflare](https://support.cloudflare.com/hc/articles/201897700) y bloquee de forma explícita el tráfico que no provenga de Cloudflare o de las direcciones IP de tu socio, proveedor o aplicación de confianza.

### Reestablece las IP original del visitante en tus registros del servidor de origen

Para ver las IP reales detrás de un ataque, [restaura las IP originales de los visitantes](https://support.cloudflare.com/hc/sections/200805497) en tus registros de servidor de origen. En caso contrario, todo el tráfico enumera las IP de Cloudflare en tus registros. Cloudflare siempre incluirá la dirección IP del visitante original en la solicitud, [como un encabezado HTTP](https://support.cloudflare.com/hc/articles/200170986) Informa a tu proveedor de alojamiento de que usas un proxy inverso y de que todo el tráfico provendrá de direcciones IP de Cloudflare al buscar conexiones actuales.

### Cambia las direcciones IP del servidor después de mover el sitio a Cloudflare

Cloudflare oculta las direcciones IP de tu servidor de origen para el tráfico que redirijas mediante proxy a Cloudflare. Como precaución de seguridad adicional, te recomendamos que contactes con tu proveedor de alojamiento y solicites nuevas IP de servidor de origen.

{{<Aside type="note">}}
Esta tarea puede suponer algún cargo, así que habla con tu proveedor de
alojamiento en función del riesgo de ataque a tu sitio.
{{</Aside>}}

### Utiliza Rate Limiting para prevenir ataques de fuerza bruta y DDoS de capa 7

Para frustrar ataques disfrazados de solicitudes HTTP normales, Rate Limiting permite a los administradores de sitios web especificar umbrales específicos en la carga que esperan que reciba su servidor web. Con un simple clic, configura rate limiting básico para que [proteja tus páginas de inicio de sesión de ataques de fuerza bruta](https://support.cloudflare.com/hc/articles/115001635128#3UWQC5PrVScHgEGRMobRMm).

Los planes Free, Pro y Business de Cloudflare incluyen 10 000 solicitudes gratuitas por mes. Para más detalles, consulta nuestra guía sobre [Rate Limiting de Cloudflare](https://support.cloudflare.com/hc/articles/115001635128).

___

## Recursos relacionados

-   [Cómo comprender la protección DDoS de Cloudflare](https://support.cloudflare.com/hc/articles/200172676)
-   [Cómo responder a los ataques DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [¿Qué es un ataque DDoS?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
