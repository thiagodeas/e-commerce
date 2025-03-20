"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BsCartPlus } from "react-icons/bs";

import { axiosCategoriesInstance, axiosProductsInstance } from "@/axiosConfig";
import { useCartStore } from "@/stores/cartStore";

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!id) return;

    async function fetchProducts() {
      try {
        const response = await axiosProductsInstance.get(`/category/${id}`);
        setProducts(response.data.products);
      } catch (err) {
        setError("Erro ao carregar produtos.");
      }
    }

    async function fetchCategory() {
      try {
        const response = await axiosCategoriesInstance.get(`/${id}`);
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
      <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-6"> {categoryName || "Carregando..."}</h2>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="group border p-4 rounded-lg shadow-md transition-all ease-in-out cursor-pointer flex items-center flex-col text-center bg-white">
              <img src={product.imageUrl} alt={product.name} className="w-[250px] h-[250px] object-cover mb-2 rounded group-hover:brightness-50 ease-in-out transition-all duration-300" />

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
