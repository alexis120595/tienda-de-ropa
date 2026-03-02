'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, clearCart, removeItem, addItem } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    setLoading(true);

    try {
      const ADMIN_PHONE = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "5491112345678"; 
      
      const whatsappUrl = generateWhatsAppLink(ADMIN_PHONE, {
        user: { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone 
        },
        items: items.map(i => ({ 
            name: i.name, 
            quantity: i.quantity, 
            price: i.price, 
            size: i.size 
        })),
        total: total
      });

      window.open(whatsappUrl, '_blank');
      
      toast.success('¡Pedido generado! Te redirigimos a WhatsApp...');

      clearCart();
      router.push('/checkout/success');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al procesar el pedido.');
      setLoading(false);
    }
  };

  const handleRemoveItem = (variantId: string, name: string) => {
    removeItem(variantId);
    toast.success(`${name} eliminado del carrito`);
  };

  if (items.length === 0) {
     return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío 😔</h2>
            <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Ir a comprar
            </Link>
        </div>
     )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Formulario */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Datos de contacto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ej: 11 1234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Te contactaremos a este número para coordinar el pago.</p>
             </div>
             
             <div className="pt-4 border-t mt-4">
                <h3 className="text-lg font-semibold mb-3">Dirección de envío (Opcional)</h3>
                <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Dirección (Calle y altura)"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="Ciudad / Localidad"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        />
                        <input
                          type="text"
                          name="postalCode"
                          placeholder="Código Postal"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>
                </div>
             </div>

             <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-green-700 transition mt-6 flex items-center justify-center gap-2"
             >
                {loading ? 'Procesando...' : 'Finalizar pedido en WhatsApp'}
             </button>
          </form>
        </div>

        {/* Resumen de Compra */}
        <div className="h-fit space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                 {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                       <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-contain p-1" 
                          />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500">Talle: {item.size} | Cant: {item.quantity}</p>
                          <p className="font-bold text-sm mt-1">${(item.price * item.quantity).toLocaleString()}</p>
                       </div>
                       <button
                          onClick={() => handleRemoveItem(item.variantId, item.name)}
                          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-center"
                          title="Eliminar producto"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 ))}
              </div>
              <div className="border-t mt-4 pt-4">
                 <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                 </div>
              </div>
           </div>

           {/* Botón para vaciar carrito */}
           <button
              onClick={() => {
                clearCart();
                toast.success('Carrito vaciado');
              }}
              className="w-full py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
           >
              Vaciar carrito
           </button>
        </div>

      </div>
    </div>
  );
}

