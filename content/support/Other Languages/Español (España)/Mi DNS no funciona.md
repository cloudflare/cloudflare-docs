---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/217912538-Mi-DNS-no-funciona
title: Mi DNS no funciona
---

# Mi DNS no funciona



## Síntomas

En navegadores web como Safari o Chrome, se producen con frecuencia varios errores de DNS:

-   _No se puede localizar este sitio._
-   _Esta página web no está disponible._
-   _err\_name\_not\_resolved_
-   _No se puede encontrar el servidor._
-   [_Error 1001: Error de resolución de DNS_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## Causas habituales y resoluciones

A continuación, se muestran las causas más frecuentes de los errores de resolución de DNS junto con las soluciones sugeridas.

### Dominio o subdominio mal escrito

Verifica que el dominio o subdominio se haya escrito correctamente en la dirección URL de la solicitud.

### Faltan registros DNS

Asegúrate de tener los registros DNS necesarios en la aplicación **DNS** del panel de control de Cloudflare. Esto incluye tener los siguientes registros:

-   El dominio raíz (por ejemplo, _ejemplo.com_)
-   Cualquier subdominio existente (por ejemplo, _www.ejemplo.com, blog.ejemplo.com_, etc.)

{{<Aside type="tip">}}
Si tienes una [configuración de zona
parcial](/dns/zone-setups/partial-setup),
asegúrate de que tus registros DNS también existan en tus servidores de
nombres autoritativos.
{{</Aside>}}

Obtén más información sobre la configuración de los  [registros DNS](/dns/manage-dns-records/how-to/create-dns-records) A y CNAME.

### No se ha desactivado DNSSEC antes de añadir el dominio a Cloudflare

Los fallos en la resolución DNS tienen lugar si no se ha desactivado [DNSSEC](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269) en el proveedor de dominio antes de añadir el dominio a Cloudflare.

### Los servidores de nombres ya no apuntan a Cloudflare

Si gestionas los registros DNS a través de la aplicación **DNS** del panel de control de Cloudflare y tu dominio deja de apuntar a los servidores de nombres de Cloudflare, la resolución DNS fallará. Esto puede ocurrir si el registrador del dominio cambia los servidores de nombres para que tu dominio apunte a los servidores de nombres predeterminados.Para confirmar si este es el problema, [comprueba si su dominio utiliza los servidores de nombres de Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605).

### Dirección IP no resuelta

Esporádicamente, es posible que el solucionador de DNS del cliente que solicita la dirección URL no pueda resolver un registro DNS en una dirección IP válida. Espera unos minutos y vuelve a cargar la página para ver si el problema ha desaparecido.Este problema no está relacionado con Cloudflare, pero la utilización del [solucionador de DNS de Cloudflare](/1.1.1.1/setup/) puede ser de gran utilidad.Ponte en contacto con tu proveedor de alojamiento para obtener ayuda adicional con el solucionador de DNS actual.
