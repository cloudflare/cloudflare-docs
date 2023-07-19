---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360020296512-Preguntas-frecuentes-sobre-la-resoluci%C3%B3n-de-problemas-de-DNS
title: Preguntas frecuentes sobre la resolución de problemas de DNS
---

# Preguntas frecuentes sobre la resolución de problemas de DNS



## ¿Por qué tengo un subdominio dc-#########?

El subdominio dc-##### se añade para resolver conflictos creados cuando tu registro SRV o _MX_ se resuelve en un dominio configurado para redirigirse mediante proxy a Cloudflare.

Por lo tanto, Cloudflare creará un registro DNS dc-##### que se resuelva en la dirección IP del origen. El registro dc-##### garantiza que el tráfico para tu registro MX o SRV no se redirija mediante proxy (se resuelve directamente en tu IP de origen) mientras el proxy de Cloudflare funciona para el resto del tráfico.

Por ejemplo, antes de usar Cloudflare, imagina que tus registros DNS para correo son los siguientes:

`ejemplo.com MX ejemplo.com` `ejemplo.com A 192.0.2.1`

Tras usar Cloudflare y redirigir mediante proxy el _registro A_, Cloudflare proporcionará respuestas DNS con una IP de Cloudflare (203.0.113.1 en el ejemplo a continuación):

`ejemplo.com MX ejemplo.com` `ejemplo.com A 203.0.113.1`

Puesto que redirigir mediante proxy el tráfico de correo a Cloudflare interrumpe tus servicios de correo, Cloudflare detecta esta situación y crea un registro dc-#####.

`ejemplo.com MX dc-1234abcd.ejemplo.com``dc-1234abcd.ejemplo.com A 192.0.2.1` `ejemplo.com A 203.0.113.1`

Eliminar el registro dc-###### solo es posible mediante uno de los siguientes métodos:

-   Si no se recibe ningún correo para el dominio, elimina el _registro MX._
-   Si se recibe correo para el dominio, actualiza el _registro MX_ para que se resuelva en un _registro A_ separado para un subdominio de correo que Cloudflare no redirija mediante proxy:

`ejemplo.com MX mail.ejemplo.com``mail.ejemplo.com A 192.0.2.1``ejemplo.com A 203.0.113.1`

{{<Aside type="warning">}}
Si tu servidor de correo reside en la misma dirección IP que tu servidor
web, tu registro MX expondrá tu dirección IP de origen.
{{</Aside>}}

___

## ¿Por qué las consultas de DNS devuelven resultados incorrectos?

A veces, si una caché DNS recursivo no se puede actualizar, las herramientas de terceros pueden entregar resultados DNS incorrectos. En este caso, purga tu caché DNS pública a través de estos métodos:

-   [Cómo purgar tu caché DNS en OpenDNS](http://www.opendns.com/support/cache/)
-   [Cómo purgar tu caché DNS en Google](https://developers.google.com/speed/public-dns/cache)
-   [Cómo purgar tu caché DNS localmente](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## ¿No se encuentran registros A, AAAA o CNAME?

_No se encuentran registros A, AAAA o CNAME_ significa que la aplicación **DNS** de Cloudflare carece de registros apropiados para la resolución DNS.

[Añade los registros DNS que faltan](/dns/manage-dns-records/how-to/create-dns-records) a tu dominio.

{{<Aside type="note">}}
En general, los sitios tienen al menos un *registro A* que apunta a la
dirección IP del servidor de origen, normalmente para el subdominio
www y el dominio raíz.
{{</Aside>}}

___

## ¿Por qué he recibido un correo electrónico? ¿Tus servidores de nombres han cambiado?

Para los dominios en los que Cloudflare aloja el DNS, Cloudflare comprueba continuamente si el dominio utiliza los servidores de nombres de Cloudflare para la resolución del DNS. Si no se utilizan los servidores de nombres de Cloudflare, el estado del dominio se actualiza de _Activo_ a _Movido_ en la aplicación de Cloudflare **Información general** y se envía un correo electrónico al cliente.  Cualquier dominio _Movido_ durante más de 7 días se elimina, a menos que el dominio vuelva a estar _Activo_.

Para usar los servidores de nombres de Cloudflare, los pasos para resolver el problema requieren la actualización del DNS en tu registrador de dominio.

1.  Sigue los pasos 2 y 3 de nuestro [artículo sobre la resolución de problemas de dominios](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-).
2.  Haz clic en **Volver a revisar ahora** en la aplicación **Información general** de la interfaz de usuario de Cloudflare.

___

## ¿Por qué no puedo añadir determinados TLD mediante la API del DNS?

La API del DNS no se puede utilizar para los dominios con dominios de primer nivel (TLD) .cf, .ga, .gq, .ml, o .tk. Utiliza el panel de control de Cloudflare para gestionar estos TLD. Los clientes Enterprise pueden [contactar con el soporte de Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) para eliminar esta limitación.
