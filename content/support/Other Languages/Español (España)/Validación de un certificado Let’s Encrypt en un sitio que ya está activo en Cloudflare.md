---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/214820528-Validaci%C3%B3n-de-un-certificado-Let-s-Encrypt-en-un-sitio-que-ya-est%C3%A1-activo-en-Cloudflare
title: Validación de un certificado Let’s Encrypt en un sitio que ya está activo en Cloudflare
---

# Validación de un certificado Let’s Encrypt en un sitio que ya está activo en Cloudflare



## Información general

En esta guía, se ofrece información adicional sobre cómo utilizar el método Webroot para la verificación en el cliente Let's Encrypt oficial descrito en esta documentación: [https://letsencrypt.readthedocs.org/en/latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

Como una mera observación, el método predeterminado que el cliente Let's Encrypt utiliza para la autenticación ACME, utiliza el método DVSNI. Esto dará error en el caso de un dominio que tenga Cloudflare habilitado, dado que finalizamos SSL (TLS) en nuestro perímetro y el servidor ACME nunca puede ver el certificado que el cliente presenta en el origen. La utilización de métodos de validación ACME alternativos, como DNS o HTTP, permitirá una finalización correcta cuando se habilite Cloudflare.

___

## Validación HTTP

En el caso de que se haya configurado Let’s Encrypt por primera vez para un sitio ya activo en Cloudflare, lo único que se necesita para verificar y obtener correctamente el certificado y la clave privada es utilizar el método webroot para la verificación. 

1.  Descarga el cliente Let’s Encrypt y cambia al directorio de descarga:


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  Ejecuta el script para la instalación automática:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  Al utilizar el cliente `letsencrypt` con el comando `certonly` y la marca `--webroot`, puede verificar y obtener el par certificado/clave con la verificación HTTP. Un ejemplo de comando podría tener este aspecto:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d example.tld -d www.example.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    donde  
    
    **\--webroot-path**
    
    es el directorio en el servidor en el que se encuentra tu sitio (en el ejemplo se utiliza nginx).
    
    **\--renew-by-default**
    
    selecciona la renovación de forma predeterminada cuando los dominios son un superconjunto de un certificado obtenido previamente.
    
    **email**
    
    es el correo electrónico que se utiliza para el registro y contacto de recuperación.
    
    **\--text**
    
    muestra la salida de texto.
    
    **\--agree-tos**
    
    acepta el acuerdo de suscripción de Let’s Encrypt.
    
    **\-d**
    
    especifica nombres de host que se van a añadir a SAN.
    
4.  La correcta finalización de este método de verificación mostrará un texto parecido al siguiente:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">¡Felicidades! Tu certificado y cadena se han guardado en /etc/letsencrypt/live/example.tld/fullchain.pem.    Tu certificado se vencerá el 3 de marzo de 2016. Para obtener una nueva versión del certificado    en el futuro, solo tienes que volver a ejecutar Let’s Encrypt.</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Como una mera observación, tanto el certificado como la clave se guardarán en `/etc/letsencrypt/live/example.tld/` . Después de haber obtenido ambos, deberá actualizar manualmente el host virtual para que utilice este par de clave/certificado.

Asegúrese de comprobar las page rules del dominio en el panel de Cloudflare y verifique que no haya ninguna que pueda dar como resultado una solicitud en la que la dirección URL de validación se redirija o solo sea accesible a través HTTPS.

___

## Renovación

Una vez llegue el momento de la renovación, el uso del [comando](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal) `letsencrypt renew` debe permitir la correcta renovación del certificado sin ningún cambio en la configuración de Cloudflare, siempre y cuando:

-   El archivo .conf que el cliente letsencrypt utilice para la renovación, especifique `authenticator = webroot`.
-   La dirección URL de validación sea accesible a través de HTTP.
-   No haya redirecciones aplicadas para esa dirección URL. 

De forma opcional, la repetición de los pasos anteriores también emitirá un nuevo certificado.

{{<Aside type="note">}}
El cliente oficial todavía no admite el método de validación DNS; sin
embargo, existen utilidades de terceros que utilizan este método.
{{</Aside>}}