---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200170786-C%C3%B3mo-restablecer-las-IP-originales-del-visitante
title: Cómo restablecer las IP originales del visitante
---

# Cómo restablecer las IP originales del visitante



## Información general

{{<Aside type="warning">}}
Cloudflare ya no actualizará ni proveerá asistencia técnica para
*mod\_cloudflare* a partir de las versiones **Debian 9** y **Ubuntu
18.04 LTS** del sistema operativo Linux. Ahora recomendamos
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
para los clientes que utilizan servidores web Apache. Los clientes que
estén interesados en compilar el paquete *mod\_cloudflare* , pueden
[descargar el código base](https://github.com/cloudflare/mod_cloudflare)
de GitHub.
{{</Aside>}}

Cuando el [tráfico de tu sitio web se enruta a través de la red de Cloudflare](https://support.cloudflare.com/hc/articles/205177068), actuamos como un proxy inverso. Esto permite a Cloudflare acelerar el tiempo de carga de página enrutando los paquetes de manera más eficiente y almacenando en caché los recursos estáticos (imágenes, JavaScript, CSS, etc.). Como resultado, al responder las solicitudes y registrarlas, tu servidor de origen devuelve una [dirección IP de Cloudflare](https://www.cloudflare.com/ips/).

Por ejemplo, si instalas aplicaciones que dependen de la dirección IP entrante del visitante original, se registra por defecto una dirección IP de Cloudflare. La dirección IP original del visitante aparece en un encabezado HTTP añadido denominado [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986). Siguiendo nuestras [instrucciones del servidor web](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq), puedes registrar la dirección IP original del visitante en tu servidor de origen. Si este encabezado HTTP no está disponible cuando las solicitudes llegan a tu servidor de origen, comprueba tu configuración de [Reglas de transformación](/rules/transform/) y [Transformaciones administradas](/rules/transform/managed-transforms/).

El siguiente diagrama muestra las diferentes formas en las que se gestionan las direcciones IP con y sin Cloudflare.

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### Información general

Cloudflare ya no actualiza ni admite _mod\_cloudflare._ Sin embargo, si utilizas un servidor web Apache con un sistema operativo como **Ubuntu Server 18.04** y **Debian 9 Stretch**, puedes utilizar _mod\_remoteip_ para registrar la dirección IP original de tu visitante.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Como este módulo lo ha creado un tercero, no podemos brindar asistencia técnica para problemas relacionados con el complemento.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Para instalar _mod\_remoteip_ en tu servidor web Apache debes hacer lo siguiente:

1\. Activa _mod\_remoteip_ ejecutando el comando siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\. Actualiza la configuración del sitio para incluir _RemoteIPHeader CF-Connecting-IP_, p. ej. `/etc/apache2/sites-available/000-default.conf`


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\. Actualiza la entrada _LogFormat_ combinada en `apache.conf`, sustituyendo _%h_ por _%a en_ `/etc/apache2/apache2.conf.` Por ejemplo, si tu entrada _LogFormat_ actual tuviera la forma siguiente,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

actualiza _LogFormat_ como se muestra a continuación:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. Define las direcciones proxy de confianza creando `/etc/apache2/conf-available/remoteip.conf` especificando el siguiente código y [direcciones IP de Cloudflare](https://www.cloudflare.com/ips/):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (dirección IP de ejemplo)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (dirección IP de ejemplo)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repite este paso para todas las direcciones IP de Cloudflare que aparecen en [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. Activa la configuración de Apache:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Activar conf remoteip.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Para activar la nueva configuración, debes ejecutar:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reload</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. Prueba la configuración de Apache:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Syntax OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. Reinicia Apache:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Para obtener más información sobre *mod\_remoteip* , consulta la
[documentación de
Apache](https://httpd.apache.org/docs/2.4/mod/mod_remoteip.html "Módulo mod_remoteip de Apache").
{{</Aside>}}

___

## mod\_cloudflare

{{<Aside type="warning">}}
Cloudflare ya no actualizará ni proveerá asistencia técnica para
*mod\_cloudflare* a partir de las versiones **Debian 9** y **Ubuntu
18.04 LTS** del sistema operativo Linux. Ahora recomendamos
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
para los clientes que utilizan servidores web Apache. Los clientes que
estén interesados en compilar el paquete *mod\_cloudflare* , pueden
[descargar el código base](https://github.com/cloudflare/mod_cloudflare)
de GitHub.
{{</Aside>}}

Hay dos métodos para instalar mod\_cloudflare: descargando la extensión de Apache de GitHub o añadiendo código a tu servidor web de origen.

### Descarga de paquetes o scripts de GitHub

Si utilizas un servidor web Apache, puedes descargar mod\_cloudflare de [GitHub](https://github.com/cloudflare/mod_cloudflare).

### Adición de código a tu servidor web de origen

Si no puedes instalar mod\_cloudflare, o si no se encuentra disponible un complemento de Cloudflare para tu plataforma del sistema de gestión de contenido para restaurar la dirección IP original de los visitantes, añade este código a tu servidor web de origen en la etiqueta <body> o antes en cualquier página que necesite las direcciones IP originales de los visitantes:

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>`

Este comando hará que la dirección IP solo esté disponible para los scripts que la necesiten. No almacena la dirección IP en tus registros de servidor vigentes.

### Apache

Para eliminar _mod\_cloudflare_, deberías marcar como comentario la línea de configuración de Apache que carga _mod\_cloudflare_.

Esto varía en función de tu distribución Linux, pero en la mayoría de los casos, si buscas en `/etc/apache2`, deberías poder buscar y encontrar la línea.

`LoadModule cloudflare_module`

Marca como comentario o elimina esta línea y luego reinicia apache. _mod\_cloudflare_ debería desaparecer.

Si estás ejecutando Ubuntu o Debian, deberías ver

`file/etc/apache2/mods-enabled/cloudflare.load`

Elimina este archivo para quitar _mod\_cloudflare_ y luego reinicia Apache.

### Nginx

Mod\_cloudflare se instala modificando [el archivo de configuración de nginx](http://nginx.org/en/docs/http/ngx_http_realip_module.html) `nginx.conf` con `ngx_http_realip_module`.

Para eliminar _mod\_cloudflare_ debes marcar como comentario o eliminar esta línea y luego reiniciar nginx. _mod\_cloudflare_ debería desaparecer_._

{{<Aside type="note">}}
Para eliminar *mod\_cloudflare* de otros tipos de servidores web,
consulta la documentación de tu servidor web para ver cómo eliminar
módulos.
{{</Aside>}}

___

## Instrucciones del servidor web

Consulta a continuación las instrucciones sobre cómo configurar tu servidor web para que registre las direcciones IP originales de los visitantes en función del tipo de servidor web:

{{<Aside type="warning">}}
Cloudflare ya no actualizará ni proveerá asistencia técnica para
*mod\_cloudflare* a partir de las versiones **Debian 9** y **Ubuntu
18.04 LTS** del sistema operativo Linux. Ahora recomendamos
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
para los clientes que utilizan servidores web Apache. Los clientes que
estén interesados en compilar el paquete *mod\_cloudflare* , pueden
[descargar el código base](https://github.com/cloudflare/mod_cloudflare)
de GitHub.
{{</Aside>}}

1.  Verifica que esté instalado:
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.  Clona lo siguiente para la compilación más reciente de _mod\_cloudflare_:
    -   Red Hat/Fedora/Debian/Ubuntu:`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Utiliza la herramienta de extensión de Apache para convertir el archivo .c en un módulo:
    -   Red Hat/Fedora/Debain/Ubuntu:`apxs -a -i -c mod_cloudflare.c`
4.  Reinicia y verifica que el módulo esté activo:
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu:`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  Si el servidor web está detrás de un equilibrador de carga, añade la siguiente línea a tu configuración de Apache (por lo general, httpd.conf) y reemplaza 123.123.123.123 por la dirección IP de tu equilibrador de carga:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[inserta la dirección IP de tu equilibrador de carga]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Utiliza el [módulo NGINX `ngx_http_realip_module`](http://nginx.org/en/docs/http/ngx_http_realip_module.html) y los siguientes parámetros de configuración:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1 (dirección IP de ejemplo)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repite este paso para todas las direcciones IP de Cloudflare especificadas en [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"># utiliza cualquiera de los dos</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Esta lista de prefijos debe actualizarse periódicamente. Publicamos la lista completa en [Direcciones IP de Cloudflare](https://www.cloudflare.com/ips).

{{<Aside type="note">}}
Para incluir las direcciones IP originales de los visitantes en tus
registros, añade las
variables \$http\_cf\_connecting\_ip y \$http\_x\_forwarded\_for i en la
directiva log\_format.
{{</Aside>}}

Consulta también: [Cloudflare y NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/).

{{<Aside type="warning">}}
Cloudflare ya no actualizará ni proveerá asistencia técnica para
*mod\_cloudflare* a partir de las versiones **Debian 9** y **Ubuntu
18.04 LTS** del sistema operativo Linux. Ahora recomendamos
[*mod\_remoteip*](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)
para los clientes que utilizan servidores web Apache. Los clientes que
estén interesados en compilar el paquete *mod\_cloudflare* , pueden
[descargar el código base](https://github.com/cloudflare/mod_cloudflare)
de GitHub.
{{</Aside>}}

1.  Ejecuta el siguiente script para instalar mod\_cloudflare como parte de EasyApache: `bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  Tras la instalación, deberás volver a compilar tu Apache con el nuevo complemento de mod\_cloudflare.

Al usar Railgun (u otro software de proxy inverso, como Varnish) las solicitudes del usuario procederán del servidor Railgun y no de Cloudflare. Puesto que las solicitudes no proceden directamente de Cloudflare, los mod añadidos no restaurarán por defecto las direcciones IP de los visitantes.

1.  Para solucionarlo, abre tu configuración de Apache. Normalmente se encuentra en `/etc/apache2/apache2.conf`, `/etc/httpd/httpd.conf`, `/usr/local/apache/conf/httpd.conf` o en otra ubicación según la configuración. Si no estás seguro, pregunta a tu proveedor de alojamiento.
2.  Al final, añade:`CloudflareRemoteIPTrustedProxy railgun_address`Por lo tanto, si tu servidor Railgun está ubicado en 127.0.0.1, tendrá la forma siguiente:`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  Si tienes más de un servidor para añadir a la lista de proxies de confianza, puedes añadirlos al final:CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

Para que Lighttpd reescriba de manera automática la dirección lP del servidor para los registros de acceso y tu aplicación, puedes aplicar una de las dos soluciones que se muestran a continuación.

1.  Abre tu archivo **lighttpd.conf** y añade _mod\_extforward_ a la lista _server.modules_. Debe ir **después de** _mod\_accesslog_ para mostrar la dirección IP real en los registros de acceso
2.  Añade el siguiente fragmento de código en cualquier lugar del archivo **lighttpd.conf** después de la lista de módulos del servidor y luego reinicia Lighttpd


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (dirección IP de ejemplo)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot;trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repite este paso para todas las direcciones IP de Cloudflare que aparecen en [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="tip">}}
Si tu origen se conecta a Internet con IPv6, **\$HTTP\[\"remoteip\"\]**
, que es necesario para hacer coincidir los rangos de direcciones IP
remotas, no funciona cuando IPv6 está activado. El método anterior no
funcionará al intentar la redirección de los rangos de direcciones IP.
Añade las siguientes líneas a lighttpd.conf como solución alternativa:
`extforward.forwarder = ( "all" => "trust" ) extforward.headers = ("CF-Connecting-IP")`
{{</Aside>}}

1.  Ve a tu consola de administración web LiteSpeed.
2.  Activa la opción "Use Client IP in Header in Configuration".
3.  Una vez activada, tus registros de acceso mostrarán las direcciones IP correctas, e incluso la variable `$_SERVER['REMOTE_ADDR']` de PHP contendrá la dirección IP real del cliente, en lugar de una dirección IP de Cloudflare, que en sí misma resolverá la mayoría de los problemas que puedes encontrar al activar Cloudflare en los sitios web activados por PHP (como las instalaciones de WordPress o vBulletin).

##### Para IIS 7 - 8:

Sigue las instrucciones que se encuentran [aquí](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115).

##### Para IIS 8.5 - 10:

A partir de IIS 8.5, el registro personalizado es una opción integrada. Consulta [IIS Enhanced Logging](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85) (Registro mejorado IIS)

1.  En IIS Manager, haz doble clic en **Logging** (Registro) en el menú _Actions_ (Acciones) del sitio en el que estés trabajando.
2.  Una vez que se inicie, selecciona el formato **W3C**  y luego haz clic en **Select Fields**(Seleccionar campos) junto al menú desplegable en la subsección _Log File_ (Archivo de registro).
3.  Haz clic en **Add Field** (Añadir campo) y añade el encabezado _CF-Connecting-IP_.
4.  Haz clic en **Aceptar**. Deberías ver tu nueva entrada reflejada en **Campos personalizados**. Haz clic en **Aplicar** cuando estés de nuevo en la ventana _Registro_.

1.  Si con esto se soluciona, el archivo de registro ahora tendrá un guión bajo:También debes ver el cambio en los campos:
2.  Si el cambio no se refleja de inmediato, reinicia el sitio, luego W3SVC, y por último la instancia completa.Cuando se utiliza el registro mejorado en IIS 8.5+,  **no se restablece** la dirección IP original del visitante a nivel de aplicación.

Para que Tomcat7 restaure automáticamente la dirección IP original del visitante en tus registros de acceso y en tu aplicación, tendrás que añadir `%{CF-Connecting-IP}i` a tu esquema de registro.

A modo de ejemplo, puedes añadir el siguiente fragmento de código a tu archivo `server.xml`.

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>`

Lo que hará que tus registros se visualicen de la siguiente manera:

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

Consulta este tutorial de un tercero para ver cómo restaurar la dirección IP original del visitante con [Magento y Cloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/).

De igual modo, Cloudflare no ha escrito [esta extensión  de Magento](https://marketplace.magento.com/), pero a algunos de nuestros clientes les ha resultado útil.

Como este complemento es de un tercero, no podemos brindar asistencia técnica para los problemas relacionados con el complemento.

Para activar la compatibilidad correcta de las direcciones IP al ejecutar la instalación de Invision Power Board 3 en Cloudflare, sigue estas instrucciones:

Inicia sesión en la ACP de la instalación de IPB.

1.  Haz clic en **System**.
2.  En Overview (Descripción), haz clic en Security (Seguridad).
3.  En Security Center (Centro de seguridad), haz clic en **Security Settings** (Configuraciones de seguridad).Comprueba que _¿Confías en las direcciones IP que proporcionan los servidores proxy?_ está en verde.

##### Descripción de IPB4 de _Trust IP addresses provided by proxies?_ (¿Confías en las direcciones IP que proporcionan los servidores proxy?)

Si tu entorno de red implica que las solicitudes se gestionan a través de un servidor proxy (como una intranet en una oficina o universidad, o en un clúster de servidores con equilibrio de carga), es posible que necesites activar esta configuración para que se utilice la dirección IP correcta. Sin embargo, cuando está activada, un usuario malicioso puede abusar del sistema para proporcionar una dirección IP falsa. En la mayoría de los entornos, esta configuración debe estar desactivada.

La información para restaurar la dirección IP original de los visitantes con Simple Machines (SMF) se puede encontrar en los [foros Simple Machines](https://custom.simplemachines.org/mods/index.php?mod=2502).

Si utilizas un servidor Apache, recomendamos instalar [mod\_cloudflare](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) para restaurar la dirección IP del visitante en tus registros.

Si no tienes acceso a tu servidor para instalar un mod, puedes [modificar el núcleo](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406).

Las versiones más recientes de MyBB incluyen una opción para analizar la dirección IP del usuario.

`Admin CP > Configuration > Server and Optimization Options > Scrutinize User's IP address? > Yes > Yes`

Como alternativa, puedes instalar el [complemento de gestión de Cloudflare](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin) disponible para MyBB 1.6.

##### MyBB 1.6.0, 1.6.1, 1.6.2 o 1.6.3

1.  Ve a `./inc/functions.php`.
2.  Ve a la línea 2790.
3.  Reemplaza:`if(isset($_SERVER['REMOTE_ADDR']))`con:`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  Luego, reemplaza:`$ip = $_SERVER['REMOTE_ADDR'];`con:`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

Un miembro del equipo de Vanilla ha escrito un [complemento de Cloudflare para Vanilla](https://open.vanillaforums.com/addon/cloudflaresupport-plugin) para restaurar la dirección IP original de los visitantes a los archivos de registro para los sitios autoalojados.

Como este complemento es de un tercero, no podemos brindar asistencia técnica para los problemas relacionados con el complemento.

1.  Abre `includes/GlobalFunctions.php`. Aproximadamente en la línea 370, cambia lo siguiente:`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`a`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  Abre `includes/ProxyTools.php`. Aproximadamente en la línea 79, busca:`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`y reemplázalo por:`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`El segundo paso solo se aplica a las versiones MediaWiki 1.18.0 y anteriores. Las versiones más nuevas de MediaWiki han reescrito por completo ProxyTools.php y el siguiente código ya no aparece.
3.  Aproximadamente en la línea 80, busca:`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`Guarda y carga en tu servidor web de origen.

##### Para las versiones en torno a la 1.27.1:

1.  Ves a la línea 1232 en `GlobalFunctions.php`, cambia `REMOTE_ADDR` a `HTTP_CF_CONNECTING_IP`.
2.  A continuación, ves a `WebRequest.php`, en las líneas 1151 a 1159, cambia `REMOTE_ADDR` a `HTTP_CF_CONNECTING_IP`.

Un usuario de Xenforo ha creado un [complemento para Cloudflare](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/).

Como este complemento es de un tercero, no podemos brindar asistencia técnica para los problemas relacionados con el complemento.

1.  Abre `library/config.php`.
2.  Al final, añade:`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  Carga y sobrescribe.

Un tercero ha creado un [módulo para Cloudflare y PunBB](http://punbb.informer.com/forums/post/147539/#p147539) que restaurará la dirección IP original del visitante.

Como este complemento es de un tercero, no podemos brindar asistencia técnica para los problemas relacionados con el complemento.

1.  Descarga `cherokee-admin` en tu servidor.
2.  Ve a la **interfaz de administración de Cherokee** en tu navegador web.
3.  Selecciona el **servidor virtual** para el dominio al que presta servicio Cloudflare.
4.  En la pestaña _Logging_ (Registro) para el **servidor virtual** seleccionado, activa Accept Forwarded IPs (Aceptar IP enviadas).
5.  En el recuadro _Accept from Hosts_ (Aceptar de los hosts), especifica las [direcciones IP de Cloudflare](https://www.cloudflare.com/ips/).

Puedes corregir la dirección IP cambiando el campo `PHP IP Server Param` en la configuración del servidor Livezilla a `HTTP_CF_CONNECTING_IP`.

Para restablecer la dirección IP de los visitantes a DataLife Engine:

1.  Abre:/engine/inc/include/functions.inc.phpBusca:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Cambia a:`$db_ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  Busca:`$ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Cambia a:`$ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  Abre:/engine/modules/addcomments.phpBusca:`$_SERVER['REMOTE_ADDR'],`Cambia a:`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  Busca:`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Cambia a:`$db_ip_split = explode( ".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`

Un desarrollador externo ha creado una [extensión de Cloudflare para TYPO3](https://extensions.typo3.org/extension/cloudflare/) que restablecerá la dirección IP original de los visitantes en tus registros. La extensión también te permitirá limpiar tu caché de Cloudflare.

Como este complemento es de un tercero, no podemos brindar asistencia técnica para los problemas relacionados con el complemento.

Si utilizas el panel de control de alojamiento de VestaCP, tanto Nginx como Apache se ejecutan en tu servidor. Las solicitudes se redirigen mediante proxy a través de Nginx antes de dirigirse a Apache.

Debido a este proxy Nginx, en realidad necesitas las instrucciones para configurar Nginx para restituir la verdadera dirección IP de los visitantes.[Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) para Apache no es necesario a menos que desactives el servidor Nginx para algunas solicitudes. Añadir [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) a Apache no estará en conflicto con la configuración del servidor Nginx.

Un desarrollador externo ha creado un módulo para restablecer la dirección IP de los visitantes denominado [node\_cloudflare](https://github.com/keverw/node_CloudFlare).

___

## Restauración de la IP original del visitante con HAProxy

Para extraer la dirección IP original del cliente en el encabezado X\_FORWARDD\_FOR, debes utilizar la siguiente configuración en HAProxy:

1.  Crea un archivo de texto CF`_ips.lst` que contenga todos los rangos de direcciones IP de https://www.cloudflare.com/en-gb/ips/.
2.  Asegúrate de desactivar la opción `forwardfor` en HAProxy.

Configuración de HAProxy:

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)] if from_cf cf_ip_hdr`

___

## Recursos relacionados

-   [encabezados de solicitud HTTP](/fundamentals/get-started/http-request-headers)
-   [Reglas de transformación](/rules/transform/)
