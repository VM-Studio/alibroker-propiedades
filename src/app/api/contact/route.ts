import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email del propietario/empresa
const OWNER_EMAIL = 'tinchorodriguez918@gmail.com';
const FROM_EMAIL = 'Ali Broker <info@alibroker-propiedades.com>'; 

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  presupuesto?: string;
  mensaje?: string;
  fechaEstimada?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { nombre, email, telefono, presupuesto, mensaje, fechaEstimada } = body;

    // Validación básica
    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Email para el propietario/empresa
    const ownerEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `🏠 Nueva consulta de ${nombre} - Casa Altos de Campo Grande`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #0d306c; padding: 30px; text-align: center;">
                      <img src="https://res.cloudinary.com/dlxuigjrd/image/upload/v1768955683/ALIBROKERLogo2019_1.Pdf_-_1_m3qv5q.png" alt="Ali Broker" width="120" style="margin-bottom: 15px;" />
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nueva Consulta Recibida</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
                        Has recibido una nueva consulta sobre la propiedad en <strong>Altos de Campo Grande</strong>.
                      </p>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <tr>
                          <td>
                            <h3 style="color: #0d306c; margin: 0 0 15px 0; font-size: 18px;">Datos del interesado:</h3>
                            
                            <p style="margin: 8px 0; color: #333;">
                              <strong>Nombre:</strong> ${nombre}
                            </p>
                            <p style="margin: 8px 0; color: #333;">
                              <strong>Email:</strong> <a href="mailto:${email}" style="color: #0d306c;">${email}</a>
                            </p>
                            <p style="margin: 8px 0; color: #333;">
                              <strong>Teléfono:</strong> <a href="tel:${telefono}" style="color: #0d306c;">${telefono}</a>
                            </p>
                            ${presupuesto ? `
                            <p style="margin: 8px 0; color: #333;">
                              <strong>Presupuesto:</strong> ${presupuesto}
                            </p>
                            ` : ''}
                            ${fechaEstimada ? `
                            <p style="margin: 8px 0; color: #333;">
                              <strong>Fecha estimada de compra:</strong> ${fechaEstimada}
                            </p>
                            ` : ''}
                          </td>
                        </tr>
                      </table>
                      
                      ${mensaje ? `
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
                        <tr>
                          <td>
                            <h4 style="color: #856404; margin: 0 0 10px 0;">Mensaje:</h4>
                            <p style="color: #856404; margin: 0; white-space: pre-wrap;">${mensaje}</p>
                          </td>
                        </tr>
                      </table>
                      ` : ''}
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding-top: 20px;">
                            <a href="mailto:${email}" style="display: inline-block; background-color: #0d306c; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                              Responder al interesado
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #6c757d; font-size: 12px; margin: 0;">
                        Este email fue enviado automáticamente desde el formulario de contacto de Ali Broker.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // Email de confirmación para el cliente
    const clientEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '✨ Gracias por tu interés - Casa en Altos de Campo Grande',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #0d306c; padding: 30px; text-align: center;">
                      <img src="https://res.cloudinary.com/dlxuigjrd/image/upload/v1768955683/ALIBROKERLogo2019_1.Pdf_-_1_m3qv5q.png" alt="Ali Broker" width="120" style="margin-bottom: 15px;" />
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">¡Gracias por contactarnos!</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
                        Hola <strong>${nombre}</strong>,
                      </p>
                      
                      <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Hemos recibido tu consulta sobre nuestra exclusiva propiedad en <strong>Altos de Campo Grande</strong>. 
                        Nos pondremos en contacto contigo a la brevedad para brindarte toda la información que necesites.
                      </p>
                      
                      <!-- Property Highlight -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #0d306c; margin: 0 0 15px 0;">Características destacadas:</h3>
                            <ul style="color: #333; margin: 0; padding-left: 20px; line-height: 1.8;">
                              <li>510 m² cubiertos sobre 1600 m² de terreno</li>
                              <li>Sistema constructivo Béton Brut</li>
                              <li>Piscina 12x5 con filtrado automático</li>
                              <li>Sauna privada y gimnasio</li>
                              <li>6 cocheras cubiertas</li>
                              <li>Master suite con balcón terraza</li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos directamente.
                      </p>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="https://wa.me/5491112345678" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                              💬 Escribinos por WhatsApp
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #0d306c; padding: 25px; text-align: center;">
                      <p style="color: #ffffff; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">
                        Ali Broker
                      </p>
                      <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                        Especialistas en propiedades exclusivas
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!-- Unsubscribe -->
                <table width="600" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 20px; text-align: center;">
                      <p style="color: #6c757d; font-size: 11px; margin: 0;">
                        Recibiste este email porque completaste el formulario de contacto en nuestro sitio web.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // Enviar ambos emails en paralelo
    const [ownerResult, clientResult] = await Promise.all([
      ownerEmailPromise,
      clientEmailPromise,
    ]);

    // Verificar errores
    if (ownerResult.error || clientResult.error) {
      console.error('Error enviando emails:', { ownerResult, clientResult });
      return NextResponse.json(
        { error: 'Error al enviar los emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Emails enviados correctamente',
        ids: {
          owner: ownerResult.data?.id,
          client: clientResult.data?.id,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}