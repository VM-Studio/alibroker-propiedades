# Configuración del Formulario de Contacto con Resend

## Pasos para configurar el envío de emails:

### 1. Crear cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Obtener API Key

1. En el dashboard de Resend, ve a "API Keys"
2. Crea una nueva API key
3. Copia la API key (empieza con `re_`)

### 3. Configurar dominio (Opcional pero recomendado)

1. En Resend, ve a "Domains"
2. Añade tu dominio personalizado
3. Configura los registros DNS que te proporcionen
4. Verifica el dominio

### 4. Configurar variables de entorno

1. Crea un archivo `.env.local` en la raíz del proyecto:

   ```bash
   cp .env.local.example .env.local
   ```

2. Edita `.env.local` y añade tu API key:
   ```
   RESEND_API_KEY=tu_api_key_aqui
   ```

### 5. Actualizar emails de destino

Edita el archivo `src/app/api/send-email/route.ts`:

1. **Email de Roberto Ali** (línea 31):

   ```typescript
   to: 'roberto@ejemplo.com', // Reemplazar con el email real
   ```

2. **Teléfono de Roberto Ali** en el email al cliente (línea 73):
   ```typescript
   Teléfono: +34 XXX XXX XXX // Reemplazar con el teléfono real
   ```

### 6. Cambiar el dominio del remitente (Cuando tengas dominio verificado)

En `src/app/api/send-email/route.ts`, cambia:

```typescript
from: 'Inmobiliaria Ali <onboarding@resend.dev>',
```

Por tu dominio verificado:

```typescript
from: 'Inmobiliaria Ali <contacto@tudominio.com>',
```

### 7. Reiniciar el servidor

```bash
npm run dev
```

## Emails que se envían:

1. **A martinrodriguez@vmstudioweb.com**: Notificación con datos del cliente
2. **A Roberto Ali**: Notificación con datos del cliente
3. **Al cliente**: Email de confirmación con info de la propiedad y teléfono de contacto

## Campos del formulario:

- ✅ Primer nombre (obligatorio)
- ✅ Email (obligatorio)
- ✅ Teléfono (obligatorio)
- ⚪ Presupuesto (opcional)
- ⚪ Fecha estimada (opcional)
- ⚪ Mensaje (opcional)

## Límites del plan gratuito de Resend:

- 100 emails/día
- 3,000 emails/mes

Para más información: [Documentación de Resend](https://resend.com/docs)
