---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200170016--En-qu%C3%A9-consiste-la-ofuscaci%C3%B3n-de-direcci%C3%B3n-de-correo-electr%C3%B3nico-
title: ¿En qué consiste la ofuscación de dirección de correo electrónico
---

# ¿En qué consiste la ofuscación de dirección de correo electrónico?



## Información general

Los recolectores de direcciones de correos electrónicos y otros bots recorren Internet en busca de direcciones de correo electrónico para añadirlas a las listas de destinatarios de correo no deseado. Esta tendencia permite obtener una mayor cantidad de correo electrónico no deseado.

Los administradores web han creado formas inteligentes de protegerse escribiendo las direcciones de correo electrónico (p. ej., ayuda \[arroba\] cloudflare \[punto\] com) o utilizando imágenes que se integran en la dirección de correo electrónico. Sin embargo, se pierde la conveniencia de hacer clic en la dirección de correo electrónico y enviar un mensaje automáticamente. Al habilitar la ofuscación de dirección de correo electrónico de Cloudflare, las direcciones de correo electrónico de la página web se ofuscan (ocultan) de los bots, pero siguen siendo visibles para los humanos. De hecho, no existen cambios visibles en el sitio web para los visitantes.

Para que la ofuscación de dirección de correo electrónico funcione en Cloudflare, una página debe tener un tipo MIME (Content-Type) de "texto/html" o "aplicación/xhtml+xml". 

{{<Aside type="note">}}
Todos los usuarios de los planes Pro, Business y Enterprise disponen de
soporte por correo electrónico. Los usuarios de los planes Business y
Enterprise también tienen acceso a soporte por chat. Si necesitas más
ayuda, consulta [nuestros planes](https://www.cloudflare.com/plans/).
{{</Aside>}}

___

Cloudflare habilita la ofuscación de dirección de correo electrónico de manera automática al registrarse.

Para verificar la ofuscación de dirección de correo electrónico en el panel de control de Cloudflare, haz lo siguiente:

1.  Inicia sesión en el panel de control de Cloudflare.
2.  Asegúrate de que se haya seleccionado el sitio web que deseas verificar.
3.  Haz clic en la aplicación **Scrape Shield** .
4.  En **Ofuscación de dirección de correo electrónico**, comprueba que el botón esté _activado_.

De forma alternativa, puedes recuperar el origen de la página de un cliente HTTP como CURL, una biblioteca HTTP o la opción Ver código fuente del navegador. A continuación, revisa el código fuente HTML para confirmar que la dirección ya no aparece. 

___

## Solución a la ofuscación de dirección de correo electrónico

Con el fin de evitar un comportamiento imprevisto del sitio web, las direcciones de correo electrónico no se ofuscan cuando aparecen en las siguientes ubicaciones:

-   Cualquier atributo de etiqueta HTML, excepto el atributo _href_ de la etiqueta _a._
-   Otras etiquetas HTML:
    -   _script_ tags: <script></script>
    -   _noscript_ tags: <noscript></noscript>
    -   _textarea_ tags: <textarea></textarea>
    -   _xmp_ tags: <xmp></xmp>
    -   _head_ tags: <head></head>
-   Cualquier página que no tenga un tipo MIME de «texto/html» o «aplicación/xhtml+xml».

**Ten en cuenta** que la ofuscación del correo electrónico **no tendrá efecto** si utilizas el encabezado `Cache-Control: no-transform`.

___

## Prevención de la ofuscación de correo electrónico de Cloudflare

Con el objeto de evitar que Cloudflare ofusque los mensajes de correo electrónico, puedes hacer lo siguiente:

-   Añade el siguiente comentario en el código HTML de la página:  `< !--email_off-->` `_tus_`  `_direcciones de correo electrónico van aquí_` `< !--/email_off-->`

-   Devuelve las direcciones de correo electrónico en formato JSON para llamadas AJAX y asegúrete de que el servidor web devuelva un tipo de contenido de «aplicación/json».

-   Podrás desactivar la función de "Ofuscación de correo electrónico" mediante una regla de página que se aplicará en un punto de conexión específico de tu zona siguiendo los pasos que mostramos en nuestro tutorial de reglas de página aquí: [Cómo configurar las reglas de página de Cloudflare (tutorial de reglas de página).](https://support.cloudflare.com/hc/es-es/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)
