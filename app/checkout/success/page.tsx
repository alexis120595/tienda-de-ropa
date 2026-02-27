'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    clearCart();
    
    // Temporizador para redirigir
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [clearCart, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6">
        <CheckCircle size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-2">¡Pedido Realizado!</h1>
      <p className="text-gray-600 mb-4 max-w-md">
        Hemos guardado tu pedido y te hemos redirigido a WhatsApp para coordinar el pago y envío.
        <br/><br/>
        Si no se abrió WhatsApp automáticamente, puedes contactarnos directamente al número de nuestro perfil.
      </p>

      <p className="text-sm text-gray-500 mb-8 font-medium">
        Serás redirigido al inicio en {countdown} ex segundos...
      </p>
      
      <div className="flex gap-4 flex-col sm:flex-row">
        <button 
          onClick={() => router.push('/')}
          className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition inline-block cursor-pointer"
        >
          Volver al Inicio
        </button>
        <button 
          onClick={() => router.push('/productos')}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition inline-block cursor-pointer"
        >
          Seguir Comprando
        </button>
      </div>
    </div>
  );
}
