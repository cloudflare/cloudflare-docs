---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200172906-Soluci%C3%B3n-de-problemas-de-escaladas-o-picos-en-el-tr%C3%A1fico-web
title: Solución de problemas de escaladas o picos en el tráfico web
---

# Solución de problemas de escaladas o picos en el tráfico web



## Usa las Page Rules de Cloudflare para personalizar el almacenamiento en caché

De forma predeterminada, Cloudflare almacena [contenido estático en la memoria caché](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-), como imágenes, CSS y JavaScript. Sin embargo, puedes ampliar la memoria caché de Cloudflare para trabajar con HTML creando [Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-) personalizadas.

### Almacenar todo en la memoria caché

1\. Inicia sesión en tu cuenta de Cloudflare

2\. Elige la aplicación de **Page Rules**. 

3\. Haz clic en **Crear Page Rule**.

4.  Introduce tu sitio web completo o una sección del mismo, luego establece el _Nivel de caché_ a _Todo caché_. Cloudflare almacenará completamente en caché el HTML en nuestra red perimetral, en lugar de tener que acudir a tu servidor web de origen.

5. También puedes cambiar el _TTL de caducidad de la memoria caché perimetral_ para determinar durante cuánto tiempo almacena Cloudflare en la memoria caché los recursos en nuestro perímetro. Las opciones de TTL varían de dos (2) horas a un mes. 

![page_rule_spike_or_surge_in_traffic.png](/images/support/page_rule_spike_or_surge_in_traffic.png)

Con la opción Almacenar todo en la memoria caché habilitada, Cloudflare gestionará todo el sitio liberando la carga del servidor y agilizando tu sitio al máximo.

Los clientes de Cloudflare del plan Business pueden utilizar técnicas de memoria caché avanzadas para almacenar en la memoria caché contenido estático de sitios HTML dinámicos y reducir la carga utilizando la opción de Page Rule _Omitir la caché en la caché cookie_ (Bypass Cache on Cookie).

### Almacenamiento en caché de vistas de página anónimas

Antes de que un visitante añada algo a su carrito de la compra, se registre o añada un comentario, se considera una vista de página anónima. Al almacenar en la memoria caché este tipo de visitas a la página, se eliminan drásticamente grandes cantidades de carga de tu servidor, incluso si el sitio es dinámico. Podrás encontrar más información en la publicación de introducción del blog: [Almacenamiento en caché de vistas de página anónimas](https://blog.cloudflare.com/caching-anonymous-page-views/). 

Existen varios tutoriales disponibles acerca de cómo se puede hacer esto:

-   [Almacenamiento en la memoria caché de vistas de página anónimas con WordPress o WooCommerce](https://support.cloudflare.com/hc/en-us/articles/236166048)
-   [Almacenamiento en la memoria caché de vistas de página con Magento 1 y Magento 2](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [Caché HTML estático](https://support.cloudflare.com/hc/articles/202775670)

___

## Pónte en contacto con el proveedor de host para conocer los límites de tu plan de alojamiento.

Cloudflare compensa la mayor parte de la carga de tu sitio web a través de almacenamiento en la caché y el filtrado de solicitudes, pero algo de tráfico seguirá pasando a través de tu host. Conocer los límites de tu plan puede ayudarte a evitar bloqueos en tu host. 

Una vez que conozcas los límites de tu plan, puedes usar una función como [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) para restringir la cantidad de veces que cualquier usuario puede realizar una solicitud en tu sitio web.

___

## Uso de las direcciones IP de Cloudflare en beneficio propio

Adopta las medidas necesarias para evitar ataques a tu sitio durante la temporada de más uso configurando el firewall para que solo acepte tráfico de las direcciones IP de Cloudflare durante la temporada de vacaciones. Si solo aceptas las [IP de Cloudflare](https://www.cloudflare.com/ips), puedes evitar que los atacantes lleguen a tu dirección IP original y derriben tu sitio en línea.

Otra opción sería la [extensión de Apache mod\_Cloudflare](https://www.cloudflare.com/technical-resources/#mod_cloudflare) y agregar _DenyAllButCloudFlare_ a tu configuración de Apache.

___

## Garantíza que las IP de Cloudflare están en una lista blanca

Cloudflare funciona como un proxy inverso para tu sitio de forma que todas las conexiones procedan de las IP de Cloudflare. Por lo tanto, la restricción de nuestras IP puede provocar problemas para aquellos visitantes que intenten acceder a tu sitio. Puedes encontrar la lista de direcciones IP de Cloudflare aquí: [https://www.cloudflare.com/ips  
](https://www.cloudflare.com/ips)

___

## Recursos relacionados

-   [Cómo entender y configurar Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)
-   [Caché HTML estático](https://support.cloudflare.com/hc/articles/202775670)
-   [Rate Limiting de Cloudflare](https://support.cloudflare.com/hc/articles/115001635128)
