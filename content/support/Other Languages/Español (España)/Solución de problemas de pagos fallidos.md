---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/218344877-Soluci%C3%B3n-de-problemas-de-pagos-fallidos
title: Solución de problemas de pagos fallidos
---

# Solución de problemas de pagos fallidos



## Descripción

A continuación, se detallan los motivos más comunes por las que las transacciones son rechazadas cuando Cloudflare intentas procesar tu pago. Si tu pago no tiene éxito durante Cinco (5) días, tu cuenta bajará de categoría automáticamente a un Plan Free. 

{{<Aside type="note">}}
Bajar la categoría a un Plan Free no suspende tu sitio web. Sin embargo,
perderás cualquier suscripción o servicio complementario con el plan
Pro, Business o Enterprise Plan.
{{</Aside>}}

Después de actualizar tu método de pago, te sugerimos que [actualices manualmente tu tipo de plan](https://support.cloudflare.com/hc/en-us/articles/360033922371) y servicios complementarios mediante el panel de control de Cloudflare.

___

## Motivos comunes de pagos fallidos

### Tu banco ha hecho una retención

El banco o el emisor de la tarjeta ha puesto una retención u otra medida similar que previene que Cloudflare hago cargos a la tarjeta en archivo. El correo electrónico que recibiste para notificarte sobre el pago fallido explica el motivo específico del rechazo.

Contacta a tu banco para verificar cualquier restricción que impida que Cloudflare procese tu pago correctamente.

### Es necesario actualizar tu información de facturación

La información de facturación que Cloudflare tiene en archivo es inexacta o está incompleta. Además, la tarjeta de crédito registrada podría haber expirado.

{{<Aside type="note">}}
Es posible que no se acepten las tarjetas de regalo y de prepago para el
pago ya que no están asociadas con una dirección de facturación.
{{</Aside>}}

Para asegurarte de que toda la información de facturación sea actual y precisa, consulta la sección [Actualización de la información de facturación de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170236-How-do-I-update-my-billing-information-)

### Tu cuenta de pago no tiene fondos suficientes.

Cloudflare no pudo cobrar el pago debido a fondos insuficientes en la cuenta registrada. Contacta a tu institución financiera para asegurar que haya disponibilidad de fondos.

### Compras de dominio de Cloudflare Registrar

Cloudflare procesa los pagos de las transferencias de dominio de Registrar de uno en uno, lo que puede resultar en un pago fallido para los usuarios que compran varios dominios a la vez. Por ejemplo, si registras cinco (5) dominios en un día, se te hará el cobro cinco veces. Tu compañía de tarjetas de crédito podría marcar esto como fraude.

Contacta a tu institución financiera para asegurarte de que este pago no se procese.

___

## Recursos relacionados

-   [Política de facturación de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170286)
-   [Entender las facturas de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205610698)
-   [Actualización de tu información de facturación de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170236)
