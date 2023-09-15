---
pcx_content_type: troubleshooting
language_tag: spanish
title: ¿Qué hace el modo «I’m Under Attack»?
---

# ¿Qué hace el modo «I’m Under Attack»?

## ¿Qué hace el modo «I’m Under Attack»?

![im_under_attack_page.png.scaled500.png](/images/support/im_under_attack_page.png.scaled500.png) 

[«I’m Under Attack»](http://blog.cloudflare.com/introducing-im-under-attack-mode) añadirá protecciones adicionales a un sitio que esté bajo ataque y necesite [protección y mitigación DDoS](https://www.cloudflare.com/ddos). Si recibe un ataque y tiene esta función activada durante el ataque, los visitantes recibirán una página intersticial durante unos cinco segundos mientras analizamos el tráfico para asegurarnos de que sea un visitante humano legítimo.

**Nota:** los visitantes del sitio deben tener habilitadas las cookies y JavaScript para pasar la página intersticial.

Para habilitar el modo I'm Under Attack, consulte [¿Cómo habilito el modo I'm Under Attack?](https://support.cloudflare.com/hc/en-us/articles/200170206-How-do-I-enable-I-m-Under-Attack-mode-).

**¿Por qué aparece el mensaje «Checking your browser before accessing» antes de acceder a un sitio en Cloudflare?**

La página «Checking your browser before accessing example.com» se genera cuando el propietario del sitio activa la configuración del modo I'm Under Attack. La página generalmente desaparecerá y le otorgará acceso al sitio transcurridos unos 5 segundos.

**Nota**: Deberá tener activadas las cookies y JavaScript en el navegador para pasar la verificación. La verificación se realiza para garantizar que no forme parte de una red de robots (botnet).
