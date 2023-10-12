---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/236166048-Almacenamiento-en-la-memoria-cach%C3%A9-de-HTML-est%C3%A1tico-con-WordPress-WooCommerce
title: Almacenamiento en la memoria caché de HTML estático con WordPressWooCommerce
---

# Almacenamiento en la memoria caché de HTML estático con WordPress/WooCommerce

## Almacenamiento en la memoria caché de HTML estático con WordPress/WooCommerce

{{<Aside type="note">}}
Los clientes de todos los planes de Cloudflare pueden configurar el
almacenamiento de archivos HTML en la memoria caché. Sin embargo, solo
los clientes de los planes Business y Enterprise pueden omitir el
almacenamiento del HTML en la memoria caché cada vez que se envía una
cookie con una solicitud (configuración *Bypass Cache on Cookie* en
**Crear Page Rules**).
{{</Aside>}}

**Los clientes de los planes Business y Enterprise de Cloudflare** pueden almacenar en la memoria caché vistas de páginas anónimas al usar WordPress con nuestra funcionalidad _Bypass Cache on Cookie_. Esto permite que el HTML estático se almacene en la memoria caché en nuestro perímetro, sin necesidad de que se regenere de una solicitud a otra. Este tutorial le permitirá realizar la configuración con WordPress y WooCommerce. 

Los clientes Enterprise de Cloudflare pueden utilizar _claves de memoria caché personalizadas_ para potenciar su funcionamiento. Si desea obtener más información, póngase en contacto con el administrador del cliente.

Antes de empezar, asegúrese de que se haya configurado Cloudflare para que respete los encabezados _Control de caché_ de su servidor web de origen; de lo contrario, Cloudflare podría anular los encabezados _Control de caché_ con el valor configurado en la opción de **caducidad de la memoria caché del navegador**. Para configurar la opción _Respetar los encabezados existentes_, visite la aplicación **Almacenamiento en memoria caché** del panel de Cloudflare:

![](/images/support/Screen_Shot_2016-12-21_at_01.58.16.png)

Desplácese hacia abajo hasta encontrar la opción de **caducidad de la memoria caché del navegador** y seleccione el valor _Respetar los encabezados existentes_:

![](/images/support/Screen_Shot_2016-12-20_at_23.22.51.png)

A continuación, configure la regla **Omitir memoria caché en cookie**. Puede hacerlo en la aplicación **Page Rules** del panel de Cloudflare:

![](/images/support/VFGgnIk.png)

Posteriormente, haga clic en **Crear Page Rule** para configurar el almacenamiento del HTML estático en nuestro sitio.

El primer paso consiste en configurar la page rule para que coincida con su ruta de instalación de WordPress. Si su sitio se encuentra en https://www.ejemplo.com, la regla sería [https://www.ejemplo.com.](https://www.example.com./)

En este ejemplo, WordPress se ejecuta en https://junade.com, de modo que la Page Rule debe coincidir con https://junade.com/\*.

![Screen_Shot_2017-03-09_at_16.54.36.png](/images/support/Screen_Shot_2017-03-09_at_16.54.36.png)

A continuación, puede configurar las reglas que desee aplicar.

_Almacenar todo en la memoria caché_ indicará a Cloudflare que almacene el HTML estático en la memoria caché.

Cuando la regla _Omitir memoria caché en cookie_ coincide con los criterios configurados, Cloudflare no almacena el HTML en la memoria caché ([mientras que las imágenes estáticas y otros archivos seguirán almacenándose en la memoria caché](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)). En función de si utiliza WordPress o WooCommerce sin procesar, deberá utilizar una de las configuraciones siguientes:

<table><tbody><tr><td>WordPress (nativo)</td><td>wp-.*|wordpress.*|comment_.*</td></tr><tr><td>WordPress con WooCommerce &nbsp; &nbsp;</td><td>wp-.*|wordpress.*|comment_.*|woocommerce_.*</td></tr></tbody></table>

Finalmente, la configuración de _TTL de la memoria caché perimetral_ definirá el periodo máximo durante el cual Cloudflare deberá mantener los archivos almacenados en la memoria caché antes de recuperarlos desde el servidor web de origen. Incluso después de configurar un tiempo prolongado de TTL de la memoria caché perimetral, podrá [borrar manualmente la memoria caché](https://support.cloudflare.com/hc/en-us/articles/200169246-How-do-I-purge-my-cache-) o utilizar nuestro complemento de WordPress para administrar automáticamente la depuración de la memoria caché.

A continuación, haga clic en **Guardar y desplegar** para finalizar.

Asimismo, al utilizar la función [_Administración automática de la memoria caché_ del complemento de WordPress de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/115002708027-What-does-Automatic-Cache-Management-in-the-Cloudflare-Plugin-do-), puede depurar automáticamente la memoria caché de su sitio después de que se apliquen los cambios en el mismo (es decir, cambio/personalización del tema o edición, eliminación o creación de una publicación, archivo adjunto o página).
