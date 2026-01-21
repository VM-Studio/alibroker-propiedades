import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 lg:py-16">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <Image
            src="/alinavbar.png"
            alt="Ali Broker Logo"
            width={200}
            height={70}
            className="h-16 lg:h-20 w-auto mx-auto"
            loading="lazy"
          />
        </div>
        <p className="text-gray-600 text-sm lg:text-base mb-8">
          Especialistas en propiedades exclusivas
        </p>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-500 text-xs lg:text-sm">
            &copy; {new Date().getFullYear()} Ali Broker. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
