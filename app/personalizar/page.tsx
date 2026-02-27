'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Download, Lock, Unlock } from 'lucide-react'
import { Rnd } from 'react-rnd'

// Mapeo de imágenes base (usaremos placeholders hasta tener imágenes lisas reales)
const baseImages = {
  remera: {
    blanco: {
      front: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772200316/remera_blanca_lisa_pwgeyy.png', 
      back: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772200173/remera_blanca_lisa_espalda_bz9zpu.png'   
    },
    negro: {
      front: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772030598/remera_negra_lisa_re4rzy.png',  
      back: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772031089/espalda_remera_negra_zrmlwe.png'    
    }
  },
  musculosa: {
    blanco: {
      front: '/images/musculosa lisa.jpeg',      // Placeholder
      back: '/images/musculosa lisa.jpeg'        // Placeholder
    },
    negro: {
      front: '/images/musculosa lisa.jpeg',      // Placeholder
      back: '/images/musculosa lisa.jpeg'        // Placeholder
    }
  }
}

type DesignState = {
  image: string
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export default function PersonalizarPage() {
  const [productType, setProductType] = useState<'remera' | 'musculosa'>('remera')
  const [selectedColor, setSelectedColor] = useState<'blanco' | 'negro'>('blanco')
  const [selectedSize, setSelectedSize] = useState('M')
  const [view, setView] = useState<'front' | 'back'>('front')
  
  // Estado para los diseños (frente y dorso separados)
  const [designs, setDesigns] = useState<{ front: DesignState | null; back: DesignState | null }>({
    front: null,
    back: null
  })
  
  const [lockAspectRatio, setLockAspectRatio] = useState(true)

  // Variables derivadas del estado actual
  const currentDesign = designs[view]
  const uploadedImage = currentDesign?.image || null
  const designPosition = currentDesign?.position || { x: 0, y: 0 }
  const designSize = currentDesign?.size || { width: 200, height: 200 }

  // Dimensiones del área de impresión (cm)
  const PRINT_AREA_WIDTH_CM = 30
  const PRINT_AREA_HEIGHT_CM = 40
  
  // Referencia al contenedor de la vista previa para capturar
  const previewRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Función para capturar el diseño
  const handleFinishDesign = async () => {
    if (!previewRef.current) return
    
    setIsGenerating(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      
      // Preparamos el contenedor para la captura (agregando clase 'capturing')
      if (previewRef.current) {
        previewRef.current.classList.add('capturing-mode')
      }

      // Capturamos el contenedor
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true, 
        backgroundColor: '#ffffff', // Fondo blanco para que se lea la ficha
        scale: 2, 
      })
      
      // Restauramos el estado normal
      if (previewRef.current) {
        previewRef.current.classList.remove('capturing-mode')
      }
      
      // Convertir a imagen
      const image = canvas.toDataURL('image/png')
      
      // Crear un link de descarga temporal
      const link = document.createElement('a')
      link.href = image
      link.download = `vivere-design-${productType}-${selectedColor}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Aquí podrías guardar 'image' en el estado o enviarla a una API
      console.log('Diseño capturado con éxito')
      
    } catch (error) {
      console.error('Error al generar el diseño:', error)
      alert('Hubo un error al guardar tu diseño. Por favor intenta de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Referencia al contenedor del área de impresión (para calcular escala de píxeles)
  const printAreaRef = useRef<HTMLDivElement>(null)

  // Referencia al input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Función para calcular dimensiones en cm
  const getDimensionsInCm = () => {
    if (!printAreaRef.current) return { width: 0, height: 0 }
    
    // Ancho del contenedor en píxeles
    const containerWidthPx = printAreaRef.current.offsetWidth
    
    // Factor de conversión: cuántos cm es 1 pixel
    // Asumimos que el ancho del contenedor printAreaRef ES los 30cm
    const pxToCm = PRINT_AREA_WIDTH_CM / containerWidthPx
    
    return {
      width: Math.round(designSize.width * pxToCm),
      height: Math.round(designSize.height * pxToCm)
    }
  }

  const dimensions = getDimensionsInCm()


  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string
        setDesigns(prev => ({
          ...prev,
          [view]: {
            image: imageSrc,
            position: { x: 0, y: 0 }, // Reset position
            size: { width: 200, height: 200 } // Reset size
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Update design position
  const updateDesignPosition = (x: number, y: number) => {
    setDesigns(prev => ({
      ...prev,
      [view]: prev[view] ? { ...prev[view]!, position: { x, y } } : null
    }))
  }

  // Update design size and position
  const updateDesignSize = (width: number, height: number, x: number, y: number) => {
    setDesigns(prev => ({
      ...prev,
      [view]: prev[view] ? { ...prev[view]!, size: { width, height }, position: { x, y } } : null
    }))
  }

  // Limpiar imagen
  const clearImage = () => {
    setDesigns(prev => ({
      ...prev,
      [view]: null
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Obtener la imagen de fondo actual
  // @ts-ignore - temporary ignore for incomplete type structure if needed, but should be fine
  const currentBaseImage = baseImages[productType]?.[selectedColor]?.[view] || '/placeholder.png'

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Diseña tu Propia Prenda</h1>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Crea un diseño único. Sube tu imagen, elige el color y personaliza tu estilo Vivere Ex Animo.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          
          {/* ÁREA DE PREVISUALIZACIÓN */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-6 w-full max-w-xs relative z-20">
              <button
                onClick={() => setView('front')}
                className={`flex-1 py-1.5 px-4 rounded-md text-sm font-semibold transition-all ${
                  view === 'front' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Frente
              </button>
              <button
                onClick={() => setView('back')}
                className={`flex-1 py-1.5 px-4 rounded-md text-sm font-semibold transition-all ${
                  view === 'back' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dorso
              </button>
            </div>

            {/* Contenedor relativo para posicionar capas */}
            <div 
              ref={previewRef}
              className="relative w-full max-w-md aspect-[3/4]"
              id="design-preview"
            >
              {/* Capa 1: Prenda Base */}
              <Image
                src={currentBaseImage}
                alt="Prenda base"
                fill
                className="object-contain z-0"
                priority
              />

              {/* Ficha de datos (visible solo al capturar) */}
              <div 
                className="absolute top-4 left-4 right-4 bg-white/95 p-3 rounded-lg border border-gray-200 shadow-sm z-50 hidden capturing-show"
              >
                <div className="text-xs font-mono text-gray-800 space-y-1">
                  <p className="font-bold border-b pb-1 mb-1">FICHA DE PERSONALIZACIÓN</p>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p>Prenda: <span className="font-semibold capitalize">{productType}</span></p>
                    <p>Color: <span className="font-semibold capitalize">{selectedColor}</span></p>
                    <p>Vista: <span className="font-semibold capitalize">{view === 'front' ? 'Frente' : 'Dorso'}</span></p>
                    <p>Talle: <span className="font-semibold">{selectedSize}</span></p>
                    <p>Estampa: <span className="font-semibold">
                      {(30 * (designSize.width / (printAreaRef.current?.offsetWidth || 1))).toFixed(0)}x
                      {(40 * (designSize.height / (printAreaRef.current?.offsetHeight || 1))).toFixed(0)} cm
                    </span></p>
                  </div>
                  <p className="text-[10px] text-gray-500 pt-1 mt-1 border-t">REF: {Date.now().toString().slice(-6)} | Vivere Ex Animo</p>
                </div>
              </div>
              
              {/* ÁREA DE IMPRESIÓN (30x40cm) - Contenedor invisible para referencia de cálculos */}
              <div 
                ref={printAreaRef}
                className="absolute top-[20%] left-[25%] right-[25%] h-[50%] z-5 pointer-events-none flex items-center justify-center"
              >
              </div>

              {/* Capa 2: Diseño del Usuario (Arrastrable) */}
              {uploadedImage && printAreaRef.current && (
                <div className="absolute inset-0 z-10 overflow-hidden isolate">
                  <Rnd
                    scale={1}
                    size={{ width: designSize.width, height: designSize.height }}
                    position={{ x: designPosition.x, y: designPosition.y }}
                    minWidth={20}
                    minHeight={20}
                    bounds="parent" // Se puede mover por toda la remera
                    onDrag={(e, d) => {
                      updateDesignPosition(d.x, d.y)
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                      updateDesignSize(
                        parseInt(ref.style.width),
                        parseInt(ref.style.height),
                        position.x,
                        position.y
                      )
                    }}
                    className="border-2 border-dashed border-primary-500 group relative touch-none hover:bg-primary-500/5 transition-colors capturing-hide-controls-parent"
                  >
                    {/* Botón para eliminar */}
                    <button 
                      onClick={clearImage}
                      className="absolute -top-3 -right-3 z-50 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition flex items-center justify-center w-6 h-6 capturing-hide-controls"
                      title="Eliminar diseño"
                    >
                      <X size={14} />
                    </button>
                    
                    {/* Texto con MEDIDAS EN VIVO */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50 pointer-events-none shadow-sm font-mono tracking-wider tabular-nums capturing-hide-controls">
                      {(30 * (designSize.width / printAreaRef.current.offsetWidth)).toFixed(0)}cm x {(40 * (designSize.height / printAreaRef.current.offsetHeight)).toFixed(0)}cm
                    </div>
                    
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={uploadedImage} 
                      alt="Tu diseño" 
                      className="w-full h-full object-contain pointer-events-none select-none"
                      draggable="false"
                    />
                  </Rnd>
                </div>
              )}
              
              {/* Placeholder si no hay imagen - ELIMINADO */}
              {!uploadedImage && (
                <div className="absolute top-[25%] left-[25%] w-[50%] h-[40%] flex items-center justify-center z-10 pointer-events-none opacity-50">
                </div>
              )}
            </div>
          </div>

          {/* CONTROLES DE PERSONALIZACIÓN */}
          <div className="w-full lg:w-1/3 space-y-8 bg-white p-8 rounded-2xl shadow-lg">
            
            {/* 1. Tipo de Prenda */}
            <div>
              <h3 className="text-lg font-bold mb-4">1. Elige tu prenda</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setProductType('remera')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    productType === 'remera' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  Remera
                </button>
                <button
                  onClick={() => setProductType('musculosa')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    productType === 'musculosa' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  Musculosa
                </button>
              </div>
            </div>

            {/* 2. Color */}
            <div>
              <h3 className="text-lg font-bold mb-4">2. Elige el color</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedColor('blanco')}
                  className={`w-12 h-12 rounded-full border-2 shadow-sm ${
                    selectedColor === 'blanco' ? 'border-primary-600 ring-2 ring-primary-100' : 'border-gray-300'
                  } bg-white`}
                  aria-label="Color Blanco"
                />
                <button
                  onClick={() => setSelectedColor('negro')}
                  className={`w-12 h-12 rounded-full border-2 shadow-sm ${
                    selectedColor === 'negro' ? 'border-primary-600 ring-2 ring-primary-100' : 'border-gray-300'
                  } bg-black`}
                  aria-label="Color Negro"
                />
              </div>
            </div>

            {/* 3. Talle */}
            <div>
              <h3 className="text-lg font-bold mb-4">3. Elige el talle</h3>
              <div className="flex flex-wrap gap-2">
                {['M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg font-medium border-2 transition-all ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-primary-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Subir Diseño */}
            <div>
              <h3 className="text-lg font-bold mb-4">4. Sube tu diseño</h3>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer mb-6"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                    <Upload size={24} />
                  </div>
                  <p className="font-medium text-gray-700">Haz clic para subir imagen</p>
                  <p className="text-xs text-gray-500">Formato JPG o PNG</p>
                </div>
              </div>

              {/* Control Manual de Medidas */}
              {uploadedImage && printAreaRef.current && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-700">Medidas de la estampa:</p>
                    <button 
                      onClick={() => setLockAspectRatio(!lockAspectRatio)}
                      className={`p-1.5 rounded-md transition-colors ${lockAspectRatio ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-500'}`}
                      title={lockAspectRatio ? "Proporción bloqueada" : "Proporción desbloqueada"}
                    >
                      {lockAspectRatio ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">Ancho (cm)</label>
                      <input 
                        type="number" 
                        value={(30 * (designSize.width / printAreaRef.current.offsetWidth)).toFixed(1)}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value)
                          if (isNaN(val)) return
                          
                          const newWidthPx = (val / 30) * printAreaRef.current!.offsetWidth
                          
                          if (lockAspectRatio) {
                            const ratio = designSize.height / designSize.width
                            updateDesignSize(newWidthPx, newWidthPx * ratio, designPosition.x, designPosition.y)
                          } else {
                            updateDesignSize(newWidthPx, designSize.height, designPosition.x, designPosition.y)
                          }
                        }}
                        className="w-full border rounded px-2 py-1 text-sm font-mono focus:ring-2 focus:ring-primary-500 outline-none"
                        step="0.5"
                        min="1" 
                        max="30"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">Alto (cm)</label>
                      <input 
                        type="number" 
                        value={(40 * (designSize.height / printAreaRef.current.offsetHeight)).toFixed(1)}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value)
                          if (isNaN(val)) return

                          const newHeightPx = (val / 40) * printAreaRef.current!.offsetHeight
                          
                          if (lockAspectRatio) {
                            const ratio = designSize.width / designSize.height
                            updateDesignSize(newHeightPx * ratio, newHeightPx, designPosition.x, designPosition.y)
                          } else {
                            updateDesignSize(designSize.width, newHeightPx, designPosition.x, designPosition.y)
                          }
                        }}
                        className="w-full border rounded px-2 py-1 text-sm font-mono focus:ring-2 focus:ring-primary-500 outline-none"
                        step="0.5"
                        min="1" 
                        max="40"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-gray-400">
                    {lockAspectRatio 
                      ? "🔒 Las medidas cambian juntas para no deformar la imagen" 
                      : "🔓 Puedes cambiar las medidas libremente"}
                  </p>
                </div>
              )}
            </div>

            {/* Botón de Acción */}
            <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={handleFinishDesign}
                disabled={isGenerating || !uploadedImage}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="animate-pulse">Procesando...</span>
                ) : (
                  <>
                    <Download size={20} />
                    Finalizar y Descargar
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
