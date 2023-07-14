---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200170476-Soluci%C3%B3n-de-errores-de-contenido-mixto
title: Solución de errores de contenido mixto
---

# Solución de errores de contenido mixto



## Información general

Los dominios añadidos a Cloudflare reciben certificados SSL y pueden servir tráfico en HTTPS. Sin embargo, tras comenzar a usar Cloudflare, algunos clientes notan contenido perdido o problemas en la representación de la página cuando sirve tráfico HTTPS por primera vez.

En general, el problema se debe a una solicitud de recursos HTTP de una página web que se sirve en HTTPS.  Por ejemplo, escribes _https://ejemplo.com_ en un navegador y la página contiene una imagen de referencia a través de HTTP en el HTML a ```<img src="/images/support/recurso.jpg">```

Normalmente, si tu sitio web carga todos los recursos de manera segura en HTTPS, los visitantes observan un icono de candado (verde, en general) en la barra de direcciones de su navegador:

![green-lock-icon.png](/images/support/green-lock-icon.png)

Esto indica que tu sitio tiene un certificado SSL en funcionamiento y todos los recursos cargados por el sitio se cargan a través de HTTPS. El candado verde garantiza a los visitantes que su conexión es segura. Uno de los [indicadores del contenido mixto](https://support.cloudflare.com/hc/es-es/articles/200170476-Soluci%C3%B3n-de-errores-de-contenido-mixto#h_a6c5a05b-baba-4f88-a75c-d61f206366ed) es que aparecen iconos diferentes en lugar del icono de candado verde.

{{<Aside type="tip">}}
Otros motivos de los problemas de representación del contenido
son [[Rocket
Loader]{style="font-weight: 400;"}](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-)[
y
]{style="font-weight: 400;"}[[Auto-Minify]{style="font-weight: 400;"}](https://blog.cloudflare.com/an-all-new-and-improved-autominify/)[. 
Prueba deshabilitar ambas funciones si no ves errores de contenido
mixto.]{style="font-weight: 400;"}
{{</Aside>}}

___

## Indicadores de la aparición de contenido mixto

La mayoría de los navegadores modernos bloquean las solicitudes HTTP en páginas HTTPS seguras. El contenido bloqueado puede incluir imágenes, JavaScript, CSS u otro contenido que afecte la apariencia o el comportamiento de la página.

A continuación, hay indicaciones de que tu navegador web observa contenido mixto para el sitio web solicitado:

En cuanto a las advertencias de contenido mixto, el navegador web carga los recursos, pero los usuarios no ven el icono de candado verde en la URL. Los mensajes de advertencia aparecen dentro de las herramientas de depuración del navegador:

![mixed-content-warning.png](/images/support/mixed-content-warning.png)

En cuanto a los errores de contenido mixto, el navegador se niega a cargar los recursos cuando la conexión no es segura:

![mixed-content-error.png](/images/support/mixed-content-error.png)

Puedes encontrar información relativa al uso de las herramientas de depuración del navegador para localizar estos problemas en la documentación de [Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content) y [Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content). Como alternativa, puedes ver la fuente de tu página y encontrar referencias específicas de _http://_ sobre rutas hacia otros recursos.

___

Hay dos métodos para solucionar los errores de contenido mixto.

1\. Carga todos los recursos a través de tu fuente HTML sin especificar los protocolos HTTP o HTTPS. Por ejemplo:

     ```//domain.com/path/to.file```

     en lugar de

     ```http://domain.com/path/to.file```

2\. Según tu sistema de administración de contenido, revisa los complementos que reescriben automáticamente los recursos HTTP a HTTPS. Dentro de la aplicación **SSL/TLS**, Cloudflare proporciona tal sistema a través de [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647).

{{<Aside type="note">}}
Cloudflare recomienda a los usuarios de WordPress que instalen el
[complemento de WordPress de
Cloudflare](https://wordpress.org/plugins/cloudflare/) y habiliten la
opción *Automatic HTTPS Rewrites* dentro del complemento. Como
alternativa, Cloudflare recomienda los complementos [SSL insecure
content
fixer](https://en-gb.wordpress.org/plugins/ssl-insecure-content-fixer/) o
[Really Simple
SSL](https://en-gb.wordpress.org/plugins/really-simple-ssl/) para
reemplazar automáticamente el HTTP con HTTPS.
{{</Aside>}}

___

## Recursos relacionados

-   [Depuración de contenido mixto en Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
-   [Depuración de contenido mixto en Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
