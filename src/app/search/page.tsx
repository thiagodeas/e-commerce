"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsCartPlus } from "react-icons/bs";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!query) return;

    async function fetchProducts() {
      try {
        const response = await axios.get(`http://localhost:3001/products/search?query=${query}`);
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError("Erro ao buscar produtos.");
        setLoading(false);
      }
    }

    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto py-8">
      <p className="text-center text-[#1E293B]">
        <Link href="/">Início</Link> {'>'} Resultados da busca para {query}
      </p>

      <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-6">
        Resultados da busca para: "{query}"
      </h2>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="group border p-4 rounded-lg shadow-md transition-all ease-in-out cursor-pointer flex items-center flex-col text-center bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-[250px] h-[250px] object-cover mb-2 rounded group-hover:brightness-50 ease-in-out transition-all duration-300"
              />

              <div className="flex flex-col items-start text-start">
                <h3 className="text-lg text-[#1E293B]">{product.name}</h3>
                <p className="text-gray-500">R$ {product.price.toFixed(2)}</p>
                <div className="flex items-end justify-end w-full">
                <button onClick={() => addToCart(product)}>
                    <BsCartPlus className="w-[26px] h-[26px] text-[#1E293B] transition-all ease-in-out duration-500 hover:text-[#4F46E5] hover:scale-110" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
