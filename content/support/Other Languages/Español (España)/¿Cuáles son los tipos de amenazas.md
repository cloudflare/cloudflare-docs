---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/204191238--Cu%C3%A1les-son-los-tipos-de-amenazas-
title: ¿Cuáles son los tipos de amenazas
---

# ¿Cuáles son los tipos de amenazas?

## ¿Cuáles son los tipos de amenazas?

Cloudflare clasifica las amenazas que bloquea o desafía. Para ayudarle a comprender mejor el tráfico de su sitio, la métrica «Type of Threats Mitigated» (tipo de amenazas mitigadas) de la página de análisis evalúa las amenazas bloqueadas o desafiadas conforme a las siguientes categorías:   

**Bad browser (navegador malicioso):  
**La fuente de la solicitud no era legítima o la solicitud era maliciosa. Los usuarios verán una [página de error 1010](https://support.cloudflare.com/hc/en-us/articles/200171806-Error-1010-The-owner-of-this-website-has-banned-your-access-based-on-your-browser-s-signature) en el navegador.

La comprobación de la integridad del navegador de Cloudflare busca encabezados HTTP comunes de los que abusan generalmente los spammers y le deniega el acceso a su página. Asimismo, desafiará a los visitantes que no tengan un agente de usuario o agente de usuario no estándar (que utilizan generalmente los bots, rastreadores o visitantes).

[Obtenga aquí más información sobre la comprobación de integridad del navegador.](https://support.cloudflare.com/hc/en-us/articles/200170086-What-does-the-Browser-Integrity-Check-do-)

**Hotlink bloqueado**:  
«Hotlink Protection» permite garantizar que otros sitios no puedan utilizar su ancho de banda al crear páginas con enlaces a imágenes alojadas en su servidor de origen. Los clientes de Cloudflare pueden activar o desactivar esta función.

[Obtenga aquí más información sobre Hotlink Protection.](https://support.cloudflare.com/hc/en-us/articles/200170026)

**Human challenged (desafío a humanos)**:  
se presentó a los visitantes una página de desafío CAPTCHA pero no la pasaron.

_Nota: Una página de CAPTCHA consiste en una palabra o un conjunto de números difíciles de leer que solo los humanos pueden traducir. Si se introduce de forma incorrecta, la solicitud se bloquea._

**Browser challenge (desafío de navegador)**:  
Un bot dio una respuesta no válida para el desafío de JavaScript (en muchos casos, esto no ocurre; los bots generalmente no responden al desafío, por lo que los desafíos de JavaScript «fallidos» no se registran).

_Nota: Durante un desafío de JavaScript, aparece_ _una página intersticial durante aproximadamente cinco segundos mientras Cloudflare realiza una serie de desafíos matemáticos para garantizar que el visitante sea un humano legítimo._

**IP maliciosa:  
**Una solicitud que procedía de una dirección IP en la que no confiaba Cloudflare basada en la puntuación de amenaza.

Cloudflare utiliza las puntuaciones de amenazas recopiladas de fuentes como Project Honeypot, así como el tráfico generado por nuestras comunidades, para determinar si un visitante es legítimo o malicioso. Cuando un visitante legítimo pasa un desafío, se compensa la puntuación de amenazas con respecto al comportamiento negativo anterior observado en esa dirección IP. A partir de esta actividad, nuestro sistema aprende a distinguir quién es una amenaza. Los propietarios del sitio pueden anular la puntuación de amenazas en cualquier momento utilizando la configuración de seguridad de Cloudflare.

**Country block (bloqueo de país)**:  
Solicitudes de países que se bloquearon en función de la configuración de usuario establecida en la aplicación Firewall.

[Obtenga aquí más información sobre cómo bloquear países mediante la aplicación Firewall.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**IP block (user) (Bloqueo de IP (usuario))**:  
Solicitudes de direcciones IP específicas que se han bloqueado en función de la configuración de usuario establecida en la aplicación Firewall.

[Obtenga aquí más información sobre cómo bloquear la IP mediante la aplicación Firewall.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**IP range block (/16) (Bloqueo de intervalo de IP (/16))**:  
Intervalo de IP A/16 que se ha bloqueado en función de la configuración de usuario establecida en la aplicación Firewall.

[Obtenga aquí más información sobre cómo bloquear la IP mediante la aplicación Firewall.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**IP range block (/24) (bloqueo de intervalo de IP (/24)**:  
Intervalo de IP A/24 que se ha bloqueado en función de la configuración de usuario establecida en la aplicación Firewall.

[Obtenga aquí más información sobre cómo bloquear la IP mediante la aplicación Firewall.](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-)

**New CPATCHA (user) (nuevo CAPTCHA (usuario)):  
**Desafío que se basa en la configuración de usuario establecida para las IP del visitante en WAF o en la aplicación Firewall.

[Obtenga aquí más información sobre los visitantes desafiados mediante WAF.](https://support.cloudflare.com/hc/en-us/articles/200172236-How-do-I-manage-whether-the-WAF-blocks-a-visitor-or-challenges-them-with-a-challenge-page-)

**Error de captcha**:  
Solicitudes realizadas por un bot que no han pasado el desafío.

_Nota: Una página de CAPTCHA consiste en una palabra o un conjunto de números difíciles de leer que solo los humanos pueden traducir. Si se introduce de forma incorrecta, la solicitud se bloquea._

**Bot Request:  
**Solicitud que procede de un bot.
