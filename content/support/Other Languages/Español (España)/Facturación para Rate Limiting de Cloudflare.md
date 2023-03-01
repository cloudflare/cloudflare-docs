---
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/115000272247-Facturaci%C3%B3n-para-Rate-Limiting-de-Cloudflare
title: Facturación para Rate Limiting de Cloudflare
---

# Facturación para Rate Limiting de Cloudflare



A los clientes de Enterprise se les cobra una tarifa fija, según se especifica en su contrato. Todos los demás planes se [facturan según el uso](https://support.cloudflare.com/hc/en-us/articles/115004555148), el cual se refleja en la factura de suscripción mensual de la siguiente manera:

Las primeras 10 000 solicitudes facturables en todos tus sitios web son gratuitas. Posteriormente, se cobrará 0,05 $ por las 10 000 solicitudes posteriores. Por ejemplo, si tenías un total de 35 000 solicitudes válidas/permitidas que coinciden con cualquier regla de Rate Limiting:

-   De 1 a 10 000 son gratuitas.
-   De 10 001 a 20 000 cuestan 0,05 $.
-   De 20 001 a 30 000 cuestan 0,05 $.
-   De 30 001 a 35 000 cuestan 0,05 $ (la facturación no se prorratea si solo utiliza una parte de las 10 000 solicitudes pagadas).

Se te cobrará 0,15 $ en total por Rate Limiting en tu próxima [fecha de facturación](https://support.cloudflare.com/hc/en-us/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2). El cargo aparecerá como un renglón separado en tu factura y mostrará la cantidad total de solicitudes facturadas.

Ten en cuenta que las primeras 10 000 solicitudes se realizan en todos los sitios de tu cuenta, en lugar de recibir 10 000 solicitudes gratuitas por sitio: si tienes un sitio con 20 000 solicitudes y otro con 30 000 solicitudes, tu factura será de 0,20 $ por el total de 50 000 solicitudes, no de 0,15 $.

___

## Uso facturable de Rate Limiting

Rate Limiting se factura en función del número de solicitudes válidas (no bloqueadas) que coincidan con las reglas definidas en todos tus sitios web. Cada solicitud se cuenta una sola vez, por lo que no se te cobrará dos veces si una solicitud coincide con reglas distintas.

Por ejemplo, en una regla que coincide con example.com/ratelimit/\* y bloquea a los clientes que envían más de 30 solicitudes por minuto:

-   El cliente A envía 20 000 solicitudes a example.com/ratelimit/foo a un ritmo de 10 solicitudes por minuto. Se permiten todas las solicitudes.
-   El cliente B envía 90 000 solicitudes a example.com/ratelimit/bar, generalmente a un ritmo de 10 solicitudes por minuto, pero con ráfagas de más de 30 solicitudes por minuto. 60 000 de sus solicitudes se bloquean durante las ráfagas y se permiten 30 000 cuando su tasa de solicitud es menor.
-   El cliente C envía 20 000 solicitudes a example.com/elsewhere a un ritmo de 40 solicitudes por minuto. Si bien esto supera el límite, no coincide con la ruta de la regla, por lo que se permiten las 20 000 solicitudes.

En este ejemplo, se pueden facturar 50 000 (30 000 + 20 000) solicitudes: los clientes A y B enviaron solicitudes que coincidían con la regla, pero algunas de las solicitudes del cliente B se bloquearon y esas solicitudes bloqueadas no se facturaron. En total, el coste es de (50 000 - 10 000) \* 0,05 $ = 0,20 $.

| 
**Cliente**

 | 

**Dirección URL de la solicitud**

 | 

**Solicitudes**

 | 

**Resultado**

 | 

**Costo mensual**

 |
| --- | --- | --- | --- | --- |
| A | example.com/ratelimit/foo | 20 000 a 10 solicitudes por minuto | El patrón de la dirección URL coincide, pero el límite no se supera. Todas las solicitudes pasan. | 

(2-1)\*0,05 $ = 0,05 $

_Solo se cobran 10 000 solicitudes porque las primeras 10 000 permitidas no incurren en ningún coste._

 |
| B |  example.com/ratelimit/bar | 

90 000:

60 000 a 30 solicitudes por minuto + 30 000 a menos de 30 solicitudes por minuto

 | El patrón de la dirección URL coincide. La regla bloquea 60 000 solicitudes y permite 30 000 solicitudes. | 3\*0,05 $ = 0,15 $ |
| C |  example.com/elsewhere | 20 000 a 40 solicitudes por minuto | El patrón de la dirección URL no coincide. No se aplica la regla. Todas las solicitudes pasan. | 0,00 $ |
|  **Total que se va a facturar:** | 0,20 $ |
