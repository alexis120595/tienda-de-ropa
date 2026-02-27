'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Lado Izquierdo: Menú Hamburguesa */}
          <div className="flex items-center gap-6 flex-1">
            {/* Menú Hamburguesa - Visible siempre */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-black hover:text-primary-600 transition"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
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
              href="/checkout" 
              className="relative text-black hover:text-primary-600 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
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

      {/* Menú Desplegable */}
      {mobileMenuOpen && (
        <div className="bg-white border-t shadow-lg absolute w-full left-0 top-20 max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-5 duration-200">
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
              href="/personalizar" 
              className="block py-3 px-4 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg transition font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✨ Diseña tu Prenda
            </Link>

            <div className="py-2 px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categorías
              </p>
            </div>

            <Link 
              href="/productos?categoria=remeras" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Remeras
            </Link>

            <Link 
              href="/productos?categoria=musculosas" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Musculosas
            </Link>

            <Link 
              href="/productos?categoria=shorts" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shorts
            </Link>

            <Link 
              href="/productos?categoria=pantalones" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pantalones
            </Link>

            <div className="border-t my-2"></div>

            {/* Carrito */}
            <Link 
              href="/checkout" 
              className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Carrito ({itemCount})</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
