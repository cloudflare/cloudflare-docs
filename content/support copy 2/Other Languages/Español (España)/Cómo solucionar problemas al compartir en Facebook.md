---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/217720788-C%C3%B3mo-solucionar-problemas-al-compartir-en-Facebook
title: Cómo solucionar problemas al compartir en Facebook
---

# Cómo solucionar problemas al compartir en Facebook



## Descripción

Cloudflare, de forma predeterminada, no bloquea ni controla las solicitudes de Facebook. Sin embargo, una publicación de un sitio web en Facebook genera un error de _Atención necesaria_ en las siguientes circunstancias:

-   el nivel de seguridad se configura en [I'm Under Attack](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c), ya sea a nivel global o a través de una [Page Rule](https://support.cloudflare.com/hc/articles/200172336), o
-   hay un bloqueo o control del firewall definido por el usuario que incluye la dirección IP de Facebook.

{{<Aside type="note">}}
[Una dificultad del país puede bloquear las direcciones IP de Facebook. 
Se sabe que Facebook hace un rastreo desde EE. UU. e
Irlanda.]{style="line-height: 1.5;"}
{{</Aside>}}

Para resolver los problemas al compartir en Facebook, puedes hacer alguna de estas dos cosas:

-   eliminar la [Regla de Firewall](https://support.cloudflare.com/hc/articles/360016473712) correspondiente al IP, al número de sistema autónomo o al país, o la [Regla de Acceso de IP](https://support.cloudflare.com/hc/articles/217074967) que controla o bloquea los IP de Facebook, o
-   incluir AS32934 y AS63293 en la lista blanca de tus [Reglas de acceso de IP](https://support.cloudflare.com/hc/articles/217074967), para invalidar los controles, los bloqueos y los problemas Under Attack.

Si tienes problemas al compartir con Facebook, debes volver a extraer información de las páginas con la opción **Obtener nueva información para extraer** en el [Depurador de objetos](https://developers.facebook.com/tools/debug/og/object/) de Facebook.

{{<Aside type="note">}}
Facebook solo vuelve a extraer contenido cada 30 días, salvo que se
indique lo contrario. Si debes actualizar muchos recursos, Facebook
[ofrece una interfaz de programación de aplicaciones (
API)](https://developers.facebook.com/docs/sharing/opengraph/using-objects)
que te ayuda a hacerlo.
{{</Aside>}}

Si aún tienes problemas, [comunícate con la asistencia de Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) y brinda los siguientes detalles:

-   el URL de tu sitio web que no se puede compartir en Facebook
-   la salida de la [herramienta de depuración de Facebook](https://developers.facebook.com/tools/debug/og/object/)
-   la confirmación de que has vuelto a extraer información de los URL
