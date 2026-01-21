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
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-gray-500 text-sm">(opcional)</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
        placeholder={placeholder}
      />
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
    <section id="contacto" className="py-12 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4 font-playfair">
            Recibe Asesoría Personalizada
          </h2>
          <p className="text-base lg:text-lg text-gray-700">
            Completa el formulario y nos pondremos en contacto contigo inmediatamente
          </p>
        </div>
        
        {submitStatus !== 'idle' && (
          <div 
            className={`mb-6 p-4 rounded-lg text-center ${
              submitStatus === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
            role="alert"
          >
            <div className="flex items-center justify-center gap-2">
              {submitStatus === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span>{submitMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 lg:p-8 rounded-xl lg:rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
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

          <div className="mb-4 lg:mb-6">
            <FormField
              label="Fecha estimada de compra"
              name="fechaEstimada"
              value={formData.fechaEstimada}
              onChange={handleFieldChange}
              optional
              placeholder="Ej: En 3 meses, Este año, etc."
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
              Mensaje <span className="text-gray-500 text-sm">(opcional)</span>
            </label>
            <textarea
              rows={4}
              value={formData.mensaje}
              onChange={(e) => handleFieldChange('mensaje', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base resize-none"
              placeholder="Me gustaría obtener más información sobre esta propiedad..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0d306c] text-white py-4 text-base lg:text-lg font-semibold hover:bg-[#0a2451] transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      </div>
    </section>
  );
}