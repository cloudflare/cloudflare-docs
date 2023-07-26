---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/200167906-Asegurar-el-acceso-del-usuario-con-autenticaci%C3%B3n-en-dos-fases-2FA-
title: Asegurar el acceso del usuario con autenticación en dos fases (2FA)
---

# Asegurar el acceso del usuario con autenticación en dos fases (2FA) – Centro de Ayuda de Cloudflare



## Descripción

La autenticación en dos fases (2FA) permite a los propietarios de cuentas agregar una capa adicional de seguridad de inicio de sesión a las cuentas de Cloudflare. Este paso de autenticación adicional requiere que proporciones algo que sepas, como una contraseña de Cloudflare y algo que tengas, como un código de autenticación de un dispositivo móvil. 

{{<Aside type="note">}}
Las cuentas de usuario de Cloudflare configuradas para utilizar el
inicio de sesión único (SSO) no pueden configurar 2FA.
{{</Aside>}}

Para garantizar que puedas acceder de forma segura a tu cuenta, incluso sin acceder a tu dispositivo móvil, por ejemplo, un nuevo teléfono, Cloudflare también proporciona códigos de respaldo para descargar. 

{{<Aside type="tip">}}
Después de descargar tus códigos de respaldo, te recomendamos que los
guardes en una ubicación segura.
{{</Aside>}}

Los superadministradores son los únicos usuarios que pueden habilitar 2FA en las cuentas de Cloudflare. Como propietario de la cuenta, se te asigna automáticamente la función de superadministrador. Una vez que se habilita 2FA, todos los miembros de la cuenta de Cloudflare deben configurar 2FA en sus dispositivos móviles.

{{<Aside type="note">}}
Los clientes de los planes gratuito, Pro y Business solo pueden tener un
superadministrador. Los clientes Enterprise pueden tener más de un
superadministrador y [asignar funciones de membresía
adicionales](https://support.cloudflare.com/hc/articles/205065067).
{{</Aside>}}

___

## Habilita la autenticación en dos fases para tu cuenta de Cloudflare

Para habilitar la autenticación en dos fases para tu cuenta de Cloudflare:

1\. Inicia sesión en el panel de control de Cloudflare.

2\. En el menú desplegable **Mi perfil**, selecciona **Mi perfil**.

3\. Haz clic en la pestaña **Autenticación**. 

4\. Desplázate hacia abajo hasta la sección **Autenticación en dos fases** y haz clic para cambiarla a _Activada_.

![2FA_enable.png](/images/support/2FA_enable.png)

___

## Configura la autenticación en dos fases para tu cuenta de Cloudflare

Todos los titulares de cuentas de Cloudflare deben habilitar 2FA. Si no eres un superadministrador,

-   deberás activar 2FA antes de aceptar la invitación para unirte a una cuenta de Cloudflare como miembro.
-   Elige tu aplicación de autenticación preferida y descárgala en tu dispositivo móvil. Hay muchas aplicaciones de autenticación disponibles, incluidas [Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0) y [Authy](https://authy.com/features/). Verás un código QR. 

Para habilitar 2FA:

1\. Escanea el código QR con tu dispositivo móvil e ingresa el código de tu aplicación de autenticación.

2\. Ingresa tu contraseña de Cloudflare, luego haz clic en **Siguiente.**

-   Si no puedes escanear el código QR, haz clic en **No puedo escanear el código QRl. Sigue los pasos alternativos** para configurar tu aplicación de autenticación manualmente.

![2FA_scan_QR_code.png](/images/support/2FA_scan_QR_code.png)

3\. Ingresa tu contraseña y haz clic en **Siguiente** nuevamente para ver tus códigos de revisión de respaldo.

4\. Una vez que veas tus códigos de respaldo, te recomendamos que los guardes en una ubicación segura. Puedes hacer clic en **Descargar**, **Imprimir** o **Copiar** para guardar los códigos, luego haz clic en **Siguiente**.

![2FA_review_and_backup_codes_v2.png](/images/support/2FA_review_and_backup_codes_v2.png)

Puedes regenerar tus códigos de respaldo en la siguiente pantalla o en cualquier momento en la pestaña **Autenticación**. 

5\. Haz clic en **Siguiente** en la pantalla de configuración del código de respaldo para finalizar. Verás que la **Autenticación en dos fases** ahora está _Activa_.

6\. También tienes la opción de solicitar un nuevo conjunto de códigos de respaldo. Haz clic en **regenerarlos ahora** para guardar un nuevo conjunto de códigos de respaldo en dos fases.

![2FA_configuration_complete.png](/images/support/2FA_configuration_complete.png)

___

## Deshabilita la autenticación en dos fases para tu cuenta de Cloudflare.

Los superadministradores son los únicos usuarios que pueden deshabilitar 2FA en las cuentas de Cloudflare. Esto hace que 2FA se deshabilite para todos los miembros de la cuenta. 

Para deshabilitar 2FA para tu cuenta de Cloudflare:

1\. Inicia sesión en el panel de control de Cloudflare.

2\. En el menú desplegable **Mi perfil**, selecciona **Mi perfil**.

3\. Haz clic en la pestaña **Autenticación**.

4\. Desplázate hacia abajo hasta la sección **Autenticación en dos fases** y haz clic para _Desactivarla_. Verás una pantalla de confirmación.

5\. Ingresa tu contraseña, un código de aplicación de autenticación o un código de respaldo y luego haza clic en **Desactivar**.

![2FA_disable.png](/images/support/2FA_disable.png)

___

## Restaurar el acceso perdido a la autenticación en dos fases de Cloudflare

Los problemas más comunes con 2FA están relacionados con la pérdida de acceso a un dispositivo móvil o código de autenticación. En la mayoría de los casos, puedes resolver el problema al usar un código de respaldo o revisar la documentación de tu aplicación de autenticación preferida.

Al configurar 2FA, se te solicitó que guardaras tus códigos de respaldo en una ubicación segura. Para restaurar el acceso perdido con un código de respaldo de Cloudflare:

1\. Recupera el código de respaldo de donde lo almacenaste.

2\. Navega a la página de inicio de sesión de Cloudflare.

3\. Ingresa el código de respaldo en la pantalla de inicio de sesión, luego haz clic en **Iniciar sesión**.

![2FA_backup_code_login_annontated.png](/images/support/2FA_backup_code_login_annontated.png)

4\. Una vez que usas un código de respaldo, queda inválido.

5.  Si intentas volver a ingresar un código de respaldo o ingresar el código incorrecto, verás un mensaje de error en la parte inferior de la pantalla. Después de varios intentos fallidos, se te pedirá que inicies sesión nuevamente.

Documentación de algunas aplicaciones de autenticación comunes para revisión:

-   [Google Authenticator](https://support.google.com/accounts/answer/185834?hl=en&ref_topic=2954345)
-   [Authy](https://www.authy.com/phones/change/)

Si aún no puedes iniciar sesión en tu cuenta de Cloudflare, por favor comunícate [con asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476). Nota: necesitarás verificar la propiedad de tu cuenta haciendo cambios al contenido en tu servidor de origen.

___

## Recursos relacionados

-   [Documentación de autenticación de Google](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [Documentación de Authy](https://authy.com/help/)
-   [Cómo configurar cuentas multiusuario en Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare)
