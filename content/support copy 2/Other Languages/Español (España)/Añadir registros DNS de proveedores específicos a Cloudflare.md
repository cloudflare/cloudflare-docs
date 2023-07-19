---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/360020991331-A%C3%B1adir-registros-DNS-de-proveedores-espec%C3%ADficos-a-Cloudflare
title: Añadir registros DNS de proveedores específicos a Cloudflare
---

# Añadir registros DNS de proveedores específicos a Cloudflare



Este artículo precisa conocimientos previos sobre gestión de registros DNS a través del panel de control de Cloudflare.  Para obtener más información, consulta el artículo de Cloudflare sobre [la gestión de registros DNS](https://support.cloudflare.com/hc/en-us/articles/360019093151).

  
**Google**

Añade los siguientes registros MX:

| **Nombre** | **TTL** | **Tipo de registro** | **Prioridad**  | **Destino** |
| --- | --- | --- | --- | --- |
| @ | Automático | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | Automático | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | Automático | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | Automático | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | Automático | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

Una vez añadidos, los registros DNS tienen una apariencia similar a lo siguiente en la aplicación **DNS** de Cloudflare:

{{<Aside type="note">}}
Revisa los [últimos registros MX solicitados por Google
App](https://support.google.com/a/answer/174125?hl%3Den).
{{</Aside>}}

[Prueba la configuración de correo electrónico de Google Apps](https://toolbox.googleapps.com/apps/checkmx/check).

{{<Aside type="warning">}}
Para evitar algún comportamiento inesperado, no uses *registros MX* que
no sean de Google.
{{</Aside>}}

Añade un _registro CNAME_ para Google App Engine al DNS de Cloudflare.

Por ejemplo, si el dominio es _www.ejemplo.com_, el _registro CNAME_ es similar a lo siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www CNAME  ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Confirma el valor del *registro CNAME* que Google solicita para el
dominio.
{{</Aside>}}

Para configurar un redireccionamiento para un dominio de Google Apps, consulta la [guía de reenvío de URL de Google](https://support.google.com/a/answer/53340?hl=en).

{{<Aside type="warning">}}
Google ejecuta HTTPS en sus servicios. Si encuentras errores sobre
bucles de redireccionamiento cuando navegas en tu sitio a través de
Cloudflare, asegúrate de que el **SSL** está configurado en
*Completo* en la aplicación **SSL/TLS** del panel de control de
Cloudflare.
{{</Aside>}}

**Amazon**

Los clientes de AWS deben actualizar los servidores de nombres de sus dominios para dirigirse a los servidores de nombres de Cloudflare que se mencionan en la aplicación de **Información general** del panel de control de Cloudflare:

1.  Inicie sesión en AWS.
2.  Haz clic en **Mi cuenta** en la parte superior derecha de la barra de navegación.
3.  Selecciona **Consola de gestión de AWS** del menú desplegable.
4.  Haz clic en **Servicios** y selecciona **Route 53**.
5.  Actualiza los servidores de nombres en dos lugares:
    
    -   Haz clic en **Zonas alojadas** y selecciona el dominio para actualizar con los servidores de nombres de Cloudflare.
    -   Edita los servidores de nombres para que se dirigen a los servidores de nombres de Cloudflare.
    
      
    -   Haz clic en **Dominios registrados**.
    -   Selecciona el dominio que se debe actualizar con los servidores de nombres de Cloudflare.
    -   Haz clic en **Añadir o editar servidores de nombres**.

Consulta la documentación de Amazon sobre cómo [](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[crear un bucket de Amazon S3](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html).

Ten en cuenta la URL de host completa asignada al bucket.

Añade un _registro CNAME_ para el bucket de AWS en el DNS de Cloudflare. Por ejemplo, si la URL de host completa del bucket es _archivos.ejemplo.com_, añade un _registro CNAME_ similar a lo siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">archivos  CNAME  archivos.ejemplo.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="warning">}}
Amazon requiere que el CNAME coincida con el nombre del bucket, como en
el ejemplo anterior.
{{</Aside>}}

Consulta la documentación de Amazon sobre [SES y la configuración de verificación](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html).

Encuentra los registros de verificación _TXT_ y _CNAME_ proporcionados por Amazon.

Añade los registros al DNS de Cloudflare.  Por ejemplo, si el dominio de Cloudflare es _ejemplo.com_, los registros DNS son similares a lo siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com  TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot;verificationstring._domainkey.ejemplo.com  CNAME  verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="warning">}}
El contenido del registro TXT anterior es un ejemplo. Usa el contenido
correcto proporcionado por Amazon SES.
{{</Aside>}}

Consulta el [contenido de ayuda de Amazon ELB](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html) para obtener orientación sobre la configuración de ELB en Amazon.

{{<Aside type="note">}}
La característica **CNAME Flattening** de Cloudflare habilita un
registro CNAME en el dominio raíz para dirigirse a un Load Balancer
elástico.
{{</Aside>}}

1.  Añade un _registro CNAME_ a Cloudflare por el nombre de host, por ejemplo: _elb_.
2.  En la aplicación **DNS** de Cloudflare, reemplaza **Nombre de dominio** con el destino ELB:  
    _  
    <nombre de host de AWS>.<región>._elb.amazonaws.com es el formato de destino _CNAME_ apropiado.  
    (por ejemplo: _my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com).
3.  Busca la asistencia de AWS para determinar el _nombre de host de AWS_ o la _región_.

**Microsoft**

Sigue las instrucciones de Microsoft sobre la  [configuración de los ajustes DNS de Azure](https://www.windowsazure.com/en-us/develop/net/common-tasks/custom-dns-web-site/).

Añade los registros requeridos de Azure al DNS de Cloudflare.

Por ejemplo, si el dominio es _ejemplo.com_, el formato del registro es similar a lo siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com  A  203.0.113.1www.ejemplo.com  CNAME  ejemplo.azurewebsites.net</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Reemplaza *203.0.113.1* con la verdadera dirección IP del sitio de
Azure.
{{</Aside>}}

Para obtener información sobre registros de verificación, consulta la documentación de Azure sobre [creación de registros de verificación de dominio](https://docs.microsoft.com/en-us/office365/admin/dns/create-dns-records-for-azure-dns-zones?view=o365-worldwide#add-a-txt-record-for-verification).

{{<Aside type="warning">}}
Añade registros DNS para la verificación Azure con un icono de nube
gris.
{{</Aside>}}

**Proveedores diversos**

Puedes configurar Cloudflare para trabajar con ClickFunnels.  El proceso requiere la actualización de tu configuración DNS de Cloudflare.

En los siguientes artículos de ClickFunnels, se resume la mejor forma de configurar los dos servicios para tu sitio:

-   [Añadir un subdominio de Cloudflare](https://help.clickfunnels.com/hc/en-us/articles/360005906774-Adding-A-Cloudflare-Subdomain-)
-   [Registro CNAME de Cloudflare](https://help.clickfunnels.com/hc/en-us/articles/360005906094-Cloudflare-CNAME-Record)

{{<Aside type="note">}}
Consulta la [documentación sobre MX de
Zoho](https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html) y
la [documentación sobre
SPF](https://www.zoho.com/mail/help/adminconsole/spf-configuration.html) antes
de añadir los registros DNS a Cloudflare.
{{</Aside>}}

Mira los ejemplos a continuación para añadir los registros DNS de Zoho adecuados a Cloudflare. En todos los ejemplos, reemplaza _ejemplo.com_ con el nombre de dominio verdadero:

-   Añade los _registros MX_ de Zoho:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com  MX  mx.zohomail.com (configura Prioridad en 10).ejemplo.com  MX  mx2.zohomail.com (configura Prioridad en 20).</span></div></span></span></span></code></pre>{{</raw>}}

-   (Opcional) Añade un _registro SPF_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com  TXT  v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   (Opcional) Para acceder al correo a través de una [URL de Zoho personalizada](https://adminconsole.wiki.zoho.com/domains/CustomURL.html), añade un _registro CNAME_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">correo  CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   (Opcional) Para añadir un [registro de validación de dominio de Zoho](https://www.zoho.com/mail/help/adminconsole/domain-verification.html):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
El registro zb es único para cada dominio. Añade el código de
verificación de zb único proporcionado por Zoho.
{{</Aside>}}

En general, los registros DNS son similares a los que se mencionan a continuación. Reemplaza _ejemplo.com_ con el nombre de dominio verdadero:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">correo electrónico  CNAME  sendgrid.netejemplo.com  SPF  v=spf1 a mx include:sendgrid.net ~allejemplo.com  TXT  v=spf1 a mx include:sendgrid.net ~allmtpapi._domainkey.EJEMPLO.com  CNAME  dkim.sendgrid.net.smtpapi._domainkey.e.EJEMPLO.COM  CNAME  dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

-   Consulta la [documentación de WPEngine](http://wpengine.com/support/how-to-configure-your-dns/) sobre la configuración DNS.
-   Determina si añadir un _registro A_ o _CNAME_ al DNS de Cloudflare.  
    [Cómo encontrar tu dirección IP en WPEngine](http://wpengine.com/support/find-ip/)

  

-   Consulta la documentación de Cloudflare sobre [Gestión de registros DNS](https://support.cloudflare.com/hc/en-us/articles/360019093151) para obtener detalles sobre cómo añadir los registros.

{{<Aside type="warning">}}
Añade los registros DNS que Microsoft utiliza para la validación de
dominio (tales como *autodiscover*) con un icono de nube gris.
{{</Aside>}}

Consulta la documentación de Ning sobre [Dominios personalizados y entradas DNS](http://www.ning.com/help/?p%3D2870).

Si el dominio personalizado de Ning es _www.ejemplo.com_, añade un _registro CNAME_ y un _registro A_ como se indica a continuación:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.ejemplo.com  CNAME  ejemplo.ning.com.ejemplo.ning.com  A  208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

Después de que Ning verifique el dominio, cambia el icono de nube gris a una nube naranja para los registros DNS de Ning, así el tráfico puede redirigirse mediante proxy a Cloudflare.

Consulta la documentación de SmugMug para obtener los últimos detalles sobre requisitos de registro DNS. En general, añade _registros CNAME_ para SmugMug similares a lo siguiente:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">fotografía CNAME domains.smugmug.comfotografías CNAME domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

Después de que SmugMug verifique el dominio, cambia el icono de nube gris a una nube naranja para los registros DNS de SmugMug, así el tráfico puede redirigirse mediante proxy a Cloudflare.

Consulta el [artículo de Mandrill sobre registros DNS](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-) para obtener los últimos detalles sobre requisitos de registro DNS.

Mandrill requiere la adición de _registros SPF_ y _DKIM_. Obtén los valores de registro DNS de Mandrill.

Añade los _registros SPF_ y _DKIM_ como _registros TXT_ en la aplicación DNS de Cloudflare.

Por ejemplo, si _ejemplo.com_ es el dominio de Mandrill, añade registros DNS similares a los siguientes.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com  TXT  v=spf1 include:spf.mandrillapp.com ?allmandrill._domainkey.ejemplo.com  TXT  v=DKIM1\; (valores de Mandrill)</span></div></span></span></span></code></pre>{{</raw>}}

Configura Rackspace CloudFiles a través del _registro CNAME_. Consulta la [documentación de Rackspace CloudFiles](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)[.](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)

Confirma el destino _CNAME_ correcto con la asistencia de Rackspace.

Un ejemplo de _registro CNAME_ aparece a continuación:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rack  CNAME  e0978.r18.cf2.rackcdn.com</span></div></span></span></span></code></pre>{{</raw>}}

Si _ejemplo.com_ es el dominio personalizado, añade registros DNS a Cloudflare similares a los que aparecen a continuación:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com  A  66.6.44.4www.ejemplo.com  CNAME  dominios.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## Recursos relacionados

[Gestión de registros DNS de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151)

[CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
