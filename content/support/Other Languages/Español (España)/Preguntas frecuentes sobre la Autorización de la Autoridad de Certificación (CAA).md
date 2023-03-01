---
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115000310832-Preguntas-frecuentes-sobre-la-Autorizaci%C3%B3n-de-la-Autoridad-de-Certificaci%C3%B3n-CAA-
title: Preguntas frecuentes sobre la Autorización de la Autoridad de Certificación (CAA)
---

# Preguntas frecuentes sobre la Autorización de la Autoridad de Certificación (CAA)



## ¿Qué es la CAA?

Un registro de Autorización de la Autoridad de Certificación permite que los propietarios de dominio restrinjan la emisión de Autoridades de Certificación (CA) específicas. _Los registros de CAA_ evitan que las CA emitan certificados bajo ciertas circunstancias.  Consulta el [RFC 6844](https://tools.ietf.org/html/rfc6844) para obtener más detalles.

___

## ¿Cómo evalúa Cloudflare los registros de CAA?

Una CA evalúa los _registros de CAA_, no Cloudflare.

___

## ¿Por qué debo deshabilitar Universal SSL si mis _registros de CAA_ excluyen la emisión de Universal SSL?

Ya que los certificados Universal SSL se comparten entre clientes, tus _registros de CAA_ pueden evitar la emisión de Universal SSL de otro cliente. Por este motivo, Cloudflare debe deshabilitar Universal SSL para tu dominio con el fin de asegurar que tus _registros de CAA_ no afectan a otros clientes.

Si no necesitas Universal SSL de Cloudflare, **deshabilita Universal SSL** en la aplicación **SSL/TLS**.

___

## ¿Qué registros están añadidos para mantener habilitado Universal SSL?

Los siguientes registros DNS se configuran automáticamente si continúas usando los certificados Universal SSL gratuitos de Cloudflare:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ejemplo.com. IN CAA 0 issue &quot;comodoca.com&quot;ejemplo.com. IN CAA 0 issue &quot;digicert.com&quot;ejemplo.com. IN CAA 0 issue &quot;letsencrypt.org&quot;ejemplo.com. IN CAA 0 issuewild &quot;comodoca.com&quot;ejemplo.com. IN CAA 0 issuewild &quot;digicert.com&quot;ejemplo.com. IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Utilizado de manera independiente, _issuewild_ solo permite la emisión de comodines.  Por este motivo, Cloudflare no puede añadir tu dominio raíz al certificado, a menos que especifiques la opción _Permitir comodines y nombres de host específicos_ en el menú desplegable **Etiqueta**:  

![configuring_caa_records_comodoca_annotated.png](/support/static/configuring_caa_records_comodoca_annotated.png)

___

## ¿Qué ocurre cuando se deshabilita Universal SSL?

Tu nombre de dominio se quita inmediatamente del certificado Universal SSL y tus usuarios observarán los errores SSL, a menos que [cargues un certificado SSL personalizado](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) (requiere un plan Business o Enterprise).

___

## ¿Cómo vuelvo a habilitar Universal SSL?

Archiva un vale de asistencia con el equipo de asistencia de Cloudflare.

___

## ¿Cuáles son los riesgos de configurar registros de CAA?

