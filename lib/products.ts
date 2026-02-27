export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'remeras' | 'musculosas' | 'shorts' | 'pantalones'
  sizes: string[]
  colors: string[]
}

export const products: Product[] = [
  // Remeras Anteriores (Restauradas con precio 25.000)
  {
      id: 'remera-denis-rodman-blanca',
      name: 'Remera Denis Rodman',
      description: 'Remera con diseño exclusivo de Denis Rodman.',
      price: 25000,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770924259/remera_denis_rodman_blanca_1_da3klh.png',
      category: 'remeras',
      sizes: ['M', 'L', 'XL'],
      colors: ['Blanco']
  },
  {
      id: 'remera-denis-rodman-negra',
      name: 'Remera Denis Rodman Negra',
      description: 'Remera con diseño exclusivo de Denis Rodman.',
      price: 25000,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770924212/remera_denis_rodman_negra_1_qpnkv2.png',
      category: 'remeras',
      sizes: ['M', 'L', 'XL'],
      colors: ['Negro']
  },
  {
      id: 'remera-jordan-blanca',
      name: 'Remera Jordan',
      description: 'Remera de algodón premium con estampa Jordan.',
      price: 25000,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770924283/remera_jordan_blanca_1_fhp13c.png',
      category: 'remeras',
      sizes: ['M', 'L', 'XL'],
      colors: ['Blanco']
  },
  {
      id: 'remera-jordan-negra',
      name: 'Remera Jordan Negra',
      description: 'Remera de algodón premium con estampa Jordan.',
      price: 25000,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770924307/remera_jordan_negra_1_oc1olc.png',
      category: 'remeras',
      sizes: ['M', 'L', 'XL'],
      colors: ['Negro']
  },
  {
      id: 'remera-maradona-blanca',
      name: 'Remera Maradona',
      description: 'Remera de algodón premium con estampa Maradona.',
      price: 25000,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770923518/remera_maradona_blanca_1_qi0avo.png',
      category: 'remeras',
      sizes: ['M', 'L', 'XL'],
      colors: ['Blanco']
  },
  {
      id: 'remera-maradona-negra',
      name: 'Remera Maradona Negra',
      description: 'Remera de algodón premium con estampa Maradona.',
      price: 25000,
      image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1770924325/remera_negra_maradona_1_ks982s.png',
      category: 'remeras',
      sizes: ['M', 'L', 'XL'],
      colors: ['Negro']
  },

  // NUEVAS Remeras Vexa
  {
    id: 'remera-vexa-blanca',
    name: 'Remera Vexa Blanca',
    description: 'Remera de algodón premium con diseño exclusivo Vexa.',
    price: 25000,
    image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772207236/Sin_t%C3%ADtulo_jqyzio.png', 
    category: 'remeras',
    sizes: ['M', 'L', 'XL'],
    colors: ['Blanco']
  },
  {
    id: 'remera-vexa-negra-1',
    name: 'Remera Vexa Negra',
    description: 'Remera de algodón premium con diseño exclusivo Vexa.',
    price: 25000,
    image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772207270/Sin_t%C3%ADtulo_3_lw2hou.png',
    category: 'remeras',
    sizes: ['M', 'L', 'XL'],
    colors: ['Negro']
  },
  {
    id: 'remera-vexa-negra-2',
    name: 'Remera Vexa Negra (Estampa)',
    description: 'Remera de algodón premium con diseño exclusivo Vexa.',
    price: 25000,
    image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772207304/Sin_t%C3%ADtulo_2_am0qri.png',
    category: 'remeras',
    sizes: ['M', 'L', 'XL'],
    colors: ['Negro']
  },

  // NUEVAS Musculosas Vexa
  {
     id: 'musculosa-vexa-1',
     name: 'Musculosa Vexa',
     description: 'Musculosa de algodón ideal para entrenamiento.',
     price: 20000,
     image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772212953/ChatGPT_Image_23_feb_2026_17_24_09_1_u0e0cv.png', 
     category: 'musculosas',
     sizes: ['M', 'L', 'XL'],
     colors: ['Negro']
  },
  {
     id: 'musculosa-vexa-2',
     name: 'Musculosa Vexa',
     description: 'Musculosa de algodón ideal para entrenamiento.',
     price: 20000,
     image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772212988/ChatGPT_Image_23_feb_2026_17_31_54_1_xxqvj1.png', 
     category: 'musculosas',
     sizes: ['M', 'L', 'XL'],
     colors: ['Negro']
  },

  // Shorts
  {
    id: 'short-algodon',
    name: 'Short de Algodón',
    description: 'Short cómodo y fresco.',
    price: 35000,
    image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772207550/short_algodon_m7uosq.png',
    category: 'shorts',
    sizes: ['M', 'L', 'XL'],
    colors: ['Negro', 'Gris']
  },
  // Pantalones
  {
    id: 'pantalon-largo',
    name: 'Pantalón Largo',
    description: 'Pantalón de algodón cómodo y con estilo.',
    price: 45000,
    image: 'https://res.cloudinary.com/dndrldskx/image/upload/v1772207586/pantalon_largo_qy7uwh.png',
    category: 'pantalones',
    sizes: ['M', 'L', 'XL'],
    colors: ['Negro', 'Gris']
  }
]

export function getProductById(id: string) {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category)
}
