---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115003614752-Autenticaci%C3%B3n-de-correo-electr%C3%B3nico-factores-m%C3%BAltiples
title: Autenticación de correo electrónico factores múltiples
---

# Autenticación de correo electrónico factores múltiples



## Información general

Cloudflare utiliza un método de autenticación de factores múltiples (AFM) para aumentar la seguridad de la cuenta. La AFM previene las apropiaciones de cuentas de clientes cuando los atacantes obtienen acceso no autorizado a una cuenta debido a una contraseña expuesta o vulnerable.

Cloudflare desafiará cualquier intento de inicio de sesión si el usuario proporciona las credenciales correctas de una dirección IP no reconocida.

![URL anterior: https://support.cloudflare.com/hc/article_attachments/360035322751/account_access_email.png
Identificación de artículo: 115003614752 | Autenticación de correo electrónico de factores múltiples
](/images/support/hc-import-account_access_email.png)

Cloudflare desafía el inicio de sesión a través del envío de un código único al correo electrónico que tenemos en el archivo de la cuenta. Este código caduca en 30 minutos. Una vez que se proporciona el código correcto a través del panel de control, esa IP se registrará y los intentos de inicio de sesión adicionales desde esa dirección IP no se cuestionarán durante 90 días.

![URL anterior: https://support.cloudflare.com/hc/article_attachments/360035323072/login_authentication.png
Identificación de artículo: 115003614752 | Autenticación de correo electrónico de factores múltiples
](/images/support/hc-import-login_authentication.png)

Al marcar "recordar este equipo", ese dispositivo/navegador no recibirá desafíos de AFM en 14 días. Después de 14 días, Cloudflare comenzará a verificar la dirección IP nuevamente para detectar inicios de sesión desde ese dispositivo/navegador.

{{<Aside type="note">}}
El correo electrónico de la AFM solo se puede deshabilitar cuando
actives la autenticación en dos fases.
{{</Aside>}}

___

## Resolución de problemas de la autenticación de factores múltiples

Los correos electrónicos de Cloudflare a veces son marcados como correo electrónico no deseado por el servicio de correo electrónico del destinatario. Si estás esperando un token de autenticación, debes revisar la carpeta de correo no deseado para localizar correo electrónico de Cloudflare y configurar un filtro para permitir que los correos electrónicos de Cloudflare de _no-reply@notify.cloudflare.com__**.**_

Otras veces los correos electrónicos son rechazados por el servicio de correo electrónico del destinatario. Cloudflare lo intentará nuevamente, pero después de algunos intentos marcará tu dirección de correo electrónico y no te enviará más correos electrónicos.

Si sigues sin recibir un correo electrónico después de asegurarte de que tu servicio de correo electrónico no está marcando a Cloudflare, ponte en contacto con [Soporte de Cloudflare.](https://support.cloudflare.com/requests/new)

___

## Recursos relacionados

-   [Acceso basado en funciones con autenticación en dos fases](https://support.cloudflare.com/hc/es-es/articles/200167906)
