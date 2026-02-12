'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

// Datos de productos - los mismos que en page.tsx
const productsData = [
  {
    id: '1',
    name: 'Remera Denis Rodman',
    image: '/images/remera denis rodman blanca .jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    price: 15000,
    color: 'Blanca',
    description: 'Remera clásica con diseño de Denis Rodman. Confeccionada en 100% algodón premium para máxima comodidad.'
  },
  {
    id: '2',
    name: 'Remera Denis Rodman Negra',
    image: '/images/remera denis rodman negra.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    price: 15000,
    color: 'Negra',
    description: 'Remera clásica con diseño de Denis Rodman. Confeccionada en 100% algodón premium para máxima comodidad.'
  },
  {
    id: '3',
    name: 'Remera Jordan',
    image: '/images/remera jordan blanca.jpeg',
    sizes: ['S', 'M', 'L', 'XL'],
    price: 15000,
    color: 'Blanca',
    description: 'Remera legendaria con diseño de Michael Jordan. Perfecta para los fans del basquetball.'
  },
  {
    id: '4',
    name: 'Remera Jordan Negra',
    image: '/images/remera jordan negra.jpeg',
    sizes: ['S', 'M', 'L', 'XL'],
    price: 15000,
    color: 'Negra',
    description: 'Remera legendaria con diseño de Michael Jordan. Perfecta para los fans del basquetball.'
  },
  {
    id: '5',
    name: 'Remera Maradona',
    image: '/images/remera maradona blanca.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    price: 15000,
    color: 'Blanca',
    description: 'Remera homenaje a Diego Maradona. Una prenda icónica para los amantes del fútbol.'
  },
  {
    id: '6',
    name: 'Remera Maradona Negra',
    image: '/images/remera negra maradona.jpeg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    price: 15000,
    color: 'Negra',
    description: 'Remera homenaje a Diego Maradona. Una prenda icónica para los amantes del fútbol.'
  },
  {
    id: '7',
    name: 'Musculosa Lisa',
    image: '/images/musculosa lisa.jpeg',
    sizes: ['S', 'M', 'L', 'XL'],
    price: 10000,
    color: 'Variados',
    description: 'Musculosa lisa básica. Perfecta para el verano y práctica de deportes.'
  },
  {
    id: '8',
    name: 'Short Algodón',
    image: '/images/short algodon.jpeg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: 18000,
    color: 'Variados',
    description: 'Short cómodo de algodón 100%. Ideal para el descanso y actividades casuales.'
  },
  {
    id: '9',
    name: 'Pantalón Largo',
    image: '/images/pantalon largo.jpeg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: 32000,
    color: 'Variados',
    description: 'Pantalón largo versátil. Combina comodidad y estilo en cualquier ocasión.'
  }
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = productsData.find(p => p.id === params.id)
  const [selectedSize, setSelectedSize] = useState<string>('')

  if (!product) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
            <ArrowLeft className="h-5 w-5" />
            Volver
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Producto no encontrado</h1>
            <p className="text-gray-600 mt-2">Lo sentimos, el producto que buscas no existe.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Botón volver */}
        <Link href="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="h-5 w-5" />
          Volver a productos
        </Link>

        {/* Grid de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagen Grande */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg border border-gray-300 min-h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={500}
              className="max-w-full h-auto p-4"
              priority
            />
          </div>

          {/* Detalles del Producto */}
          <div className="space-y-6">
            {/* Nombre y precio */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-4">Color: <span className="font-semibold text-gray-900">{product.color}</span></p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary-600">${product.price.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-gray-700 text-lg leading-relaxed border-t border-b py-6">
              {product.description}
            </p>

            {/* Selector de Talles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecciona tu talle:</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-primary-600 text-white border-2 border-primary-600'
                        : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-primary-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de Agregar al Carrito */}
            <button
              disabled={!selectedSize}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition ${
                selectedSize
                  ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {selectedSize ? `Agregar al carrito - Talle ${selectedSize}` : 'Selecciona un talle'}
            </button>

            {/* Información adicional */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-3 text-sm text-gray-700">
              <p>✓ Envío a todo el país</p>
              <p>✓ Devolución gratuita</p>
              <p>✓ Garantía de calidad</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
