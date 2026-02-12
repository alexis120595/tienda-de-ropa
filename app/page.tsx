'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos de productos
  const products = [
    {
      id: '1',
      name: 'Remera Denis Rodman',
      image: '/images/remera denis rodman blanca .jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '2',
      name: 'Remera Denis Rodman Negra',
      image: '/images/remera denis rodman negra.jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '3',
      name: 'Remera Jordan',
      image: '/images/remera jordan blanca.jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '4',
      name: 'Remera Jordan Negra',
      image: '/images/remera jordan negra.jpeg',
      sizes: [ 'M', 'L', 'XL']
    },
    {
      id: '5',
      name: 'Remera Maradona',
      image: '/images/remera maradona blanca.jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '6',
      name: 'Remera Maradona Negra',
      image: '/images/remera negra maradona.jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '7',
      name: 'Musculosa Lisa',
      image: '/images/musculosa lisa.jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '8',
      name: 'Short Algodón',
      image: '/images/short algodon.jpeg',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '9',
      name: 'Pantalón Largo',
      image: '/images/pantalon largo.jpeg',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ]

  // Datos de los slides - aquí podrás poner tus URLs de imágenes reales
  const slides = [
    {
      id: 1,
      image: '/banner-1.jpg', // Reemplazar con tu imagen real
      bgColor: 'from-gray-900 to-gray-700' // Fallback mientras subes imágenes
    },
    {
      id: 2,
      image: '/banner-2.jpg',
      bgColor: 'from-primary-900 to-primary-700'
    },
    {
      id: 3,
      image: '/banner-3.jpg',
      bgColor: 'from-black to-gray-800'
    },
    {
      id: 4,
      image: '/banner-4.jpg',
      bgColor: 'from-gray-800 to-gray-900'
    }
  ]

  // Auto-rotación cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Placeholder con gradiente - reemplazar con imagen real */}
            <div className={`w-full h-full bg-gradient-to-br ${slide.bgColor} flex items-center justify-center`}>
              <span className="text-white text-6xl opacity-20">Banner {slide.id}</span>
            </div>
            
            {/* Cuando tengas imágenes reales, descomenta esto y comenta el div de arriba:
            <img
              src={slide.image}
              alt={`Banner ${slide.id}`}
              className="w-full h-full object-cover"
            />
            */}
          </div>
        ))}

        {/* Dots/Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide 
                  ? 'bg-white w-8 h-2' 
                  : 'bg-white/50 w-2 h-2 hover:bg-white/75'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sección de Productos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestra Colección</h2>
          
          {/* Grid de Productos con efecto Flip 3D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  sizes={product.sizes}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
