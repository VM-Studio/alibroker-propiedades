'use client';

import Image from "next/image";
import { useState, useCallback } from "react";

const navLinks = [
  { href: "#detalles", label: "Detalles" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center justify-center w-full lg:w-auto lg:justify-start">
            <Image
              src="/alinavbar.png"
              alt="Ali Broker Logo"
              width={140}
              height={50}
              className="h-10 lg:h-14 w-auto"
              priority
            />
          </div>
          
          {/* Menú hamburguesa */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Menú desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-gray-700 hover:text-gray-900 transition"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contacto" 
              className="bg-[#0d306c] text-white px-6 py-2 hover:bg-[#0a2451] transition"
            >
              Agendar visita
            </a>
          </div>
        </div>
        
        {/* Menú mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-gray-900 transition py-2"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="#contacto"
                onClick={closeMenu}
                className="bg-[#0d306c] text-white px-6 py-3 hover:bg-[#0a2451] transition mx-8"
              >
                Agendar visita
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
