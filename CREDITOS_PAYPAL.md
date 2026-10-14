# Créditos PayPal — LQDD · Tu Verdadero Yo Animal

Estado: diseño en preparación. No hay cobros activos.

El proyecto Supabase existente LQDD-ARENA corresponde al juego de duelos; los créditos del test de personalidad deben ir en un proyecto separado.

Reglas: el test diario sigue siendo gratuito; cada crédito permite repetirlo una vez durante el mismo día de España peninsular. Los créditos no desbloquean animales ni modos especiales. Paquetes previstos: una, cinco y diez repeticiones. Precios pendientes: 0,49 €, 0,99 € (recomendado) o 1,99 € por repetición.

Seguridad: GitHub Pages no verifica pagos. Supabase Auth identifica al jugador; Postgres con RLS guarda saldo, pedidos, intentos y movimientos; las Edge Functions crean y capturan pedidos PayPal en el servidor. El importe sale del catálogo del servidor, no del navegador. Solo se acreditan capturas completadas y verificadas; las operaciones son idempotentes.

Secretos de servidor: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENV (sandbox/live), PAYPAL_WEBHOOK_ID y APP_URL. Nunca publicar secretos en index.html ni en GitHub.

Antes de activar ventas: crear un proyecto Supabase dedicado, aplicar migración, configurar recuperación de cuenta, elegir precios, guardar secretos, registrar el webhook de PayPal, desplegar y probar sandbox. La interfaz no debe mostrar compra operativa hasta completar esas pruebas.

Ejemplo no activado: a 0,99 € por repetición sin descuento, una, cinco y diez repeticiones serían 0,99 €, 4,95 € y 9,90 €.