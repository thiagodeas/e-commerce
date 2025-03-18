"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProducts() {
      try {
        const response = await axios.get(`http://localhost:3001/products/category/${id}`);
        setProducts(response.data.products);
      } catch (err) {
        setError("Erro ao carregar produtos.");
      }
    }

    async function fetchCategory() {
      try {
        const response = await axios.get(`http://localhost:3001/categories/${id}`);
        setCategoryName(response.data.category.name); 
      } catch (err) {
        setCategoryName("Categoria não encontrada");
      }
    }

    fetchProducts();
    fetchCategory()
  }, [id]);

  return (
    <div className="container mx-auto py-8">
      <p className="text-center text-[#1E293B]"><Link href='/'>Início </Link>{'>'} {categoryName}</p>
      <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-6">{categoryName || "Carregando..."}</h2>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out cursor-pointer">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold text-[#1E293B]">{product.name}</h3>
              <p className="text-gray-500">R$ {product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
