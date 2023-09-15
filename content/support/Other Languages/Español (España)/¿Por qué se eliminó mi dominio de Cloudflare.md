---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/221327488--Por-qu%C3%A9-se-elimin%C3%B3-mi-dominio-de-Cloudflare-
title: ¿Por qué se eliminó mi dominio de Cloudflare
---

# ¿Por qué se eliminó mi dominio de Cloudflare?



## Información general

La eliminación de dominios suele producirse por los motivos siguientes:

-   Un usuario con acceso al dominio lo ha eliminado.
-   Los servidores de nombres ya no apuntan a Cloudflare. Cloudflare supervisa continuamente el registro de dominios.
-   El dominio no estaba autentificado (pendiente durante 60 días).

___

## Paso 1: revisa los registros de auditoría de tu cuenta de Cloudflare

Los **registros de auditoría** de Cloudflare cuentan con información sobre la eliminación de dominios.  Revisa el uso de los registros de auditoría para obtener información adicional sobre la función **Registros de auditoría**.

1.  Inicia sesión en el panel de control de Cloudflare.
2.  Haz clic en la cuenta de Cloudflare adecuada donde existía el dominio eliminado.
3.  Haz clic en **Registro de auditoría** en la segunda barra de navegación de la parte superior.
4.  Para **Dominio**, introduce el nombre de dominio eliminado.
5.  Haz clic en una **Acción**_Eliminar_ y asegúrate de que **Recurso** indica _Cuenta_.
6.  Observa la **Fecha**, la **Dirección IP del usuario** y el **Usuario** que eliminó el dominio.
7.  Si **Dirección IP del usuario** es _127.0.0.1_ o no contiene datos, los sistemas de Cloudflare han realizado automáticamente la eliminación. Ve al paso 2 

{{<Aside type="note">}}
*Eliminar* es una **Acción**  que indica la eliminación del dominio,
pero también suele utilizarse para la eliminación de otras
configuraciones de la cuenta. Por lo tanto, asegúrate de
que Recurso indique *Zona* .
{{</Aside>}}

___

## Paso 2: revisa si el registro de dominios especifica los servidores de nombres de Cloudflare

{{<Aside type="tip">}}
No es necesario revisar el registro de dominio para los dominios que
utilizan una configuración de CNAME de Cloudflare.
{{</Aside>}}

1\. Usa la aplicación “whois” de la línea de comandos que se proporciona con tu sistema operativo o un sitio web, como [whois.icann.org](https://whois.icann.org/en) o [www.whois.net](https://www.whois.net/).

-   Si no puedes encontrar los detalles sobre el servidor de nombres de tu dominio, ponte en contacto con el registrador de tu dominio o el proveedor de dominios para obtener información sobre el registro de dominios.
-   Asegúrate de que los servidores de nombres de Cloudflare sean los únicos dos mencionados en los detalles del registro de dominios.
-   Asegúrate de que los servidores de dominios estén bien escritos en el registro de dominios.

2\. Confirma que los servidores de nombres coinciden exactamente con los proporcionados en la sección **Servidores de nombres de Cloudflare** de la aplicación **DNS** de Cloudflare.

3\. Si identificas información incorrecta, inicia sesión en el portal del proveedor de dominios para realizar actualizaciones o ponte en contacto con el proveedor de dominios para obtener asistencia.

___

## Paso 3: revisa si la resolución de dominios usa los servidores de nombres de Cloudflare

{{<Aside type="tip">}}
No es necesario revisar el registro de dominio para los dominios que
utilizan una configuración de CNAME de Cloudflare.
{{</Aside>}}

1\. Usa herramientas de línea de comandos o de terceros para confirmar la configuración de los servidores de nombres de Cloudflare:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS algo.otrodominio.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS algo.otrodominio.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS algo.otrodominio.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

La opción +trace genera información detallada cuando la respuesta de DNS falla. Esta información puede ser útil cuando se solucionan problemas con tu proveedor de DNS.

La opción @8.8.8.8 devuelve resultados de la resolución DNS pública de Google. Los resultados confirmarán si las resoluciones públicas reciben una respuesta de DNS.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns algo.otrodominio.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns algo.otrodominio.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Algunos servicios en línea, como [whatsmydns.net](https://www.whatsmydns.net/), comprueban la resolución de DNS en todo el mundo.

-   Asegúrate de que dos servidores de nombres de Cloudflare sean los únicos que se devuelven en los resultados de la consulta.
-   Asegúrate de que no haya servidores de nombres mal escritos.
-   Confirma que los servidores de nombres coinciden exactamente con los proporcionados en la sección **Servidores de nombres de Cloudflare** de la aplicación **DNS** de Cloudflare.

2\. Si identificas información incorrecta, inicia sesión en el portal del proveedor de dominios para realizar actualizaciones o ponte en contacto con el proveedor de dominios para obtener asistencia.

3\. Si el servidor de nombres y los datos del registro de dominios son correctos, ponte en contacto con el proveedor de dominios para confirmar que ha habido problemas de propagación de DNS últimamente.

{{<Aside type="note">}}
Algunos registradores proporcionan más de dos servidores de nombres. Sin
embargo, usa solo los dos proporcionados en la aplicación DNS de tu
cuenta de Cloudflare.
{{</Aside>}}

___

## Recupera un dominio eliminado

Recupera un dominio eliminado a través del enlace**\+ Añadir sitio** ubicado en la parte derecha de la barra de navegación superior del panel de control de Cloudflare.El dominio debe añadirse como un dominio nuevo.

{{<Aside type="warning">}}
El equipo de asistencia de Cloudflare no puede restablecer el DNS o la
configuración de los dominios eliminados.
{{</Aside>}}

___

## Recursos relacionados

-   [Servidores de nombres secundarios](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-) (función de Enterprise)
-   [Configuración de CNAME](/dns/zone-setups/partial-setup) (función de los planes Business y Enterprise)
-   [Cómo cambiar los servidores de nombres a Cloudflare](/dns/zone-setups/full-setup/setup)
