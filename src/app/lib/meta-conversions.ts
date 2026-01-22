import crypto from 'crypto';

const PIXEL_ID = '888590290471423';
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
const API_VERSION = 'v18.0';

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}

interface EventData {
  eventName: string;
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: 'website' | 'app' | 'email' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  userData: UserData;
  customData?: Record<string, unknown>;
}

// Función para hashear datos (requerido por Meta)
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Normalizar número de teléfono (remover espacios, guiones, etc.)
function normalizePhone(phone: string): string {
  // Remover todo excepto números y el signo +
  let normalized = phone.replace(/[^\d+]/g, '');
  
  // Si no empieza con +, asumir Argentina (+54)
  if (!normalized.startsWith('+')) {
    normalized = '+54' + normalized;
  }
  
  return normalized;
}

export async function sendConversionEvent(eventData: EventData): Promise<{ success: boolean; error?: string }> {
  if (!ACCESS_TOKEN) {
    console.error('META_CONVERSIONS_API_TOKEN no está configurado');
    return { success: false, error: 'Token no configurado' };
  }

  const { eventName, eventSourceUrl, actionSource = 'website', userData, customData } = eventData;
  const eventTime = eventData.eventTime || Math.floor(Date.now() / 1000);

  // Preparar user_data con hash
  const hashedUserData: Record<string, string> = {};

  if (userData.email) {
    hashedUserData.em = hashData(userData.email);
  }

  if (userData.phone) {
    hashedUserData.ph = hashData(normalizePhone(userData.phone));
  }

  if (userData.firstName) {
    hashedUserData.fn = hashData(userData.firstName);
  }

  // IP y User Agent no se hashean
  if (userData.clientIpAddress) {
    hashedUserData.client_ip_address = userData.clientIpAddress;
  }

  if (userData.clientUserAgent) {
    hashedUserData.client_user_agent = userData.clientUserAgent;
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: actionSource,
        user_data: hashedUserData,
        custom_data: customData,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Error en Meta Conversions API:', result);
      return { success: false, error: result.error?.message || 'Error desconocido' };
    }

    console.log('Evento enviado a Meta:', { eventName, eventsReceived: result.events_received });
    return { success: true };

  } catch (error) {
    console.error('Error enviando evento a Meta:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error de conexión' };
  }
}

// Función específica para el evento Lead
export async function sendLeadEvent({
  email,
  phone,
  firstName,
  clientIpAddress,
  clientUserAgent,
  eventSourceUrl,
}: {
  email: string;
  phone: string;
  firstName: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  eventSourceUrl?: string;
}): Promise<{ success: boolean; error?: string }> {
  return sendConversionEvent({
    eventName: 'Lead',
    eventSourceUrl,
    actionSource: 'website',
    userData: {
      email,
      phone,
      firstName,
      clientIpAddress,
      clientUserAgent,
    },
    customData: {
      content_name: 'Casa Altos de Campo Grande',
      content_category: 'Real Estate',
      currency: 'USD',
    },
  });
}