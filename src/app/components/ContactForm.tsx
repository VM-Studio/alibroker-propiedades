'use client';

import { useState, useCallback, memo } from "react";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  presupuesto: string;
  mensaje: string;
  fechaEstimada: string;
}

const initialFormData: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  presupuesto: '',
  mensaje: '',
  fechaEstimada: ''
};

// Input field memoizado
const FormField = memo(function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  placeholder,
  optional = false
}: {
  label: string;
  type?: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  required?: boolean;
  placeholder: string;
  optional?: boolean;
}) {
  // Validar si el campo está completo y válido
  const isValid = value.trim() !== '' && (
    type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : true
  );
  const showValidation = value.trim() !== '';
  
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm lg:text-base">
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-gray-700 font-medium text-xs sm:text-sm">(opcional)</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent text-sm sm:text-base transition-all duration-300 ${
          showValidation && isValid
            ? 'border-green-500 bg-green-50/50 focus:ring-green-500'
            : showValidation && !isValid
            ? 'border-red-400 bg-red-50/30 focus:ring-red-400'
            : 'border-gray-300 focus:ring-[#0d306c]'
        }`}
        placeholder={placeholder}
      />
      {showValidation && isValid && (
        <div className="flex items-center gap-1 mt-1 text-green-600 text-xs sm:text-sm animate-[slideDown_0.3s_ease-out]">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Completado</span>
        </div>
      )}
    </div>
  );
});

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFieldChange = useCallback((name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('El servidor no está disponible. Por favor, intenta nuevamente en unos momentos.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      setSubmitStatus('success');
      setSubmitMessage('¡Gracias por tu interés! Te hemos enviado un email de confirmación. Nos pondremos en contacto contigo pronto.');
      setFormData(initialFormData);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : 'Hubo un error al enviar tu consulta. Por favor, intenta nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <section id="contacto" className="py-12 lg:py-20 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {submitStatus !== 'success' ? (
          <>
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4 font-playfair">
                Recibe Asesoría Personalizada
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                Completa el formulario y nos pondremos en contacto contigo inmediatamente
              </p>
            </div>
            
            {submitStatus === 'error' && (
              <div 
                className="mb-6 p-4 rounded-lg text-center animate-[slideDown_0.5s_ease-out] bg-red-100 text-red-800 border border-red-200"
                role="alert"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{submitMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border-2 transition-all duration-500 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border-[#0d306c]/10 hover:shadow-[0_25px_70px_-15px_rgba(13,48,108,0.4)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
            <FormField
              label="Primer nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleFieldChange}
              required
              placeholder="Juan"
            />
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              required
              placeholder="juan@email.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
            <FormField
              label="Teléfono"
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleFieldChange}
              required
              placeholder="+54 11 1234 5678"
            />
            <FormField
              label="Presupuesto"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleFieldChange}
              optional
              placeholder="USD 500,000 - USD 700,000"
            />
          </div>

          <div className="mb-3 sm:mb-4 lg:mb-6">
            <FormField
              label="Fecha estimada de compra"
              name="fechaEstimada"
              value={formData.fechaEstimada}
              onChange={handleFieldChange}
              optional
              placeholder="Ej: En 3 meses, Este año, etc."
            />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-sm lg:text-base">
              Mensaje <span className="text-gray-700 font-medium text-xs sm:text-sm">(opcional)</span>
            </label>
            <textarea
              rows={4}
              value={formData.mensaje}
              onChange={(e) => handleFieldChange('mensaje', e.target.value)}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent text-sm sm:text-base resize-none transition-all duration-300 ${
                formData.mensaje.trim() !== ''
                  ? 'border-green-500 bg-green-50/50 focus:ring-green-500'
                  : 'border-gray-300 focus:ring-[#0d306c]'
              }`}
              placeholder="Me gustaría obtener más información sobre esta propiedad..."
            />
            {formData.mensaje.trim() !== '' && (
              <div className="flex items-center gap-1 mt-1 text-green-600 text-xs sm:text-sm animate-[slideDown_0.3s_ease-out]">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Completado</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0d306c] text-white py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold hover:bg-[#0a2451] transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              'Solicitar Asesoría'
            )}
          </button>
        </form>
          </>
        ) : (
          <div className="text-center animate-[slideDown_0.6s_ease-out]">
            <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-xl lg:rounded-2xl border-2 border-green-500/50 shadow-[0_20px_50px_-12px_rgba(34,197,94,0.3)]">
              {/* Icono de checkmark grande */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center animate-[successPulse_0.6s_ease-in-out]">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-[checkmark_0.6s_ease-in-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Mensaje principal */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-playfair">
                ¡Gracias por Contactarnos!
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                Hemos recibido tu solicitud exitosamente. Te hemos enviado un email de confirmación.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6 max-w-xl mx-auto">
                <p className="text-sm sm:text-base text-gray-800">
                  <span className="font-semibold text-green-700">Nuestro equipo te contactará pronto</span> para brindarte la asesoría personalizada que necesitas.
                </p>
              </div>
              
              {/* Botón para enviar otro formulario */}
              <button
                onClick={() => setSubmitStatus('idle')}
                className="inline-flex items-center gap-2 text-[#0d306c] hover:text-[#0a2451] font-semibold text-sm sm:text-base transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Enviar otra consulta
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
