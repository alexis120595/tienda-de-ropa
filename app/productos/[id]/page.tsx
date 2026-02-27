import ProductDetailClient from './ProductDetailClient'
import { getProductById } from '@/lib/products'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Buscamos en el archivo estático
  const product = getProductById(params.id)

  if (!product) {
    // Manejo de error si no existe...
    return (
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
            <p className="text-gray-600 mb-8">Lo sentimos, el producto que buscas no existe o fue eliminado.</p>
            <Link href="/productos" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition inline-flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                Volver al catálogo
            </Link>
        </div>
      </main>
    )
  }

  // Ahora product ya tiene los talles y colores en el formato correcto
  // No hace falta procesar variants

  const productData = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    description: product.description,
    sizes: product.sizes,
    color: product.colors.join(' / ') 
  }

  return (
    <ProductDetailClient product={productData} />
  )
}
