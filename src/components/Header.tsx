"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaShoppingCart } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { axiosCategoriesInstance } from "@/axiosConfig";

export default function Header() {
  const pathName = usePathname();
  const showHeader = pathName !== "/login" && pathName !== "/register";
  if (!showHeader) {
    return null;
  }

  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axiosCategoriesInstance.get("/");
        console.log(response.data.categories);

        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          setError("Dados de categorias inválidos.");
        }
      } catch (err) {
        setError("Erro ao carregar categorias.");
      }
    }

    fetchCategories();
  }, []);

  return (
    <header className="w-full h-[150px] flex-col justify-between items-center">
      <div className="flex items-center justify-around w-full pt-8">
        <div className="flex items-center gap-2">
          <h1 className="text-[30px] font-bold text-[#4F46E5]">ClickShop</h1>
          <GiClick className="w-[40px] h-[40px] text-[#4F46E5]" />
        </div>

        <nav className="flex justify-center items-center gap-4">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Buscar produtos"
              className="px-4 border-[#1E293B] bg-[#1e293b15] w-[500px] h-[38px] rounded-[4px] focus:outline-none focus:border-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>
          <Link href="#">
            <FaShoppingCart className="w-[25px] h-[25px] text-[#1E293B] transition-all ease-in-out duration-500 hover:text-[#4F46E5]" />
          </Link>
        </nav>
      </div>

      <div className="flex items-center justify-center gap-8 w-full pt-8 text-[20px] text-[#1E293B]">
        {error ? (
          <p>{error}</p>
        ) : categories.length > 0 ? (
          categories.map((category) => {
            const isActive = pathName === `/category/${category._id}`;

            return (
              <Link
                key={category._id}
                href={`/category/${category._id}`}
                className={`
                  transition-all ease-in-out duration-500 hover:scale-110 
                  ${
                    isActive
                      ? "text-[#EF4444]" 
                      : "hover:text-[#EF4444]"
                  }
                `}
              >
                {category.name}
              </Link>
            );
          })
        ) : (
          <p>Carregando categorias...</p>
        )}
      </div>
    </header>
  );
}
