'use client';

import Script from 'next/script';

// Reemplazar con tu ID de Google Ads (formato: AW-XXXXXXXXX)
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXX';

export default function GoogleTag() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-tag"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}

// Función para trackear conversión de formulario
// conversionLabel lo obtenés de Google Ads al crear la acción de conversión
export function trackGoogleConversion(conversionLabel?: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const label = conversionLabel || process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL || '';
    
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/${label}`,
      'value': 1.0,
      'currency': 'USD'
    });
    
    console.log('Google Ads conversion tracked');
  }
}

// Declarar gtag en el tipo Window
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}