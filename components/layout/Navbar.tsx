'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Lado Izquierdo: Menú Hamburguesa */}
          <div className="flex items-center gap-6 flex-1">
            {/* Menú Hamburguesa - Solo Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black hover:text-primary-600 transition"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>

            {/* Links de Navegación - Solo Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/productos" 
                className="text-black hover:text-primary-600 transition font-medium"
              >
                Productos
              </Link>
              <Link 
                href="/colecciones" 
                className="text-black hover:text-primary-600 transition font-medium"
              >
                Colecciones
              </Link>
              <Link 
                href="/sobre-nosotros" 
                className="text-black hover:text-primary-600 transition font-medium"
              >
                Sobre Nosotros
              </Link>
            </div>
          </div>

          {/* Centro: Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-black hover:text-primary-600 transition-colors absolute left-1/2 -translate-x-1/2 drop-shadow-lg"
          >
            Vivere Ex Animo
          </Link>

          {/* Lado Derecho: Iconos */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            {/* Buscador */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-black hover:text-primary-600 transition"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Carrito */}
            <Link 
              href="/carrito" 
              className="relative text-black hover:text-primary-600 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                0
              </span>
            </Link>

            {/* Cuenta - solo desktop */}
            <Link 
              href="/cuenta" 
              className="hidden md:block text-black hover:text-primary-600 transition"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Barra de Búsqueda Expandible */}
        {searchOpen && (
          <div className="pb-4 animate-in slide-in-from-top">
            <input
              type="search"
              placeholder="Buscar productos..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-black"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="container mx-auto px-4 py-6 space-y-1">
            {/* Links de navegación */}
            <Link 
              href="/" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>

            <Link 
              href="/productos" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>

            <Link 
              href="/colecciones" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Colecciones
            </Link>

            <Link 
              href="/sobre-nosotros" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>

            <div className="border-t my-2"></div>

            {/* Cuenta */}
            <Link 
              href="/cuenta" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Mi Cuenta</span>
            </Link>

            {/* Carrito */}
            <Link 
              href="/carrito" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Carrito (0)</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
