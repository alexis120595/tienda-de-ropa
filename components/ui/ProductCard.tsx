"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  sizes: string[];
}

export function ProductCard({ id, name, image, sizes }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Link
      href={`/productos/${id}`}
      className="aspect-square cursor-pointer perspective block"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente - Imagen del producto */}
        <div
          className="absolute w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={image}
            alt={name}
            width={400}
            height={500}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Dorso - Nombre y talles */}
        <div
          className="absolute w-full h-full bg-red-600 rounded-lg shadow-lg flex flex-col items-center justify-center p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-6">{name}</h2>

            <div className="mb-4">
              <p className="text-white text-sm font-semibold mb-3">
                Talles disponibles
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-white text-xs mt-6 opacity-80">
              
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
