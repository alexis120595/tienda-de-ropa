"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  sizes: string[];
  price: number;
}

export function ProductCard({ id, name, image, sizes, price }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detectar si es touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Cerrar la tarjeta si se toca fuera de ella
  useEffect(() => {
    if (!isTouchDevice || !isFlipped) return;

    const handleTouchOutside = (e: TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsFlipped(false);
      }
    };

    document.addEventListener('touchstart', handleTouchOutside);
    return () => document.removeEventListener('touchstart', handleTouchOutside);
  }, [isTouchDevice, isFlipped]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // En dispositivos touch: primer toque voltea, segundo navega
    if (isTouchDevice) {
      if (!isFlipped) {
        e.preventDefault(); // Evitar navegación
        setIsFlipped(true);
      }
      // Si ya está volteada, deja que el Link navegue normalmente
    }
  }, [isTouchDevice, isFlipped]);

  return (
    <div ref={cardRef}>
      <Link
        href={`/productos/${id}`}
        className="aspect-square cursor-pointer perspective block w-full group"
        onMouseEnter={() => !isTouchDevice && setIsFlipped(true)}
        onMouseLeave={() => !isTouchDevice && setIsFlipped(false)}
        onClick={handleClick}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 transform-style-3d"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Frente - Imagen del producto */}
          <div
            className="absolute w-full h-full bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src={image}
              alt={name}
              width={400}
              height={500}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Dorso - Nombre y talles */}
          <div
            className="absolute w-full h-full bg-black rounded-lg shadow-lg flex flex-col items-center justify-center p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold mb-2">{name}</h2>
              <p className="text-white text-xl font-bold mb-6">${price.toLocaleString('es-AR')}</p>

              <div className="mb-4">
                <p className="text-white text-sm font-semibold mb-3">
                  Talles disponibles
                </p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="w-12 h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-white text-xs mt-6 opacity-80">
                Tocá de nuevo para ver detalles
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
