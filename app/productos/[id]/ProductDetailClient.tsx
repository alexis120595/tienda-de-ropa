'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'

type TransformedProduct = {
  id: string
  name: string
  image: string
  price: number
  description: string
  sizes: string[]
  color: string
}

export default function ProductDetailClient({ product }: { product: TransformedProduct }) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    addItem({
      productId: product.id,
      variantId: `${product.id}-${selectedSize}`, // Simple ID logic for cart
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: product.color
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link href="/productos" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* GALERÍA DE IMÁGENES (Simple por ahora) */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm aspect-square relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 hover:scale-105 transition duration-500"
              priority
            />
          </div>

          {/* INFO DEL PRODUCTO */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-none mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary-600">
                ${product.price.toLocaleString('es-AR')}
              </p>
              <p className="text-sm text-gray-500 mt-2">Color: {product.color}</p>
            </div>

            <div className="prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>

            {/* SELECCIÓN DE TALLE */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-900">Seleccionar Talle</span>
                <button className="text-xs text-primary-600 underline">Guía de talles</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      py-3 rounded-lg text-sm font-bold border transition-all
                      ${selectedSize === size 
                        ? 'border-black bg-black text-white shadow-md' 
                        : 'border-gray-200 hover:border-black hover:bg-gray-50 text-gray-700'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-red-500 mt-2 animate-pulse">
                  * Por favor selecciona un talle para continuar
                </p>
              )}
            </div>

            {/* BOTÓN DE COMPRA */}
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`
                  w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform
                  ${selectedSize 
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:-translate-y-1 active:scale-95' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    ¡Agregado al Carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Agregar al Carrito
                  </>
                )}
              </button>
            </div>

            {/* INFO EXTRA */}
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Envío a todo el país
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Devolución gratis
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Pago seguro
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Stock disponible
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
