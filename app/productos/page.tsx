import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { products, getProductsByCategory } from '@/lib/products'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryParam = searchParams.categoria // searchParams['categoria']
  const category = typeof categoryParam === 'string' ? categoryParam : undefined

  // Fetch products from static file
  let displayedProducts = products
  if (category) {
      displayedProducts = getProductsByCategory(category)
  }

  // Format products for the card component
  // (La estructura en lib/products.ts ya es compatible, solo mapeamos lo necesario)
  const formattedProducts = displayedProducts.map(product => {
     return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        sizes: product.sizes
     }
  })

  const title = category 
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Todos los Productos'

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Filtros rápidos visuales */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <Link href="/productos" className={`px-4 py-2 rounded-full text-sm font-bold transition ${!category ? 'bg-black text-white' : 'bg-white text-black border hover:bg-gray-100'}`}>
                Todo
            </Link>
            <Link href="/productos?categoria=remeras" className={`px-4 py-2 rounded-full text-sm font-bold transition ${category === 'remeras' ? 'bg-black text-white' : 'bg-white text-black border hover:bg-gray-100'}`}>
                Remeras
            </Link>
            <Link href="/productos?categoria=musculosas" className={`px-4 py-2 rounded-full text-sm font-bold transition ${category === 'musculosas' ? 'bg-black text-white' : 'bg-white text-black border hover:bg-gray-100'}`}>
                Musculosas
            </Link>
            <Link href="/productos?categoria=shorts" className={`px-4 py-2 rounded-full text-sm font-bold transition ${category === 'shorts' ? 'bg-black text-white' : 'bg-white text-black border hover:bg-gray-100'}`}>
                Shorts
            </Link>
            <Link href="/productos?categoria=pantalones" className={`px-4 py-2 rounded-full text-sm font-bold transition ${category === 'pantalones' ? 'bg-black text-white' : 'bg-white text-black border hover:bg-gray-100'}`}>
                Pantalones
            </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 capitalize hidden">{title}</h1>
        
        {/* Grid de Productos */}
        {formattedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {formattedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id} // El componente ProductCard usará este ID para el link
                name={product.name}
                price={product.price}
                image={product.image}
                sizes={product.sizes}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-100 rounded-xl">
             <p className="text-xl text-gray-500">No hay productos disponibles en esta categoría.</p>
             <Link href="/productos" className="text-primary-600 font-bold mt-4 hover:underline block">
                Ver todos
             </Link>
          </div>
        )}
      </div>
    </main>
  )
}
