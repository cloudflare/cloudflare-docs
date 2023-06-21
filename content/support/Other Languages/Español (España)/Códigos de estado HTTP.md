---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003014432-C%C3%B3digos-de-estado-HTTP
title: Códigos de estado HTTP
---

# Códigos de estado HTTP

## Códigos de estado HTTP

Estos documentos son la interpretación de Cloudflare del protocolo de las normas de Internet para los códigos de respuesta HTTP. Consulta la edición actual de las “Normas de protocolo de Internet oficial” (STD 1) para conocer el estado y la situación de la estandarización de este protocolo. También incluimos todos los códigos de error personalizados de Cloudflare (52x) y otros códigos de estado que se observan con frecuencia.

En estos artículos con frecuencia hacemos referencia a los siguientes términos. Para brindarte cierto contenido, esta es la manera en que definimos los siguientes conceptos:

**Servidor:** toda parte que recibe una solicitud y envía una respuesta. Ya sean servidores de origen o intermedios.

**Servidor de origen/de host:** el servidor de destino final. En realidad, este servidor aloja el contenido del sitio web.

**Servidor proxy:** el (los) servidor(es) que se encuentra(n) entre el servidor de origen y el cliente. Por ejemplo, Cloudflare es un servidor proxy.

**Cliente:** la parte que realiza la solicitud. Normalmente, un usuario final que accede al sitio en un navegador, pero también puede ser un cliente API o cualquiera que solicite recursos del sitio.

**Backend:** las conexiones que no se realizan desde el cliente o hacia el cliente, sino entre el(los)servidor(es) proxy y/o el servidor de origen

**Agente-usuario:** la máquina que se utiliza para enviar la solicitud. Puede ser un navegador u otro programa que realice solicitudes (p. ej., solicitudes API restful)

**Payload (carga útil):** la respuesta o los datos de solicitud sin incluir los encabezados. También se denomina cuerpo de la solicitud/respuesta

**Nota sobre almacenamiento en caché**: _todo código de estado HTTP que se puede almacenar en caché de forma predeterminada, también se podrá ser almacenado en caché por Cloudflare (p. ej., salvo que la definición del método o los controles de almacenamiento en caché explícitos lo indiquen de otra manera). Cloudflare almacena en caché respuestas HTTP de la misma manera que almacena cualquier otra solicitud. Cloudflare tiene en cuenta las page rules, edge TTL y los encabezados de origen al momento de decidir si almacena en caché. Para obtener más información [¿Cómo le indico a Cloudflare qué debe almacenar en la memoria caché?](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-) y [¿Qué significa edge TTL?](https://support.cloudflare.com/hc/en-us/articles/200168376)_

**Códigos de estado HTTP:**

**[1xx Informativo](https://support.cloudflare.com/hc/en-us/articles/115003013892/)**

**[2xx Éxito](https://support.cloudflare.com/hc/en-us/articles/115003014192)**

**[3xx Redirigir](https://support.cloudflare.com/hc/en-us/articles/115003011091/)**

**[4xx Error del cliente](https://support.cloudflare.com/hc/en-us/articles/115003014512/)**

**[5xx Error del servidor](https://support.cloudflare.com/hc/en-us/articles/115003011431/)**
