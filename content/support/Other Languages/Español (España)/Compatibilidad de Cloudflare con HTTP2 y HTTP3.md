---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200168076-Compatibilidad-de-Cloudflare-con-HTTP-2-y-HTTP-3
title: Compatibilidad de Cloudflare con HTTP2 y HTTP3
---

# Compatibilidad de Cloudflare con HTTP/2 y HTTP/3



## Información general

HTTP/2 y HTTP/3 aceleran la carga de páginas y son gratuitas para todos los [planes de Cloudflare](http://www.cloudflare.com/plans).  HTTP/2 está habilitado de forma predeterminada y requiere un [certificado SSL en la red perimetral de Cloudflare](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0). Configura HTTP/2 y HTTP/3 a través de la aplicación **Red** de Cloudflare. Los dominios de los planes gratuitos no pueden desactivar HTTP/2.

Un navegador y un servidor web negocian automáticamente el mayor protocolo disponible. Así, HTTP/3 tiene prioridad sobre HTTP/2. 

Para determinar el protocolo utilizado para tu conexión, escribe _ejemplo.com_/cdn-cgi/trace desde un navegador o cliente y sustituye _ejemplo.com_ por el nombre de tu dominio. Se devuelven varias líneas de datos. Si aparece _http=h2_ en los resultados, la conexión se produjo a través de HTTP/2. Otros valores posibles son _http=http2+quic/99_ para HTTP/3 y _http=http/1.x_ para HTTP/1.x.

___

HTTP/2 mejora los tiempos de carga de las páginas mediante:

-   Multiplexación de conexiones: recupera varios recursos en una única solicitud de red. Se envian respuestas cuando hay recursos disponibles para evitar ralentizar la velocidad de renderizado de la página.
-   Compresión de encabezado HTTP: comprime encabezados y simplifica las solicitudes HTTP para evitar el reenvío de encabezados.
-   HTTP/2 Server Push: para mejorar la velocidad de carga de las páginas, Cloudflare proporciona recursos adicionales para que el cliente los almacene en caché sin tener que esperar peticiones adicionales.

Nota:

-   No todos los navegadores admiten HTTP/2 y, en su lugar, utilizan HTTP 1.x.
-   La multiplexación de la conexión se basa en cada dominio.

___

## HTTP/3

HTTP/3 permite conexiones rápidas, fiables y seguras. HTTP/3 encripta el transporte de Internet por defecto utilizando un protocolo de Google llamado QUIC. Habilita HTTP/3 a través de la aplicación **Red** de Cloudflare.

Para obtener más información, consulta nuestra [documentación para desarrolladores HTTP/3](/http3/).

___

## Server Push

La función Server Push permite que los servidores web de origen envíen recursos al cliente o al navegador web sin esperar a analizar el HTML en busca de referencias a activos adicionales como imágenes, hojas de estilo, JavaScript, etc. Server Push evita el ciclo habitual de solicitud y respuesta HTTP para cada script u hoja de estilo de una página. Todos los planes de Cloudflare incluyen la función Server Push.

Server Push extrae referencias URI dentro del parámetro rel=preload del encabezado **Link** del servidor de origen. A continuación, se proporcionan estas URI adicionales al cliente. Algunos ejemplos de encabezados **Link** son:

`Link: </images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

Server Push está limitado a 50 activos por página y a 100 por conexión.

___

## Recursos relacionados

-   [HTTP/3: pasado, presente y futuro](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [QUICening](https://blog.cloudflare.com/the-quicening/)
-   [¡Disfruta del protocolo de red QUIC y Rust!](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

Información de compatibilidad del navegador: 

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
