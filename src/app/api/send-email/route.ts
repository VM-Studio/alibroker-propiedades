import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, presupuesto, mensaje, fechaEstimada } = body;

    // Email 1: Para martinrodriguez@vmstudioweb.com
    await resend.emails.send({
      from: 'Inmobiliaria Ali <onboarding@resend.dev>',
      to: 'martinrodriguez@vmstudioweb.com',
      subject: 'Nuevo Contacto - Casa Altos de Campo Grande',
      html: `
        <h2>Nuevo contacto recibido</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        ${presupuesto ? `<p><strong>Presupuesto:</strong> ${presupuesto}</p>` : ''}
        ${fechaEstimada ? `<p><strong>Fecha estimada:</strong> ${fechaEstimada}</p>` : ''}
        ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
        <hr>
        <h3>Propiedad consultada:</h3>
        <p><strong>Exclusiva Casa en Altos de Campo Grande</strong></p>
        <p>510 m² cubiertos | 1600 m² terreno | 4 Dormitorios | 3 Baños + Toilette</p>
        <p>Piscina 12x5 | 6 Cocheras | Sistema Béton Brut | Sauna + Gimnasio</p>
      `
    });

    // Email 2: Para Roberto Ali (completar email cuando lo compartan)
    await resend.emails.send({
      from: 'Inmobiliaria Ali <onboarding@resend.dev>',
      to: 'roberto@ejemplo.com', // TODO: Reemplazar con el email de Roberto Ali
      subject: 'Nuevo Cliente Interesado - Casa Altos de Campo Grande',
      html: `
        <h2>Nuevo cliente interesado</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        ${presupuesto ? `<p><strong>Presupuesto:</strong> ${presupuesto}</p>` : ''}
        ${fechaEstimada ? `<p><strong>Fecha estimada:</strong> ${fechaEstimada}</p>` : ''}
        ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
        <hr>
        <h3>Propiedad consultada:</h3>
        <p><strong>Exclusiva Casa en Altos de Campo Grande</strong></p>
        <p>510 m² cubiertos | 1600 m² terreno | 4 Dormitorios | 3 Baños + Toilette</p>
        <p>Piscina 12x5 | 6 Cocheras | Sistema Béton Brut | Sauna + Gimnasio</p>
      `
    });

    // Email 3: Para el cliente potencial
    await resend.emails.send({
      from: 'Inmobiliaria Ali <onboarding@resend.dev>',
      to: email,
      subject: '¡Gracias por tu interés en la Casa de Altos de Campo Grande!',
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Hemos recibido tu solicitud de información sobre la <strong>Exclusiva Casa en Altos de Campo Grande</strong>.</p>
        
        <h3>Detalles de la propiedad:</h3>
        <ul>
          <li><strong>Superficie cubierta:</strong> 510 m²</li>
          <li><strong>Terreno:</strong> 1600 m² (2 lotes)</li>
          <li><strong>Sistema constructivo:</strong> Béton Brut (hormigón crudo)</li>
          <li><strong>Dormitorios:</strong> 4 con vestidores</li>
          <li><strong>Baños:</strong> 3 completos + 1 toilette</li>
          <li><strong>Cocheras:</strong> 6 cubiertas + espacio para 8 vehículos más</li>
          <li><strong>Piscina:</strong> 12x5 metros con filtrado automático</li>
          <li><strong>Sauna privada</strong> con gimnasio</li>
          <li><strong>Quincho</strong> integrable con cocina</li>
          <li><strong>Ático</strong> en tercera planta</li>
          <li>Aire acondicionado y calefacción por losa radiante</li>
          <li>Generador automático</li>
          <li>Riego automático controlado por celular</li>
        </ul>
        
        <h3>Distribución:</h3>
        <p><strong>Planta Baja:</strong> Living y comedor en doble altura, cocina equipada, quincho, piscina, sauna, gimnasio, fogonero.</p>
        <p><strong>Planta Alta:</strong> Family room, biblioteca, 3 dormitorios + Master Suite independiente con balcón terraza.</p>
        <p><strong>Ático:</strong> Espacio recreativo multiuso.</p>
        
        <hr>
        
        <p>Nos pondremos en contacto contigo a la brevedad para coordinar una visita.</p>
        
        <p><strong>Roberto Ali</strong><br>
        Asesor Inmobiliario<br>
        Teléfono: +34 XXX XXX XXX</p>
        
        <p>Saludos cordiales,<br>
        <strong>Inmobiliaria Ali</strong></p>
      `
    });

    return NextResponse.json({ success: true, message: 'Emails enviados correctamente' });
  } catch (error) {
    console.error('Error enviando emails:', error);
    return NextResponse.json(
      { success: false, error: 'Error al enviar los emails' },
      { status: 500 }
    );
  }
}
