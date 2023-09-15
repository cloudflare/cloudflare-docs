---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito
title: 2xx Éxito
---

# 2xx Éxito

**Descripción**

Los códigos 2xx indican respuestas exitosas, por lo general, esto significa que la acción que solicitó el cliente fue recibida, comprendida y aceptada correctamente.

-   [200 OK](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_200)
-   [201 Creada](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_201)
-   [202 Aceptada](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_202)
-   [203 No autoritativa](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_203)
-   [204 Sin contenido](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_204)
-   [205 Reiniciar contenido](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_205)
-   [206 Contenido parcial](https://support.cloudflare.com/hc/es-es/articles/115003014192-2xx-%C3%89xito#code_206)

**200 OK** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La respuesta favorita de todos: la solicitud fue aceptada correctamente.

La carga útil de respuesta dependerá del método de solicitud que se utilice. El cuerpo de la respuesta esperada para el método de solicitud correspondiente es el siguiente:

-   GET: los encabezados y datos que corresponden al recurso solicitado
-   HEAD: solo los encabezados que corresponden al recurso solicitado sin los datos reales
-   POST: el estado de la acción o los resultados obtenidos de la acción

Una respuesta 200 _debe tener_ siempre una carga útil, pero no se exige, de esta manera un servidor de origen puede generar una 200 con longitud cero. Debería generarse una respuesta 204 para cumplir con las normas RFC en ese caso (excepto CONNECT)

Servidores proxy y navegadores pueden almacenar en caché de manera predeterminada. Si los controles de caché [de Cloudflare no lo especifican](https://support.cloudflare.com/hc/en-us/articles/202775670) ,   [los recursos estáticos](https://support.cloudflare.com/hc/en-us/articles/200172516) con esta respuesta almacenarán en caché de manera predeterminada durante 2 horas en nuestro perímetro.  

**201 Creado** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Las solicitudes se hicieron correctamente y se han creado uno o más nuevos recursos. Se espera que la ubicación del nuevo recurso esté presente en el campo del encabezado Location (Ubicación) o en el identificador de recursos uniforme (URI) de la solicitud. Normalmente, la carga útil describirá y hará referencia a enlaces para el recurso recientemente generado.

-   Consulta la [Sección 7.2 RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.2) para obtener un análisis del significado y propósito de los campos de encabezado del validador, como ETag y Última modificación, en una respuesta 201.

**202 Aceptado** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La respuesta fue aceptada y actualmente el servidor de origen la está procesando.  En función de las especificaciones del servidor, el cliente puede actuar o no sobre la solicitud mientras se realiza el procesamiento.

**203 Información no autoritativa** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Reemplazo opcional del código de estado 200 para explicar que la solicitud se hizo correctamente, pero no provino directamente del servidor de origen. Un servidor proxy o intermedio ha modificado la respuesta original del servidor de origen. Por ejemplo, la 203 se podría utilizar para informar al cliente que este recurso se ha almacenado en caché en un servidor proxy, de modo que una solicitud futura similar puede alcanzar o no ese servidor de caché con ese mismo recurso. Otro ejemplo es cuando se elimina un encabezado que solo es aplicable al servidor de origen local.

-   De forma predeterminada, la respuesta se almacena en caché, sin embargo, Cloudflare no almacenará en caché.
-   Cloudflare nunca generará, pero puede, en su caso, redirigir desde otros servidores proxy. Cloudflare respeta las respuestas de origen con estas excepciones: [¿Cómo gestiona Cloudflare los encabezados de solicitud HTTP](https://support.cloudflare.com/hc/en-us/articles/200170986)

**204 Sin contenido ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Las acciones solicitadas se realizaron correctamente en el servidor de origen. El caso práctico común está en editores de documento, la acción “save” (guardar) se envía al servidor de origen, aunque no se necesite carga útil para devolver al cliente. Aún uno puede querer comunicar al usuario que la acción de guardar se realizó correctamente.

-   Nunca debe haber una carga útil al devolver una respuesta 204.
-   De forma predeterminada, la respuesta se almacena en caché, sin embargo, Cloudflare no almacenará en caché.

**205 Reiniciar contenido** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

El servidor de origen sugiere al cliente que reinicie la vista a su estado original antes de la solicitud. A menudo, se utiliza en formularios u otras presentaciones de entrada donde se envía una carga útil en la solicitud, el servidor de origen funcionó de manera correcta y ahora notifica al navegador que se permiten presentaciones adicionales.

-   Una respuesta 205 nunca debe devolver una carga útil. Contenido-Longitud de 0 o respuestas fragmentadas seguidas inmediatamente por solo una respuesta cerrada o de cero byte permitida.

**206 Contenido parcial (**[**RFC 7233**](https://tools.ietf.org/html/rfc7233)**)**

La solicitud de una parte de un recurso fue correcta y se ubica en la carga útil. Se debe indicar el rango de la solicitud de alguna de las siguientes maneras:

1.  Una única solicitud parcial con encabezados HTTP que incluye rango de contenido seguida del tamaño. (Si se encuentra en el encabezado de la respuesta, debe ser exactamente igual a los octetos en la carga útil) Por ej., `Rango de contenido: bytes 21010-47021/47022`
2.  Fragmentos múltiples con `Content-Type: multipart/byteranges` en el encabezado HTTP e incluye los campos de Rango-Contenido para cada parte de manera individual, pero _no_ en la respuesta del **encabezado HTTP**. También se requiere un límite, como se especifica en [la Sección 4.1 RFC 7233](https://tools.ietf.org/html/rfc7233%23section-4.1) por ej.,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Partial Content     Date: Wed, 15 Nov 1995 06:25:24 GMT     Last-Modified: Wed, 15 Nov 1995 04:58:08 GMT     Content-Length: 1741     Content-Type: multipart/byteranges; boundary=THIS_STRING_SEPARATES     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 500-999/8000     ...the first range...     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 7000-7999/8000     ...the second range     --THIS_STRING_SEPARATES--</span></div></span></span></span></code></pre>{{</raw>}}

 Las respuestas 206 son útiles para los clientes que procesan archivos más grandes y que necesitan descargas fragmentadas o con interrupciones con flujos múltiples y simultáneos para una latencia mejorada.
