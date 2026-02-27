'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos de las categorías para las tarjetas
  const categories = [
    {
      id: 'remeras',
      label: 'Remeras',
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770924259/remera_denis_rodman_blanca_1_da3klh.png', // Usando una imagen de producto como representativa
      description: 'Descubrí nuestra colección de remeras únicas'
    },
    {
      id: 'musculosas',
      label: 'Musculosas',
      image: '/images/musculosa lisa.jpeg',
      description: 'Frescura y estilo para cada día'
    },
    {
      id: 'shorts',
      label: 'Shorts',
      image: '/images/short algodon.jpeg',
      description: 'Comodidad total en movimiento'
    },
    {
      id: 'pantalones',
      label: 'Pantalones',
      image: '/images/pantalon largo.jpeg',
      description: 'Diseño urbano y funcional'
    }
  ]


  // Datos de los slides - aquí podrás poner tus URLs de imágenes reales
  const slides = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772203959/ChatGPT_Image_27_feb_2026_11_15_42_s9nanb.png', // Banner 1
      alt: 'Nueva Colección Vivere Ex Animo',
      position: 'object-center' // Posición por defecto
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772204028/ChatGPT_Image_27_feb_2026_11_38_20_wlmdjf.png', // Banner 2
      alt: 'Personaliza tu estilo',
      position: 'object-[center_45%]' // Ajuste a 45%
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
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className={`object-cover ${slide.position || 'object-center'}`}
                sizes="100vw"
              />
              {/* Overlay oscuro para legibilidad si es necesario */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
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

      {/* Sección de Categorías Destacadas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Nuestras Colecciones</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                href={`/productos?categoria=${category.id}`} 
                key={category.id}
                className="group relative h-[400px] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              >
                {/* Imagen de fondo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                
                {/* Overlay oscuro para legibilidad */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {category.label}
                  </h3>
                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-100 max-w-[200px]">
                    {category.description}
                  </p>
                  <span className="mt-6 px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-200">
                    Ver Productos
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
