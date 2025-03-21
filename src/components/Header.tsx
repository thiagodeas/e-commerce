"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BsCart } from "react-icons/bs";
import { GiClick } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";

import { axiosCategoriesInstance } from "@/axiosConfig";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore"; 


export default function Header() {
  const cartCount = useCartStore((state) => state.getCartCount());
  const { isLoggedIn, logout } = useAuthStore();
  
  const pathName = usePathname();
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientCartCount, setClientCartCount] = useState(0);

  useEffect(() => {
    setClientCartCount(cartCount);
  }, [cartCount]);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axiosCategoriesInstance.get("/");

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

  const showHeader = pathName !== "/login" && pathName !== "/register";
  if (!showHeader) {
    return null;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     
    if (searchTerm.trim()) {
   
      window.location.href = `/search?query=${searchTerm}`;
    }
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    logout();

    router.push("/");
  }

  return (
    <header className="w-full h-[150px] flex-col justify-between items-center">
      <div className="flex items-center justify-around w-full pt-8">
        <div className="flex items-center gap-2">
          <Link className="text-[30px] font-bold text-[#4F46E5]" href="/">ClickShop</Link>
          <Link href="/"><GiClick className="w-[40px] h-[40px] text-[#4F46E5]"></GiClick></Link>
        </div>

        <nav className="flex justify-center items-center gap-4">
          <div className="flex items-center justify-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Buscar produtos"
              className="px-4 border-[#1E293B] bg-[#1e293b15] w-[500px] h-[38px] rounded-[4px] focus:outline-none focus:border-none focus:ring-2 focus:ring-[#4F46E5]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <button type="submit" className="hidden">Buscar</button>
             </form>
          </div>
          <div className="flex items-center justify-center gap-x-[6px]">
            <VscAccount className="w-[30px] h-[30px] text-[#1E293B]" />
            <div className="flex flex-col text-[13px]">
              <p>Bem vindo(a)!</p>
              {!isLoggedIn ? (
              <p>
                <Link href="/login" className="font-bold hover:text-[#4F46E5]">Entrar</Link> ou 
                <Link href="/register" className="font-bold hover:text-[#EF4444]"> Cadastrar</Link>
              </p>
              ) : (
                <p>
                  <button onClick={handleLogout} className="text-[#EF4444] font-semibold hover:font-bold">Desconectar</button>
                </p>
              )}
            </div>
          </div>
          <Link href="#" className="relative">
            <BsCart className="w-[30px] h-[30px] text-[#1E293B] transition-all ease-in-out duration-500 hover:text-[#4F46E5] hover:scale-110" />
            {clientCartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white font-semibold text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {clientCartCount}
              </span>
            )}
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
